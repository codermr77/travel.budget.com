/* ---- Kalkulyator ---- */
const calc=v=>{const food=v.foodPerDay*v.days*v.people,total=v.transport+v.lodging+food;return{food,total,per:total/v.people,perDay:total/v.days}};
function durDates(){const s=$("d-start").value,e=$("d-end").value,h=$("d-hint");
 if(s&&e){const n=Math.round((new Date(e)-new Date(s))/864e5)+1;
  if(n<1){h.textContent="Tugash sanasi boshlanish sanasidan oldin bo'lishi mumkin emas.";h.className="note";return false}
  $("days").value=n;h.textContent=`Muddat: ${n} kun (${fd(s)} – ${fd(e)}). Kunlar soni avtomatik qo'yildi.`;h.className="muted"}
 else{h.textContent="Ikkala sanani tanlasangiz, kunlar soni avtomatik hisoblanadi.";h.className="muted"}return true}
$("d-start").onchange=$("d-end").onchange=durDates;
function read(){const R={transport:["Transport summasi",0],lodging:["Tunash summasi",0],foodPerDay:["Kunlik ovqat summasi",0],days:["Kunlar soni",1],people:["Odamlar soni",1]},v={},errs=[];
 if(!durDates())errs.push("Safar muddati noto'g'ri");
 ids.forEach(id=>{const el=$(id),raw=el.value.trim(),n=Number(raw),[nm,w]=R[id];el.classList.remove("bad");
  if(raw===""||!isFinite(n)||n<w||(w&&!Number.isInteger(n))){errs.push(nm+(w?" kamida 1 bo'lgan butun son bo'lishi kerak":" 0 yoki undan katta son bo'lishi kerak"));el.classList.add("bad")}else v[id]=n});
 return{v,errs}}
function animate(el,to){if(matchMedia("(prefers-reduced-motion: reduce)").matches){el.textContent=money(to);return}
 const t0=performance.now();(function s(t){const p=Math.min(1,(t-t0)/600);el.textContent=money(to*p);if(p<1)requestAnimationFrame(s);else el.textContent=money(to)})(t0)}
function drawChart(vals,total){const R=70,C=2*Math.PI*R;let s=`<circle cx="100" cy="100" r="${R}" fill="none" style="stroke:var(--track)" stroke-width="34"/>`,off=0;
 if(total>0)Object.keys(vals).forEach(k=>{const l=vals[k]/total*C;s+=`<circle cx="100" cy="100" r="${R}" fill="none" stroke="${PARTS[k][1]}" stroke-width="34" stroke-dasharray="${l} ${C-l}" stroke-dashoffset="${-off}" transform="rotate(-90 100 100)"/>`;off+=l});
 s+=`<text x="100" y="98" text-anchor="middle" font-size="12" style="fill:var(--muted)">Jami</text><text x="100" y="120" text-anchor="middle" font-size="20" font-weight="700" style="fill:var(--text)">${nf.format(total)}</text>`;
 $("donut").innerHTML=s;
 $("legend").innerHTML=Object.keys(vals).map(k=>`<li><i class="sw" style="background:${PARTS[k][1]}"></i><span>${PARTS[k][0]}</span><b>${money(vals[k])} (${(total>0?vals[k]/total*100:0).toFixed(0)}%)</b></li>`).join("")}
function drawCompare(v){const fx=v.transport+v.lodging,b=v.foodPerDay*v.days,L=[1,2,3,4,5,6,7,8];if(v.people>8)L.push(v.people);
 const rows=L.map(p=>({p,t:fx+b*p,per:fx/p+b})),top=rows[0].per||1;
 $("cmp").innerHTML=rows.map(r=>`<tr class="${r.p===v.people?"cur":""}"><td>${r.p}</td><td>${money(r.t)}</td><td><div class="bar"><i style="width:${r.per/top*100}%"></i><span>${money(r.per)}</span></div></td></tr>`).join("")}
function showResults(l){const{v,r}=l;$("res-empty").hidden=true;$("out").hidden=false;
 animate($("r-transport"),v.transport);animate($("r-lodging"),v.lodging);animate($("r-food"),r.food);animate($("r-total"),r.total);animate($("r-per"),r.per);animate($("r-day"),r.perDay);
 $("r-ff").textContent=`(${nf.format(v.foodPerDay)} × ${v.days} × ${v.people})`;
 $("r-dur-l").hidden=false;$("r-dur").textContent=l.s&&l.e?`${fd(l.s)} – ${fd(l.e)} (${v.days} kun)`:`${v.days} kun`;
 const lm=$("limit-msg");if(l.limit){const d=l.limit-r.total;lm.hidden=false;lm.innerHTML=ic(d>=0?"check":"alert")+(d>=0?`Byudjet chegarasi ichida: ${money(d)} qoldi.`:`Byudjet chegarasidan ${money(-d)} oshib ketdi.`)}else lm.hidden=true;
 drawChart({transport:v.transport,lodging:v.lodging,food:r.food},r.total);drawCompare(v);
 $("out").classList.remove("show");void $("out").offsetWidth;$("out").classList.add("show")}
function fill(v,s,e){ids.forEach(i=>{$(i).value=v[i];$(i).classList.remove("bad")});$("d-start").value=s||"";$("d-end").value=e||"";if(!(s&&e))durDates();$("error").hidden=true}
$("form").addEventListener("submit",ev=>{ev.preventDefault();const{v,errs}=read(),box=$("error");
 if(errs.length){box.innerHTML=errs.map(x=>"• "+esc(x)).join("<br>");box.hidden=false;$("out").hidden=true;$("res-empty").hidden=false;return}
 box.hidden=true;cur=$("currency").value;const raw=$("limit").value.trim(),s=$("d-start").value,e=$("d-end").value;
 calcRes={v,r:calc(v),limit:raw!==""&&isFinite(+raw)&&+raw>0?+raw:null,cur,s,e};showResults(calcRes);
 S.last={v,total:calcRes.r.total,per:calcRes.r.per,cur,s,e};S.history.unshift({t:new Date().toLocaleString("uz-UZ"),...S.last});S.history=S.history.slice(0,10);persist()});
$("btn-example").onclick=()=>{fill(EX);flash("Misol yuklandi. «Hisoblash» ni bosing")};
$("btn-clear").onclick=()=>{$("form").reset();ids.forEach(i=>$(i).classList.remove("bad"));durDates();$("error").hidden=true;$("out").hidden=true;$("res-empty").hidden=false};
$("btn-copy").onclick=async()=>{if(!calcRes)return;const{v,r}=calcRes;
 try{await navigator.clipboard.writeText(`Safar byudjeti\nMuddat: ${v.days} kun\nTransport: ${money(v.transport)}\nTunash: ${money(v.lodging)}\nOvqat: ${money(r.food)}\nJami: ${money(r.total)}\nKishiga: ${money(r.per)}`);flash("Nusxa olindi")}catch(e){flash("Nusxa olib bo'lmadi")}};
$("btn-adv").onclick=()=>{go("ai");ask("Mening safar byudjetim bo'yicha maslahat ber.")};

