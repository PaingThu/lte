import{a as e,c as t,d as n,f as r,i,n as a,o,r as s,u as c}from"../config-DUP6XIy_.js";import{t as l}from"../flag-icons.min-BBkWklxj.js";import{n as u,t as d}from"../api-Di3Da724.js";var f=r((async()=>{await e();var t=document.querySelector(`#logo-img`);t.src=c;var n={logoutBtn:document.getElementById(`logoutBtn`)};function r(){console.log(`Logging out...`,a),document.cookie=`userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`,window.location.href=i()+`admin/login/`}n.logoutBtn.addEventListener(`click`,r)})),p=r((()=>{l()})),m=r((async()=>{await u(),await e();var n=document.getElementById(`displayArea`),r=document.getElementById(`addExampleBtn`),a=document.getElementById(`exampleSentencesContainer`),c=document.getElementById(`patternForm`);document.getElementById(`submitBtn`);var l=document.getElementById(`btnText`),f=document.getElementById(`btnLoader`),p=document.getElementById(`newPatternBtn`),m=document.getElementById(`patternFormContainer`),h=document.getElementById(`patternListContainer`),g=1,_=[];s();async function v(){try{let e=await d.getLevels();console.log(`Levels: `,e),_=e.map(e=>({id:e[0],value:e[1],label_en:e[2],label_ja:e[3],label_my:e[4]}));let t=document.getElementById(`level`);t.innerHTML=``,_.forEach(e=>{let n=document.createElement(`option`);n.value=e.id,n.textContent=e.label_en,t.appendChild(n)})}catch(e){console.error(`Error fetching levels: `,e)}}v(),r.addEventListener(`click`,()=>{g++;let e=document.createElement(`textarea`);e.id=`exampleSentence${g}`,e.required=!0,e.className=`example-sentence w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-light focus:border-transparent outline-none transition`,e.placeholder=`Enter example sentence ${g}`;let t=document.createElement(`button`);t.type=`button`,t.innerHTML=`<svg 
                    class="size-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    stroke-width="2"
                >
                    <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                    />
                </svg>`,t.className=`absolute right-3 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white font-semibold py-1 px-3 rounded-lg transition shadow-md hover:shadow-lg w-max`,t.addEventListener(`click`,()=>{a.removeChild(e.parentElement)});let n=document.createElement(`div`);n.className=`relative flex items-center gap-2`,n.appendChild(e),n.appendChild(t),a.appendChild(n)}),c.addEventListener(`submit`,async e=>{e.preventDefault(),l.textContent=`Submitting...`,f.classList.remove(`hidden`);let t=document.getElementById(`level`).value,r=document.getElementById(`title`).value,i=document.getElementById(`formula`).value,o=document.getElementById(`explanationEn`).value,s=document.getElementById(`explanationJa`).value,u=document.getElementById(`explanationMy`).value,p=[];for(let e=1;e<=g;e++){let t=document.getElementById(`exampleSentence${e}`);t&&p.push(t.value)}let m={level:t,title:r,formula:i,explanationEn:o,explanationJa:s,explanationMy:u,exampleSentences:p},h=await d.savePattern(m);l.textContent=`Create Pattern`,f.classList.add(`hidden`),h.status===`ok`?(n.innerHTML=`<p class="text-green-500 p-3">Pattern saved successfully!</p>`,a.innerHTML=`
            <div class="relative flex items-center gap-2">
                <textarea id="exampleSentence1" required class="example-sentence w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-light focus:border-transparent outline-none transition" placeholder="Enter example sentence 1"></textarea>
            </div>
        `,g=1,c.reset(),await new Promise(e=>setTimeout(e,2e3)),y(),await x()):(console.error(`Error saving pattern: `,h.message),n.innerHTML=`<p class="text-red-500">Error saving pattern: ${h.message}</p>`)}),(async()=>{let e=await t(`list`);console.log(`isAuthenticated: `,e),e||(window.location.href=i()+`admin/login/`)})();var y=()=>{m.classList.contains(`hidden`)?(m.classList.remove(`hidden`),p.textContent=`Cancel`,p.classList.add(`bg-gray-600`,`hover:bg-gray-700`),p.classList.remove(`bg-primary`,`hover:bg-primary-700`)):(m.classList.add(`hidden`),p.textContent=`New Pattern`,p.classList.add(`bg-primary`,`hover:bg-primary-700`),p.classList.remove(`bg-gray-600`,`hover:bg-gray-700`))};p.addEventListener(`click`,y);var b=1,x=async e=>{try{n.innerHTML=o(`Data Loading .....`);let e=await d.getPatternList();if(!e||!Array.isArray(e)){n.innerHTML=`<p class="text-red-500">No patterns found.</p>`;return}h.innerHTML=``;let t=document.createElement(`div`);t.className=`transition`;let r=`
            <div class="w-full overflow-x-auto">
                <table class="w-max border-collapse border border-gray-300 text-left text-sm">
                    <thead>
                        <tr class="bg-primary">
                            <th class="p-2 border">Level</th>
                            <th class="p-2 border">Detail</th>
                            <th class="p-2 border">Title</th>
                            <th class="p-2 border">Formula</th>
                            <th class="p-2 border">Explanation (EN)</th>
                            <th class="p-2 border">Explanation (JA)</th>
                            <th class="p-2 border">Explanation (MY)</th>
                            <th class="p-2 border">Created At</th>
                        </tr>
                    </thead>
                    <tbody>        
        `;e.forEach(e=>{JSON.stringify(e.examples).replace(/"/g,`&quot;`),r+=`
                <tr>
                    <td class="p-2 border text-center">${e.level}</td>
                    <td class="p-2 border text-center">
                        <a href="${i()}admin/pattern/detail/?id=${e.id}" class="ml-2 text-blue-500 hover:underline">></a>
                    </td>
                    <td class="p-2 border">${e.title}</td>
                    <td class="p-2 border">${e.formula}</td>
                    <td class="p-2 border">${e.explanation.en}</td>
                    <td class="p-2 border">${e.explanation.ja}</td>
                    <td class="p-2 border">${e.explanation.my}</td>
                    <td class="p-2 border">${e.created_at}</td>
                </tr>
                    
            `}),r+=`
                    </tbody>
                </table>
            </div>
            `,t.innerHTML=r,h.appendChild(t),n.innerHTML=``}catch(e){console.error(`Error fetching patterns:`,e),n.innerHTML=`<p class="text-red-500">An error occurred while fetching patterns. Please try again later.</p>`}};x(b),document.addEventListener(`click`,e=>{if(e.target&&e.target.classList.contains(`showExamplesBtn`)){console.log(`Show Examples button clicked`);let t=e.target.getAttribute(`data-id`);console.log(`Pattern ID:`,t),window.location.href=`${i()}admin/pattern/detail?id=${t}`}})}));n(),f(),p(),m();