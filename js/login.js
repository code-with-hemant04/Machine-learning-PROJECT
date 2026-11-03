/* Dhule Health Connect — login page logic (EN / HI / MR) */
const TX = {
  en:{appName:'Dhule Health Connect',heroA:'Care, closer to you',heroB:'when it matters most.',heroP:'Find ambulances, doctors, blood banks, labs and medicines across Dhule — in English, Hindi and Marathi.',
    f1:'Ambulance finder',f2:'Doctor appointments',f3:'Blood banks',f4:'Pathology labs',f5:'Medical finder',f6:'Live map & location',s1:'Free ambulance',s2:'Emergency access',s3:'Languages',
    welcome:'Welcome back',welcomeSub:'Sign in to access your health dashboard.',join:'Create your account',joinSub:'Join in under a minute — it\'s free.',reset:'Reset password',resetSub:'Enter your email and choose a new password.',
    tabLogin:'Sign in',tabRegister:'Create account',email:'Email',password:'Password',remember:'Remember me',forgot:'Forgot password?',signIn:'Sign in',or:'or',guest:'Continue as guest',
    demoTitle:'Demo account',fill:'Fill',fullName:'Full name',phone:'Mobile number',confirm:'Confirm password',createAcc:'Create account',newPass:'New password',resetBtn:'Reset password',back:'← Back to sign in',emerg:'Medical emergency?',
    eName:'Please enter your name',eEmail:'Enter a valid email address',ePass:'Password is required',ePassLen:'Use at least 8 characters',ePhone:'Enter a valid 10-digit mobile number',eMatch:'Passwords do not match',
    noUser:'No account found with this email.',badPass:'Incorrect password. Please try again.',exists:'An account with this email already exists.',created:'Account created! Please sign in.',resetOk:'Password updated. You can sign in now.',
    weak:'Weak',fair:'Fair',good:'Good',strong:'Strong',working:'Please wait…'},
  hi:{appName:'धुले हेल्थ कनेक्ट',heroA:'देखभाल, आपके करीब',heroB:'जब सबसे ज़्यादा ज़रूरत हो।',heroP:'धुले में एम्बुलेंस, डॉक्टर, ब्लड बैंक, लैब और दवाइयाँ खोजें — अंग्रेज़ी, हिंदी और मराठी में।',
    f1:'एम्बुलेंस खोजें',f2:'डॉक्टर अपॉइंटमेंट',f3:'ब्लड बैंक',f4:'पैथोलॉजी लैब',f5:'मेडिकल फ़ाइंडर',f6:'लाइव मैप और लोकेशन',s1:'मुफ़्त एम्बुलेंस',s2:'आपातकालीन सेवा',s3:'भाषाएँ',
    welcome:'वापसी पर स्वागत है',welcomeSub:'अपने हेल्थ डैशबोर्ड के लिए साइन इन करें।',join:'अपना खाता बनाएँ',joinSub:'एक मिनट से कम में जुड़ें — यह मुफ़्त है।',reset:'पासवर्ड रीसेट करें',resetSub:'अपना ईमेल दर्ज करें और नया पासवर्ड चुनें।',
    tabLogin:'साइन इन',tabRegister:'खाता बनाएँ',email:'ईमेल',password:'पासवर्ड',remember:'मुझे याद रखें',forgot:'पासवर्ड भूल गए?',signIn:'साइन इन',or:'या',guest:'अतिथि के रूप में जारी रखें',
    demoTitle:'डेमो खाता',fill:'भरें',fullName:'पूरा नाम',phone:'मोबाइल नंबर',confirm:'पासवर्ड की पुष्टि करें',createAcc:'खाता बनाएँ',newPass:'नया पासवर्ड',resetBtn:'पासवर्ड रीसेट करें',back:'← साइन इन पर वापस',emerg:'मेडिकल इमरजेंसी?',
    eName:'कृपया अपना नाम दर्ज करें',eEmail:'सही ईमेल पता दर्ज करें',ePass:'पासवर्ड आवश्यक है',ePassLen:'कम से कम 8 अक्षर रखें',ePhone:'सही 10 अंकों का मोबाइल नंबर दर्ज करें',eMatch:'पासवर्ड मेल नहीं खाते',
    noUser:'इस ईमेल से कोई खाता नहीं मिला।',badPass:'गलत पासवर्ड। कृपया फिर प्रयास करें।',exists:'इस ईमेल से खाता पहले से मौजूद है।',created:'खाता बन गया! कृपया साइन इन करें।',resetOk:'पासवर्ड अपडेट हो गया। अब साइन इन करें।',
    weak:'कमज़ोर',fair:'ठीक-ठाक',good:'अच्छा',strong:'मज़बूत',working:'कृपया प्रतीक्षा करें…'},
  mr:{appName:'धुळे हेल्थ कनेक्ट',heroA:'काळजी, तुमच्या जवळ',heroB:'जेव्हा सर्वाधिक गरज असते.',heroP:'धुळ्यातील रुग्णवाहिका, डॉक्टर, रक्तपेढी, लॅब आणि औषधे शोधा — इंग्रजी, हिंदी आणि मराठीत.',
    f1:'रुग्णवाहिका शोधा',f2:'डॉक्टर अपॉइंटमेंट',f3:'रक्तपेढी',f4:'पॅथॉलॉजी लॅब',f5:'मेडिकल फाइंडर',f6:'लाइव्ह मॅप आणि लोकेशन',s1:'मोफत रुग्णवाहिका',s2:'आपत्कालीन सेवा',s3:'भाषा',
    welcome:'पुन्हा स्वागत आहे',welcomeSub:'तुमच्या हेल्थ डॅशबोर्डसाठी साइन इन करा.',join:'तुमचे खाते तयार करा',joinSub:'एका मिनिटात सामील व्हा — हे मोफत आहे.',reset:'पासवर्ड रीसेट करा',resetSub:'तुमचा ईमेल टाका आणि नवीन पासवर्ड निवडा.',
    tabLogin:'साइन इन',tabRegister:'खाते तयार करा',email:'ईमेल',password:'पासवर्ड',remember:'मला लक्षात ठेवा',forgot:'पासवर्ड विसरलात?',signIn:'साइन इन',or:'किंवा',guest:'पाहुणा म्हणून पुढे जा',
    demoTitle:'डेमो खाते',fill:'भरा',fullName:'पूर्ण नाव',phone:'मोबाइल नंबर',confirm:'पासवर्डची खात्री करा',createAcc:'खाते तयार करा',newPass:'नवीन पासवर्ड',resetBtn:'पासवर्ड रीसेट करा',back:'← साइन इनकडे परत',emerg:'वैद्यकीय आणीबाणी?',
    eName:'कृपया तुमचे नाव टाका',eEmail:'योग्य ईमेल पत्ता टाका',ePass:'पासवर्ड आवश्यक आहे',ePassLen:'किमान 8 अक्षरे वापरा',ePhone:'योग्य 10 अंकी मोबाइल नंबर टाका',eMatch:'पासवर्ड जुळत नाहीत',
    noUser:'या ईमेलने खाते सापडले नाही.',badPass:'चुकीचा पासवर्ड. कृपया पुन्हा प्रयत्न करा.',exists:'या ईमेलने खाते आधीच अस्तित्वात आहे.',created:'खाते तयार झाले! कृपया साइन इन करा.',resetOk:'पासवर्ड अपडेट झाला. आता साइन इन करा.',
    weak:'कमकुवत',fair:'ठीक',good:'चांगला',strong:'मजबूत',working:'कृपया थांबा…'}
};
let lang = localStorage.getItem('dhc_lang') || 'en';
let mode = 'login';
const $ = id => document.getElementById(id);
const T = k => (TX[lang] && TX[lang][k]) || TX.en[k] || k;

/* already signed in? go straight to the app */
if(AUTH.session()) location.replace('index.html');
AUTH.seedDemo();

function applyLang(){
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i]').forEach(el => { el.textContent = T(el.dataset.i); });
  document.querySelectorAll('#lang-switch button').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
  const titles = { login:['welcome','welcomeSub'], register:['join','joinSub'], forgot:['reset','resetSub'] }[mode];
  $('title').textContent = T(titles[0]); $('subtitle').textContent = T(titles[1]);
  updateStrength();
}
function setMode(m){
  mode = m;
  ['login','register','forgot'].forEach(x => $('form-'+x).classList.toggle('hidden', x !== m));
  $('tabs').classList.toggle('hidden', m === 'forgot');
  document.querySelectorAll('#tabs button').forEach(b => b.classList.toggle('active', b.dataset.tab === m));
  clearErrors(); showMsg('');
  applyLang();
}
function showMsg(text, bad){ const m = $('msg'); m.textContent = text || ''; m.classList.toggle('hidden', !text); m.classList.toggle('bad', !!bad); }
function setErr(id, text){
  const e = document.querySelector(`[data-err="${id}"]`); if(e) e.textContent = text || '';
  const inp = $(id); if(inp) inp.closest('.input-box').classList.toggle('invalid', !!text);
}
function clearErrors(){ document.querySelectorAll('[data-err]').forEach(e => setErr(e.dataset.err, '')); }
const emailOk = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

/* password strength */
function score(p){
  let s = 0; if(p.length >= 8) s++; if(/[A-Z]/.test(p) && /[a-z]/.test(p)) s++; if(/\d/.test(p)) s++; if(/[^A-Za-z0-9]/.test(p)) s++; return s;
}
function updateStrength(){
  const p = $('r-pass').value, s = p ? Math.max(1, score(p)) : 0;
  const labels = ['', 'weak', 'fair', 'good', 'strong'], colors = ['', '#e14b2a', '#c98a1f', '#2c6e8e', '#2f8f5b'];
  $('strength-bar').style.width = (s * 25) + '%'; $('strength-bar').style.background = colors[s];
  $('strength-label').textContent = s ? T(labels[s]) : '';
}

/* events */
document.querySelectorAll('#lang-switch button').forEach(b => b.addEventListener('click', () => {
  lang = b.dataset.lang; localStorage.setItem('dhc_lang', lang); applyLang();
}));
document.querySelectorAll('#tabs button').forEach(b => b.addEventListener('click', () => setMode(b.dataset.tab)));
$('go-forgot').addEventListener('click', () => setMode('forgot'));
$('back-login').addEventListener('click', () => setMode('login'));
$('r-pass').addEventListener('input', updateStrength);
$('r-phone').addEventListener('input', e => { e.target.value = e.target.value.replace(/\D/g, ''); });
document.querySelectorAll('[data-eye]').forEach(b => b.addEventListener('click', () => {
  const i = $(b.dataset.eye); i.type = i.type === 'password' ? 'text' : 'password'; b.textContent = i.type === 'password' ? '👁️' : '🙈';
}));
$('fill-demo').addEventListener('click', () => { $('l-email').value = 'demo@dhule.in'; $('l-pass').value = 'Demo@123'; clearErrors(); });
$('btn-guest').addEventListener('click', () => { AUTH.guest(); location.replace('index.html'); });

function busy(btn, on, label){ btn.disabled = on; btn.textContent = on ? T('working') : T(label); }

$('form-login').addEventListener('submit', async e => {
  e.preventDefault(); clearErrors(); showMsg('');
  const email = $('l-email').value, password = $('l-pass').value; let ok = true;
  if(!emailOk(email)){ setErr('l-email', T('eEmail')); ok = false; }
  if(!password){ setErr('l-pass', T('ePass')); ok = false; }
  if(!ok) return;
  busy($('btn-login'), true);
  const r = await AUTH.login({ email, password, remember: $('l-remember').checked });
  busy($('btn-login'), false, 'signIn');
  if(r.ok) return location.replace('index.html');
  if(r.err === 'nouser') setErr('l-email', T('noUser')); else setErr('l-pass', T('badPass'));
});

$('form-register').addEventListener('submit', async e => {
  e.preventDefault(); clearErrors(); showMsg('');
  const name = $('r-name').value, email = $('r-email').value, phone = $('r-phone').value, p1 = $('r-pass').value, p2 = $('r-pass2').value; let ok = true;
  if(name.trim().length < 2){ setErr('r-name', T('eName')); ok = false; }
  if(!emailOk(email)){ setErr('r-email', T('eEmail')); ok = false; }
  if(!/^[6-9]\d{9}$/.test(phone)){ setErr('r-phone', T('ePhone')); ok = false; }
  if(p1.length < 8){ setErr('r-pass', T('ePassLen')); ok = false; }
  if(p1 !== p2){ setErr('r-pass2', T('eMatch')); ok = false; }
  if(!ok) return;
  busy($('btn-register'), true);
  const r = await AUTH.register({ name, email, phone, password: p1 });
  busy($('btn-register'), false, 'createAcc');
  if(!r.ok) return setErr('r-email', T('exists'));
  $('form-register').reset(); updateStrength();
  setMode('login'); $('l-email').value = email.trim().toLowerCase(); showMsg(T('created'));
});

$('form-forgot').addEventListener('submit', async e => {
  e.preventDefault(); clearErrors();
  const email = $('f-email').value, pass = $('f-pass').value; let ok = true;
  if(!emailOk(email)){ setErr('f-email', T('eEmail')); ok = false; }
  if(pass.length < 8){ setErr('f-pass', T('ePassLen')); ok = false; }
  if(!ok) return;
  const r = await AUTH.resetPassword(email, pass);
  if(!r.ok) return setErr('f-email', T('noUser'));
  $('form-forgot').reset(); setMode('login'); showMsg(T('resetOk'));
});

applyLang();
