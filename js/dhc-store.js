/* ==========================================================================
   Dhule Health Connect — shared data layer (identical copy in both apps)
   Works in TWO modes, chosen automatically:
     • "local"  — no install needed. Appointments are kept in the browser's
                  localStorage, so the patient app and the Hospital Desk share
                  data when opened in the SAME browser on the SAME PC (demo).
     • "server" — if /api exists (node server.js), everything goes through it,
                  so patients and hospitals can use different devices.
   ========================================================================== */
(function(){
  const HOSPITALS = [
    { id:'h1', name:'Civil Hospital Dhule', type:'Government' },
    { id:'h2', name:'Shri Bhausaheb Hire Government Medical College & Hospital', type:'Government' },
    { id:'h3', name:'Seva Superspeciality Hospital', type:'Private Hospital' },
    { id:'h4', name:'Om Critical Care Center Pvt. Ltd.', type:'Private Hospital' },
    { id:'h5', name:'Siddheshwar Multispeciality Hospital', type:'Private Hospital' },
    { id:'h6', name:'Shree Vighnaharta Superspeciality Hospital', type:'Private Hospital' },
    { id:'h7', name:'Shri Samarth Narayan Multispeciality Hospital', type:'Private Hospital' },
    { id:'h8', name:'Anjana Heart Hospital', type:'Private Hospital' }
  ];
  const KEY = 'dhc_local_db', DEFAULT_PW = 'Hospital@123';

  /* ---------- mode detection ---------- */
  let modeP = null;
  function mode(){
    if(modeP) return modeP;
    modeP = (async () => {
      if(location.protocol !== 'http:' && location.protocol !== 'https:') return 'local';
      try{
        const c = new AbortController(), t = setTimeout(() => c.abort(), 2500);
        const r = await fetch('/api/hospitals', { signal: c.signal }); clearTimeout(t);
        return Array.isArray(await r.json()) ? 'server' : 'local';
      }catch(e){ return 'local'; }
    })();
    return modeP;
  }
  const fail = (status, msg) => Object.assign(new Error(msg), { status });
  const clean = (v, n) => String(v == null ? '' : v).replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, n);

  /* ---------- server mode ---------- */
  async function sreq(path, opts = {}, token){
    const r = await fetch(path, { ...opts, headers: { 'Content-Type':'application/json', ...(token ? { Authorization:'Bearer ' + token } : {}) } });
    const j = await r.json().catch(() => ({}));
    if(!r.ok) throw fail(r.status, j.error || 'error');
    return j;
  }

  /* ---------- local mode ---------- */
  function load(){ try{ const d = JSON.parse(localStorage.getItem(KEY)); if(d && Array.isArray(d.appointments)) return d; }catch(e){} return { appointments: [] }; }
  function save(d){ localStorage.setItem(KEY, JSON.stringify(d)); }
  const pub = a => ({ ref:a.ref, hospitalId:a.hospitalId, hospitalName:a.hospitalName, specialty:a.specialty, patientName:a.patientName,
    date:a.date, time:a.time, status:a.status, note:a.note, createdAt:a.createdAt, updatedAt:a.updatedAt });
  function localHid(token){ const m = /^local:(h[1-8])$/.exec(token || ''); if(!m) throw fail(401, 'Please sign in again'); return m[1]; }

  /* ---------- public API (same shape in both modes) ---------- */
  const DHC = {
    mode,
    async hospitals(){ return (await mode()) === 'server' ? sreq('/api/hospitals') : HOSPITALS; },

    async createAppointment(b){
      if((await mode()) === 'server') return sreq('/api/appointments', { method:'POST', body: JSON.stringify(b) });
      const h = HOSPITALS.find(x => x.id === b.hospitalId), owner = clean(b.owner, 120).toLowerCase();
      const patientName = clean(b.patientName, 80), patientPhone = clean(b.patientPhone, 20);
      if(!h) throw fail(400, 'Unknown hospital');
      if(!owner) throw fail(400, 'Missing owner');
      if(patientName.length < 2 || !/^[0-9+\-\s]{7,20}$/.test(patientPhone)) throw fail(400, 'Invalid name or phone');
      const d = load(); let ref;
      do{ ref = 'DHC-' + Array.from(crypto.getRandomValues(new Uint8Array(3))).map(x => x.toString(16).padStart(2,'0')).join('').toUpperCase(); }
      while(d.appointments.some(a => a.ref === ref));
      const now = Date.now();
      const a = { ref, owner, hospitalId:h.id, hospitalName:h.name, specialty:clean(b.specialty, 60), patientName, patientPhone,
        date:clean(b.date, 10), time:clean(b.time, 5), status:'pending', note:'', createdAt:now, updatedAt:now };
      d.appointments.unshift(a); save(d); return pub(a);
    },

    async listMine(owner){
      if((await mode()) === 'server') return sreq('/api/appointments?owner=' + encodeURIComponent(owner));
      const o = clean(owner, 120).toLowerCase();
      return load().appointments.filter(a => a.owner === o).map(pub);
    },

    async hospitalLogin(hospitalId, password){
      if((await mode()) === 'server') return sreq('/api/hospital/login', { method:'POST', body: JSON.stringify({ hospitalId, password }) });
      const h = HOSPITALS.find(x => x.id === hospitalId);
      if(!h || String(password || '') !== DEFAULT_PW) throw fail(401, 'Wrong hospital or password');
      return { token: 'local:' + h.id, hospital: h };
    },
    async hospitalMe(token){
      if((await mode()) === 'server') return sreq('/api/hospital/me', {}, token);
      return HOSPITALS.find(h => h.id === localHid(token));
    },
    async hospitalList(token){
      if((await mode()) === 'server') return sreq('/api/hospital/appointments', {}, token);
      const hid = localHid(token);
      return load().appointments.filter(a => a.hospitalId === hid).map(a => ({ ...pub(a), patientPhone: a.patientPhone }));
    },
    async hospitalUpdate(token, ref, status, note){
      if((await mode()) === 'server') return sreq('/api/hospital/appointments/' + encodeURIComponent(ref), { method:'PATCH', body: JSON.stringify({ status, note }) }, token);
      const hid = localHid(token), d = load(), a = d.appointments.find(x => x.ref === ref && x.hospitalId === hid);
      if(!a) throw fail(404, 'Appointment not found');
      if(!['accepted','rejected','pending'].includes(status)) throw fail(400, 'Invalid status');
      a.status = status; a.note = clean(note, 300); a.updatedAt = Date.now(); save(d);
      return { ...pub(a), patientPhone: a.patientPhone };
    },

    /* instant refresh when the OTHER app (another tab) changes data */
    onChange(cb){ window.addEventListener('storage', e => { if(e.key === KEY) cb(); }); }
  };
  window.DHC = DHC;
})();
