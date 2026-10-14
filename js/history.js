/* ---- Tarix ---- */
function renderHist(){const a=S.history;$("hist-empty").hidden=a.length>0;$("btn-hclear").hidden=!a.length;
 $("hist").innerHTML=a.map((h,i)=>`<li><div><b>${nf.format(+h.total)} ${esc(h.cur)}</b> jami · ${nf.format(+h.per)} kishiga<small>${esc(h.t)} · ${+h.v.days} kun, ${+h.v.people} kishi</small></div><button class="btn small ghost" data-h="${i}">Yuklash</button></li>`).join("")}
$("hist").addEventListener("click",e=>{const b=e.target.closest("[data-h]");if(!b)return;const h=S.history[+b.dataset.h];if(!h)return;fill(h.v,h.s,h.e);go("calc");flash("Yuklandi. «Hisoblash» ni bosing")});
$("btn-hclear").onclick=()=>{S.history=[];persist();renderHist()};

