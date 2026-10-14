/* ---- AI ---- */
function ctx(){let c="Sen «Safar byudjeti» saytining AI maslahatchisisan. O'zbek tilida, qisqa, aniq va amaliy javob ber (8-10 gapdan oshirma). Aniq narxlarni o'ylab topma. Foydalanuvchi ma'lumotlari:\n";
 if(S.profile)c+=`Ismi: ${S.profile.name}.\n`;
 const l=calcRes?{v:calcRes.v,total:calcRes.r.total,per:calcRes.r.per,cur:calcRes.cur}:S.last;
 c+=l?`Oxirgi hisob: transport ${l.v.transport}, tunash ${l.v.lodging}, kunlik ovqat ${l.v.foodPerDay}, ${l.v.days} kun, ${l.v.people} kishi. Jami ${l.total}, kishiga ${l.per} ${l.cur}.\n`:"Hisob hali yo'q.\n";
 if(R)c+=`Marshrut: ${R.o.name} dan ${R.d.name} ga, ${MODES[R.mode].n.toLowerCase()}, taxminan ${Math.round(R.km)} km, ${fmtDur(R.mins)}.\n`;
 const E=S.expenses;c+=E.length?"Xarajatlari: "+E.slice(-30).map(x=>`${x.name} (${x.cat}) ${x.amount}`).join("; ")+".":"Shaxsiy xarajatlari yo'q.";return c}
function bubble(cls,t){const d=document.createElement("div");d.className="msg "+cls;d.textContent=t;$("log").appendChild(d);$("log").scrollTop=1e9;return d}
async function ask(q){q=q.trim();if(!q||busy)return;const note=$("ai-note");note.hidden=true;
 const sm=await getSample();if(!sm){note.innerHTML=ic("alert")+"AI bu yerda mavjud emas.";note.hidden=false;return}
 busy=true;$("send").disabled=true;$("q").value="";bubble("u",q);const out=bubble("a","…");chat.push({role:"user",content:q});
 const input=chat.slice(-7).map((m,i)=>i===0?{role:"user",content:ctx()+"\n\nSavol: "+m.content}:m);
 try{const r=await sm(input,{cache:false,onText:u=>{out.textContent=u.text;$("log").scrollTop=1e9}});out.textContent=r.text;chat.push({role:"assistant",content:r.text})}
 catch(e){chat.pop();out.textContent=e&&e.code==="rate_limited"?"Juda ko'p so'rov. Birozdan keyin urinib ko'ring.":e&&e.code==="not_granted"?"AI'dan foydalanishga ruxsat berilmadi.":"AI javob bera olmadi. Qayta urinib ko'ring."}
 busy=false;$("send").disabled=false}
$("send").onclick=()=>ask($("q").value);
$("q").addEventListener("keydown",e=>{if(e.key==="Enter")ask($("q").value)});
document.querySelectorAll(".chip").forEach(c=>c.onclick=()=>ask(c.dataset.q));
