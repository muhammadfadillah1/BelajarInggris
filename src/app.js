(function(){
"use strict";
/* ---------- helpers ---------- */
const $=(s,r)=>(r||document).querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));const t=a[i];a[i]=a[j];a[j]=t}return a};
const sample=(a,n)=>shuffle(a).slice(0,n);
const cap1=s=>s.charAt(0).toUpperCase()+s.slice(1);
const low1=s=>s.charAt(0).toLowerCase()+s.slice(1);
const LVN={0:"Semua level",1:"Level 1",2:"Level 2",3:"Level 3",4:"Level 4",5:"IELTS"};
const LVD={1:"Dasar. Kalimat sederhana dan kosakata sehari-hari.",2:"Dasar lanjutan. Cerita pendek, masa lalu dan rencana.",3:"Menengah. Prosedur kerja, aturan, dan kalimat majemuk.",4:"Lanjut. Laporan, email formal, dan pengandaian.",5:"Persiapan IELTS. Kosakata akademik, grammar untuk Writing, bacaan True/False/Not Given, dan deskripsi grafik."};
const LVC={0:"#0B7A75",1:"#2B8A57",2:"#2F6FA3",3:"#C98F00",4:"#C0412E",5:"#6C47B8"};

/* ---------- ikon ---------- */
const IP={
  vocab:'<rect x="3" y="7" width="14" height="14" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v12"/>',
  fill:'<path d="M4 20l1-4L16.5 4.5a2 2 0 0 1 3 3L8 19z"/><path d="M14 7l3 3"/>',
  gram:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11.5V16c3 2.5 9 2.5 12 0v-4.5"/>',
  read:'<path d="M2 5h7a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H2z"/><path d="M22 5h-7a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h8z"/>',
  cloze:'<rect x="3" y="4" width="18" height="6" rx="1.5"/><path d="M3 15h8M15 15h6M3 19h14"/>',
  listen:'<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="5" height="7" rx="2"/><rect x="16" y="14" width="5" height="7" rx="2"/>',
  cap:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>',
  saved:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  flame:'<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z"/>',
  bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  vol:'<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>',
  check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  chat:'<path d="M4 5h16v11H9l-5 4z"/>'
};
const ic=(n,s)=>'<svg class="i" width="'+(s||20)+'" height="'+(s||20)+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+IP[n]+'</svg>';
const SPK=ic("vol",18);
function ringSvg(p,r,w){const c=2*Math.PI*r,o=c*(1-Math.max(0,Math.min(1,p)));return'<svg viewBox="0 0 100 100"><circle class="tr" cx="50" cy="50" r="'+r+'" fill="none" stroke-width="'+w+'"/><circle class="pr" cx="50" cy="50" r="'+r+'" fill="none" stroke-width="'+w+'" stroke-dasharray="'+c.toFixed(1)+'" stroke-dashoffset="'+o.toFixed(1)+'"/></svg>'}

/* ---------- storage ---------- */
const KEY="belajar-inggris-v1";
let ST={level:0,dark:null,rate:0.9,saved:[],custom:[],known:{},miss:{},stats:{},caps:{},goal:20,sound:false,best:{},day:{d:"",n:0},streak:{last:"",n:0}};
try{Object.assign(ST,JSON.parse(localStorage.getItem(KEY)||"{}"))}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(ST))}catch(e){}}
const dstr=d=>d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
const today=()=>dstr(new Date());
const yest=()=>dstr(new Date(Date.now()-864e5));
const todayN=()=>ST.day.d===today()?ST.day.n:0;
const streakNow=()=>(ST.streak.last===today()||ST.streak.last===yest())?ST.streak.n:0;
function bump(menu,right,total){
  const s=ST.stats[menu]||(ST.stats[menu]={done:0,right:0});s.done+=total;s.right+=right;
  const t=today();if(ST.day.d!==t)ST.day={d:t,n:0};
  const before=ST.day.n;ST.day.n+=total;
  if(ST.streak.last!==t){ST.streak.n=ST.streak.last===yest()?ST.streak.n+1:1;ST.streak.last=t}
  if(before<ST.goal&&ST.day.n>=ST.goal){toast("Target harian tercapai. Mantap!");sfx("win")}
  save();
}
function applyTheme(){const r=document.documentElement;if(ST.dark===true)r.setAttribute("data-theme","dark");else if(ST.dark===false)r.setAttribute("data-theme","light");else r.removeAttribute("data-theme")}
applyTheme();

/* ---------- data ---------- */
const W=[];
[1,2,3,4,5].forEach(lv=>V[lv].forEach((r,i)=>W.push({k:lv+"-"+i,lv:lv,en:r[0],m:r[1],pos:r[2],ex:r[3],xi:r[4],cat:r[5],f:r[6]||r[0]})));
const LK={};W.forEach(w=>{LK[w.en.toLowerCase()]=w;LK[w.f.toLowerCase()]=w});
function lookup(tok){
  tok=tok.toLowerCase();if(LK[tok])return LK[tok];
  const c=[tok.replace(/s$/,""),tok.replace(/es$/,""),tok.replace(/ed$/,""),tok.replace(/d$/,""),tok.replace(/ing$/,""),tok.replace(/ing$/,"e")];
  for(let i=0;i<c.length;i++)if(c[i]!==tok&&LK[c[i]])return LK[c[i]];
  return null;
}
const byLv=a=>ST.level?a.filter(x=>x.lv===ST.level):a.filter(x=>x.lv<=4);
const byLvS=a=>byLv(a).slice().sort((p,q)=>p.lv-q.lv);
const lvHead=(lv,n)=>'<div class="lvh l'+lv+'"><i></i>'+LVN[lv]+' <small>'+n+'</small></div>';
const badge=lv=>'<span class="badge l'+lv+'">'+(lv===5?'IELTS':'Level '+lv)+'</span>';
const bestBadge=k=>ST.best[k]!=null?'<span class="badge gold">Terbaik '+ST.best[k]+'%</span>':'';

/* ---------- suara + efek ---------- */
let VOICE=null,sayTok=0;
function pickVoice(){try{const vs=speechSynthesis.getVoices();VOICE=vs.find(v=>/^en[-_]US/i.test(v.lang))||vs.find(v=>/^en/i.test(v.lang))||null}catch(e){}}
if("speechSynthesis" in window){pickVoice();try{speechSynthesis.onvoiceschanged=pickVoice}catch(e){}}
function say(text,done,mul){
  if(!("speechSynthesis" in window)){toast("Perangkat ini tidak punya suara bawaan.");return}
  const tok=++sayTok;try{speechSynthesis.cancel()}catch(e){}
  const parts=(text.match(/[^.!?]+[.!?]*/g)||[text]).map(s=>s.trim()).filter(Boolean);
  let i=0;
  const next=()=>{
    if(tok!==sayTok)return;
    if(i>=parts.length){done&&done();return}
    const u=new SpeechSynthesisUtterance(parts[i++]);
    u.lang="en-US";if(VOICE)u.voice=VOICE;u.rate=Math.max(0.4,ST.rate*(mul||1));
    u.onend=next;u.onerror=next;
    speechSynthesis.speak(u);
  };
  setTimeout(next,60);
}
function stopSay(){sayTok++;try{speechSynthesis.cancel()}catch(e){}}
let AC=null;
function tone(f,t,d,type,v){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();const o=AC.createOscillator(),g=AC.createGain(),n=AC.currentTime+t;o.type=type||"sine";o.frequency.value=f;g.gain.setValueAtTime(0.0001,n);g.gain.exponentialRampToValueAtTime(v||0.11,n+0.01);g.gain.exponentialRampToValueAtTime(0.0001,n+d);o.connect(g);g.connect(AC.destination);o.start(n);o.stop(n+d+0.03)}catch(e){}}
function sfx(k){if(!ST.sound)return;if(k==="ok"){tone(660,0,.12);tone(880,.1,.18)}else if(k==="bad"){tone(190,0,.24,"triangle",.14)}else{[523,659,784,1047].forEach((f,i)=>tone(f,i*.11,.22))}}
function confetti(){
  const cols=["#F2B53A","#0B7A75","#C0412E","#3659B8","#2B8A57","#A8386E"];
  for(let i=0;i<46;i++){const d=document.createElement("i");d.className="conf";d.style.left=Math.random()*100+"vw";d.style.background=cols[i%cols.length];d.style.animationDelay=(Math.random()*.5)+"s";d.style.animationDuration=(1.5+Math.random()*1.2)+"s";document.body.appendChild(d);setTimeout(()=>d.remove(),3400)}
}

/* ---------- toast + sheet + popover ---------- */
let toastT=null;
function toast(m){const t=$("#toast");t.textContent=m;t.style.display="block";clearTimeout(toastT);toastT=setTimeout(()=>{t.style.display="none"},2400)}
function openSheet(html){$("#sheet").innerHTML=html;$("#sheet").classList.add("open");$("#shade").classList.add("open")}
function closeSheet(){$("#sheet").classList.remove("open");$("#shade").classList.remove("open")}
$("#shade").addEventListener("click",closeSheet);
let POP=null;
function closePop(){const p=$("#pop");if(p)p.remove();POP=null}
document.addEventListener("click",e=>{if(POP!==null&&!e.target.closest("#pop")&&!e.target.closest(".blank"))closePop()});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closePop();closeSheet()}});

/* ---------- router ---------- */
const VIEWS={};
let NAV=[{v:"home",p:{}}],pushed=0;
function go(v,p){
  stopSay();NAV.push({v:v,p:p||{}});
  try{history.pushState({n:NAV.length},"");pushed++}catch(e){}
  render();
}
function popNav(){if(NAV.length>1){stopSay();NAV.pop();render()}}
function back(){if(pushed>0){history.back()}else popNav()}
window.addEventListener("popstate",()=>{if(pushed>0)pushed--;popNav()});
function render(keepScroll){
  closePop();
  const c=NAV[NAV.length-1];const r=VIEWS[c.v](c.p||{});
  $("#title").textContent=r.title;$("#main").innerHTML=r.html;
  $("#back").hidden=NAV.length<2;
  $("#lvtxt").textContent=LVN[ST.level];$("#lvchip").firstElementChild.style.background=LVC[ST.level];
  if(!keepScroll)window.scrollTo(0,0);
  if(r.after)r.after();
}
const refresh=()=>render(true);
$("#back").addEventListener("click",back);
$("#lvchip").addEventListener("click",()=>{
  let h='<h2>Pilih level</h2><div class="stack">';
  [0,1,2,3,4,5].forEach(l=>{h+='<button class="item" data-act="setlv" data-v="'+l+'"><span style="width:12px;height:12px;border-radius:4px;background:'+LVC[l]+';flex:none"></span><div class="grow"><b>'+LVN[l]+'</b><span class="muted small">'+(l?LVD[l]:"Semua soal dicampur dari level 1 sampai 4. IELTS dipilih terpisah.")+'</span></div>'+(ST.level===l?'<span class="badge gold">Dipakai</span>':'')+'</button>'});
  openSheet(h+'</div>');
});

/* ---------- event delegation ---------- */
const acts={},inputs={};
function deleg(e){const t=e.target.closest("[data-act]");if(t&&acts[t.dataset.act])acts[t.dataset.act](t,e)}
$("#main").addEventListener("click",deleg);$("#sheet").addEventListener("click",deleg);
$("#main").addEventListener("input",e=>{const t=e.target.closest("[data-input]");if(t&&inputs[t.dataset.input])inputs[t.dataset.input](t,e)});
acts.setlv=t=>{ST.level=+t.dataset.v;VS.lv=ST.level;save();closeSheet();refresh()};
acts.say=t=>say(t.dataset.t);
acts.go=t=>go(t.dataset.v,t.dataset.p?JSON.parse(t.dataset.p):{});
acts.close=closeSheet;

/* ---------- beranda ---------- */
function lampOf(key){
  if(key==="vocab"){const L=byLv(W),k=L.filter(w=>ST.known[w.k]).length;return{s:k>=30?"ok":k>0?"on":"",t:k+" dari "+L.length+" kata dikuasai",p:k/L.length}}
  if(key==="saved"){const k=allSaved().length;return{s:k>=10?"ok":k>0?"on":"",t:k+" kata tersimpan",p:Math.min(1,k/20)}}
  if(key==="cap"){const sc=byLv(SCENES),k=sc.filter(x=>(ST.caps[x.id]||"").trim()).length;return{s:k>=6?"ok":k>0?"on":"",t:k+" dari "+sc.length+" gambar ditulis",p:k/sc.length}}
  const s=ST.stats[key]||{done:0,right:0};const p=s.done?Math.round(s.right/s.done*100):0;
  return{s:(s.done>=15&&p>=70)?"ok":s.done>0?"on":"",t:s.done?s.done+" soal, "+p+"% benar":"Belum mulai",p:Math.min(1,s.done/60)};
}
const TILES=[["vocab","Kosakata","Kuis pilih arti, per level, dan daftar kata"],["fill","Lengkapi kalimat","Pilih kata yang pas untuk bagian kosong"],["gram","Grammar","Materi ringkas dan latihan soal"],["read","Baca cerita","Cerita pendek dan soal pemahaman"],["cloze","Isi kotak","Paragraf rumpang, kosakata dan grammar"],["listen","Dengar","Kalimat, situasi, cerita, dan dikte"],["cap","Caption gambar","Tulis kalimat dari gambar"],["saved","Kata saya","Kata simpanan dan kata buatan sendiri"]];
VIEWS.home=function(){
  const n=todayN(),g=ST.goal,st=streakNow(),hit=n>=g;
  const known=Object.keys(ST.known).length;
  let h='<div class="hero2"><div class="strip" aria-hidden="true">'+TILES.map(t=>'<i class="'+lampOf(t[0]).s+'"></i>').join('')+'</div>';
  h+='<div class="hrow"><div class="ring">'+ringSvg(n/g,42,10)+'<div class="num"><b>'+Math.min(n,999)+'</b><span>dari '+g+'</span></div></div><div><h2>'+(hit?"Target tercapai":"Target hari ini")+'</h2><p>'+(hit?"Mantap. Lanjut santai atau tambah latihan.":"Tinggal "+(g-n)+" soal lagi.")+'</p><div class="pills"><span class="pill">'+ic("flame",15)+(st?st+" hari beruntun":"Mulai streak")+'</span><span class="pill">'+ic("check",15)+known+' kata hafal</span></div></div></div>';
  h+='<div class="hbtns"><button class="btn gold" data-act="daily">'+ic("bolt",18)+'Latihan harian (10 soal)</button><button class="btn glass" data-act="go" data-v="vocab">'+ic("vocab",18)+'Kartu kata</button></div></div>';
  h+='<div class="panel">';
  TILES.forEach(t=>{const l=lampOf(t[0]);h+='<button class="tile a-'+t[0]+' '+l.s+'" data-act="go" data-v="'+t[0]+'"><i class="lamp"></i><span class="ti">'+ic(t[0],22)+'</span><b>'+t[1]+'</b><span class="d">'+t[2]+'</span><span class="prog" style="margin-top:10px"><i style="width:'+Math.round(l.p*100)+'%"></i></span><span class="st">'+l.t+'</span></button>'});
  h+='</div><h3>Pengaturan</h3><div class="box stack"><div><div class="small muted">Target latihan per hari</div><div class="chips">'+[10,20,40].map(r=>'<button class="chip" data-act="goal" data-v="'+r+'" aria-pressed="'+(ST.goal===r)+'">'+r+' soal</button>').join('')+'</div></div>';
  h+='<div><div class="small muted">Kecepatan suara</div><div class="chips">'+[[0.75,"Pelan"],[0.9,"Normal"],[1.05,"Cepat"]].map(r=>'<button class="chip" data-act="rate" data-v="'+r[0]+'" aria-pressed="'+(ST.rate===r[0])+'">'+r[1]+'</button>').join('')+'<button class="chip" data-act="vtest">Tes suara</button></div></div>';
  h+='<div><div class="small muted">Tampilan</div><div class="chips">'+[[null,"Otomatis"],[false,"Terang"],[true,"Gelap"]].map(r=>'<button class="chip" data-act="theme" data-v="'+r[0]+'" aria-pressed="'+(ST.dark===r[0])+'">'+r[1]+'</button>').join('')+'</div></div>';
  h+='<div><div class="small muted">Efek bunyi saat menjawab</div><div class="chips"><button class="chip" data-act="sound" aria-pressed="'+ST.sound+'">'+(ST.sound?"Nyala":"Mati")+'</button></div></div>';
  h+='<div><button class="btn sm" data-act="reset">Reset semua progres</button></div></div>';
  h+='<p class="muted small" style="margin-top:14px">Suara memakai suara bahasa Inggris bawaan HP atau laptop. Kalau tidak keluar, pasang paket suara English di pengaturan Text-to-Speech. Progres tersimpan di browser perangkat ini saja.</p>';
  return{title:"Belajar Inggris",html:h};
};
acts.goal=t=>{ST.goal=+t.dataset.v;save();refresh()};
acts.sound=()=>{ST.sound=!ST.sound;save();refresh();sfx("ok")};
acts.rate=t=>{ST.rate=+t.dataset.v;save();refresh();say("Hello. This is the voice speed you chose.")};
acts.vtest=()=>{if(!VOICE&&"speechSynthesis" in window)toast("Belum ada suara English terdeteksi. Coba tekan lagi.");say("Hello. This is a voice test. Good morning, everyone.")};
acts.theme=t=>{const v=t.dataset.v;ST.dark=v==="null"?null:v==="true";save();applyTheme();refresh()};
acts.reset=()=>{openSheet('<h2>Reset progres?</h2><p class="muted">Semua kata hafal, kata simpanan, skor, rekor, streak, dan caption akan dihapus dari perangkat ini.</p><div class="row"><button class="btn" data-act="close">Batal</button><button class="btn primary" data-act="reset2">Ya, hapus</button></div>')};
acts.reset2=()=>{ST={level:ST.level,dark:ST.dark,rate:ST.rate,saved:[],custom:[],known:{},miss:{},stats:{},caps:{},goal:ST.goal,sound:ST.sound,best:{},day:{d:"",n:0},streak:{last:"",n:0}};save();closeSheet();NAV=[{v:"home",p:{}}];render();toast("Progres sudah dihapus.")};

/* ---------- mesin kuis ---------- */
let Q=null;
function prep(it){if(it.opts[0]==="True"&&it.opts[1]==="False")return Object.assign({},it);const o=it.opts.map((t,i)=>({t:t,c:i===it.a}));const s=shuffle(o);return Object.assign({},it,{opts:s.map(x=>x.t),a:s.findIndex(x=>x.c)})}
function startQuiz(o,replace){
  if(!o)return;
  Q=Object.assign({},o,{i:0,right:0,wrong:[],answered:false,pick:-1,played:-1,res:[],combo:0,maxCombo:0,fin:false,items:o.items.map(prep)});
  if(replace){NAV[NAV.length-1]={v:"quiz",p:{}};render()}else go("quiz");
}
VIEWS.quiz=function(){
  if(!Q)return{title:"Kuis",html:'<p>Tidak ada kuis aktif.</p>'};
  const n=Q.items.length;
  if(Q.i>=n)return{title:Q.title,html:resultHtml(),after:resultAfter};
  const it=Q.items[Q.i];
  let seg="";for(let i=0;i<n;i++){const r=Q.res[i];seg+='<i class="'+(r?r:(i===Q.i?"now":""))+'"></i>'}
  let h='<div class="seg">'+seg+'</div><div class="qmeta"><span class="muted small">Soal '+(Q.i+1)+' dari '+n+'</span>'+(Q.combo>=2?'<span class="combo">'+ic("flame",14)+Q.combo+' beruntun</span>':'')+'</div>';
  if(it.say)h+='<div class="row" style="margin-bottom:12px"><button class="btn primary" data-act="qplay">'+SPK+(it.label||"Putar audio")+'</button><button class="btn" data-act="qslow">Pelan</button></div>';
  h+='<div class="q">'+it.q+'</div>';
  if(it.sub)h+='<p class="hint">'+it.sub+'</p>';
  it.opts.forEach((o,i)=>{let c="opt";if(Q.answered){if(i===it.a)c+=" right";else if(i===Q.pick)c+=" wrong"}h+='<button class="'+c+'" data-act="qpick" data-i="'+i+'"'+(Q.answered?" disabled":"")+'><span class="lt">'+"ABCDEF".charAt(i)+'</span><span class="ot">'+esc(o)+'</span></button>'});
  if(Q.answered){const ok=Q.pick===it.a;h+='<div class="fb'+(ok?"":" bad")+'"><b class="t">'+(ok?"Benar":"Belum tepat")+'</b>'+(it.exp||"")+(it.full?' <button class="btn sm" data-act="say" data-t="'+esc(it.full)+'">'+SPK+'Dengar</button>':"")+'</div><div class="dock"><button class="btn primary wide" data-act="qnext">'+(Q.i+1<n?"Lanjut":"Lihat hasil")+'</button></div>'}
  return{title:Q.title,html:h,after:()=>{if(it.say&&it.auto!==false&&Q.played!==Q.i&&!Q.answered){Q.played=Q.i;setTimeout(()=>say(it.say),250)}if(Q.answered){const d=$(".dock");if(d)d.scrollIntoView({block:"nearest"})}}};
};
function resultHtml(){
  const n=Q.items.length,p=Math.round(Q.right/n*100);
  let h='<div class="rs"><div class="ring">'+ringSvg(p/100,42,10)+'<div class="num"><b>'+p+'%</b><span>'+Q.right+' dari '+n+'</span></div></div><div><h2>'+(p>=80?"Bagus sekali":p>=50?"Lumayan":"Perlu diulang")+'</h2><p class="muted" style="margin:0">'+(p>=80?"Kamu sudah cukup menguasai bagian ini.":p>=50?"Ulangi yang salah supaya makin kuat.":"Itu wajar. Coba ulangi yang salah, lalu main lagi.")+'</p></div></div>';
  h+='<div class="pills" style="margin-bottom:6px"><span class="badge">Benar '+Q.right+'</span><span class="badge">Salah '+Q.wrong.length+'</span><span class="badge">Beruntun terbaik '+Q.maxCombo+'</span>'+(Q.newBest?'<span class="badge gold">Rekor baru</span>':(Q.key&&Q.prevBest!=null?'<span class="badge gold">Rekor '+Q.prevBest+'%</span>':''))+'</div>';
  if(Q.wrong.length){h+='<h3>Yang masih salah</h3><div class="stack">';Q.wrong.forEach(w=>{h+='<div class="box"><div class="en">'+w.q+'</div><p class="small" style="margin:6px 0 0"><b>Jawaban:</b> '+esc(w.opts[w.a])+'</p></div>'});h+='</div>'}
  h+='<div class="row" style="margin-top:16px">'+(Q.wrong.length?'<button class="btn primary" data-act="qretry">Ulangi yang salah ('+Q.wrong.length+')</button>':'')+(Q.again?'<button class="btn'+(Q.wrong.length?'':' primary')+'" data-act="qagain">Main lagi</button>':'')+'<button class="btn" data-act="qdone">Selesai</button></div>';
  return h;
}
function resultAfter(){const p=Math.round(Q.right/Q.items.length*100);if(p>=80&&!Q.cf){Q.cf=1;confetti()}}
function finishQuiz(){
  const n=Q.items.length,p=Math.round(Q.right/n*100);Q.fin=true;
  if(Q.key){Q.prevBest=ST.best[Q.key];Q.newBest=Q.prevBest==null||p>Q.prevBest;if(Q.newBest)ST.best[Q.key]=p;save()}
  if(p>=80)sfx("win");
}
acts.qplay=()=>{const it=Q.items[Q.i];say(it.say)};
acts.qslow=()=>{const it=Q.items[Q.i];say(it.say,null,0.7)};
acts.qpick=t=>{
  if(Q.answered)return;const it=Q.items[Q.i],i=+t.dataset.i;
  Q.answered=true;Q.pick=i;stopSay();
  const ok=i===it.a;
  if(ok){Q.right++;Q.combo++;Q.maxCombo=Math.max(Q.maxCombo,Q.combo)}else{Q.wrong.push(it);Q.combo=0}
  Q.res[Q.i]=ok?"c":"w";sfx(ok?"ok":"bad");
  if(it.wk){const k=it.wk;if(ok){ST.known[k]=1;const m=ST.miss[k];if(m){m.r=(m.r||0)+1;if(m.r>=2)delete ST.miss[k]}}else{delete ST.known[k];const m=ST.miss[k]||(ST.miss[k]={n:0,r:0});m.n++;m.r=0}}
  const mn=it.menu||Q.menu;if(mn)bump(mn,ok?1:0,1);
  refresh();
};
acts.qnext=()=>{Q.i++;Q.answered=false;Q.pick=-1;if(Q.i>=Q.items.length)finishQuiz();refresh();window.scrollTo(0,0)};
acts.qretry=()=>startQuiz({menu:Q.menu,title:Q.title,items:Q.wrong},true);
acts.qagain=()=>startQuiz(Q.again(),true);
acts.qdone=()=>{stopSay();back()};
document.addEventListener("keydown",e=>{
  const c=NAV[NAV.length-1];if(c.v!=="quiz"||!Q||Q.i>=Q.items.length)return;
  if(e.target.closest&&e.target.closest("input,textarea"))return;
  const k=e.key.toLowerCase();
  if(!Q.answered){const i="1234".indexOf(k)>=0?"1234".indexOf(k):"abcd".indexOf(k);if(i>=0&&i<Q.items[Q.i].opts.length){const b=document.querySelector('.opt[data-i="'+i+'"]');if(b)b.click()}}
  else if(k==="enter"||k===" "){e.preventDefault();acts.qnext()}
});

/* ---------- kosakata ---------- */
const xiOf=w=>w.xi||(w.en+" = "+w.m);
let VS={tab:"quiz",lv:ST.level,cat:"all",dir:"en",n:10,only:false,q:""};
function isSaved(k){return ST.saved.indexOf(k)>=0}
function starBtn(k){return '<button class="icon sm'+(isSaved(k)?" on":"")+'" data-act="star" data-k="'+k+'" aria-label="Simpan kata">'+(isSaved(k)?"&#9733;":"&#9734;")+'</button>'}
function vpool(ignoreOnly){
  let a=W.filter(w=>VS.lv?w.lv===VS.lv:w.lv<=4);
  if(VS.cat!=="all")a=a.filter(w=>w.cat===VS.cat);
  if(VS.only&&!ignoreOnly)a=a.filter(w=>!ST.known[w.k]);
  return a;
}
const LVOPTS=[[0,"Level 1-4"],[1,"Level 1"],[2,"Level 2"],[3,"Level 3"],[4,"Level 4"],[5,"IELTS"]];
VIEWS.vocab=function(){
  let h='<div class="tabs">'+[["quiz","Kuis"],["list","Daftar kata"]].map(t=>'<button class="chip" data-act="vtab" data-v="'+t[0]+'" aria-pressed="'+(VS.tab===t[0])+'">'+t[1]+'</button>').join('')+'</div>';
  h+='<h3 style="margin:14px 0 6px">Level</h3><div class="chips">'+LVOPTS.map(t=>'<button class="chip" data-act="vlv" data-v="'+t[0]+'" aria-pressed="'+(VS.lv===t[0])+'">'+t[1]+'</button>').join('')+'</div>';
  h+='<h3 style="margin:14px 0 6px">Jenis kata</h3><div class="chips">'+[["all","Semua"],["k","Kerja"],["u","Umum"]].concat(VS.lv===5?[["a","Akademik"]]:[]).map(t=>'<button class="chip" data-act="vcat" data-v="'+t[0]+'" aria-pressed="'+(VS.cat===t[0])+'">'+t[1]+'</button>').join('')+'</div>';
  const all=vpool(true),kn=all.filter(w=>ST.known[w.k]).length,left=all.length-kn;
  if(VS.tab==="quiz"){
    h+='<h3 style="margin:14px 0 6px">Arah soal</h3><div class="chips">'+[["en","Inggris ke arti"],["id","Arti ke Inggris"],["mix","Campur"]].map(t=>'<button class="chip" data-act="vdir" data-v="'+t[0]+'" aria-pressed="'+(VS.dir===t[0])+'">'+t[1]+'</button>').join('')+'</div>';
    h+='<h3 style="margin:14px 0 6px">Jumlah soal</h3><div class="chips">'+[10,20,30,50].map(n=>'<button class="chip" data-act="vn" data-v="'+n+'" aria-pressed="'+(VS.n===n)+'">'+n+'</button>').join('')+'<button class="chip" data-act="vonly" aria-pressed="'+VS.only+'">Belum dikuasai saja</button></div>';
    h+='<div class="box" style="margin-top:16px"><div class="row sb"><b>'+all.length+' kata di pilihan ini</b><span class="muted small">'+kn+' sudah dikuasai</span></div><div class="meter" style="margin:8px 0 0"><i style="width:'+(all.length?kn/all.length*100:0)+'%"></i></div><p class="muted small" style="margin:8px 0 0">Jawab benar untuk menandai kata sebagai dikuasai. Jawab salah, dan tanda itu dicabut.</p></div>';
    const mp=missPool().length;
    h+='<div class="box" style="margin-top:12px"><div class="row sb"><b>'+mp+' kata pernah salah</b></div><p class="muted small" style="margin:6px 0 10px">Kata yang salah di kuis kosakata atau Lengkapi kalimat dicatat di sini. Jawab benar dua kali berturut-turut, dan kata itu keluar dari daftar.</p><button class="btn" data-act="vmiss"'+(mp?"":" disabled")+'>Kuis kata yang pernah salah</button></div>';
    const np=vpool().length;
    h+='<div class="dock"><button class="btn primary wide" data-act="vquiz"'+(np<4?" disabled":"")+'>'+(np<4?"Kata terlalu sedikit":"Mulai kuis "+Math.min(VS.n,np)+" soal")+'</button></div>';
  }else{
    h+='<div class="chips" style="margin-top:12px"><button class="chip" data-act="vmo" aria-pressed="'+!!VS.mo+'">Pernah salah saja ('+missPool().length+')</button></div><input class="txt" style="margin-top:12px" placeholder="Cari kata Inggris atau arti Indonesia" data-input="vsearch" value="'+esc(VS.q)+'" aria-label="Cari kata"><p class="muted small" id="vcount"></p><div id="vlist" class="stack" style="margin-top:8px">'+vlistHtml()+'</div>';
  }
  return{title:"Kosakata",html:h};
};
function vlistHtml(){
  let a=vpool(true);
  if(VS.mo)a=a.filter(w=>ST.miss[w.k]);
  const q=VS.q.trim().toLowerCase();if(q)a=a.filter(w=>w.en.toLowerCase().indexOf(q)>=0||w.m.toLowerCase().indexOf(q)>=0);
  if(!a.length)return '<p class="muted">Tidak ada kata yang cocok.</p>';
  const cut=a.slice(0,200);
  return cut.map(w=>'<div class="item"><div class="grow"><b class="en" style="font-size:1.1rem">'+esc(w.en)+' <span class="muted small" style="font-family:var(--sans);font-weight:400">'+esc(w.pos)+'</span> '+badge(w.lv)+(ST.miss[w.k]?' <span class="badge gold">Pernah salah</span>':ST.known[w.k]?' <span class="badge">Dikuasai</span>':'')+'</b><span>'+esc(w.m)+'</span><span class="small en muted" style="display:block">'+esc(w.ex)+'</span></div><button class="icon sm" data-act="say" data-t="'+esc(w.en)+'" aria-label="Dengar">'+ic("vol",16)+'</button>'+starBtn(w.k)+'</div>').join('')+(a.length>cut.length?'<p class="muted small">Menampilkan '+cut.length+' dari '+a.length+' kata. Pakai kolom cari atau persempit level.</p>':'');
}
inputs.vsearch=t=>{VS.q=t.value;$("#vlist").innerHTML=vlistHtml()};
acts.vtab=t=>{VS.tab=t.dataset.v;refresh()};
acts.vlv=t=>{VS.lv=+t.dataset.v;if(VS.lv!==5&&VS.cat==="a")VS.cat="all";refresh()};
acts.vcat=t=>{VS.cat=t.dataset.v;refresh()};
acts.vdir=t=>{VS.dir=t.dataset.v;refresh()};
acts.vn=t=>{VS.n=+t.dataset.v;refresh()};
acts.vonly=()=>{VS.only=!VS.only;refresh()};
acts.star=t=>{
  const k=t.dataset.k,i=ST.saved.indexOf(k);
  if(i>=0){ST.saved.splice(i,1);toast("Dihapus dari Kata saya")}else{ST.saved.push(k);toast("Disimpan ke Kata saya")}
  save();
  const on=isSaved(k);t.classList.toggle("on",on);t.innerHTML=on?"&#9733;":"&#9734;";
};
const sense=m=>m.split(";")[0].trim();
const norm=t=>t.toLowerCase().replace(/[^a-z ]/g,"");
const stemId=t=>norm(t.split(";")[0]).split(" ")[0].replace(/^(meng|meny|mem|men|me|ber|per|peng|peny|pem|pen|pe|ter|ke|di|se)/,"");
function dice(a,b){
  const bg=t=>{const r=[];for(let i=0;i<t.length-1;i++)r.push(t.substr(i,2));return r};
  const x=bg(a),y=bg(b);if(!x.length||!y.length)return 0;
  const m={};y.forEach(t=>m[t]=(m[t]||0)+1);let c=0;x.forEach(t=>{if(m[t]>0){c++;m[t]--}});
  return 2*c/(x.length+y.length);
}
const toks=t=>norm(t.replace(/;/g," ")).split(" ").filter(x=>x.length>=4);
W.forEach(w=>{w.cg=dice(norm(w.en),stemId(w.m))>=0.34});
function distract(w,toId){
  const my=toks(w.m);
  let c=W.filter(x=>x!==w&&x.m!==w.m&&x.en!==w.en&&Math.abs(x.lv-w.lv)<=2&&!toks(x.m).some(t=>my.indexOf(t)>=0));
  const same=c.filter(x=>x.pos===w.pos);if(same.length>=15)c=same;
  const ref=toId?norm(w.en):stemId(w.m);
  const sc=c.map(x=>({x:x,s:(x.cg===w.cg?0.6:0)+dice(ref,toId?stemId(x.m):norm(x.en))+Math.random()*0.25}));
  sc.sort((p,q)=>q.s-p.s);
  const seen={},out=[];seen[toId?sense(w.m):w.en]=1;
  for(let i=0;i<sc.length&&out.length<3;i++){const x=sc[i].x,k=toId?sense(x.m):x.en;if(seen[k])continue;seen[k]=1;out.push(x)}
  return out;
}
function vocabMeaningItems(n,pool,dir){
  pool=pool||byLv(W);if(!pool.length)return[];
  return sample(pool,n).map(w=>{
    const back=dir==="mix"?(Math.random()<0.5?"id":"en"):dir||"en";
    const exp='<b class="en">'+esc(w.en)+'</b> = '+esc(w.m)+'<br><span class="en">'+esc(w.ex)+'</span>';
    if(back==="id"){const d=distract(w,false);return{q:'Bahasa Inggrisnya <b>'+esc(w.m)+'</b>?',opts:[w.en].concat(d.map(x=>x.en)),a:0,exp:exp,full:w.ex,menu:"vocab",wk:w.k}}
    const d=distract(w,true);
    return{q:'Apa arti <span class="en">'+esc(w.en)+'</span>?',sub:'<span class="small">'+esc(w.pos)+' &middot; '+(w.lv===5?"IELTS":"Level "+w.lv)+'</span>',say:w.en,auto:false,label:"Dengar kata",opts:[sense(w.m)].concat(d.map(x=>sense(x.m))),a:0,exp:exp,full:w.ex,menu:"vocab",wk:w.k};
  });
}
function qVocab(){const items=vocabMeaningItems(VS.n,vpool(),VS.dir);if(items.length<1){toast("Pilih level atau jenis lain dulu.");return null}return{menu:"vocab",title:"Kuis kosakata",items:items,key:"vq"+VS.lv+VS.cat+VS.dir+VS.n,again:qVocab}}
function missPool(){return W.filter(w=>ST.miss[w.k])}
function qMiss(){const p=missPool();if(!p.length){toast("Belum ada kata yang pernah salah.");return null}return{menu:"vocab",title:"Kata yang pernah salah",items:vocabMeaningItems(Math.min(30,p.length),p,VS.dir==="mix"?"mix":VS.dir),again:qMiss}}
acts.vquiz=()=>startQuiz(qVocab());
acts.vmiss=()=>startQuiz(qMiss());
acts.vmo=()=>{VS.mo=!VS.mo;refresh()};

/* ---------- Kata saya ---------- */
function allSaved(){
  const a=ST.saved.map(k=>W.find(w=>w.k===k)).filter(Boolean).map(w=>({key:w.k,en:w.en,m:w.m,ex:w.ex,xi:w.xi,custom:false}));
  ST.custom.forEach((c,i)=>a.push({key:"c"+i,en:c.en,m:c.m,ex:c.ex||"",xi:"",custom:true,ci:i}));
  return a;
}
let SV={tab:"list",deck:[],i:0,flip:false};
VIEWS.saved=function(){
  const a=allSaved();
  let h='<div class="tabs">'+[["list","Daftar"],["cards","Kartu"],["add","Tambah"]].map(t=>'<button class="chip" data-act="stab" data-v="'+t[0]+'" aria-pressed="'+(SV.tab===t[0])+'">'+t[1]+'</button>').join('')+'<button class="chip" data-act="squiz">Kuis</button></div>';
  if(SV.tab==="add"){
    h+='<div class="box stack"><h2>Tambah kata sendiri</h2><input class="txt" id="cw" placeholder="Kata atau frasa Inggris" autocapitalize="off"><input class="txt" id="cm" placeholder="Artinya dalam bahasa Indonesia"><input class="txt" id="cx" placeholder="Contoh kalimat (boleh kosong)"><button class="btn primary" data-act="sadd">Simpan</button></div><p class="muted small" style="margin-top:10px">Kamu juga bisa menyimpan kata dari daftar kosakata dengan tombol bintang, atau mengetuk kata apa saja di cerita.</p>';
  }else if(!a.length){
    h+='<div class="box"><h2>Belum ada kata</h2><p class="muted">Ketuk bintang di menu Kosakata, atau ketuk kata di cerita, atau tambah kata sendiri lewat tab Tambah.</p></div>';
  }else if(SV.tab==="cards"){
    if(!SV.deck.length||SV.i>=SV.deck.length){SV.deck=shuffle(a);SV.i=0;SV.flip=false}
    const w=SV.deck[SV.i];
    h+='<p class="muted small">Kartu '+(SV.i+1)+' dari '+SV.deck.length+'</p><div class="fc" data-act="sflip" role="button" tabindex="0"><div class="big">'+esc(w.en)+'</div>'+(SV.flip?'<div class="mean">'+esc(w.m)+'</div>'+(w.ex?'<div class="exs">'+esc(w.ex)+'</div>':''):'<div class="muted small">Ketuk kartu untuk lihat arti</div>')+'</div><div class="row" style="margin-top:12px;justify-content:center"><button class="icon" data-act="say" data-t="'+esc(w.en)+'" aria-label="Dengar">'+SPK+'</button><button class="btn" data-act="snext">Kartu berikutnya</button></div>';
  }else{
    h+='<div class="stack">'+a.map(w=>'<div class="item"><div class="grow"><b class="en" style="font-size:1.1rem">'+esc(w.en)+'</b><span>'+esc(w.m)+'</span>'+(w.ex?'<span class="small en muted" style="display:block">'+esc(w.ex)+'</span>':'')+'</div><button class="icon sm" data-act="say" data-t="'+esc(w.en)+'" aria-label="Dengar">'+ic("vol",16)+'</button><button class="btn sm" data-act="sdel" data-k="'+w.key+'">Hapus</button></div>').join('')+'</div>';
  }
  return{title:"Kata saya",html:h};
};
acts.stab=t=>{SV.tab=t.dataset.v;SV.deck=[];refresh()};
acts.sflip=()=>{SV.flip=!SV.flip;refresh()};
acts.snext=()=>{SV.i++;SV.flip=false;refresh()};
acts.sadd=()=>{
  const en=$("#cw").value.trim(),m=$("#cm").value.trim(),ex=$("#cx").value.trim();
  if(!en||!m){toast("Isi kata dan artinya dulu.");return}
  ST.custom.push({en:en,m:m,ex:ex});save();SV.tab="list";toast("Kata disimpan");refresh();
};
acts.sdel=t=>{
  const k=t.dataset.k;
  if(k.charAt(0)==="c"){ST.custom.splice(+k.slice(1),1)}else{const i=ST.saved.indexOf(k);if(i>=0)ST.saved.splice(i,1)}
  save();SV.deck=[];refresh();
};
function qSaved(){
  const a=allSaved();if(a.length<2){toast("Simpan minimal 2 kata dulu.");return null}
  const items=shuffle(a).slice(0,10).map(w=>{
    const others=a.filter(x=>x.key!==w.key&&x.m!==w.m).map(x=>x.m);
    const fill=W.filter(x=>x.m!==w.m&&others.indexOf(x.m)<0).map(x=>x.m);
    const d=others.concat(shuffle(fill)).slice(0,3);
    return{q:'Apa arti <span class="en">'+esc(w.en)+'</span>?',opts:[w.m].concat(d),a:0,exp:w.ex?'<span class="en">'+esc(w.ex)+'</span>':'',full:w.ex||""};
  });
  return{menu:"saved",title:"Kuis kata saya",items:items,again:qSaved};
}
acts.squiz=()=>startQuiz(qSaved());
function openLookup(raw){
  const w=lookup(raw);
  let h='<div class="row sb"><div class="sheet-w">'+esc(raw)+'</div><button class="icon" data-act="say" data-t="'+esc(raw)+'" aria-label="Dengar">'+SPK+'</button></div>';
  if(w){
    h+='<p><b>'+esc(w.en)+'</b> ('+esc(w.pos)+'): '+esc(w.m)+'</p><p class="en muted small">'+esc(w.ex)+''+(w.xi?'<br><span style="font-family:var(--sans)">'+esc(w.xi)+'</span>':'')+'</p><div class="row"><button class="btn primary" data-act="lksave" data-k="'+w.k+'">'+(isSaved(w.k)?"Sudah tersimpan":"Simpan ke Kata saya")+'</button><button class="btn" data-act="close">Tutup</button></div>';
  }else{
    h+='<p class="muted small">Kata ini belum ada di kamus app. Kalau mau, tulis artinya lalu simpan.</p><input class="txt" id="lkm" placeholder="Arti dalam bahasa Indonesia"><div class="row" style="margin-top:10px"><button class="btn primary" data-act="lkadd" data-w="'+esc(raw)+'">Simpan</button><button class="btn" data-act="close">Tutup</button></div>';
  }
  openSheet(h);
}
acts.word=t=>openLookup(t.dataset.w);
acts.lksave=t=>{const k=t.dataset.k;if(!isSaved(k)){ST.saved.push(k);save()}closeSheet();toast("Disimpan ke Kata saya")};
acts.lkadd=t=>{const m=$("#lkm").value.trim();if(!m){toast("Tulis artinya dulu.");return}ST.custom.push({en:t.dataset.w.toLowerCase(),m:m,ex:""});save();closeSheet();toast("Disimpan ke Kata saya")};
function wrapWords(text){
  const one=t=>t.split(/([A-Za-z']+)/).map((s,i)=>{
    if(i%2===0)return esc(s);
    const k=lookup(s.replace(/'.*$/,""))?" k":"";
    return '<span class="w'+k+'" data-act="word" data-w="'+esc(s.replace(/'.*$/,""))+'">'+esc(s)+'</span>';
  }).join("");
  const ps=text.split(/\n\n+/);
  return ps.length>1?ps.map(x=>'<p>'+one(x)+'</p>').join(""):one(text);
}

/* ---------- lengkapi kalimat ---------- */
const FS={src:"vocab",n:10,tr:true};
VIEWS.fill=function(){
  let h='<div class="box stack"><h2>Lengkapi kalimat</h2><p class="muted">Pilih kata yang tepat untuk bagian kosong. Terjemahan Indonesia muncul sebagai petunjuk.</p>';
  h+='<div><div class="small muted">Sumber soal</div><div class="chips">'+[["vocab","Kosakata"],["gram","Grammar"],["mix","Campur"]].map(t=>'<button class="chip" data-act="fsrc" data-v="'+t[0]+'" aria-pressed="'+(FS.src===t[0])+'">'+t[1]+'</button>').join('')+'</div></div>';
  h+='<div><div class="small muted">Jumlah soal</div><div class="chips">'+[10,20,30].map(n=>'<button class="chip" data-act="fn" data-v="'+n+'" aria-pressed="'+(FS.n===n)+'">'+n+'</button>').join('')+'</div></div>';
  h+='<div><div class="small muted">Petunjuk terjemahan</div><div class="chips"><button class="chip" data-act="ftr" aria-pressed="'+FS.tr+'">'+(FS.tr?"Tampil":"Sembunyi (lebih sulit)")+'</button></div></div>';
  h+='<p class="small muted">Level aktif: '+LVN[ST.level]+'. Ganti lewat tombol di pojok kanan atas.</p><button class="btn primary" data-act="fgo">Mulai</button></div>';
  return{title:"Lengkapi kalimat",html:h};
};
acts.fsrc=t=>{FS.src=t.dataset.v;refresh()};
acts.fn=t=>{FS.n=+t.dataset.v;refresh()};
acts.ftr=()=>{FS.tr=!FS.tr;refresh()};
function cls(s){s=s.toLowerCase();if(/ed$/.test(s))return"ed";if(/ing$/.test(s))return"ing";if(/s$/.test(s)&&!/ss$/.test(s))return"s";return"b"}
function vocabFillItem(w){
  const re=new RegExp("\\b"+w.f.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\b","i");
  const m=w.ex.match(re);if(!m)return null;
  const atStart=w.ex.search(re)===0;
  const same=W.filter(x=>x!==w&&x.lv===w.lv);
  let c=same.filter(x=>x.pos===w.pos&&cls(x.f)===cls(w.f)&&x.f.toLowerCase()!==w.f.toLowerCase());
  if(c.length<3)c=c.concat(same.filter(x=>x.pos===w.pos&&c.indexOf(x)<0));
  if(c.length<3)c=c.concat(same.filter(x=>c.indexOf(x)<0));
  const fm=s=>atStart?cap1(s):low1(s);
  const ans=fm(m[0]);
  const opts=[ans].concat(sample(c,3).map(x=>fm(x.f)));
  return{q:'<span class="en">'+esc(w.ex.replace(re,"_____"))+'</span>',sub:FS.tr?esc("Arti "+w.en+": "+w.m):"",opts:opts,a:0,exp:'<span class="en">'+esc(w.ex)+'</span><br>'+esc(w.en)+' = '+esc(w.m),full:w.ex,wk:w.k};
}
function gramItem(g,x){
  const full=x[0].replace("___",x[1][x[2]]);
  return{q:'<span class="en">'+esc(x[0]).replace("___","<b>_____</b>")+'</span>',opts:x[1],a:x[2],exp:'<span class="en">'+esc(full)+'</span><br>Materi: '+esc(g.title),full:full};
}
function gramPool(){const a=[];byLv(G).forEach(g=>g.latihan.forEach(x=>a.push(gramItem(g,x))));return a}
function qFill(){
  let items=[];
  if(FS.src==="vocab"||FS.src==="mix"){const n=FS.src==="mix"?Math.ceil(FS.n/2):FS.n;const pool=shuffle(byLv(W));for(let i=0;i<pool.length&&items.length<n;i++){const it=vocabFillItem(pool[i]);if(it)items.push(it)}}
  if(FS.src==="gram"||FS.src==="mix"){const n=FS.src==="mix"?FS.n-items.length:FS.n;items=items.concat(sample(gramPool(),n))}
  if(!items.length){toast("Tidak ada soal untuk level ini.");return null}
  return{menu:"fill",title:"Lengkapi kalimat",items:shuffle(items),key:"fill-"+FS.src+FS.n+"-"+ST.level,again:qFill};
}
acts.fgo=()=>startQuiz(qFill());

/* ---------- latihan harian ---------- */
function listenSentItems(n){
  const pool=byLv(W);if(pool.length<4)return[];
  return sample(pool,n).map(w=>{
    const len=w.ex.length;
    const others=W.filter(x=>x!==w&&x.lv===w.lv).sort((a,b)=>Math.abs(a.ex.length-len)-Math.abs(b.ex.length-len)).slice(0,10);
    const d=sample(others,3).map(x=>x.ex);
    return{q:"Kalimat mana yang kamu dengar?",opts:[w.ex].concat(d),a:0,say:w.ex,label:"Putar kalimat",exp:'<span class="en">'+esc(w.ex)+'</span><br>'+esc(xiOf(w)),menu:"listen"};
  });
}
function qDaily(){
  const items=[];let c=0;
  const pool=shuffle(byLv(W));
  for(let i=0;i<pool.length&&c<3;i++){const it=vocabFillItem(pool[i]);if(it){it.menu="fill";items.push(it);c++}}
  sample(gramPool(),3).forEach(it=>{it.menu="gram";items.push(it)});
  vocabMeaningItems(2).forEach(it=>items.push(it));
  listenSentItems(2).forEach(it=>{it.auto=false;items.push(it)});
  if(!items.length){toast("Tidak ada soal untuk level ini.");return null}
  return{menu:"fill",title:"Latihan harian",items:shuffle(items),again:qDaily};
}
acts.daily=()=>startQuiz(qDaily());

/* ---------- grammar ---------- */
VIEWS.gram=function(){
  let h='<p class="muted">Baca materi singkatnya, lalu kerjakan latihannya. Atau langsung latihan campur.</p><div class="row" style="margin-bottom:12px"><button class="btn primary" data-act="gmix">'+ic("bolt",18)+'Latihan campur (12 soal)</button></div><div class="stack">';
  const list=byLvS(G);let cur=0;
  if(!list.length)h+='<p class="muted">Belum ada materi.</p>';
  list.forEach(g=>{if(g.lv!==cur){cur=g.lv;h+=lvHead(cur,list.filter(z=>z.lv===cur).length+' topik')}h+='<button class="item a-gram" data-act="go" data-v="lesson" data-p=\'{"id":"'+g.id+'"}\'><div class="grow"><b>'+esc(g.title)+'</b><span class="muted small">'+esc(g.ringkas.split(". ")[0])+'. '+g.latihan.length+' soal latihan.</span></div><span class="row" style="gap:4px;justify-content:flex-end">'+bestBadge("g-"+g.id)+badge(g.lv)+'</span></button>'});
  return{title:"Grammar",html:h+'</div>'};
};
function qGMix(){const p=gramPool();if(!p.length){toast("Tidak ada soal.");return null}return{menu:"gram",title:"Latihan grammar campur",items:sample(p,12),key:"gmix"+ST.level,again:qGMix}}
acts.gmix=()=>startQuiz(qGMix());
VIEWS.lesson=function(p){
  const g=G.find(x=>x.id===p.id);
  let h='<div class="row sb"><h2>'+esc(g.title)+'</h2>'+badge(g.lv)+'</div><p>'+esc(g.ringkas)+'</p><div class="box"><b>Rumus</b><ul class="formula">'+g.rumus.map(r=>'<li>'+esc(r)+'</li>').join('')+'</ul></div><h3>Contoh</h3>';
  g.contoh.forEach(c=>{h+='<div class="ex"><div class="row sb"><span class="en">'+esc(c[0])+'</span><button class="icon sm" data-act="say" data-t="'+esc(c[0].split("→").pop().trim())+'" aria-label="Dengar">'+ic("vol",16)+'</button></div><div class="muted small">'+esc(c[1])+'</div></div>'});
  const n=Math.min(10,g.latihan.length);
  h+='<div class="tip"><b>Perhatikan:</b> '+esc(g.tips)+'</div><div class="row" style="margin-top:16px"><button class="btn primary" data-act="glatih" data-id="'+g.id+'">Latihan '+n+' soal</button>'+bestBadge("g-"+g.id)+'</div>';
  return{title:g.title,html:h};
};
function qLesson(id){const g=G.find(x=>x.id===id);return{menu:"gram",title:"Latihan: "+g.title,items:sample(g.latihan,10).map(x=>gramItem(g,x)),key:"g-"+id,again:()=>qLesson(id)}}
acts.glatih=t=>startQuiz(qLesson(t.dataset.id));

/* ---------- baca cerita ---------- */
VIEWS.read=function(){
  const list=byLvS(S);
  let h='<p class="muted">Ketuk kata apa saja di dalam cerita untuk melihat arti dan menyimpannya. Kata bergaris titik sudah ada di kamus app.</p><div class="stack">';
  list.forEach(s=>{h+='<button class="item a-read" data-act="go" data-v="story" data-p=\'{"id":"'+s.id+'"}\'><div class="grow"><b>'+esc(s.title)+'</b><span class="muted small">'+s.text.split(/\s+/).length+' kata, '+s.q.length+' soal</span></div><span class="row" style="gap:4px;justify-content:flex-end">'+bestBadge("s-"+s.id)+badge(s.lv)+'</span></button>'});
  return{title:"Baca cerita",html:h+'</div>'};
};
VIEWS.story=function(p){
  const s=S.find(x=>x.id===p.id);
  let h='<div class="row sb"><h2>'+esc(s.title)+'</h2>'+badge(s.lv)+'</div><div class="row" style="margin:8px 0 14px"><button class="btn" data-act="sread" data-id="'+s.id+'">'+SPK+'Dengarkan</button><button class="btn" data-act="sstop">Berhenti</button></div><div class="read">'+wrapWords(s.text)+'</div><div class="row" style="margin-top:18px"><button class="btn primary" data-act="sq" data-id="'+s.id+'">Soal pemahaman ('+s.q.length+')</button><button class="btn" data-act="go" data-v="lstory" data-p=\'{"id":"'+s.id+'"}\'>Coba mode dengar</button></div>';
  return{title:s.title,html:h};
};
acts.sread=t=>say(S.find(x=>x.id===t.dataset.id).text);
acts.sstop=stopSay;
function storyItems(s,hear){
  return s.q.map((x,i)=>({q:'<span class="en">'+esc(x[0])+'</span>',opts:x[1],a:x[2],exp:hear?'Cerita: <i class="en">'+esc(s.title)+'</i>. Baca teks lengkapnya di menu Baca cerita.':(x[1][0]==="True"?'True = sesuai teks. False = bertentangan dengan teks. Not given = tidak disebut di teks.':'Jawabannya ada di teks.'),say:hear?s.text:null,label:"Dengar cerita",auto:hear&&i===0}));
}
acts.sq=t=>{const s=S.find(x=>x.id===t.dataset.id);startQuiz({menu:"read",title:"Soal: "+s.title,items:storyItems(s,false),key:"s-"+s.id})};

/* ---------- isi kotak ---------- */
const CS={c:null,parts:[],blanks:[],fill:[],bank:[],active:0,checked:false,hard:false,filter:"all"};
VIEWS.cloze=function(){
  let h='<p class="muted">Lengkapi paragraf yang rumpang. Seri <b>Kosakata</b> mengambil kata dari bank. Seri <b>Grammar</b> menguji bentuk kata yang tepat, jadi kamu perlu paham tenses, artikel, dan kata penghubung.</p><div class="chips">'+[["all","Semua"],["v","Kosakata"],["g","Grammar"]].map(t=>'<button class="chip" data-act="czf" data-v="'+t[0]+'" aria-pressed="'+(CS.filter===t[0])+'">'+t[1]+'</button>').join('')+'</div><div class="stack">';
  const list=byLvS(C).filter(c=>CS.filter==="all"||c.t===CS.filter);
  if(!list.length)h+='<p class="muted">Belum ada paragraf untuk filter ini.</p>';
  list.forEach(c=>{h+='<button class="item a-cloze" data-act="czopen" data-id="'+c.id+'"><div class="grow"><b>'+esc(c.title)+'</b><span class="muted small"><span class="kind '+c.t+'">'+(c.t==="g"?"Grammar":"Kosakata")+'</span> &nbsp;'+(c.text.match(/\{/g)||[]).length+' kotak kosong</span></div><span class="row" style="gap:4px;justify-content:flex-end">'+bestBadge("cz-"+c.id)+badge(c.lv)+'</span></button>'});
  return{title:"Isi kotak",html:h+'</div>'};
};
acts.czf=t=>{CS.filter=t.dataset.v;refresh()};
function czSetup(c){
  CS.c=c;CS.parts=[];CS.blanks=[];
  c.text.split(/(\{[^}]+\})/).forEach(s=>{
    if(s.charAt(0)==="{"){const a=s.slice(1,-1).split("|");CS.parts.push({b:CS.blanks.length});CS.blanks.push({ans:a[0],ch:a.length>1?shuffle(a):null})}
    else if(s)CS.parts.push({t:s});
  });
  czFresh();
}
function czFresh(){
  CS.fill=CS.blanks.map(()=>"");CS.checked=false;
  CS.bank=shuffle(CS.blanks.filter(b=>!b.ch).map(b=>b.ans).concat(CS.c.x||[]));
  CS.active=Math.max(0,CS.blanks.findIndex(b=>!b.ch));
}
const czOk=i=>CS.fill[i].trim().toLowerCase()===CS.blanks[i].ans.toLowerCase();
acts.czopen=t=>{closePop();czSetup(C.find(x=>x.id===t.dataset.id));go("czplay")};
VIEWS.czplay=function(){
  const gram=CS.c.t==="g";
  let h='<div class="row sb"><span class="kind '+CS.c.t+'">'+(gram?"Grammar":"Kosakata")+'</span><button class="chip" data-act="czmode" aria-pressed="'+CS.hard+'">'+(CS.hard?"Mode ketik":(gram?"Mode pilih":"Pilih dari bank"))+'</button></div>';
  h+='<h2 style="margin-top:10px">'+esc(CS.c.title)+'</h2><p class="hint" style="margin-top:0">'+(CS.hard?"Ketik jawaban di tiap kotak. Bentuk kata harus tepat.":(gram?"Ketuk kotak, lalu pilih bentuk yang paling tepat.":"Ketuk kata di bank untuk mengisi kotak."))+'</p><div class="cloze">';
  CS.parts.forEach(p=>{
    if(p.b===undefined){h+=esc(p.t);return}
    const i=p.b,b=CS.blanks[i];
    const c="blank"+(b.ch?" g":"")+(!CS.checked&&CS.active===i?" active":"")+(CS.checked?(czOk(i)?" right":" wrong"):"");
    if(CS.hard)h+='<input class="'+c+'" data-input="czin" data-i="'+i+'" value="'+esc(CS.fill[i])+'"'+(CS.checked?" disabled":"")+' autocapitalize="off" autocomplete="off" spellcheck="false" aria-label="Kotak '+(i+1)+'">';
    else h+='<button class="'+c+'" data-act="czblank" data-i="'+i+'" aria-label="Kotak '+(i+1)+'"'+(CS.checked?" disabled":"")+'>'+(CS.fill[i]?esc(CS.fill[i]):(b.ch?"pilih &#9662;":"&nbsp;"))+'</button>';
  });
  h+='</div>';
  if(!CS.hard&&!CS.checked&&CS.bank.length){h+='<div class="bank">'+CS.bank.map(w=>'<button class="chip" data-act="czword" data-w="'+esc(w)+'"'+(CS.fill.indexOf(w)>=0?" disabled":"")+'>'+esc(w)+'</button>').join('')+'</div>'}
  if(CS.checked){
    const r=CS.blanks.filter((b,i)=>czOk(i)).length,n=CS.blanks.length;
    const fixed=CS.parts.map(p=>p.b===undefined?esc(p.t):'<b class="cr">'+esc(CS.blanks[p.b].ans)+'</b>').join('');
    h+='<div class="fb'+(r===n?"":" bad")+'"><b class="t">Skor '+r+' dari '+n+'</b>'+(r===n?"Semua benar.":"Kotak merah salah. Teks yang benar ada di bawah.")+'</div>';
    h+='<div class="box"><div class="small muted" style="margin-bottom:6px">Teks yang benar</div><div class="read" style="font-size:1.05rem;line-height:1.8">'+fixed+'</div></div>';
    h+='<div class="dock"><div class="row" style="flex-wrap:nowrap"><button class="btn" data-act="czhear">'+SPK+'Dengar</button><button class="btn" data-act="czretry">Coba lagi</button><button class="btn primary" style="flex:1" data-act="czdone">Selesai</button></div></div>';
  }else{
    const full=CS.fill.every(x=>x.trim());
    h+='<div class="dock"><div class="row" style="flex-wrap:nowrap"><button class="btn primary" style="flex:1" data-act="czcheck"'+(full?"":" disabled")+'>Cek jawaban ('+CS.fill.filter(x=>x.trim()).length+'/'+CS.blanks.length+')</button><button class="btn" data-act="czreset">Kosongkan</button></div></div>';
  }
  return{title:"Isi kotak",html:h};
};
acts.czmode=()=>{CS.hard=!CS.hard;czFresh();refresh()};
function openPop(t,i){
  closePop();POP=i;CS.active=i;
  document.querySelectorAll(".blank.active").forEach(x=>x.classList.remove("active"));t.classList.add("active");
  const el=document.createElement("div");el.id="pop";el.className="pop";el.setAttribute("role","listbox");
  el.innerHTML=CS.blanks[i].ch.map(c=>'<button role="option" data-act="czpick" data-i="'+i+'" data-w="'+esc(c)+'" class="'+(CS.fill[i]===c?"sel":"")+'">'+esc(c)+'</button>').join('');
  el.addEventListener("click",deleg);
  document.body.appendChild(el);
  const r=t.getBoundingClientRect(),pw=el.offsetWidth,ph=el.offsetHeight;
  const left=Math.max(8,Math.min(window.innerWidth-pw-8,r.left+r.width/2-pw/2));
  let top=r.bottom+6;if(top+ph>window.innerHeight-8)top=Math.max(8,r.top-ph-6);
  el.style.left=(left+window.scrollX)+"px";el.style.top=(top+window.scrollY)+"px";
}
acts.czblank=t=>{
  if(CS.checked)return;
  const i=+t.dataset.i,b=CS.blanks[i];
  if(b.ch){if(POP===i){closePop();return}openPop(t,i);return}
  if(CS.fill[i])CS.fill[i]="";CS.active=i;refresh();
};
acts.czpick=t=>{const i=+t.dataset.i;CS.fill[i]=t.dataset.w;closePop();refresh()};
acts.czword=t=>{
  const empty=CS.blanks.map((b,i)=>(!b.ch&&CS.fill[i]==="")?i:-1).filter(i=>i>=0);
  if(!empty.length)return;
  const i=(!CS.blanks[CS.active].ch&&CS.fill[CS.active]==="")?CS.active:empty[0];
  CS.fill[i]=t.dataset.w;const nx=CS.blanks.map((b,k)=>(!b.ch&&CS.fill[k]==="")?k:-1).filter(k=>k>=0);CS.active=nx.length?nx[0]:i;refresh();
};
inputs.czin=t=>{CS.fill[+t.dataset.i]=t.value;const b=$('[data-act="czcheck"]');if(b){b.disabled=!CS.fill.every(x=>x.trim());b.textContent="Cek jawaban ("+CS.fill.filter(x=>x.trim()).length+"/"+CS.blanks.length+")"}};
acts.czreset=()=>{CS.fill=CS.blanks.map(()=>"");CS.active=Math.max(0,CS.blanks.findIndex(b=>!b.ch));refresh()};
acts.czretry=()=>{if(CS.c.t==="g")CS.blanks.forEach(b=>{if(b.ch)b.ch=shuffle(b.ch)});czFresh();refresh();window.scrollTo(0,0)};
acts.czcheck=()=>{
  CS.checked=true;closePop();
  const n=CS.blanks.length,r=CS.blanks.filter((b,i)=>czOk(i)).length;
  const p=Math.round(r/n*100),k="cz-"+CS.c.id;
  if(ST.best[k]==null||p>ST.best[k]){ST.best[k]=p}
  sfx(r===n?"win":(r>=n/2?"ok":"bad"));
  bump("cloze",r,n);refresh();
  if(r===n)confetti();
};
acts.czhear=()=>say(CS.c.text.replace(/\{([^}|]+)(\|[^}]*)?\}/g,"$1"));
acts.czdone=()=>{stopSay();back()};

/* ---------- dengar ---------- */
VIEWS.listen=function(){
  const M=[["lsent","Pilih kalimat","Dengar satu kalimat, pilih tulisannya yang benar."],["lsit","Situasi","Dengar instruksi atau pengumuman, jawab pertanyaannya."],["lstories","Cerita","Dengar cerita tanpa teks, jawab soalnya."],["ldict","Dikte","Dengar, lalu ketik kalimatnya."]];
  let h='<p class="muted">Pakai headphone atau speaker. Tombol Pelan memutar ulang dengan kecepatan lebih lambat.</p><div class="stack">';
  M.forEach(m=>{h+='<button class="item a-listen" data-act="'+m[0]+'"><span class="ti">'+ic("listen",20)+'</span><div class="grow"><b>'+m[1]+'</b><span class="muted small">'+m[2]+'</span></div>'+(m[0]==="lsent"||m[0]==="lsit"?bestBadge(m[0]+ST.level):"")+'</button>'});
  return{title:"Dengar",html:h+'</div><p class="muted small" style="margin-top:12px">Level aktif: '+LVN[ST.level]+'.</p>'};
};
function qLsent(){const items=listenSentItems(10);if(!items.length){toast("Pilih level lain dulu.");return null}return{menu:"listen",title:"Dengar: pilih kalimat",items:items,key:"lsent"+ST.level,again:qLsent}}
function qLsit(){
  const pool=byLv(L);if(!pool.length){toast("Tidak ada soal.");return null}
  const items=sample(pool,Math.min(10,pool.length)).map(x=>({q:esc(x.q),opts:x.o,a:x.a,say:x.s,label:"Putar audio",exp:'Teks: <span class="en">'+esc(x.s)+'</span>'}));
  return{menu:"listen",title:"Dengar: situasi",items:items,key:"lsit"+ST.level,again:qLsit};
}
acts.lsent=()=>startQuiz(qLsent());
acts.lsit=()=>startQuiz(qLsit());
acts.lstories=()=>go("lstory",{});
VIEWS.lstory=function(p){
  if(p.id){const s=S.find(x=>x.id===p.id);return{title:"Dengar cerita",html:'<h2>'+esc(s.title)+'</h2><p class="muted">Cerita akan diputar tanpa teks. Kamu bisa memutarnya ulang saat menjawab.</p><div class="row"><button class="btn primary" data-act="lsgo" data-id="'+s.id+'">Mulai</button></div>'}}
  let h='<p class="muted">Pilih cerita. Teksnya disembunyikan sampai kamu selesai.</p><div class="stack">';
  byLvS(S).forEach(s=>{h+='<button class="item a-listen" data-act="lsgo" data-id="'+s.id+'"><div class="grow"><b>'+esc(s.title)+'</b><span class="muted small">'+s.q.length+' soal</span></div><span class="row" style="gap:4px;justify-content:flex-end">'+bestBadge("ls-"+s.id)+badge(s.lv)+'</span></button>'});
  return{title:"Dengar cerita",html:h+'</div>'};
};
acts.lsgo=t=>{const s=S.find(x=>x.id===t.dataset.id);startQuiz({menu:"listen",title:"Dengar: "+s.title,items:storyItems(s,true),key:"ls-"+s.id})};
/* dikte */
let DS=null;
function normW(s){return s.toLowerCase().replace(/[^a-z0-9']/g,"")}
function diffWords(ref,usr){
  const n=ref.length,m=usr.length,dp=[];
  for(let i=0;i<=n;i++)dp.push(new Array(m+1).fill(0));
  for(let i=n-1;i>=0;i--)for(let j=m-1;j>=0;j--)dp[i][j]=ref[i]===usr[j]?dp[i+1][j+1]+1:Math.max(dp[i+1][j],dp[i][j+1]);
  const okR=new Array(n).fill(false),okU=new Array(m).fill(false);let i=0,j=0;
  while(i<n&&j<m){if(ref[i]===usr[j]){okR[i]=okU[j]=true;i++;j++}else if(dp[i+1][j]>=dp[i][j+1])i++;else j++}
  return{okR:okR,okU:okU,score:n?dp[0][0]/n:0};
}
acts.ldict=()=>{
  const pool=byLv(W).filter(w=>{const n=w.ex.split(/\s+/).length;return n>=4&&n<=(ST.level===5?18:12)});
  if(!pool.length){toast("Tidak ada kalimat untuk level ini.");return}
  DS={items:sample(pool,8),i:0,res:null,pass:0};go("dict");
};
VIEWS.dict=function(){
  if(!DS)return{title:"Dikte",html:"<p>Tidak ada sesi.</p>"};
  const n=DS.items.length;
  if(DS.i>=n)return{title:"Dikte",html:'<div class="rs"><div class="ring">'+ringSvg(DS.pass/n,42,10)+'<div class="num"><b>'+DS.pass+'</b><span>dari '+n+'</span></div></div><p class="muted" style="margin:0">Kalimat dengan akurasi minimal 80% dihitung benar.</p></div><div class="row"><button class="btn primary" data-act="ldict2">Dikte baru</button><button class="btn" data-act="qdone">Selesai</button></div>'};
  const w=DS.items[DS.i];
  let h='<div class="meter"><i style="width:'+(DS.i/n*100)+'%"></i></div><p class="muted small">Kalimat '+(DS.i+1)+' dari '+n+'</p><div class="row" style="margin-bottom:12px"><button class="btn primary" data-act="dplay">'+SPK+'Putar</button><button class="btn" data-act="dslow">Pelan</button></div>';
  if(!DS.res){h+='<input class="txt" id="dtxt" placeholder="Ketik yang kamu dengar" autocapitalize="off" autocomplete="off" spellcheck="false" aria-label="Jawaban dikte"><div class="row" style="margin-top:10px"><button class="btn primary" data-act="dcheck">Cek</button></div>'}
  else{
    const r=DS.res,toks=w.ex.split(/\s+/);
    h+='<div class="box"><div class="small muted">Kalimat yang benar</div><div>'+toks.map((t,i)=>'<span class="dw '+(r.okR[i]?"ok":"miss")+'">'+esc(t)+'</span>').join(' ')+'</div>';
    const extra=r.ut.filter((t,i)=>!r.okU[i]);
    if(extra.length)h+='<div class="small muted" style="margin-top:8px">Kata dari kamu yang tidak cocok:</div><div>'+extra.map(t=>'<span class="dw extra">'+esc(t)+'</span>').join(' ')+'</div>';
    h+='<p class="small" style="margin:10px 0 0">Akurasi '+Math.round(r.score*100)+'%. Artinya: '+esc(xiOf(w))+'</p></div><div class="dock"><button class="btn primary wide" data-act="dnext">'+(DS.i+1<n?"Lanjut":"Lihat hasil")+'</button></div>';
  }
  return{title:"Dikte",html:h,after:()=>{if(!DS.res&&DS.played!==DS.i){DS.played=DS.i;setTimeout(()=>say(w.ex),250)}}};
};
acts.dplay=()=>say(DS.items[DS.i].ex);
acts.dslow=()=>say(DS.items[DS.i].ex,null,0.7);
acts.dcheck=()=>{
  const w=DS.items[DS.i],val=$("#dtxt").value.trim();
  if(!val){toast("Ketik dulu yang kamu dengar.");return}
  const ut=val.split(/\s+/),d=diffWords(w.ex.split(/\s+/).map(normW),ut.map(normW));
  d.ut=ut;DS.res=d;const ok=d.score>=0.8;if(ok)DS.pass++;sfx(ok?"ok":"bad");bump("listen",ok?1:0,1);refresh();
};
acts.dnext=()=>{DS.i++;DS.res=null;refresh();window.scrollTo(0,0)};
acts.ldict2=()=>{NAV.pop();acts.ldict()};

/* ---------- caption gambar ---------- */
VIEWS.cap=function(){
  let h='<p class="muted">Lihat gambar, lalu tulis caption dalam bahasa Inggris (pilih level IELTS untuk latihan deskripsi grafik). App mengecek hal-hal yang bisa dicek otomatis. Untuk koreksi lengkap, salin tulisanmu ke Claude.</p><div class="grid2">';
  byLv(SCENES).forEach(s=>{h+='<div class="scene" data-act="capopen" data-id="'+s.id+'" role="button" tabindex="0">'+s.svg()+'<div class="cp"><b>'+esc(s.title)+'</b><br>'+badge(s.lv)+((ST.caps[s.id]||"").trim()?' <span class="badge gold">Sudah ditulis</span>':'')+'</div></div>'});
  return{title:"Caption gambar",html:h+'</div>'};
};
let CP={s:null,res:null,showModel:false};
acts.capopen=t=>{CP={s:SCENES.find(x=>x.id===t.dataset.id),res:null,showModel:false};go("scene")};
VIEWS.scene=function(){
  const s=CP.s;
  let h='<div class="row sb" style="margin-bottom:8px"><h2>'+esc(s.title)+'</h2>'+badge(s.lv)+'</div><div class="scene">'+s.svg()+'</div><p style="margin-top:10px">'+esc(s.hint)+' Target: minimal '+s.need+' kalimat.</p>';
  h+='<div class="small muted">Kata bantu (boleh dipakai, boleh tidak)</div><div class="chips">'+s.keys.map(k=>'<span class="badge">'+esc(k.n)+'</span>').join('')+'</div>';
  h+='<textarea class="cap" id="captxt" data-input="captxt" placeholder="Tulis captionmu di sini..." autocapitalize="sentences" spellcheck="false" aria-label="Caption">'+esc(ST.caps[s.id]||"")+'</textarea>';
  h+='<div class="row" style="margin-top:10px"><button class="btn primary" data-act="capcheck">Cek caption</button><button class="btn" data-act="capmodel">'+(CP.showModel?"Sembunyikan contoh":"Lihat contoh caption")+'</button></div>';
  if(CP.res)h+=CP.res;
  if(CP.showModel)h+='<h3>Contoh caption</h3><div class="stack">'+s.model.map(m=>'<div class="box en"><div class="row sb"><span>'+esc(m)+'</span><button class="icon sm" data-act="say" data-t="'+esc(m)+'" aria-label="Dengar">'+ic("vol",16)+'</button></div></div>').join('')+'</div><p class="muted small">Contoh hanyalah salah satu cara. Caption yang berbeda tetap bisa benar.</p>';
  h+='<div class="row" style="margin-top:16px"><button class="btn" data-act="capnext">Gambar lain</button></div>';
  return{title:"Caption gambar",html:h};
};
inputs.captxt=t=>{ST.caps[CP.s.id]=t.value;save()};
acts.capmodel=()=>{const v=$("#captxt").value;ST.caps[CP.s.id]=v;save();CP.showModel=!CP.showModel;refresh();$("#captxt").value=v};
acts.capnext=()=>{const pool=SCENES.filter(x=>(!ST.level||x.lv===ST.level)&&x.id!==CP.s.id);if(!pool.length){toast("Tidak ada gambar lain di level ini.");return}CP={s:sample(pool,1)[0],res:null,showModel:false};refresh();window.scrollTo(0,0)};
function checkCaption(s,t){
  const out=[],text=t.trim();
  const sents=(text.match(/[^.!?]+[.!?]*/g)||[]).map(x=>x.trim()).filter(x=>/[A-Za-z]/.test(x));
  const words=(text.toLowerCase().match(/[a-z']+/g)||[]);const wset={};words.forEach(w=>{wset[w]=1});
  out.push({k:sents.length>=s.need?"y":"n",t:'Jumlah kalimat: '+sents.length+' (target '+s.need+' atau lebih).'});
  const short=sents.filter(x=>(x.match(/[A-Za-z']+/g)||[]).length<s.minw);
  out.push({k:short.length?"n":"y",t:short.length?'Ada kalimat yang kurang dari '+s.minw+' kata. Tambah detail: siapa, sedang apa, di mana.':'Panjang tiap kalimat cukup.'});
  const hit=[],miss=[];s.keys.forEach(k=>{(k.g.some(g=>wset[g])?hit:miss).push(k.n)});
  const need=Math.min(s.keys.length,s.lv<=2?2:3);
  out.push({k:hit.length>=need?"y":"n",t:'Isi gambar tersebut: '+hit.length+' dari '+s.keys.length+' hal terpakai.'+(miss.length?' Belum disebut: '+miss.join("; ")+'.':'')});
  const nocap=sents.filter(x=>!/^["“]?[A-Z]/.test(x));
  out.push({k:nocap.length?"n":"y",t:nocap.length?'Awali setiap kalimat dengan huruf kapital (cek: "'+nocap[0].slice(0,26)+'").':'Setiap kalimat diawali huruf kapital.'});
  out.push({k:/[.!?]["”]?$/.test(text)?"y":"n",t:/[.!?]["”]?$/.test(text)?'Diakhiri tanda baca.':'Akhiri dengan titik atau tanda baca lain.'});
  const core=out.every(x=>x.k==="y");
  const tips=[];
  const NA=/^(university|uniform|useful|user|unit|european|one|usual)/i,AH=/^(hour|honest|honor|heir)/i;
  let m,re=/\b(a|an)\s+([A-Za-z]+)/gi;
  while((m=re.exec(text))){const a=m[1].toLowerCase(),nx=m[2];const vow=/^[aeiou]/i.test(nx);
    if(a==="a"&&vow&&!NA.test(nx))tips.push('Cek "a '+nx+'": sebelum bunyi vokal biasanya pakai "an".');
    if(a==="an"&&!vow&&!AH.test(nx))tips.push('Cek "an '+nx+'": sebelum bunyi konsonan biasanya pakai "a".')}
  if(/(^|[\s"(])i(\s|[.,!?])/.test(text))tips.push('Kata "I" (saya) selalu ditulis huruf besar.');
  const dup=text.match(/\b([A-Za-z]+)\s+\1\b/i);if(dup)tips.push('Ada kata yang terulang: "'+dup[0]+'".');
  tips.slice(0,3).forEach(x=>out.push({k:"t",t:x}));
  let h='<h3>Hasil cek otomatis</h3><div class="box"><ul class="chk">'+out.map(o=>'<li><span class="m '+o.k+'">'+(o.k==="y"?"&#10003;":o.k==="n"?"&#33;":"?")+'</span><span>'+esc(o.t)+'</span></li>').join('')+'</ul></div>';
  h+='<div class="fb'+(core?"":" bad")+'" style="margin-top:10px"><b class="t">'+(core?"Lolos cek otomatis":"Perbaiki dulu poin yang bertanda seru")+'</b>App tidak bisa menilai grammar lengkap, ketepatan kata, atau apakah kalimatmu terdengar natural.</div>';
  h+='<div class="row"><button class="btn primary" data-act="capcopy">Salin untuk dikoreksi Claude</button></div><p class="muted small" style="margin-top:6px">Tempel ke chat dengan Claude. Deskripsi gambar ikut disalin supaya Claude tahu gambarnya.</p>';
  return{html:h,core:core};
}
acts.capcheck=()=>{
  const v=$("#captxt").value;ST.caps[CP.s.id]=v;save();
  if(!v.trim()){toast("Tulis captionmu dulu.");return}
  const r=checkCaption(CP.s,v);CP.res=r.html;bump("cap",r.core?1:0,1);refresh();
  setTimeout(()=>{$("#captxt").value=ST.caps[CP.s.id]},0);
};
acts.capcopy=()=>{
  const s=CP.s,txt="Tolong koreksi "+(s.lv===5?"tulisan IELTS Writing Task 1 saya":"caption bahasa Inggris saya (level "+s.lv+")")+".\nGambarnya: "+s.desc+"\n\nCaption saya:\n"+($("#captxt").value||"").trim()+"\n\nMohon beri: (1) koreksi grammar, (2) versi yang lebih natural, (3) penjelasan singkat dalam bahasa Indonesia.";
  const ok=()=>toast("Sudah disalin. Tempel ke chat dengan Claude.");
  const fb=()=>{const ta=document.createElement("textarea");ta.value=txt;ta.style.position="fixed";ta.style.opacity="0";document.body.appendChild(ta);ta.select();try{document.execCommand("copy");ok()}catch(e){toast("Gagal menyalin. Salin manual dari kotak caption.")}document.body.removeChild(ta)};
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(txt).then(ok,fb);else fb();
};

/* ---------- start ---------- */
render();
window.__app={W:W,S:S,G:G,C:C,L:L,SCENES:SCENES,vocabFillItem:vocabFillItem,vocabMeaningItems:vocabMeaningItems,checkCaption:checkCaption,diffWords:diffWords,lookup:lookup,cz:()=>CS,ST:()=>ST,Q:()=>Q};
})();
