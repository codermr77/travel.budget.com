/* ---- Sahifalar ---- */
function go(v){document.querySelectorAll(".view").forEach(x=>x.hidden=x.id!=="v-"+v);document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("on",t.dataset.go===v));scrollTo(0,0);
 if(v==="exp")renderExp();if(v==="hist")renderHist();if(v==="pack")renderPack();if(v==="trips")renderTrips();if(v==="acc")renderAcc()}
document.addEventListener("click",e=>{const b=e.target.closest("[data-go]");if(b)go(b.dataset.go)});
function refreshAll(){const p=S.profile;$("acc-name").textContent=p?p.name:"Hisob ochish";$("hello").textContent=p?`Salom, ${p.name}!`:"Xush kelibsiz!";$("acc-banner").hidden=!!p;
 $("status").textContent=online?"Ma'lumotlar hisobingizda saqlanadi":"Ma'lumotlar brauzerda saqlanadi";
 for(const v of["exp","hist","pack","trips","acc"])if(!$("v-"+v).hidden)go(v)}

