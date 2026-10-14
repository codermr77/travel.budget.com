/* Ishga tushirish */
refreshAll();
if("serviceWorker" in navigator&&location.protocol.startsWith("http")){
 const had=navigator.serviceWorker.controller;
 navigator.serviceWorker.addEventListener("controllerchange",()=>{if(had&&!window.__rl){window.__rl=1;location.reload()}});
 navigator.serviceWorker.register("sw.js").then(r=>r.update()).catch(()=>{})}
