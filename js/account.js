/* ---- Hisob ---- */
function renderAcc(){const p=S.profile;$("a-name").value=p?p.name:"";$("a-city").value=p&&p.city?p.city:"";
 $("av").textContent=p?p.name.trim().charAt(0).toUpperCase():"?";$("a-save").lastChild.textContent=p?"Saqlash":"Hisob ochish";
 $("acc-info").textContent=online?"Hisobingiz claude.ai'ga kirishingiz bilan bog'langan. Ma'lumotlar faqat sizga ko'rinadi.":"Siz tizimga kirmagansiz: ma'lumotlar faqat shu brauzerda saqlanadi.";
 $("a-stats").hidden=!p;if(p)$("a-grid").innerHTML=[["Xarajatlar",S.expenses.length],["Safarlar",S.trips.length],["Hisoblashlar",S.history.length],["Yuk ro'yxati",S.pack.length]].map(x=>`<div class="stat"><small>${x[0]}</small><b>${x[1]}</b></div>`).join("")}
$("aform").addEventListener("submit",e=>{e.preventDefault();const n=$("a-name").value.trim(),er=$("a-err");
 if(n.length<2){er.textContent="Ismingizni kamida 2 ta belgi bilan yozing.";er.hidden=false;return}er.hidden=true;
 const had=!!S.profile;S.profile={name:n,city:$("a-city").value.trim(),at:S.profile?S.profile.at:new Date().toISOString().slice(0,10)};persist();refreshAll();flash(had?"Saqlandi":"Hisob ochildi")});
armed($("a-reset"),()=>{S.expenses=[];S.history=[];S.last=null;S.trips=[];S.pack=[];persist();renderAcc();flash("Ma'lumotlar o'chirildi")},"Aniq o'chirilsinmi? Yana bosing");

