import { api } from "./api.js";
import { loadingSpinner, tokenCheck, getBasePath, configLink } from "./config.js";

const displayArea = document.getElementById('displayArea');
const addExampleBtn = document.getElementById('addExampleBtn');
const exampleSentencesContainer = document.getElementById('exampleSentencesContainer');
const patternForm = document.getElementById('patternForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const btnLoader = document.getElementById('btnLoader');

const newPatternBtn = document.getElementById('newPatternBtn');
const patternFormContainer = document.getElementById('patternFormContainer');

// const displayArea = document.getElementById('displayArea');
const patternListContainer = document.getElementById('patternListContainer');

// Example Sentences အတွက် Count ကို Track လုပ်မယ့် Variable
let exampleCount = 1;
// Levels Data ကို Store လုပ်မယ့် Variable
let levels = [];

configLink(); // Call configLink to update all links on the page

// English Speaking Patterns Levels Dropdown အတွက် Data Fetch လုပ်မယ့် Function
async function getPatternLevels() {
    try {
        
        const response = await api.getLevels();
        console.log("Levels: ", response);
        levels = response.map(entry => {
            return {
                "id": entry[0],
                "value": entry[1],
                "label_en": entry[2],
                "label_ja": entry[3],
                "label_my": entry[4]
            };
        });
        const levelSelect = document.getElementById('level');
        levelSelect.innerHTML = ''; // Clear existing options
        levels.forEach(level => {
            const option = document.createElement('option');
            option.value = level.id;
            option.textContent = level.label_en;
            levelSelect.appendChild(option);
        });

    } catch (error) {
        console.error("Error fetching levels: ", error);
    }
}
// Page Load အချိန်မှာ Levels Data ကို Fetch လုပ်မယ့် Function ကို ခေါ်မယ်
getPatternLevels();

// Example Sentences အတွက် Add Example Button ကို Click လုပ်တဲ့အခါ New Example Field တစ်ခုထပ်ထည့်မယ့် Function
addExampleBtn.addEventListener('click', () => {
    exampleCount++;
    const newExample = document.createElement('textarea');
    newExample.id = `exampleSentence${exampleCount}`;
    newExample.required = true;
    newExample.className = "example-sentence w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-light focus:border-transparent outline-none transition";
    newExample.placeholder = `Enter example sentence ${exampleCount}`;
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.innerHTML = `<svg 
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
                </svg>`;
    removeBtn.className = "absolute right-3 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white font-semibold py-1 px-3 rounded-lg transition shadow-md hover:shadow-lg w-max";
    removeBtn.addEventListener('click', () => {
        exampleSentencesContainer.removeChild(newExample.parentElement);
    });
    const exampleWrapper = document.createElement('div');
    exampleWrapper.className = "relative flex items-center gap-2";
    exampleWrapper.appendChild(newExample);
    exampleWrapper.appendChild(removeBtn);
    exampleSentencesContainer.appendChild(exampleWrapper);
}); 

// Pattern Form ကို Submit လုပ်တဲ့အခါ Data ကို Collect လုပ်ပြီး DB သို့ပို့မယ့် Function
patternForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    btnText.textContent = 'Submitting...';
    btnLoader.classList.remove('hidden');
    const level = document.getElementById('level').value;
    const title = document.getElementById('title').value;
    const formula = document.getElementById('formula').value;
    const explanationEn = document.getElementById('explanationEn').value;
    const explanationJa = document.getElementById('explanationJa').value;
    const explanationMy = document.getElementById('explanationMy').value;
    const exampleSentences = [];
    for (let i = 1; i <= exampleCount; i++) {
        const sentence = document.getElementById(`exampleSentence${i}`);
        if (sentence) {
            exampleSentences.push(sentence.value);
        }
    }
    const patternData = {
        level,
        title,
        formula,
        explanationEn,
        explanationJa,
        explanationMy,
        exampleSentences
    };
    const result = await api.savePattern(patternData);
    btnText.textContent = 'Create Pattern';
    btnLoader.classList.add('hidden');
    if (result.status === 'ok') {
        displayArea.innerHTML = `<p class="text-green-500 p-3">Pattern saved successfully!</p>`;
        // Reset the form after successful submission
        exampleSentencesContainer.innerHTML = `
            <div class="relative flex items-center gap-2">
                <textarea id="exampleSentence1" required class="example-sentence w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-light focus:border-transparent outline-none transition" placeholder="Enter example sentence 1"></textarea>
            </div>
        `;
        exampleCount = 1;
        patternForm.reset();
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds before clearing the message
        handleCreatePattern();
        await fetchPatterns();
    } else {
        // Handle save failure
        console.error("Error saving pattern: ", result.message);
        displayArea.innerHTML = `<p class="text-red-500">Error saving pattern: ${result.message}</p>`;
    }
    
});

const init = async () => {
    const isAuthenticated = await tokenCheck('list');
    console.log("isAuthenticated: ", isAuthenticated);
    if (!isAuthenticated) {
        window.location.href = getBasePath() + "admin/login/";
    }
};
init();

const handleCreatePattern = () => {
    if (patternFormContainer.classList.contains('hidden')) {
        patternFormContainer.classList.remove('hidden');
        newPatternBtn.textContent = "Cancel";
        newPatternBtn.classList.add('bg-gray-600', 'hover:bg-gray-700');
        newPatternBtn.classList.remove('bg-primary', 'hover:bg-primary-700');
    } else {
        patternFormContainer.classList.add('hidden');
        newPatternBtn.textContent = "New Pattern";
        newPatternBtn.classList.add('bg-primary', 'hover:bg-primary-700');
        newPatternBtn.classList.remove('bg-gray-600', 'hover:bg-gray-700');
    }
};
newPatternBtn.addEventListener('click', handleCreatePattern);

let currentPage = 1;
let totalPages = 1;

const fetchPatterns = async (page) => {
    try {
        displayArea.innerHTML = loadingSpinner('Data Loading .....');
        const patternInfoList = await api.getPatternList();
        if (!patternInfoList || !Array.isArray(patternInfoList)) {
            displayArea.innerHTML = `<p class="text-red-500">No patterns found.</p>`;
            return
        }
        patternListContainer.innerHTML = ''; // Clear existing patterns
        const patternItem = document.createElement('div');
        patternItem.className = 'transition';
        let tableHTML = `
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
        `;
        patternInfoList.forEach(pattern => {
            const safeExamplesData = JSON.stringify(pattern.examples).replace(/"/g, '&quot;');
            tableHTML += `
                <tr>
                    <td class="p-2 border text-center">${pattern.level}</td>
                    <td class="p-2 border text-center">
                        <a href="${getBasePath()}admin/pattern/detail/?id=${pattern.id}" class="ml-2 text-blue-500 hover:underline">></a>
                    </td>
                    <td class="p-2 border">${pattern.title}</td>
                    <td class="p-2 border">${pattern.formula}</td>
                    <td class="p-2 border">${pattern.explanation.en}</td>
                    <td class="p-2 border">${pattern.explanation.ja}</td>
                    <td class="p-2 border">${pattern.explanation.my}</td>
                    <td class="p-2 border">${pattern.created_at}</td>
                </tr>
                    
            `;
        });     
        tableHTML += `
                    </tbody>
                </table>
            </div>
            `;
        patternItem.innerHTML = tableHTML;
        patternListContainer.appendChild(patternItem);
            // renderPatterns(data.patterns);
            // totalPages = data.totalPages;
            // renderPagination();
        displayArea.innerHTML = ''; // Clear loading message
    } catch (error) {
        console.error("Error fetching patterns:", error);
        displayArea.innerHTML = `<p class="text-red-500">An error occurred while fetching patterns. Please try again later.</p>`;
    }
};
fetchPatterns(currentPage);

document.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('showExamplesBtn')) { 
        console.log("Show Examples button clicked");
        const patternId = event.target.getAttribute('data-id');
        console.log("Pattern ID:", patternId);
        window.location.href = `${getBasePath()}admin/pattern/detail?id=${patternId}`;
    }
});
