// ===================== AUTH =====================
async function login() {
    const input = document.getElementById('password-input').value;
    if (!input) return;

    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: input })
        });

        if (res.status === 401) {
            document.getElementById('login-error').style.display = 'block';
            return;
        }

        const data = await res.json();
        localStorage.setItem('adminToken', data.token);

        document.getElementById('login-error').style.display = 'none';
        document.getElementById('login-box').style.display = 'none';
        document.getElementById('portfolio-panel').style.display = 'block';

        loadItems();

    } catch (err) {
        alert('Could not connect to server.');
        console.error(err);
    }
}

function logout() {
    localStorage.removeItem('adminToken');
    document.getElementById('password-input').value = '';
    document.getElementById('login-box').style.display = 'block';
    document.getElementById('portfolio-panel').style.display = 'none';
    document.getElementById('login-error').style.display = 'none';
}

// ===================== LOAD ITEMS =====================
async function loadItems() {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
        const res = await fetch('/api/portfolio', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (res.status === 401) { logout(); return; }

        const items = await res.json();
        renderItems(items);

    } catch (err) {
        alert('Could not connect to server.');
        console.error(err);
    }
}

// ===================== RENDER ITEMS =====================
function renderItems(items) {
    document.getElementById('loading').style.display = 'none';

    const list = document.getElementById('portfolio-list');
    list.innerHTML = '';

    if (items.length === 0) {
        list.innerHTML = '<div class="empty-state">📭 No portfolio items yet.</div>';
        return;
    }

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'portfolio-card';
        card.id = `card-${item.id}`;

        card.innerHTML = `
            <div class="card-header">
                <div class="item-title">${escapeHtml(item.title)}</div>
                <span class="item-category">${escapeHtml(item.category)}</span>
            </div>
            <div class="item-description">${escapeHtml(item.description)}</div>
            <div class="item-langs">
                <span>🇰🇬 ${escapeHtml(item.titleKy) || '—'}</span>
                <span>🇷🇺 ${escapeHtml(item.titleRu) || '—'}</span>
            </div>
            <div class="item-urls">
                <span>🖼️ ${escapeHtml(item.imageUrl) || '—'}</span>
                <span>🔗 ${escapeHtml(item.projectUrl) || '—'}</span>
            </div>
            <div class="card-actions">
                <button class="btn-edit" onclick="startEdit(
                    ${item.id},
                    '${escapeForAttr(item.title)}',
                    '${escapeForAttr(item.description)}',
                    '${escapeForAttr(item.titleKy)}',
                    '${escapeForAttr(item.descriptionKy)}',
                    '${escapeForAttr(item.titleRu)}',
                    '${escapeForAttr(item.descriptionRu)}',
                    '${escapeForAttr(item.category)}',
                    '${escapeForAttr(item.imageUrl)}',
                    '${escapeForAttr(item.projectUrl)}'
                )">✏️ Edit</button>
                <button class="btn-delete-item" onclick="deleteItem(${item.id})">
                    🗑️ Delete
                </button>
            </div>
        `;
        list.appendChild(card);
    });
}

// ===================== SAVE (CREATE or UPDATE) =====================
async function saveItem() {
    const token = localStorage.getItem('adminToken');
    const id    = document.getElementById('edit-id').value;

    const payload = {
        title:          document.getElementById('input-title').value.trim(),
        description:    document.getElementById('input-description').value.trim(),
        titleKy:        document.getElementById('input-titleKy').value.trim(),
        descriptionKy:  document.getElementById('input-descriptionKy').value.trim(),
        titleRu:        document.getElementById('input-titleRu').value.trim(),
        descriptionRu:  document.getElementById('input-descriptionRu').value.trim(),
        category:       document.getElementById('input-category').value.trim(),
        imageUrl:       document.getElementById('input-imageUrl').value.trim(),
        projectUrl:     document.getElementById('input-projectUrl').value.trim()
    };

    if (!payload.title) {
        alert('English title is required.');
        return;
    }

    try {
        const isEdit = id !== '';
        const url    = isEdit ? `/api/portfolio/${id}` : '/api/portfolio';
        const method = isEdit ? 'PUT' : 'POST';

        const res = await fetch(url, {
            method,
            headers: {
                'Content-Type':  'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(isEdit ? { ...payload, id: parseInt(id) } : payload)
        });

        if (res.status === 401) { logout(); return; }

        if (res.ok) {
            clearForm();
            loadItems();
        } else {
            alert('Something went wrong. Please try again.');
        }

    } catch (err) {
        alert('Could not connect to server.');
        console.error(err);
    }
}

// ===================== EDIT =====================
function startEdit(id, title, description, titleKy, descriptionKy,
                   titleRu, descriptionRu, category, imageUrl, projectUrl) {

    document.getElementById('edit-id').value            = id;
    document.getElementById('input-title').value        = title;
    document.getElementById('input-description').value  = description;
    document.getElementById('input-titleKy').value      = titleKy;
    document.getElementById('input-descriptionKy').value = descriptionKy;
    document.getElementById('input-titleRu').value      = titleRu;
    document.getElementById('input-descriptionRu').value = descriptionRu;
    document.getElementById('input-category').value     = category;
    document.getElementById('input-imageUrl').value     = imageUrl;
    document.getElementById('input-projectUrl').value   = projectUrl;

    document.getElementById('form-title').textContent       = '✏️ Edit Item';
    document.getElementById('cancel-btn').style.display     = 'inline-block';

    document.querySelector('.form-box').scrollIntoView({ behavior: 'smooth' });
}

function cancelEdit() {
    clearForm();
}

function clearForm() {
    document.getElementById('edit-id').value             = '';
    document.getElementById('input-title').value         = '';
    document.getElementById('input-description').value   = '';
    document.getElementById('input-titleKy').value       = '';
    document.getElementById('input-descriptionKy').value = '';
    document.getElementById('input-titleRu').value       = '';
    document.getElementById('input-descriptionRu').value = '';
    document.getElementById('input-category').value      = '';
    document.getElementById('input-imageUrl').value      = '';
    document.getElementById('input-projectUrl').value    = '';

    document.getElementById('form-title').textContent    = '➕ Add New Item';
    document.getElementById('cancel-btn').style.display  = 'none';
}

// ===================== DELETE =====================
async function deleteItem(id) {
    if (!confirm('Delete this portfolio item permanently?')) return;
    const token = localStorage.getItem('adminToken');

    try {
        const res = await fetch(`/api/portfolio/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (res.status === 401) { logout(); return; }

        if (res.ok) {
            document.getElementById(`card-${id}`).remove();
        } else {
            alert('Something went wrong. Please try again.');
        }

    } catch (err) {
        alert('Could not connect to server.');
        console.error(err);
    }
}

// ===================== UTILS =====================
function escapeHtml(text) {
    if (!text) return '';
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function escapeForAttr(text) {
    if (!text) return '';
    return text
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/"/g, '&quot;')
        .replace(/\n/g, ' ');
}

// ===================== AUTO LOGIN CHECK =====================
window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('adminToken');
    if (token) {
        document.getElementById('login-box').style.display       = 'none';
        document.getElementById('portfolio-panel').style.display = 'block';
        loadItems();
    }
});