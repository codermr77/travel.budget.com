/* Ko'rinish: tungi / kunduzgi va telefon rejimi */
const PK="safar-prefs",rootEl=document.documentElement;
let PR={};try{PR=JSON.parse(localStorage.getItem(PK))||{}}catch(e){}
function savePrefs(){try{localStorage.setItem(PK,JSON.stringify(PR))}catch(e){}}
function applyPrefs(){
 const t=rootEl.dataset.theme==="light"?"light":"dark",ph=rootEl.classList.contains("phone");
 const m=document.querySelector('meta[name="theme-color"]');if(m)m.content=t==="light"?"#eaf4fb":"#0b1f3a";
 const bt=$("b-theme"),bv=$("b-view"),a=t==="light"?"Tungi rejimga o'tish":"Kunduzgi rejimga o'tish",b=ph?"Kompyuter ko'rinishiga o'tish":"Telefon rejimiga o'tish";
 bt.innerHTML=ic(t==="light"?"moon":"sun");bt.title=a;bt.setAttribute("aria-label",a);
 bv.innerHTML=ic(ph?"monitor":"phone");bv.title=b;bv.setAttribute("aria-label",b);
 document.querySelectorAll("[data-theme-set]").forEach(x=>x.classList.toggle("on",x.dataset.themeSet===t));
 document.querySelectorAll("[data-view-set]").forEach(x=>x.classList.toggle("on",x.dataset.viewSet===(ph?"phone":"auto")))}
function setTheme(t){rootEl.dataset.theme=t;PR.theme=t;savePrefs();applyPrefs()}
function setView(v){rootEl.classList.toggle("phone",v==="phone");PR.view=v;savePrefs();applyPrefs()}
$("b-theme").onclick=()=>setTheme(rootEl.dataset.theme==="light"?"dark":"light");
$("b-view").onclick=()=>setView(rootEl.classList.contains("phone")?"auto":"phone");
document.addEventListener("click",e=>{const a=e.target.closest("[data-theme-set]"),b=e.target.closest("[data-view-set]");if(a)setTheme(a.dataset.themeSet);if(b)setView(b.dataset.viewSet)});
applyPrefs();
