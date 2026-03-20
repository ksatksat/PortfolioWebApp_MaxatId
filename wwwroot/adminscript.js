let adminPassword = '';

        function login() {
            const input = document.getElementById('password-input').value;
            if (!input) return;

            adminPassword = input;
            loadMessages();
        }

        function logout() {
            adminPassword = '';
            document.getElementById('password-input').value = '';
            document.getElementById('login-box').style.display = 'block';
            document.getElementById('messages-panel').style.display = 'none';
            document.getElementById('login-error').style.display = 'none';
        }

        async function loadMessages() {
            try {
                const res = await fetch(`/admin/messages?password=${encodeURIComponent(adminPassword)}`);

                if (res.status === 401) {
                    document.getElementById('login-error').style.display = 'block';
                    adminPassword = '';
                    return;
                }

                // Password correct — show panel
                document.getElementById('login-error').style.display = 'none';
                document.getElementById('login-box').style.display = 'none';
                document.getElementById('messages-panel').style.display = 'block';

                const messages = await res.json();
                renderMessages(messages);

            } catch (err) {
                alert('Could not connect to server.');
                console.error(err);
            }
        }

        function renderMessages(messages) {
            document.getElementById('loading').style.display = 'none';

            // Stats
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
            try {
                const res = await fetch(`/admin/messages/${id}/read?password=${encodeURIComponent(adminPassword)}`, {
                    method: 'PUT'
                });
                if (res.ok) {
                    const card = document.getElementById(`card-${id}`);
                    card.classList.remove('unread');
                    card.classList.add('read');
                    btn.remove();
                    card.querySelector('.unread-badge').outerHTML = '<span class="read-badge">✓ Read</span>';
                    // Update stats
                    const unreadCount = parseInt(document.getElementById('stat-unread').textContent);
                    const readCount = parseInt(document.getElementById('stat-read').textContent);
                    document.getElementById('stat-unread').textContent = unreadCount - 1;
                    document.getElementById('stat-read').textContent = readCount + 1;
                }
            } catch (err) { console.error(err); }
        }

        async function deleteMessage(id) {
            if (!confirm('Delete this message permanently?')) return;
            try {
                const res = await fetch(`/admin/messages/${id}?password=${encodeURIComponent(adminPassword)}`, {
                    method: 'DELETE'
                });
                if (res.ok) {
                    const card = document.getElementById(`card-${id}`);
                    card.remove();
                    // Reload stats
                    const total = parseInt(document.getElementById('stat-total').textContent);
                    document.getElementById('stat-total').textContent = total - 1;
                }
            } catch (err) { console.error(err); }
        }

        function escapeHtml(text) {
            return text
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;');
        }