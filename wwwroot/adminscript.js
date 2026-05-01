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
        document.getElementById('messages-panel').style.display = 'block';

        loadMessages();

    } catch (err) {
        alert('Could not connect to server.');
        console.error(err);
    }
}

function logout() {
    localStorage.removeItem('adminToken');
    document.getElementById('password-input').value = '';
    document.getElementById('login-box').style.display = 'block';
    document.getElementById('messages-panel').style.display = 'none';
    document.getElementById('login-error').style.display = 'none';
}

// ===================== MESSAGES =====================
async function loadMessages() {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
        const res = await fetch('/admin/messages', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (res.status === 401) {
            logout();
            return;
        }

        const messages = await res.json();
        renderMessages(messages);

    } catch (err) {
        alert('Could not connect to server.');
        console.error(err);
    }
}

function renderMessages(messages) {
    document.getElementById('loading').style.display = 'none';

    const unread = messages.filter(m => !m.isRead).length;
    document.getElementById('stat-total').textContent = messages.length;
    document.getElementById('stat-unread').textContent = unread;
    document.getElementById('stat-read').textContent = messages.length - unread;

    const list = document.getElementById('messages-list');
    list.innerHTML = '';

    if (messages.length === 0) {
        list.innerHTML = '<div class="empty-state">📭 No messages yet.</div>';
        return;
    }

    messages.forEach(msg => {
        const date = new Date(msg.sentAt).toLocaleString();
        const card = document.createElement('div');
        card.className = `message-card ${msg.isRead ? 'read' : 'unread'}`;
        card.id = `card-${msg.id}`;

        card.innerHTML = `
            <div class="card-header">
                <div class="sender-info">
                    <div class="name">${escapeHtml(msg.name)}</div>
                    <div class="email">${escapeHtml(msg.email)}</div>
                </div>
                <div class="card-meta">
                    <div class="date">${date}</div>
                    <span class="${msg.isRead ? 'read-badge' : 'unread-badge'}">
                        ${msg.isRead ? '✓ Read' : '● New'}
                    </span>
                </div>
            </div>
            <div class="message-text">${escapeHtml(msg.message)}</div>
            <div class="card-actions">
                ${!msg.isRead ? `<button class="btn-read" onclick="markRead(${msg.id}, this)">Mark as Read</button>` : ''}
                <button class="btn-delete" onclick="deleteMessage(${msg.id})">Delete</button>
            </div>
        `;
        list.appendChild(card);
    });
}

async function markRead(id, btn) {
    const token = localStorage.getItem('adminToken');
    try {
        const res = await fetch(`/admin/messages/${id}/read`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
            const card = document.getElementById(`card-${id}`);
            card.classList.remove('unread');
            card.classList.add('read');
            btn.remove();
            card.querySelector('.unread-badge').outerHTML = '<span class="read-badge">✓ Read</span>';
            const unreadCount = parseInt(document.getElementById('stat-unread').textContent);
            const readCount = parseInt(document.getElementById('stat-read').textContent);
            document.getElementById('stat-unread').textContent = unreadCount - 1;
            document.getElementById('stat-read').textContent = readCount + 1;
        }
    } catch (err) { console.error(err); }
}

async function deleteMessage(id) {
    if (!confirm('Delete this message permanently?')) return;
    const token = localStorage.getItem('adminToken');
    try {
        const res = await fetch(`/admin/messages/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
            document.getElementById(`card-${id}`).remove();
            const total = parseInt(document.getElementById('stat-total').textContent);
            document.getElementById('stat-total').textContent = total - 1;
        }
    } catch (err) { console.error(err); }
}

// ===================== UTILS =====================
function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// ===================== AUTO LOGIN CHECK =====================
// If token already exists in localStorage, skip login screen
window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('adminToken');
    if (token) {
        document.getElementById('login-box').style.display = 'none';
        document.getElementById('messages-panel').style.display = 'block';
        loadMessages();
    }
});