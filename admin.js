// ========== Admin Logic ==========

let currentCategoryId = null;
let currentItemId = null;

// Modal Toggles
function showLoginModal() { document.getElementById('login-modal').classList.remove('hidden'); }
function hideLoginModal() { document.getElementById('login-modal').classList.add('hidden'); }

function showAdminDashboard() { 
    document.getElementById('admin-dashboard').classList.remove('hidden'); 
    loadAdminCategories();
    loadAdminItems();
}
function hideAdminDashboard() { document.getElementById('admin-dashboard').classList.add('hidden'); }

function showCategoryModal(id = null, name = '', number = '') {
    currentCategoryId = id;
    document.getElementById('category-modal-title').textContent = id ? 'Edit Version' : 'Add Version';
    document.getElementById('cat-name').value = name;
    document.getElementById('cat-number').value = number;
    document.getElementById('category-modal').classList.remove('hidden');
}
function hideCategoryModal() { document.getElementById('category-modal').classList.add('hidden'); }

function showItemModal(id = null, data = {}) {
    currentItemId = id;
    document.getElementById('item-modal-title').textContent = id ? 'Edit Download' : 'Add Download';
    document.getElementById('item-version').value = data.version || '';
    document.getElementById('item-url').value = data.url || '';
    document.getElementById('item-category').value = data.categoryId || '';
    document.getElementById('tag-latest').checked = data.tags?.includes('Latest') || false;
    document.getElementById('tag-most').checked = data.tags?.includes('Most Downloaded') || false;
    document.getElementById('tag-suggested').checked = data.isSuggested || false;
    document.getElementById('item-modal').classList.remove('hidden');
}
function hideItemModal() { document.getElementById('item-modal').classList.add('hidden'); }

// Authentication
async function handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    try {
        await auth.signInWithEmailAndPassword(email, password);
        showToast('🔓 Login successful');
        hideLoginModal();
        showAdminDashboard();
    } catch (error) {
        showToast('❌ Login failed: ' + error.message);
    }
}

async function logout() {
    await auth.signOut();
    showToast('🔒 Logged out');
    hideAdminDashboard();
}

// Observe Auth State
auth.onAuthStateChanged(user => {
    if (user) {
        document.querySelector('[onclick="showLoginModal()"]').innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> Admin Panel';
        document.querySelector('[onclick="showLoginModal()"]').onclick = showAdminDashboard;
    }
});

// Category CRUD
async function loadAdminCategories() {
    const snapshot = await db.collection('categories').orderBy('order', 'asc').get();
    const list = document.getElementById('admin-categories-list');
    const select = document.getElementById('item-category');
    const filter = document.getElementById('admin-category-filter');
    
    list.innerHTML = '';
    select.innerHTML = '<option value="">Select Category</option>';
    filter.innerHTML = '<option value="">All Categories</option>';

    snapshot.forEach(doc => {
        const cat = doc.data();
        list.innerHTML += `
            <div class="bg-white dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700 flex items-center justify-between shadow-sm">
                <div>
                    <p class="font-bold text-purple-600">${cat.name}</p>
                    <p class="text-xs text-gray-500">Number: ${cat.number}</p>
                </div>
                <div class="flex gap-2">
                    <button onclick="showCategoryModal('${doc.id}', '${cat.name}', '${cat.number}')" class="text-blue-500 hover:text-blue-700">✎</button>
                    <button onclick="deleteCategory('${doc.id}')" class="text-red-500 hover:text-red-700">🗑</button>
                </div>
            </div>
        `;
        select.innerHTML += `<option value="${doc.id}">${cat.name}</option>`;
        filter.innerHTML += `<option value="${doc.id}">${cat.name}</option>`;
    });
}

async function saveCategory() {
    const name = document.getElementById('cat-name').value;
    const number = document.getElementById('cat-number').value;
    if (!name || !number) return showToast('⚠️ Fill all fields');

    const data = { name, number, order: parseInt(number) || 0 };
    try {
        if (currentCategoryId) {
            await db.collection('categories').doc(currentCategoryId).update(data);
            showToast('✅ Category updated');
        } else {
            await db.collection('categories').add(data);
            showToast('✅ Category added');
        }
        hideCategoryModal();
        loadAdminCategories();
    } catch (e) { showToast('❌ Error: ' + e.message); }
}

async function deleteCategory(id) {
    if (!confirm('Are you sure? This will not delete items in this category.')) return;
    await db.collection('categories').doc(id).delete();
    loadAdminCategories();
}

// Item CRUD
async function loadAdminItems() {
    const categoryId = document.getElementById('admin-category-filter').value;
    let query = db.collection('downloads');
    if (categoryId) query = query.where('categoryId', '==', categoryId);
    
    const snapshot = await query.orderBy('timestamp', 'desc').get();
    const list = document.getElementById('admin-items-list');
    list.innerHTML = '';

    snapshot.forEach(doc => {
        const item = doc.data();
        list.innerHTML += `
            <div class="bg-white dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700 flex items-center justify-between shadow-sm">
                <div class="flex-1">
                    <div class="flex items-center gap-2">
                        <span class="font-bold">v${item.version}</span>
                        ${item.tags?.map(t => `<span class="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-600 font-bold">${t}</span>`).join('')}
                        ${item.isSuggested ? `<span class="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 font-bold">Suggested</span>` : ''}
                    </div>
                    <p class="text-xs text-gray-400 truncate max-w-md">${item.url}</p>
                </div>
                <div class="flex gap-3">
                    <button onclick="editItem('${doc.id}')" class="text-blue-500 font-bold">Edit</button>
                    <button onclick="deleteItem('${doc.id}')" class="text-red-500 font-bold">Delete</button>
                </div>
            </div>
        `;
    });
}

async function editItem(id) {
    const doc = await db.collection('downloads').doc(id).get();
    showItemModal(id, doc.data());
}

async function saveItem() {
    const categoryId = document.getElementById('item-category').value;
    const version = document.getElementById('item-version').value;
    const url = document.getElementById('item-url').value;
    const tags = [];
    if (document.getElementById('tag-latest').checked) tags.push('Latest');
    if (document.getElementById('tag-most').checked) tags.push('Most Downloaded');
    const isSuggested = document.getElementById('tag-suggested').checked;

    if (!categoryId || !version || !url) return showToast('⚠️ Fill all fields');

    const data = { categoryId, version, url, tags, isSuggested, timestamp: firebase.firestore.FieldValue.serverTimestamp() };
    try {
        if (currentItemId) {
            await db.collection('downloads').doc(currentItemId).update(data);
            showToast('✅ Download updated');
        } else {
            await db.collection('downloads').add(data);
            showToast('✅ Download added');
        }
        hideItemModal();
        loadAdminItems();
    } catch (e) { showToast('❌ Error: ' + e.message); }
}

async function deleteItem(id) {
    if (!confirm('Delete this download?')) return;
    await db.collection('downloads').doc(id).delete();
    loadAdminItems();
}

function showAddCategoryForm() { showCategoryModal(); }
function showAddItemForm() { showItemModal(); }
