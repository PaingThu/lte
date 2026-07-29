import{a as e,c as t,d as n,f as r,i,n as a,o,u as s}from"../../config-DUP6XIy_.js";import{t as c}from"../../flag-icons.min-BBkWklxj.js";import{n as l,t as u}from"../../api-Di3Da724.js";var d=r((async()=>{await e();var t=document.querySelector(`#logo-img`);t.src=s;var n={logoutBtn:document.getElementById(`logoutBtn`)};function r(){console.log(`Logging out...`,a),document.cookie=`userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`,window.location.href=i()+`admin/login/`}n.logoutBtn.addEventListener(`click`,r)})),f=r((()=>{c()})),p=r((async()=>{await e(),await l(),(async()=>{if(displayArea.innerHTML=o(`Data Loading .....`),!await t(`detail`))window.location.href=i()+`admin/login/`;else{let e=new URLSearchParams(window.location.search).get(`id`);e||(window.location.href=i()+`admin/pattern/`);let t=await u.getPatternDetail(e);displayArea.innerHTML=``;let n=document.getElementById(`patternDetailContainer`);if(t.status===`ng`)n.innerHTML=`<p class="text-red-500">${t.message}</p>`;else{let e=t.data,r=``;e.examples&&e.examples.length>0?e.examples.forEach((e,t)=>{r+=`<div class="flex p-3 border-b border-slate-300"><strong>${t+1}:</strong>`,r+=`<ul class="list-disc pl-5">
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
                    `}}})()}));n(),d(),f(),p();