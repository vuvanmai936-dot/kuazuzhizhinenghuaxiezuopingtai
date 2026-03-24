function applyRoomConfig(roomKey, chatTitle, chatStatusTag, chatMeta, chatInput) {
    const config = window.AppState.roomViewConfig[roomKey] || window.AppState.roomViewConfig['global-control'];
    chatTitle.textContent = config.title;
    chatStatusTag.className = config.statusClass;
    chatStatusTag.innerHTML = config.statusHTML;
    chatMeta.innerHTML = config.metaHTML;
    chatInput.placeholder = config.inputPlaceholder;
}

const ROOM_MEMBER_MAP = {
    'global-control': ['陶立春', '钟晓', '耿学玉', '王剑', '邹莹莹', '鞠鹏', '杨进', '陈海萍', '魏强', '傅毅明', '袁晓东', '毛鑫雨', '张琳', '朱真龙', '谢钻鳌', '何熙', '王婧', '追梦', '左同学', 'wzx'],
    'execution-layer': ['陶立春', '钟晓', '耿学玉', '王剑', '邹莹莹', '鞠鹏', '杨进', '陈海萍', '魏强', '傅毅明', '袁晓东', '毛鑫雨', '张琳', '朱真龙', '谢钻鳌', '何熙', '王婧', '追梦', '左同学', 'wzx']
};

const ROOM_DETAIL_MAP = {
    'global-control': {
        groupName: '可信数据空间项目决策群',
        notice: '群主未设置',
        alias: '孙康峰'
    },
    'execution-layer': {
        groupName: '南钢-鑫智链可信数据空间推进群',
        notice: '群主未设置',
        alias: '孙康峰'
    }
};

function bindMemberSidebarToggle() {
    const toggleBtn = document.getElementById('toggle-member-sidebar');
    const sidebar = document.getElementById('member-sidebar');
    if (!toggleBtn || !sidebar || toggleBtn.dataset.bound === '1') return;
    toggleBtn.dataset.bound = '1';
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('hidden');
        toggleBtn.classList.toggle('text-[#1F2329]');
    });
    document.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        if (sidebar.classList.contains('hidden')) return;
        if (target.closest('#member-sidebar') || target.closest('#toggle-member-sidebar')) return;
        sidebar.classList.add('hidden');
        toggleBtn.classList.remove('text-[#1F2329]');
    });
}

function bindGroupSwitcher() {
    const trigger = document.getElementById('group-switch-trigger');
    const panel = document.getElementById('group-switch-panel');
    if (!trigger || !panel || trigger.dataset.bound === '1') return;
    trigger.dataset.bound = '1';
    trigger.addEventListener('click', (event) => {
        event.stopPropagation();
        panel.classList.toggle('hidden');
    });
    document.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        if (target.closest('#group-switch-panel') || target.closest('#group-switch-trigger')) return;
        panel.classList.add('hidden');
    });
}

function renderMemberSidebar(roomKey) {
    const sidebar = document.getElementById('member-sidebar');
    const grid = document.getElementById('member-grid');
    const empty = document.getElementById('member-empty');
    const input = document.getElementById('member-search');
    const groupNameEl = document.getElementById('member-group-name');
    const groupNoticeEl = document.getElementById('member-group-notice');
    const myAliasEl = document.getElementById('member-my-alias');
    if (!sidebar || !grid || !empty) return;

    const list = ROOM_MEMBER_MAP[roomKey] || [];
    const keyword = (input && input.value ? input.value : '').trim().toLowerCase();
    const filtered = list.filter(name => name.toLowerCase().includes(keyword));
    const detail = ROOM_DETAIL_MAP[roomKey] || {
        groupName: '当前会话',
        notice: '群主未设置',
        alias: '陶立春'
    };
    if (groupNameEl) groupNameEl.textContent = detail.groupName;
    if (groupNoticeEl) groupNoticeEl.textContent = detail.notice;
    if (myAliasEl) myAliasEl.textContent = detail.alias;

    if (filtered.length === 0) {
        grid.innerHTML = '';
        empty.classList.remove('hidden');
        return;
    }

    empty.classList.add('hidden');
    grid.innerHTML = filtered.map(name => `
        <div class="flex flex-col items-center">
            <img src="https://i.pravatar.cc/150?u=${encodeURIComponent(name)}" class="w-12 h-12 rounded-md object-cover">
            <span class="text-[11px] text-[#646A73] mt-1 w-full text-center truncate">${name}</span>
        </div>
    `).join('');
}

function bindMemberSearch() {
    const input = document.getElementById('member-search');
    if (!input || input.dataset.bound === '1') return;
    input.dataset.bound = '1';
    input.addEventListener('input', () => {
        renderMemberSidebar(window.AppState.currentRoom);
    });
}

function switchChatRoom(roomKey) {
    if (roomKey === 'execution-layer' && !window.AppState.executionRoom.created) {
        return;
    }
    if (roomKey === 'synergy-layer' && !window.AppState.synergyRoom.created) {
        return;
    }

    const switchStart = performance.now();
    const chatContainer = document.getElementById('chat-container');
    const chatTitle = document.getElementById('chat-title');
    const chatStatusTag = document.getElementById('chat-status-tag');
    const chatMeta = document.getElementById('chat-meta');
    const chatInput = document.querySelector('textarea');

    document.querySelectorAll('.chat-room-item').forEach(item => item.classList.remove('active-room'));
    const activeRoom = document.querySelector(`[data-room="${roomKey}"]`);
    if (activeRoom) activeRoom.classList.add('active-room');
    if (activeRoom) {
        const timeNode = activeRoom.querySelector('span.text-\\[12px\\]');
        if (timeNode) {
            const now = new Date();
            const hh = String(now.getHours()).padStart(2, '0');
            const mm = String(now.getMinutes()).padStart(2, '0');
            timeNode.textContent = `${hh}:${mm}`;
        }
    }

    chatContainer.classList.remove('chat-fade-in');
    chatContainer.classList.add('chat-fade-out');

    setTimeout(() => {
        applyRoomConfig(roomKey, chatTitle, chatStatusTag, chatMeta, chatInput);
        window.AppState.currentRoom = roomKey;
        bindMemberSidebarToggle();
        bindGroupSwitcher();
        bindMemberSearch();
        renderMemberSidebar(roomKey);
        if (roomKey === 'execution-layer') {
            window.renderExecutionLayerMessages();
        } else if (roomKey === 'risk-control') {
            window.renderRiskControlMessages();
        } else if (roomKey === 'synergy-layer') {
            window.renderSynergyLayerMessages();
        } else {
            chatContainer.innerHTML = window.AppState.globalControlMessages;
        }
        if (window.applyWechatMessageGrouping) {
            window.applyWechatMessageGrouping(chatContainer);
        }
        if (window.applySegmentTimeSeparators) {
            window.applySegmentTimeSeparators(chatContainer);
        }
        chatContainer.classList.remove('chat-fade-out');
        chatContainer.classList.add('chat-fade-in');
        window.scrollToBottom();
        const switchDuration = Math.round(performance.now() - switchStart);
        console.log(`[chat-switch] room=${roomKey}, duration=${switchDuration}ms, pass=${switchDuration <= 300}`);
    }, window.AppState.CHAT_SWITCH_ANIMATION_MS);
}

window.switchChatRoom = switchChatRoom;
