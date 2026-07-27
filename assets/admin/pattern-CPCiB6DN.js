import{a as e,d as t,i as n,l as r,n as i,r as a,s as o,u as s}from"../config-Bq587tlG.js";import{t as c}from"../flag-icons.min-B9Y1Ugv7.js";import{n as l,t as u}from"../api-DdXqjFjI.js";var d=t((async()=>{await n();var e=document.querySelector(`#logo-img`);e.src=r;var t={logoutBtn:document.getElementById(`logoutBtn`)};function o(){console.log(`Logging out...`,i),document.cookie=`userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`,window.location.href=a()+`admin/login/`}t.logoutBtn.addEventListener(`click`,o)})),f=t((()=>{c()})),p=t((async()=>{await l(),await n();var t=document.getElementById(`displayArea`),r=document.getElementById(`addExampleBtn`),i=document.getElementById(`exampleSentencesContainer`),s=document.getElementById(`patternForm`);document.getElementById(`submitBtn`);var c=document.getElementById(`btnText`),d=document.getElementById(`btnLoader`),f=document.getElementById(`newPatternBtn`),p=document.getElementById(`patternFormContainer`),m=document.getElementById(`patternListContainer`),h=1,g=[];async function _(){try{let e=await u.getLevels();console.log(`Levels: `,e),g=e.map(e=>({id:e[0],value:e[1],label_en:e[2],label_ja:e[3],label_my:e[4]}));let t=document.getElementById(`level`);t.innerHTML=``,g.forEach(e=>{let n=document.createElement(`option`);n.value=e.id,n.textContent=e.label_en,t.appendChild(n)})}catch(e){console.error(`Error fetching levels: `,e)}}_(),r.addEventListener(`click`,()=>{h++;let e=document.createElement(`textarea`);e.id=`exampleSentence${h}`,e.required=!0,e.className=`example-sentence w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-light focus:border-transparent outline-none transition`,e.placeholder=`Enter example sentence ${h}`;let t=document.createElement(`button`);t.type=`button`,t.innerHTML=`<svg 
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
                </svg>`,t.className=`absolute right-3 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white font-semibold py-1 px-3 rounded-lg transition shadow-md hover:shadow-lg w-max`,t.addEventListener(`click`,()=>{i.removeChild(e.parentElement)});let n=document.createElement(`div`);n.className=`relative flex items-center gap-2`,n.appendChild(e),n.appendChild(t),i.appendChild(n)}),s.addEventListener(`submit`,async e=>{e.preventDefault(),c.textContent=`Submitting...`,d.classList.remove(`hidden`);let n=document.getElementById(`level`).value,r=document.getElementById(`title`).value,a=document.getElementById(`formula`).value,o=document.getElementById(`explanationEn`).value,l=document.getElementById(`explanationJa`).value,f=document.getElementById(`explanationMy`).value,p=[];for(let e=1;e<=h;e++){let t=document.getElementById(`exampleSentence${e}`);t&&p.push(t.value)}let m={level:n,title:r,formula:a,explanationEn:o,explanationJa:l,explanationMy:f,exampleSentences:p},g=await u.savePattern(m);c.textContent=`Create Pattern`,d.classList.add(`hidden`),g.status===`ok`?(t.innerHTML=`<p class="text-green-500 p-3">Pattern saved successfully!</p>`,i.innerHTML=`
            <div class="relative flex items-center gap-2">
                <textarea id="exampleSentence1" required class="example-sentence w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-light focus:border-transparent outline-none transition" placeholder="Enter example sentence 1"></textarea>
            </div>
        `,h=1,s.reset(),await new Promise(e=>setTimeout(e,2e3)),v(),await b()):(console.error(`Error saving pattern: `,g.message),t.innerHTML=`<p class="text-red-500">Error saving pattern: ${g.message}</p>`)}),(async()=>{let e=await o(`list`);console.log(`isAuthenticated: `,e),e||(window.location.href=a()+`admin/login/`)})();var v=()=>{p.classList.contains(`hidden`)?(p.classList.remove(`hidden`),f.textContent=`Cancel`,f.classList.add(`bg-gray-600`,`hover:bg-gray-700`),f.classList.remove(`bg-primary`,`hover:bg-primary-700`)):(p.classList.add(`hidden`),f.textContent=`New Pattern`,f.classList.add(`bg-primary`,`hover:bg-primary-700`),f.classList.remove(`bg-gray-600`,`hover:bg-gray-700`))};f.addEventListener(`click`,v);var y=1,b=async n=>{try{t.innerHTML=e(`Data Loading .....`);let n=await u.getPatternList();if(!n||!Array.isArray(n)){t.innerHTML=`<p class="text-red-500">No patterns found.</p>`;return}m.innerHTML=``;let r=document.createElement(`div`);r.className=`transition`;let i=`
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
        `;n.forEach(e=>{JSON.stringify(e.examples).replace(/"/g,`&quot;`),i+=`
                <tr>
                    <td class="p-2 border text-center">${e.level}</td>
                    <td class="p-2 border text-center">
                        <a href="${a()}admin/pattern/detail/?id=${e.id}" class="ml-2 text-blue-500 hover:underline">></a>
                    </td>
                    <td class="p-2 border">${e.title}</td>
                    <td class="p-2 border">${e.formula}</td>
                    <td class="p-2 border">${e.explanation.en}</td>
                    <td class="p-2 border">${e.explanation.ja}</td>
                    <td class="p-2 border">${e.explanation.my}</td>
                    <td class="p-2 border">${e.created_at}</td>
                </tr>
                    
            `}),i+=`
                    </tbody>
                </table>
            </div>
            `,r.innerHTML=i,m.appendChild(r),t.innerHTML=``}catch(e){console.error(`Error fetching patterns:`,e),t.innerHTML=`<p class="text-red-500">An error occurred while fetching patterns. Please try again later.</p>`}};b(y),document.addEventListener(`click`,e=>{if(e.target&&e.target.classList.contains(`showExamplesBtn`)){console.log(`Show Examples button clicked`);let t=e.target.getAttribute(`data-id`);console.log(`Pattern ID:`,t),window.location.href=`${a()}admin/pattern/detail?id=${t}`}})}));s(),d(),f(),p();