/* ---- Yuk ro'yxati ---- */
const PRESET=["Pasport va hujjatlar","Pul va bank kartasi","Telefon va zaryadlovchi","Kiyim-kechak","Dori-darmonlar","Suv va yengil taom","Gigiyena buyumlari","Soyabon yoki yomg'irlik"];
function renderPack(){const a=S.pack,dn=a.filter(x=>x.d).length;$("p-empty").hidden=a.length>0;$("p-box").hidden=!a.length;if(!a.length)return;
 $("p-cnt").textContent=`${dn} / ${a.length} tayyor`;$("p-bar").style.width=(dn/a.length*100)+"%";
 $("p-list").innerHTML=a.map(x=>`<li><label class="chk${x.d?" done":""}"><input type="checkbox" data-pk="${x.id}"${x.d?" checked":""}><span>${esc(x.t)}</span></label><button class="btn small ghost" data-pd="${x.id}" aria-label="O'chirish">${ic("x")}</button></li>`).join("")}
$("pform").addEventListener("submit",e=>{e.preventDefault();const t=$("p-in").value.trim();if(!t)return;S.pack.push({id:Date.now(),t,d:false});$("p-in").value="";persist();renderPack()});
$("p-preset").onclick=()=>{PRESET.forEach((t,i)=>{if(!S.pack.some(x=>x.t===t))S.pack.push({id:Date.now()+i,t,d:false})});persist();renderPack()};
$("p-clean").onclick=()=>{S.pack=S.pack.filter(x=>!x.d);persist();renderPack()};
$("p-list").addEventListener("click",e=>{const d=e.target.closest("[data-pd]");if(d){S.pack=S.pack.filter(x=>String(x.id)!==d.dataset.pd);persist();renderPack()}});
$("p-list").addEventListener("change",e=>{const c=e.target.closest("[data-pk]");if(!c)return;const x=S.pack.find(y=>String(y.id)===c.dataset.pk);if(x){x.d=c.checked;persist();renderPack()}});

