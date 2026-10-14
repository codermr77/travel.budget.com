const ids=["transport","lodging","foodPerDay","days","people"],$=i=>document.getElementById(i);
const EX={transport:100,lodging:200,foodPerDay:50,days:2,people:2};
const PARTS={transport:["Transport","#7fd1ea"],lodging:["Tunash","#ff8a4c"],food:["Ovqat","#ffc857"]};
const TITLES={home:"Bosh sahifa",calc:"Kalkulyator",map:"Xarita",exp:"Xarajatlarim",ai:"AI maslahatchi",pack:"Yuk ro'yxati",trips:"Safarlarim",hist:"Tarix",acc:"Hisob",faq:"Savollar"};
const IC={moon:'<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',phone:'<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',monitor:'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',home:'<path d="M3 11 12 3l9 8M5 10v10h14V10M10 20v-6h4v6"/>',plane:'<path d="M17.8 19.2 16 11l3.5-3.5a2.1 2.1 0 0 0-3-3L13 8 4.8 6.2 3.4 7.6l6.3 3.5-3.2 3.2-2.6-.4-1 1 3.6 1.8 1.8 3.6 1-1-.4-2.6 3.2-3.2 3.5 6.3z"/>',calc:'<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h.01M16 19h.01"/>',map:'<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',wallet:'<path d="M3 7a2 2 0 0 1 2-2h13v4"/><path d="M3 7v10a2 2 0 0 0 2 2h15V9H5a2 2 0 0 1-2-2z"/><path d="M16 14h.01"/>',bot:'<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 8V5M9 13h.01M15 13h.01M9 17h6"/><circle cx="12" cy="4" r="1"/>',list:'<path d="m4 6 2 2 3-3M4 14l2 2 3-3M12 7h8M12 15h8"/>',bookmark:'<path d="M6 3h12v18l-6-4-6 4z"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',back:'<path d="M19 12H5M11 6l-6 6 6 6"/>',car:'<path d="M5 17H3v-5l2-5h12l2 5v5h-2M5 17a2 2 0 1 0 4 0M15 17a2 2 0 1 0 4 0M9 17h6M3 12h18"/>',bus:'<rect x="4" y="3" width="16" height="14" rx="2"/><path d="M4 11h16M8 17v3M16 17v3M8 14h.01M16 14h.01"/>',train:'<rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 11h14M8 21l2-4M16 21l-2-4M9 14h.01M15 14h.01"/>',bike:'<circle cx="6" cy="17" r="3.5"/><circle cx="18" cy="17" r="3.5"/><path d="m6 17 4-8h5l3 8M10 9 8 6H6M12 13h5"/>',walk:'<circle cx="13" cy="4" r="2"/><path d="m9 21 2-7-3-3 3-4 3 2 3 1M11 14l4 2 1 5"/>',nav:'<path d="m3 11 19-9-9 19-2-8z"/>',trash:'<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',plus:'<path d="M12 5v14M5 12h14"/>',check:'<path d="m5 12 5 5 9-10"/>',x:'<path d="M6 6l12 12M18 6 6 18"/>',trend:'<path d="m3 17 6-6 4 4 8-8M15 7h6v6"/>',locate:'<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>',ext:'<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',copy:'<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h8"/>',send:'<path d="m22 2-11 11M22 2l-7 20-4-9-9-4z"/>',alert:'<path d="M12 3 2 21h20zM12 10v5M12 18h.01"/>'};
const ic=(n,s)=>`<svg class="i" viewBox="0 0 24 24"${s?` width="${s}" height="${s}"`:""} fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[n]||""}</svg>`;
document.querySelectorAll("[data-i]").forEach(e=>e.innerHTML=ic(e.dataset.i));
const nf=new Intl.NumberFormat("uz-UZ",{maximumFractionDigits:2});
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fd=s=>s.split("-").reverse().join("."),p2=n=>String(n).padStart(2,"0");
const fdt=d=>`${p2(d.getDate())}.${p2(d.getMonth()+1)}.${d.getFullYear()} ${p2(d.getHours())}:${p2(d.getMinutes())}`;
let S={profile:null,expenses:[],history:[],last:null,trips:[],pack:[]},cur="so'm",doc=null,online=false,calcRes=null,chat=[],busy=false;
const money=n=>nf.format(n)+" "+cur,LS="safar-v3";
let tt;function flash(t){const e=$("toast");e.textContent=t;e.classList.add("on");clearTimeout(tt);tt=setTimeout(()=>e.classList.remove("on"),2200)}
function armed(btn,fn,txt){let t;btn.addEventListener("click",()=>{if(btn.dataset.a){clearTimeout(t);delete btn.dataset.a;btn.innerHTML=btn._h;fn();return}btn._h=btn.innerHTML;btn.dataset.a=1;btn.textContent=txt||"Aniq? Yana bosing";t=setTimeout(()=>{delete btn.dataset.a;btn.innerHTML=btn._h},3500)})}

/* ---- Saqlash ---- */
const dump=()=>({profile:S.profile,expenses:S.expenses,history:S.history,last:S.last,trips:S.trips,pack:S.pack});
function persist(){const d=dump();try{localStorage.setItem(LS,JSON.stringify(d))}catch(e){}if(doc)doc.set(d).catch(()=>flash("Hisobga saqlab bo'lmadi"))}
function adopt(d){if(!d)return;const a=x=>Array.isArray(x)?x:[];S.profile=d.profile||null;S.expenses=a(d.expenses);S.history=a(d.history);S.last=d.last||null;S.trips=a(d.trips);S.pack=a(d.pack)}
try{adopt(JSON.parse(localStorage.getItem(LS)))}catch(e){}
(async()=>{try{if(!window.claude)return;
 const u=await claude.use("user"),db=await claude.use("db");if(!u||!db)return;
 const id=await u.id();if(!id)return;
 doc=db.doc("data/users/"+id+"/app");const s=await doc.get();
 if(s.exists)adopt(s.data());else persist();
 online=true;refreshAll()}catch(e){}})();

