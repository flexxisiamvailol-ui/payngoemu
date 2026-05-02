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

// ========== Firebase Data Integration ==========
let categories = [];
let downloads = [];

async function initData() {
    try {
        // Fetch Categories
        const catSnapshot = await db.collection('categories').orderBy('order', 'asc').get();
        categories = catSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Fetch Downloads
        const dlSnapshot = await db.collection('downloads').orderBy('version', 'desc').get();
        downloads = dlSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        renderSidebar();
        if (categories.length > 0) {
            switchTab(categories[0].id);
        }
    } catch (e) {
        console.error("Error loading data:", e);
        showToast("❌ Error loading content");
    }
}

function renderSidebar() {
    const nav = document.querySelector('nav');
    // Keep search and basic structure, only replace dynamic buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => btn.remove());

    const searchContainer = document.querySelector('.search-container');
    
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.onclick = () => switchTab(cat.id);
        btn.id = `tab-${cat.id}`;
        btn.className = "nav-btn ripple-container w-full text-left px-5 py-4 rounded-2xl font-bold flex items-center gap-3 text-gray-500 dark:text-gray-400 hover:bg-white/60 dark:hover:bg-gray-800/60 hover:text-purple-700 dark:hover:text-purple-300 border border-transparent hover:border-purple-200 dark:hover:border-gray-700 group relative overflow-hidden";
        btn.innerHTML = `
            <span class="relative z-10 flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">${cat.number}</span>
            <span class="relative z-10">${cat.name}</span>
        `;
        searchContainer.after(btn);
    });
}

function generateButtonsHTML(links) {
    return links.map((link, index) => {
        let badges = '';
        if (link.tags?.includes('Latest')) badges += '<span class="badge-latest">Latest</span>';
        if (link.tags?.includes('Most Downloaded')) badges += '<span class="badge-most">Most Downloaded</span>';
        if (link.isSuggested) badges += '<span class="badge-suggested">Suggested</span>';

        return `
            <a href="${link.url}" target="_blank" class="tilt-card ripple-container card-enter group relative overflow-hidden flex flex-col justify-center p-5 bg-white/70 dark:bg-gray-800/60 rounded-[1.25rem] border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300 backdrop-blur-sm" style="animation-delay: ${index * 40}ms">
                ${badges}
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
        `;
    }).join('');
}

function switchTab(tabId) {
    const navButtons = document.querySelectorAll('.nav-btn');
    const contentContainer = document.getElementById('dynamic-content-container');
    
    // Hide old contents
    document.getElementById('content-bs5').classList.add('hidden');
    document.getElementById('content-bs4').classList.add('hidden');

    const activeBtnClass = "nav-btn ripple-container w-full text-left px-5 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center gap-3 shadow-md bg-gradient-to-r from-lavender-100 to-white dark:from-gray-800 dark:to-navy-800 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-500/50 relative overflow-hidden group";
    const inactiveBtnClass = "nav-btn ripple-container w-full text-left px-5 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center gap-3 text-gray-500 dark:text-gray-400 hover:bg-white/60 dark:hover:bg-gray-800/60 hover:text-purple-700 dark:hover:text-purple-300 border border-transparent hover:border-purple-200 dark:hover:border-gray-700 group relative overflow-hidden";

    navButtons.forEach(btn => {
        const catId = btn.id.replace('tab-', '');
        const cat = categories.find(c => c.id === catId);
        if (!cat) return;

        if (catId === tabId) {
            btn.className = activeBtnClass;
            btn.innerHTML = `<div class="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent dark:from-purple-500/20"></div><span class="relative z-10 flex items-center justify-center w-9 h-9 rounded-full bg-purple-600 dark:bg-purple-500 text-white text-sm shadow-sm">${cat.number}</span><span class="relative z-10">${cat.name}</span>`;
        } else {
            btn.className = inactiveBtnClass;
            btn.innerHTML = `<span class="relative z-10 flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">${cat.number}</span><span class="relative z-10">${cat.name}</span>`;
        }
    });

    const filteredDownloads = downloads.filter(dl => dl.categoryId === tabId);
    contentContainer.innerHTML = `<div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 fade-in">${generateButtonsHTML(filteredDownloads)}</div>`;
    retriggerCardAnimations(contentContainer);
}

initData();

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
