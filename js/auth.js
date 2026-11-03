/* ==========================================================================
   Dhule Health Connect — authentication (front-end demo)
   Accounts live in this browser's localStorage; passwords are stored as
   SHA-256 hashes (never plain text). For production, replace the functions
   in the "Storage layer" section with calls to a real backend API.
   ========================================================================== */
const AUTH = (() => {
  const USERS_KEY = 'dhc_users', SESSION_KEY = 'dhc_session';

  /* ---------- helpers ---------- */
  async function hash(text){
    try{
      if(window.crypto && crypto.subtle){
        const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('dhc::' + text));
        return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
      }
    }catch(e){}
    let h = 5381; for(const c of 'dhc::' + text) h = ((h << 5) + h + c.charCodeAt(0)) | 0;   // fallback
    return 'f' + (h >>> 0).toString(16);
  }
  const normEmail = e => String(e || '').trim().toLowerCase();

  /* ---------- Storage layer (swap for a real API) ---------- */
  function getUsers(){ try{ return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }catch(e){ return []; } }
  function setUsers(u){ localStorage.setItem(USERS_KEY, JSON.stringify(u)); }

  async function seedDemo(){
    const users = getUsers();
    if(!users.some(u => u.email === 'demo@dhule.in')){
      users.push({ name:'Demo User', email:'demo@dhule.in', phone:'9876543210', pass: await hash('Demo@123'), created: Date.now() });
      setUsers(users);
    }
  }

  /* ---------- public API ---------- */
  async function register({name, email, phone, password}){
    email = normEmail(email);
    const users = getUsers();
    if(users.some(u => u.email === email)) return { ok:false, err:'exists' };
    users.push({ name:name.trim(), email, phone:(phone||'').trim(), pass: await hash(password), created: Date.now() });
    setUsers(users);
    return { ok:true };
  }
  async function login({email, password, remember}){
    email = normEmail(email);
    const u = getUsers().find(x => x.email === email);
    if(!u) return { ok:false, err:'nouser' };
    if(u.pass !== await hash(password)) return { ok:false, err:'badpass' };
    startSession({ name:u.name, email:u.email, phone:u.phone, guest:false }, remember);
    return { ok:true };
  }
  async function resetPassword(email, newPassword){
    email = normEmail(email);
    const users = getUsers(), u = users.find(x => x.email === email);
    if(!u) return { ok:false, err:'nouser' };
    u.pass = await hash(newPassword); setUsers(users);
    return { ok:true };
  }
  function startSession(user, remember){
    clearSession();
    (remember ? localStorage : sessionStorage).setItem(SESSION_KEY, JSON.stringify({ ...user, at: Date.now() }));
  }
  function guest(){ startSession({ name:'Guest', email:'', guest:true }, false); }
  function session(){
    try{ return JSON.parse(sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY) || 'null'); }
    catch(e){ return null; }
  }
  function clearSession(){ sessionStorage.removeItem(SESSION_KEY); localStorage.removeItem(SESSION_KEY); }
  function logout(){ clearSession(); location.replace('login.html'); }
  function requireLogin(){ if(!session()) location.replace('login.html'); }

  return { register, login, resetPassword, guest, session, logout, requireLogin, seedDemo };
})();
