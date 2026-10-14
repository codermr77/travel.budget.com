/* ---- Xarita ---- */
const CITIES=[["Toshkent",41.2995,69.2401,"tashkent"],["Samarqand",39.6542,66.9597,"samarkand"],["Buxoro",39.7747,64.4286,"bukhara"],["Xiva",41.3775,60.3619,"khiva"],["Namangan",41.0011,71.6683,""],["Andijon",40.7821,72.3442,"andijan"],["Farg'ona",40.3842,71.7843,"fergana,ferghana"],["Qo'qon",40.5286,70.9425,"kokand"],["Nukus",42.4531,59.6103,""],["Termiz",37.2242,67.2783,"termez"],["Qarshi",38.8606,65.7891,"karshi"],["Navoiy",40.0844,65.3792,"navoi"],["Jizzax",40.1158,67.8422,"jizzakh"],["Guliston",40.4897,68.7842,"gulistan"],["Urganch",41.5506,60.6317,"urgench"],["Shahrisabz",39.0578,66.8342,""],["Olmaota",43.2389,76.8897,"almaty,alma-ata"],["Bishkek",42.8746,74.5698,""],["Dushanbe",38.5598,68.787,""],["Ashxobod",37.9601,58.3261,"ashgabat"],["Astana",51.1694,71.4491,"nur-sultan"],["Moskva",55.7558,37.6173,"moscow"],["Istanbul",41.0082,28.9784,"stambul"],["Dubay",25.2048,55.2708,"dubai"],["Seul",37.5665,126.978,"seoul"],["Pekin",39.9042,116.4074,"beijing"],["Tokio",35.6762,139.6503,"tokyo"],["London",51.5074,-0.1278,""],["Parij",48.8566,2.3522,"paris"],["Nyu-York",40.7128,-74.006,"new york"]];
const MODES={car:{n:"Mashina",s:70,f:1.25,g:"driving"},bus:{n:"Avtobus",s:55,f:1.25,g:"transit"},train:{n:"Poyezd",s:80,f:1.2,g:"transit"},plane:{n:"Samolyot",s:800,f:1,x:2.5,g:""},bike:{n:"Velosiped",s:15,f:1.3,g:"bicycling"},walk:{n:"Piyoda",s:5,f:1.25,g:"walking"}};
const DIRS=["Shimol","Shimoli-sharq","Sharq","Janubi-sharq","Janub","Janubi-g'arb","G'arb","Shimoli-g'arb"];
let mode="car",R=null,gps=null,watch=null,prev=null,curSpeed=null;
$("cities").innerHTML=CITIES.map(c=>`<option value="${c[0]}">`).join("");
const rad=x=>x*Math.PI/180,norm=s=>s.toLowerCase().replace(/[ʻʼ’‘`´']/g,"").trim();
const hav=(a,b)=>{const dl=rad(b.lat-a.lat),dn=rad(b.lon-a.lon),h=Math.sin(dl/2)**2+Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(dn/2)**2;return 12742*Math.asin(Math.sqrt(h))};
const bearing=(a,b)=>{const y=Math.sin(rad(b.lon-a.lon))*Math.cos(rad(b.lat)),x=Math.cos(rad(a.lat))*Math.sin(rad(b.lat))-Math.sin(rad(a.lat))*Math.cos(rad(b.lat))*Math.cos(rad(b.lon-a.lon));return(Math.atan2(y,x)*180/Math.PI+360)%360};
const fmtDur=m=>{const d=Math.floor(m/1440),h=Math.floor(m%1440/60),mm=m%60,p=[];if(d)p.push(d+" kun");if(h)p.push(h+" soat");if(mm&&!d)p.push(mm+" daqiqa");return p.join(" ")||"1 daqiqadan kam"};
function findCity(t){const n=norm(t);let c=CITIES.find(c=>[norm(c[0]),...c[3].split(",").filter(Boolean).map(norm)].includes(n))||CITIES.find(c=>norm(c[0]).startsWith(n)&&n.length>2);return c?{name:c[0],lat:c[1],lon:c[2]}:null}
async function getSample(){try{return window.claude?await claude.use("sample"):null}catch(e){return null}}
async function geocode(text){const c=findCity(text);if(c)return c;const sm=await getSample();if(!sm)throw new Error("nf");
 const r=await sm.json(`Quyidagi joyning (shahar, hudud yoki mashhur obyekt) taxminiy koordinatalarini ber. Joy: "${text.replace(/["\\]/g,"").slice(0,80)}". Faqat JSON qaytar: {"found":true yoki false,"name":"joy nomi o'zbek tilida","lat":son,"lon":son}. Joyni bilmasang found:false.`);
 if(!r||!r.found||!isFinite(r.lat)||!isFinite(r.lon)||Math.abs(r.lat)>90||Math.abs(r.lon)>180)throw new Error("nf");
 return{name:String(r.name||text).slice(0,60),lat:+r.lat,lon:+r.lon,approx:true}}
function renderModes(){$("modes").innerHTML=Object.keys(MODES).map(k=>`<button type="button" class="mode${k===mode?" on":""}" data-m="${k}" aria-pressed="${k===mode}">${ic(k==="plane"?"plane":k,26)}${MODES[k].n}</button>`).join("")}
$("modes").addEventListener("click",e=>{const b=e.target.closest("[data-m]");if(!b)return;mode=b.dataset.m;$("m-speed").value=MODES[mode].s;renderModes()});
function nowLocal(){const d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());return d.toISOString().slice(0,16)}
$("m-speed").value=MODES.car.s;$("m-dep").value=nowLocal();renderModes();
$("m-loc").onclick=()=>{if(!navigator.geolocation){flash("Joylashuv bu yerda mavjud emas");return}
 navigator.geolocation.getCurrentPosition(p=>{gps={name:"Joriy joylashuv",lat:p.coords.latitude,lon:p.coords.longitude};$("m-from").value="Joriy joylashuv";flash("Joylashuv olindi")},()=>flash("Joylashuvni olib bo'lmadi (ruxsat yo'q)"),{timeout:10000})};
function mErr(t){const e=$("m-err");e.textContent=t;e.hidden=false}
$("mform").addEventListener("submit",async ev=>{ev.preventDefault();$("m-err").hidden=true;const f=$("m-from").value.trim(),t=$("m-to").value.trim();
 if(!f||!t){mErr("Qayerdan va qayerga joylarini yozing.");return}
 const sp=Number($("m-speed").value);if(!isFinite(sp)||sp<=0){mErr("O'rtacha tezlik 0 dan katta bo'lishi kerak.");return}
 $("m-go").disabled=true;
 try{const o=gps&&f==="Joriy joylashuv"?gps:await geocode(f),d=await geocode(t);renderRoute(o,d)}
 catch(e){mErr("Joy topilmadi yoki AI bu yerda mavjud emas. Ro'yxatdagi shahar nomini yozing.")}
 $("m-go").disabled=false});
function renderRoute(o,d){stopNav();const m=MODES[mode],sp=Number($("m-speed").value)||m.s,dep=new Date($("m-dep").value||Date.now());
 const dist=hav(o,d),km=dist*m.f,mins=Math.round((km/sp+(m.x||0))*60);
 R={o,d,mode,sp,km,mins,dist,f:m.f,x:m.x||0,dep:isNaN(dep)?new Date():dep};
 $("m-empty").hidden=true;$("m-out").hidden=false;$("fuel").hidden=mode!=="car";
 const arr=new Date(R.dep.getTime()+mins*6e4);
 $("m-stats").innerHTML=[["map","Masofa",nf.format(Math.round(km))+" km"],["clock","Yo'lda vaqt",fmtDur(mins)],["calendar","Yetib borish",fdt(arr)]].map(x=>`<div class="stat"><small>${ic(x[0]==="calendar"?"clock":x[0])}${x[1]}</small><b>${x[2]}</b></div>`).join("");
 $("m-note").textContent=`${o.name} → ${d.name}, ${m.n.toLowerCase()}, o'rtacha ${nf.format(sp)} km/soat.${m.x?" Aeroport vaqti (taxminan 2,5 soat) qo'shilgan.":""} Bu taxminiy hisob.${o.approx||d.approx?" Ba'zi joylar koordinatasi AI orqali taxminan aniqlandi.":""}`;
 $("n-gmaps").href=`https://www.google.com/maps/dir/?api=1&origin=${o.lat},${o.lon}&destination=${d.lat},${d.lon}${m.g?"&travelmode="+m.g:""}`;
 prev=null;curSpeed=null;updateNav(null);fuelCalc();$("m-out").classList.remove("show");void $("m-out").offsetWidth;$("m-out").classList.add("show")}
function drawMap(pos){const o=R.o,d=R.d,pts=[o,d];if(pos)pts.push(pos);
 const la=pts.map(p=>p.lat),lo=pts.map(p=>p.lon),a=Math.min(...la),b=Math.max(...la),c=Math.min(...lo),e=Math.max(...lo);
 const cLat=(a+b)/2,cLon=(c+e)/2,k=Math.max(Math.cos(rad(cLat)),.2),W=800,H=420,sx=Math.max((e-c)*k,.12),sy=Math.max(b-a,.12),sc=Math.min((W-220)/sx,(H-150)/sy);
 const X=n=>W/2+(n-cLon)*k*sc,Y=n=>H/2-(n-cLat)*sc;
 let s=`<rect width="${W}" height="${H}" fill="#0f2a4a"/>`;
 const vl=W/(k*sc),vt=H/sc,st=[.05,.1,.25,.5,1,2,5,10,20,30,60].find(x=>Math.max(vl,vt)/x<=7)||60;
 for(let g=Math.ceil((cLat-vt/2)/st),n=0;g*st<=cLat+vt/2&&n<30;g++,n++){const y=Y(g*st);s+=`<line x1="0" x2="${W}" y1="${y}" y2="${y}" stroke="#1d4568" stroke-width="1"/><text x="6" y="${y-4}" font-size="11" fill="#5b86a8">${+(g*st).toFixed(2)}°</text>`}
 for(let g=Math.ceil((cLon-vl/2)/st),n=0;g*st<=cLon+vl/2&&n<30;g++,n++){const x=X(g*st);s+=`<line y1="0" y2="${H}" x1="${x}" x2="${x}" stroke="#1d4568" stroke-width="1"/><text x="${x+4}" y="${H-6}" font-size="11" fill="#5b86a8">${+(g*st).toFixed(2)}°</text>`}
 CITIES.forEach(ct=>{const x=X(ct[2]),y=Y(ct[1]);if(x<20||x>W-20||y<20||y>H-20)return;if([o,d].some(p=>Math.hypot(X(p.lon)-x,Y(p.lat)-y)<28))return;
  s+=`<circle cx="${x}" cy="${y}" r="3.5" fill="#7fa7c4"/><text x="${x+7}" y="${y+4}" font-size="12" fill="#9bbdd6">${ct[0]}</text>`});
 const x1=X(o.lon),y1=Y(o.lat),x2=X(d.lon),y2=Y(d.lat),mx=(x1+x2)/2,my=(y1+y2)/2;
 let pth=`M${x1} ${y1}L${x2} ${y2}`,lx=mx,ly=my-10;
 if(R.mode==="plane"){const cx=mx-(y2-y1)*.2,cy=my+(x2-x1)*.2;pth=`M${x1} ${y1}Q${cx} ${cy} ${x2} ${y2}`;lx=(mx+cx)/2;ly=(my+cy)/2-10}
 s+=`<path class="route" d="${pth}" fill="none" stroke="#ffc857" stroke-width="3.5" stroke-linecap="round"/>`;
 s+=`<text x="${lx}" y="${ly}" text-anchor="middle" font-size="14" font-weight="700" fill="#ffc857" style="paint-order:stroke" stroke="#0f2a4a" stroke-width="4">${nf.format(Math.round(R.km))} km</text>`;
 const lab=(x,y,t,col)=>`<text x="${x>W/2?x-14:x+14}" y="${y-12}" text-anchor="${x>W/2?"end":"start"}" font-size="15" font-weight="700" fill="${col}" style="paint-order:stroke" stroke="#0f2a4a" stroke-width="4">${esc(t)}</text>`;
 s+=`<circle cx="${x1}" cy="${y1}" r="8" fill="#7fd1ea" stroke="#fff" stroke-width="2"/>${lab(x1,y1,o.name,"#7fd1ea")}<circle cx="${x2}" cy="${y2}" r="10" fill="#ff8a4c" stroke="#fff" stroke-width="3"/>${lab(x2,y2,d.name,"#ffc857")}`;
 if(pos)s+=`<circle class="pulse" cx="${X(pos.lon)}" cy="${Y(pos.lat)}" r="8" fill="#3fcf8e"/><circle cx="${X(pos.lon)}" cy="${Y(pos.lat)}" r="7" fill="#3fcf8e" stroke="#fff" stroke-width="2"/>`;
 $("map").innerHTML=s}
function drawCompass(deg){$("compass").innerHTML=`<circle cx="60" cy="60" r="52" fill="#0f2a4a" stroke="#2f6a94" stroke-width="2"/><text x="60" y="16" text-anchor="middle" font-size="11" fill="#ffc857" font-weight="700">SH</text><text x="60" y="112" text-anchor="middle" font-size="11" fill="#9bbdd6">J</text><text x="108" y="64" text-anchor="middle" font-size="11" fill="#9bbdd6">Sh</text><text x="12" y="64" text-anchor="middle" font-size="11" fill="#9bbdd6">G'</text><g transform="rotate(${deg} 60 60)"><polygon points="60,20 70,64 60,58 50,64" fill="#ff8a4c"/><polygon points="60,100 52,64 60,70 68,64" fill="#7fd1ea" opacity=".6"/></g>`}
function drawGauge(v,max,lbl){const fr=Math.min(1,Math.max(0,v/max)),ang=-90+fr*180;
 $("gauge").innerHTML=`<path d="M20 100A80 80 0 0 1 180 100" fill="none" stroke="#1d4568" stroke-width="14" stroke-linecap="round"/><path d="M20 100A80 80 0 0 1 180 100" fill="none" stroke="#3fcf8e" stroke-width="14" stroke-linecap="round" stroke-dasharray="${fr*251.3} 252"/><g transform="rotate(${ang} 100 100)"><line x1="100" y1="100" x2="100" y2="34" stroke="#ffc857" stroke-width="4" stroke-linecap="round"/></g><circle cx="100" cy="100" r="7" fill="#ffc857"/><text x="100" y="86" text-anchor="middle" font-size="22" font-weight="700" fill="#fff">${Math.round(v)}</text><text x="100" y="120" text-anchor="middle" font-size="11" fill="#c9d9e0">${lbl}</text><text x="20" y="118" font-size="10" fill="#9bbdd6">0</text><text x="180" y="118" text-anchor="end" font-size="10" fill="#9bbdd6">${max}</text>`}
function updateNav(pos){if(!R)return;const from=pos||R.o,rem=hav(from,R.d)*R.f,br=bearing(from,R.d),max=R.mode==="plane"?1000:160;
 const sp=curSpeed!=null&&curSpeed>5?curSpeed:R.sp,mins=Math.round((rem/sp+(pos?0:R.x))*60);
 drawMap(pos);drawCompass(br);drawGauge(curSpeed!=null?curSpeed:R.sp,max,curSpeed!=null?"km/soat (GPS)":"km/soat (o'rtacha)");
 $("n-rem").textContent=nf.format(Math.round(rem*10)/10)+" km";$("n-dir").textContent=`${DIRS[Math.round(br/45)%8]} (${Math.round(br)}°)`;
 $("n-eta").textContent=rem<.05&&pos?"Yetib keldingiz":fdt(new Date(Date.now()+mins*6e4))+" ("+fmtDur(mins)+")";
 if(pos)$("n-gmaps").href=`https://www.google.com/maps/dir/?api=1&origin=${pos.lat},${pos.lon}&destination=${R.d.lat},${R.d.lon}${MODES[R.mode].g?"&travelmode="+MODES[R.mode].g:""}`}
function nMsg(t){const n=$("n-msg");n.hidden=!t;n.innerHTML=t?ic("alert")+esc(t):""}
function stopNav(){if(watch!=null&&navigator.geolocation)navigator.geolocation.clearWatch(watch);watch=null;$("n-start").hidden=false;$("n-stop").hidden=true;$("n-gps").textContent="o'chiq"}
$("n-start").onclick=()=>{if(!R)return;nMsg("");if(!navigator.geolocation){nMsg("Joylashuv bu yerda mavjud emas. Navigatsiya uchun «Google Maps'da ochish» tugmasidan foydalaning.");return}
 $("n-gps").textContent="qidirilmoqda...";
 watch=navigator.geolocation.watchPosition(p=>{const pos={lat:p.coords.latitude,lon:p.coords.longitude},now=Date.now();
  if(p.coords.speed!=null&&isFinite(p.coords.speed))curSpeed=p.coords.speed*3.6;
  else if(prev&&now-prev.t>1500){const v=hav(prev,pos)/((now-prev.t)/36e5);curSpeed=curSpeed==null?v:curSpeed*.6+v*.4}
  prev={lat:pos.lat,lon:pos.lon,t:now};$("n-gps").textContent="faol";$("n-start").hidden=true;$("n-stop").hidden=false;updateNav(pos)},
  err=>{stopNav();nMsg(err&&err.code===1?"Joylashuvga ruxsat berilmadi. Brauzer sozlamalarida ruxsat bering yoki Google Maps'dan foydalaning.":"Joylashuvni aniqlab bo'lmadi. Google Maps'dan foydalaning.")},{enableHighAccuracy:true,maximumAge:2000,timeout:20000})};
$("n-stop").onclick=()=>{stopNav();curSpeed=null;prev=null;updateNav(null)};
$("n-save").onclick=()=>{if(!R)return;S.trips.unshift({id:Date.now(),o:R.o,d:R.d,mode:R.mode,sp:R.sp,km:Math.round(R.km),mins:R.mins,at:new Date().toLocaleDateString("uz-UZ")});S.trips=S.trips.slice(0,20);persist();flash("Safar saqlandi")};
function fuelCalc(){const c=Number($("f-cons").value),p=Number($("f-price").value),ok=R&&c>0&&p>0,v=ok?R.km*c/100*p:0;$("f-out").textContent=ok?nf.format(Math.round(v)):"—";$("f-use").disabled=!ok;$("f-use").dataset.v=Math.round(v)}
$("f-cons").oninput=$("f-price").oninput=fuelCalc;
$("f-use").onclick=()=>{$("transport").value=$("f-use").dataset.v;go("calc");flash("Transport summasi qo'yildi")};
function renderTrips(){const a=S.trips;$("t-empty").hidden=a.length>0;
 $("t-list").innerHTML=a.map((t,i)=>`<li><div><b>${esc(t.o.name)} → ${esc(t.d.name)}</b><small>${esc(MODES[t.mode]?MODES[t.mode].n:"")} · ${nf.format(t.km)} km · ${fmtDur(t.mins)} · ${esc(t.at)}</small></div><div><button class="btn small ghost" data-to="${i}">Ochish</button> <button class="btn small ghost" data-td="${i}" aria-label="O'chirish">${ic("trash")}</button></div></li>`).join("")}
$("t-list").addEventListener("click",e=>{const o=e.target.closest("[data-to]"),d=e.target.closest("[data-td]");
 if(d){S.trips.splice(+d.dataset.td,1);persist();renderTrips();return}
 if(o){const t=S.trips[+o.dataset.to];if(!t)return;mode=MODES[t.mode]?t.mode:"car";renderModes();$("m-from").value=t.o.name;$("m-to").value=t.d.name;$("m-speed").value=t.sp;gps=null;go("map");renderRoute(t.o,t.d)}});

