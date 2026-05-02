document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) || (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S' || e.key === 'a' || e.key === 'A'))) {
        e.preventDefault();
        return false;
    }
});

// ========== Theme Toggle ==========
function toggleTheme() {
    const html = document.documentElement;
    const btn = document.getElementById('theme-toggle');

    btn.classList.add('switching');
    setTimeout(() => btn.classList.remove('switching'), 500);

    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        showToast('☀️ Light theme activated');
    } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        showToast('🌙 Dark theme activated');
    }
}

// ========== Toast Notification (Optimized) ==========
const toastQueue = [];
let toastTimeout;

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);

    toastQueue.push(toast);

    if (toastQueue.length > 1) {
        toastQueue[toastQueue.length - 2]?.remove();
    }

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        if (toast && toast.parentElement) {
            toast.remove();
        }
        toastQueue.splice(toastQueue.indexOf(toast), 1);
    }, 2500);
}

// ========== Copy to Clipboard ==========
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('✅ Copied to clipboard!');
    }).catch(() => {
        showToast('❌ Failed to copy');
    });
}

const rawUrls = [
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-5-22-125-1001.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-5-22-130-2003.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-5-22-140-1032.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-5-22-152-1025.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-5-22-153-1026.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-5-22-160-1025.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-5-22-163-1004.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-5-22-167-1006.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-.beta.4-0-1-98.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-4-100-1-1003.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-4-120-5-110.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-4-140-2-1004.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-4-150-11-1001.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-4-150-8-1008.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-4-160-10-1119.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-4-170-0-1042.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-4-180-0-1051.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-4-180-10-1006.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-4-180-10-1006_2.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-4-200-0-5201.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-4-205-0-1006.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-4-210-0-1093.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-4-210-10-1005.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-4-215-0-1019.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-4-220-0-1109.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-4-240-0-1075.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-4-240-15-1005.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-4-240-20-1016.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-4-240-30-1002.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-4-250-0-1070.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-4-260-0-1032.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-4-270-0-1053.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-4-280-0-1022.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-4-30-50.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-4-40-10-1013.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-4-50-5.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-0-100-2106.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-0-110-2104.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-0-220-1003.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-0-230-1001.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-1-0-1129.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-10-100-1016.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-10-110-1002.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-10-20-1003.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-10-210.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-10-220-1003.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-10-220-1006.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-10-220-1008.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-10-230-1003.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-11-100-1063.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-11-100-2102.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-11-40-1003.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-11-42-1002.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-11-42-2003.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-11-50-2102.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-11-56-1003.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-12-0-1085.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-12-101-1002.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-12-102-1001.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-12-105-1006.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-12-108-2002.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-12-115-1001.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-12-3-1001.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-13-0-1076.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-13-100-1019.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-13-200-1029.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-13-220-1002.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-14-21-1004.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-21-1001.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-21-120-1025.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-21-212-1027.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-21-219.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-21-300-1070.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-21-500-1009.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-21-550-1031.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-21-560.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-21-630-1018.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-21-642-1004.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-21-651-1003.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-21-655-1002.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-21-660.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-22-0-2202.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-22-101-1008.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-22-75-2109.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-22-86-1001.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-3-120.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-3-70-1004.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-4-0-1063.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-4-100-1026.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-5-10.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-6-0.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-7-0.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-8-0.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-9-10-1006.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-9-100.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-9-410-1001.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-9-600-1001.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-9-610-1005.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-9-620.exe",
    "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/BlueStacks.beta.5.0.0.7228.exe"
];

const customLinks = [
    { url: "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-21-218-1001.exe", filename: "bluestacks-app-player-5-21-218-1001.exe" },
    { url: "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-21-580-1017.exe", filename: "bluestacks-app-player-5-21-580-1017.exe" },
    { url: "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-22-91-1029.exe", filename: "bluestacks-5-22-91-1029.exe" },
    { url: "https://github.com/phwyverysad/BlueStacks/releases/download/BlueStacks/bluestacks-app-player-5-22-166-1003.exe", filename: "bluestacks-5-22-166-1003.exe" }
];

const allData = [...customLinks, ...rawUrls.map(url => ({ url: url, filename: url.split('/').pop() }))];
const bs5Links = [];
const bs4Links = [];

allData.forEach(item => {
    let version = "Unknown";
    const filename = item.filename;
    if (filename.includes("beta.5")) {
        version = "Beta 5.0.0.7228";
        bs5Links.push({ url: item.url, version });
        return;
    }
    if (filename.includes(".beta.4")) {
        version = "Beta 4.0.1.98";
        bs4Links.push({ url: item.url, version });
        return;
    }
    const match = filename.match(/bluestacks(?:-app-player)?-([\d-]+)(?:_2)?\.exe/i);
    if (match) {
        version = match[1].replace(/-/g, '.');
        if (version.startsWith('5')) { bs5Links.push({ url: item.url, version }); }
        else if (version.startsWith('4')) { bs4Links.push({ url: item.url, version }); }
    }
});

function sortVersionsDesc(a, b) {
    const vA = a.version.replace('Beta ', '').split('.').map(Number);
    const vB = b.version.replace('Beta ', '').split('.').map(Number);
    for (let i = 0; i < Math.max(vA.length, vB.length); i++) {
        const numA = vA[i] || 0;
        const numB = vB[i] || 0;
        if (numA > numB) return -1;
        if (numA < numB) return 1;
    }
    return 0;
}

bs5Links.sort(sortVersionsDesc);
bs4Links.sort(sortVersionsDesc);

function generateButtonsHTML(links, isLatest) {
    return links.map((link, index) => `
        <a href="${link.url}" target="_blank" class="tilt-card ripple-container card-enter group relative overflow-hidden flex flex-col justify-center p-5 bg-white/70 dark:bg-gray-800/60 rounded-[1.25rem] border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300 backdrop-blur-sm" style="animation-delay: ${index * 40}ms">
            ${index === 0 ? '<span class="badge-latest">Latest</span>' : ''}
            <div class="card-tooltip">คลิกเพื่อดาวน์โหลด v${link.version}</div>
            <div class="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full blur-2xl opacity-0 group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"></div>
            <div class="flex items-center justify-between z-10 relative">
                <div class="flex items-center gap-4">
                    <div class="download-icon flex-shrink-0 w-10 h-10 rounded-xl bg-lavender-100 dark:bg-gray-700/80 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white dark:group-hover:bg-purple-500 transition-all duration-300 shadow-sm">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                        </svg>
                    </div>
                    <span class="font-semibold text-gray-700 dark:text-gray-200 text-[15px] tracking-wide cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 transition-colors" onclick="event.preventDefault(); copyToClipboard('v${link.version}')">${link.version}</span>
                </div>
                <svg class="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </div>
        </a>
    `).join('');
}

document.getElementById('content-bs5').innerHTML = generateButtonsHTML(bs5Links, true);
document.getElementById('content-bs4').innerHTML = generateButtonsHTML(bs4Links, true);

// ========== Search Functionality (Optimized with Debounce) ==========
let filterTimeout;
let lastSearchQuery = '';

function filterCards(query) {
    if (!query) query = document.getElementById('search-input').value.toLowerCase().trim();
    if (query === lastSearchQuery) return;
    lastSearchQuery = query;

    const allCards = document.querySelectorAll('.tilt-card');
    let visibleCount = 0;

    allCards.forEach(card => {
        const versionSpan = card.querySelector(':scope > div span.font-semibold');
        if (!versionSpan) return;

        const version = versionSpan.textContent.toLowerCase();
        const shouldShow = version.includes(query) || query === '';

        if (shouldShow) {
            card.style.display = '';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    if (visibleCount === 0 && query !== '') {
        showToast('❌ No versions match your search');
    }
}

if (document.getElementById('search-input')) {
    document.getElementById('search-input').addEventListener('input', (e) => {
        clearTimeout(filterTimeout);
        filterTimeout = setTimeout(() => filterCards(e.target.value.toLowerCase().trim()), 200);
    });
}

function switchTab(tab) {
    const btn5 = document.getElementById('tab-bs5');
    const btn4 = document.getElementById('tab-bs4');
    const content5 = document.getElementById('content-bs5');
    const content4 = document.getElementById('content-bs4');

    const activeBtnClass = "nav-btn ripple-container w-full text-left px-5 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center gap-3 shadow-md bg-gradient-to-r from-lavender-100 to-white dark:from-gray-800 dark:to-navy-800 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-500/50 relative overflow-hidden group";
    const inactiveBtnClass = "nav-btn ripple-container w-full text-left px-5 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center gap-3 text-gray-500 dark:text-gray-400 hover:bg-white/60 dark:hover:bg-gray-800/60 hover:text-purple-700 dark:hover:text-purple-300 border border-transparent hover:border-purple-200 dark:hover:border-gray-700 group relative overflow-hidden";

    const activeBadge = (num) => `<div class="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent dark:from-purple-500/20"></div><span class="relative z-10 flex items-center justify-center w-9 h-9 rounded-full bg-purple-600 dark:bg-purple-500 text-white text-sm shadow-sm">${num}</span><span class="relative z-10">App Player ${num}</span>`;
    const inactiveBadge = (num) => `<span class="relative z-10 flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">${num}</span><span class="relative z-10">App Player ${num}</span>`;

    content5.classList.add('hidden');
    content4.classList.add('hidden');

    if (tab === 'bs5') {
        btn5.className = activeBtnClass;
        btn5.innerHTML = activeBadge(5);
        btn4.className = inactiveBtnClass;
        btn4.innerHTML = inactiveBadge(4);
        content5.classList.remove('hidden');
        retriggerCardAnimations(content5);
    } else {
        btn4.className = activeBtnClass;
        btn4.innerHTML = activeBadge(4);
        btn5.className = inactiveBtnClass;
        btn5.innerHTML = inactiveBadge(5);
        content4.classList.remove('hidden');
        retriggerCardAnimations(content4);
    }
}

// Re-trigger staggered card entrance on tab switch (Optimized)
let retriggerTimeout;
function retriggerCardAnimations(container) {
    clearTimeout(retriggerTimeout);
    retriggerTimeout = setTimeout(() => {
        const cards = container.querySelectorAll('.card-enter');
        cards.forEach((card, i) => {
            card.style.animation = 'none';
            void card.offsetHeight; // Force reflow with void operator
            card.style.animation = '';
            card.style.animationDelay = `${Math.min(i * 40, 400)}ms`; // Cap max delay
        });
        initTiltCards();
    }, 50);
}

// ========== Snake Animation (Optimized) ==========
const snake = document.getElementById("snake");
const segmentCount = 20; // Reduced for better performance
const segments = [];

for (let i = 0; i < segmentCount; i++) {
    const segment = document.createElement("div");
    segment.classList.add("snake-segment");
    if (i === 0) {
        segment.classList.add("head");
        const leftEye = document.createElement("div");
        leftEye.classList.add("eye", "left");
        const leftPupil = document.createElement("div");
        leftPupil.classList.add("pupil");
        leftEye.appendChild(leftPupil);
        segment.appendChild(leftEye);

        const rightEye = document.createElement("div");
        rightEye.classList.add("eye", "right");
        const rightPupil = document.createElement("div");
        rightPupil.classList.add("pupil");
        rightEye.appendChild(rightPupil);
        segment.appendChild(rightEye);
    }
    snake.appendChild(segment);
    segments.push({
        element: segment,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
    });
}

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let lastMouseX = mouseX;
let lastMouseY = mouseY;

document.addEventListener("mousemove", throttle((e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
}, 16));

function animateSnake() {
    const head = segments[0];
    head.x += (mouseX - head.x) * 0.15; // Slightly slower for smoothness
    head.y += (mouseY - head.y) * 0.15;
    head.element.style.left = (head.x - 30) + "px";
    head.element.style.top = (head.y - 20) + "px";

    for (let i = 1; i < segments.length; i++) {
        const prev = segments[i - 1];
        const curr = segments[i];

        const dx = prev.x - curr.x;
        const dy = prev.y - curr.y;
        const angle = Math.atan2(dy, dx);
        const segmentLength = 16;

        curr.x = prev.x - Math.cos(angle) * segmentLength;
        curr.y = prev.y - Math.sin(angle) * segmentLength;

        const size = 40 - i * 1.4;
        const finalSize = Math.max(size, 8);
        curr.element.style.width = `${finalSize}px`;
        curr.element.style.height = `${finalSize}px`;
        curr.element.style.left = (curr.x - finalSize / 2) + "px";
        curr.element.style.top = (curr.y - finalSize / 2) + "px";
    }
    requestAnimationFrame(animateSnake);
}

animateSnake();

// ========== 3D Tilt Card Effect (Optimized) ==========
const tiltCardCache = new WeakMap();

function initTiltCards() {
    document.querySelectorAll('.tilt-card').forEach(card => {
        if (tiltCardCache.has(card)) return; // Skip if already initialized

        let tiltTimeout;
        const handlers = {
            mousemove: throttle((e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / centerY * -8;
                const rotateY = (x - centerX) / centerX * 8;
                card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.02)`;
            }, 16),
            mouseleave: () => {
                card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0) scale(1)';
                card.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
                clearTimeout(tiltTimeout);
                tiltTimeout = setTimeout(() => {
                    card.style.transition = '';
                }, 400);
            },
            mouseenter: () => {
                card.style.transition = 'none';
            }
        };

        card.addEventListener('mousemove', handlers.mousemove);
        card.addEventListener('mouseleave', handlers.mouseleave);
        card.addEventListener('mouseenter', handlers.mouseenter);

        tiltCardCache.set(card, handlers);
    });
}

function throttle(func, wait) {
    let timeout = null;
    let previous = 0;
    return function executedFunction(...args) {
        const now = Date.now();
        const remaining = wait - (now - previous);
        clearTimeout(timeout);
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(this, args);
        } else {
            timeout = setTimeout(() => {
                previous = Date.now();
                timeout = null;
                func.apply(this, args);
            }, remaining);
        }
    };
}
initTiltCards();

// ========== Ripple Click Effect (Optimized - Delegated) ==========
document.addEventListener('click', function (e) {
    const btn = e.target.closest('.ripple-container');
    if (!btn) return;

    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}, true);

// ========== Floating Particles (Optimized) ==========
(function () {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true, willReadFrequently: false });
    if (!ctx) return;

    let particles = [];
    const PARTICLE_COUNT = 30; // Reduced for smoother performance

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', throttle(resize, 500));

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: Math.random() * 2.5 + 0.5,
            opacity: Math.random() * 0.3 + 0.1,
            hue: Math.random() * 60 + 250
        });
    }

    let lastTime = performance.now();
    function drawParticles(currentTime) {
        const deltaTime = (currentTime - lastTime) / 16.66; // Normalize to 60fps
        lastTime = currentTime;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, i) => {
            p.x += p.vx * deltaTime;
            p.y += p.vy * deltaTime;

            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            // Draw glow
            const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
            gradient.addColorStop(0, `hsla(${p.hue}, 75%, 60%, ${p.opacity * 0.6})`);
            gradient.addColorStop(1, `hsla(${p.hue}, 75%, 60%, 0)`);
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            // Draw core
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${p.opacity})`;
            ctx.fill();

            // Draw connecting lines (optimized)
            if (i % 2 === 0) { // Only check every other particle
                for (let j = i + 1; j < Math.min(i + 4, particles.length); j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `hsla(270, 60%, 60%, ${0.06 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.4;
                        ctx.stroke();
                    }
                }
            }
        });
        requestAnimationFrame(drawParticles);
    }
    requestAnimationFrame(drawParticles);
})();
