import{a as e,d as t,i as n,l as r,n as i,r as a,s as o,u as s}from"../../config-ByWqRlVj.js";import{t as c}from"../../flag-icons.min-DURL-r15.js";import{n as l,t as u}from"../../api-DFU0uime.js";var d=t((async()=>{await n();var e=document.querySelector(`#logo-img`);e.src=r;var t={logoutBtn:document.getElementById(`logoutBtn`)};function o(){console.log(`Logging out...`,i),document.cookie=`userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`,window.location.href=a()+`admin/login/`}t.logoutBtn.addEventListener(`click`,o)})),f=t((async()=>{await n(),c(),console.log(`Base Path:`,a());var e=document.getElementById(`speaking-pattern-link`),t=document.getElementById(`grammar-pattern-link`);e.href=a()+`admin/pattern/`,t.href=a()+`admin/grammar/`})),p=t((async()=>{await n(),await l(),(async()=>{if(displayArea.innerHTML=e(`Data Loading .....`),!await o(`detail`))window.location.href=a()+`admin/login/`;else{let e=new URLSearchParams(window.location.search).get(`id`);e||(window.location.href=a()+`admin/pattern/`);let t=await u.getPatternDetail(e);displayArea.innerHTML=``;let n=document.getElementById(`patternDetailContainer`);if(t.status===`ng`)n.innerHTML=`<p class="text-red-500">${t.message}</p>`;else{let e=t.data,r=``;e.examples&&e.examples.length>0?e.examples.forEach((e,t)=>{r+=`<div class="flex p-3 border-b border-slate-300"><strong>${t+1}:</strong>`,r+=`<ul class="list-disc pl-5">
                                <li>${e.en}</li>
                                <li>${e.ja}</li>
                                <li>${e.my}</li>
                            </ul></div>`}):r=`<p>No examples available.</p>`,n.innerHTML=`
                        <h2 class="text-xl font-bold mb-4">${e.title}</h2>
                        <p><strong>Level:</strong> ${e.level}</p>
                        <p><strong>Formula:</strong> ${e.formula}</p>
                        <p><strong>Explanation (EN):</strong> ${e.explanation.en}</p>
                        <p><strong>Explanation (JA):</strong> ${e.explanation.ja}</p>
                        <p><strong>Explanation (MY):</strong> ${e.explanation.my}</p>
                        <div class="mt-4">
                            <h3 class="font-semibold">Examples:</h3>
                            ${r}
                        </div>
                    `}}})()}));s(),d(),f(),p();