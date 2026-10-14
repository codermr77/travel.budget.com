/* ---- Xarajatlar ---- */
function renderExp(){const E=S.expenses,has=E.length>0;$("e-empty").hidden=has;$("e-box").hidden=!has;if(!has)return;
 const sum=E.reduce((a,x)=>a+x.amount,0),mx=E.reduce((a,x)=>x.amount>a.amount?x:a),mn=E.reduce((a,x)=>x.amount<a.amount?x:a),byCat={};E.forEach(x=>byCat[x.cat]=(byCat[x.cat]||0)+x.amount);
 const topCat=Object.keys(byCat).sort((a,b)=>byCat[b]-byCat[a])[0],sc=(i,l,v,h)=>`<div class="stat ${h||""}"><small>${i?ic(i):""}${l}</small><b>${v}</b></div>`;
 let st=sc("","Jami sarflangan",nf.format(sum))+sc("","Xarajatlar soni",E.length)+sc("","O'rtacha",nf.format(sum/E.length))+sc("trend","Eng qimmat",esc(mx.name)+" · "+nf.format(mx.amount),"hot")+sc("","Eng arzon",esc(mn.name)+" · "+nf.format(mn.amount))+sc("","Eng ko'p sarflangan tur",esc(topCat)+" · "+nf.format(byCat[topCat]));
 if(S.last){const d=S.last.total-sum;st+=sc("","Safar byudjeti",nf.format(S.last.total))+sc("",d>=0?"Qoldi":"Oshib ketdi",nf.format(Math.abs(d)),d<0?"hot":"")}
 $("stats").className="stats s4";$("stats").innerHTML=st;
 $("cats").innerHTML=Object.keys(byCat).sort((a,b)=>byCat[b]-byCat[a]).map(c=>`<div class="line"><span>${esc(c)}</span><span style="flex:1;max-width:60%"><div class="bar"><i style="width:${byCat[c]/byCat[topCat]*100}%"></i><span>${nf.format(byCat[c])} (${(byCat[c]/sum*100).toFixed(0)}%)</span></div></span></div>`).join("");
 $("elist").innerHTML=E.slice().reverse().map(x=>`<li><div><span class="${x.id===mx.id?"top1":""}">${x.id===mx.id?ic("trend")+" ":""}${esc(x.name)}</span><small>${esc(x.cat)} · ${esc(x.date)}</small></div><div><b>${nf.format(x.amount)}</b> <button class="btn small ghost" data-del="${x.id}" aria-label="O'chirish">${ic("x")}</button></div></li>`).join("")}
$("eform").addEventListener("submit",e=>{e.preventDefault();const name=$("e-name").value.trim(),raw=$("e-amt").value.trim(),n=Number(raw),er=$("e-err");
 if(!name||raw===""||!isFinite(n)||n<0){er.textContent="Nomini yozing va summani 0 yoki undan katta son qilib kiriting.";er.hidden=false;return}
 er.hidden=true;S.expenses.push({id:Date.now(),name,amount:n,cat:$("e-cat").value,date:new Date().toISOString().slice(0,10)});$("e-name").value="";$("e-amt").value="";persist();renderExp();flash("Xarajat qo'shildi")});
$("elist").addEventListener("click",e=>{const b=e.target.closest("[data-del]");if(!b)return;S.expenses=S.expenses.filter(x=>String(x.id)!==b.dataset.del);persist();renderExp()});
armed($("e-clear"),()=>{S.expenses=[];persist();renderExp()},"Aniq? Yana bosing");

