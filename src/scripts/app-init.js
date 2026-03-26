function bindRoomEvents() {
    const roomItems = Array.from(document.querySelectorAll('.chat-room-item[data-room]'));
    roomItems.forEach((item) => {
        if (!(item instanceof HTMLElement)) return;
        if (item.dataset.bound === '1') return;
        const room = item.dataset.room;
        if (!room) return;
        item.dataset.bound = '1';
        item.addEventListener('click', () => window.switchChatRoom(room));
    });
}

function toClockLabel(isoString) {
    if (!isoString) return '';
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return '';
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    return `${h}:${m}`;
}

function syncSynergyRoomVisibility() {
    const synergyRoom = document.getElementById('room-synergy');
    if (!synergyRoom) return;

    if (window.AppState.synergyRoom.created) {
        synergyRoom.classList.remove('hidden');
        const timeEl = synergyRoom.querySelector('.text-xs');
        const previewEl = synergyRoom.querySelector('p');
        const clockLabel = toClockLabel(window.AppState.synergyRoom.createdAt);
        if (timeEl && clockLabel) {
            timeEl.textContent = clockLabel;
        }
        if (previewEl) {
            previewEl.className = 'text-[13px] text-[#3370FF] truncate';
            previewEl.textContent = '协同管控智能体: 已创建临时协同群并同步工单。';
        }
        return;
    }

    synergyRoom.classList.add('hidden');
}

function syncExecutionRoomVisibility() {
    const executionRoom = document.getElementById('room-execution');
    if (!executionRoom) return;

    executionRoom.classList.remove('hidden');
    if (!window.AppState.executionRoom.created) {
        return;
    }

    const timeEl = executionRoom.querySelector('.text-xs');
    const clockLabel = toClockLabel(window.AppState.executionRoom.createdAt);
    if (timeEl && clockLabel) {
        timeEl.textContent = clockLabel;
    }
}

function getBootRoomFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const room = params.get('room');
    if (!room) return null;

    const validRooms = Object.keys(window.AppState.roomViewConfig || {});
    if (!validRooms.includes(room)) return null;
    return room;
}

function getBootPlaybookFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const raw = (params.get('playbook') || '').trim().toLowerCase();
    if (!raw) return null;

    if (raw === 'a' || raw === '1' || raw === 'playbooka') return 'playbookA';
    if (raw === 'b' || raw === '2' || raw === 'playbookb') return 'playbookB';
    return null;
}

function syncRoomPreviewByStatus(status) {
    const executionPreview = document.querySelector('#room-execution p');
    const synergyPreview = document.querySelector('#room-synergy p');

    if (executionPreview) {
        if (status === 'rejected' || status === 'needs_rework') {
            executionPreview.className = 'text-[13px] text-[#D83931] truncate';
            executionPreview.textContent = '执行辅助智能体: 协同层已驳回，请补充脱敏声明后重提。';
        } else if (status === 'resubmitted') {
            executionPreview.className = 'text-[13px] text-[#3370FF] truncate';
            executionPreview.textContent = '执行辅助智能体: 已挂载脱敏规则并重新提单。';
        } else {
            executionPreview.className = 'text-[13px] text-[#3370FF] truncate';
            if (window.AppState.proactiveRisk.status !== 'risk_detected' && !window.AppState.dispatchAuthorized) {
                executionPreview.textContent = `主智能体: 主动巡检督办 ${window.AppState.proactiveRisk.supervisionCode} 处理中...`;
            } else if (status === 'approved') {
                executionPreview.textContent = '执行辅助智能体: 8080端口恢复，工单已闭环。';
            } else if (window.AppState.synergyRoom.created) {
                executionPreview.textContent = '执行辅助智能体: 已派发协同工单...';
            } else if (window.AppState.dispatchAuthorized) {
                executionPreview.textContent = '执行辅助智能体: 已接收总控调度，执行处理中...';
            } else {
                executionPreview.textContent = '执行辅助智能体: 已生成调度建议，待授权下发...';
            }
        }
    }

    if (synergyPreview) {
        if (status === 'rejected' || status === 'needs_rework') {
            synergyPreview.className = 'text-[13px] text-[#D83931] truncate';
            synergyPreview.textContent = '协同管控智能体: 工单驳回并打回执行层。';
        } else if (status === 'approved') {
            synergyPreview.className = 'text-[13px] text-[#3370FF] truncate';
            synergyPreview.textContent = '协同管控智能体: 授权放行成功，工单已闭环。';
        } else {
            synergyPreview.className = 'text-[13px] text-[#3370FF] truncate';
            synergyPreview.textContent = '协同管控智能体: 【工单升级】待审批...';
        }
    }
}

function syncPlaybookSwitcherUi() {
    const switcher = document.getElementById('playbook-switcher');
    if (!switcher) return;
    const buttons = Array.from(switcher.querySelectorAll('button[data-playbook]'));
    buttons.forEach(btn => {
        if (!(btn instanceof HTMLButtonElement)) return;
        const active = btn.dataset.playbook === window.AppState.activePlaybook;
        btn.classList.toggle('bg-[#3370FF]', active);
        btn.classList.toggle('text-white', active);
        btn.classList.toggle('bg-white', !active);
        btn.classList.toggle('text-[#646A73]', !active);
    });
}

function resetGlobalControlTimeline() {
    const chatContainer = document.getElementById('chat-container');
    if (!chatContainer) return;
    chatContainer.innerHTML = `
        <div class="flex justify-center py-1">
            <span class="text-[12px] text-[#B3B5B9]">10:40</span>
        </div>
        <div id="dynamic-content"></div>
    `;
    if (window.applyWechatMessageGrouping) {
        window.applyWechatMessageGrouping(chatContainer);
    }
    if (window.applySegmentTimeSeparators) {
        window.applySegmentTimeSeparators(chatContainer);
    }
    window.AppState.decisionActOneFinished = false;
    window.AppState.globalControlMessages = chatContainer.innerHTML;
    window.scrollToBottom && window.scrollToBottom();
}

function bindPlaybookSwitcher() {
    const switcher = document.getElementById('playbook-switcher');
    if (!switcher || switcher.dataset.bound === '1') return;
    switcher.dataset.bound = '1';
    syncPlaybookSwitcherUi();

    switcher.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        const button = target.closest('button[data-playbook]');
        if (!(button instanceof HTMLButtonElement)) return;

        const nextPlaybook = button.dataset.playbook;
        if (nextPlaybook !== 'playbookA' && nextPlaybook !== 'playbookB') return;
        if (window.AppState.activePlaybook === nextPlaybook) return;

        window.AppState.activePlaybook = nextPlaybook;
        syncPlaybookSwitcherUi();
        if (window.AppState.currentRoom === 'global-control') {
            resetGlobalControlTimeline();
        }
        if (window.persistClientState && window.getPersistedUiState) {
            window.persistClientState(window.getPersistedUiState());
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat-container');
    const playbookFromQuery = getBootPlaybookFromQuery();
    if (playbookFromQuery) {
        window.AppState.activePlaybook = playbookFromQuery;
    }
    if (chatContainer && window.applyWechatMessageGrouping) {
        window.applyWechatMessageGrouping(chatContainer);
    }
    if (chatContainer && window.applySegmentTimeSeparators) {
        window.applySegmentTimeSeparators(chatContainer);
    }
    window.AppState.globalControlMessages = chatContainer ? chatContainer.innerHTML : '';
    if (window.initDecisionActOnePlayback) {
        window.initDecisionActOnePlayback();
    }
    bindPlaybookSwitcher();
    syncExecutionRoomVisibility();
    syncSynergyRoomVisibility();
    bindRoomEvents();
    window.initTicketDrawer();
    syncRoomPreviewByStatus(window.AppState.ticketStatus);

    window.AppEvents.addEventListener('ticket-status-changed', event => {
        const status = event.detail.status;
        syncExecutionRoomVisibility();
        syncSynergyRoomVisibility();
        syncRoomPreviewByStatus(status);

        if (window.AppState.currentRoom === 'execution-layer') {
            window.renderExecutionLayerMessages();
            window.scrollToBottom();
        }
        if (window.AppState.currentRoom === 'synergy-layer') {
            window.renderSynergyLayerMessages();
            window.scrollToBottom();
        }
    });

    window.AppEvents.addEventListener('proactive-risk-status-changed', () => {
        syncExecutionRoomVisibility();
        syncSynergyRoomVisibility();
        syncRoomPreviewByStatus(window.AppState.ticketStatus);
        if (window.AppState.currentRoom === 'execution-layer') {
            window.renderExecutionLayerMessages();
            window.scrollToBottom();
        }
        if (window.AppState.currentRoom === 'risk-control') {
            window.renderRiskControlMessages();
            window.scrollToBottom();
        }
        if (window.AppState.currentRoom === 'global-control') {
            const chatContainer = document.getElementById('chat-container');
            if (chatContainer && window.triggerProactiveRiskWarning) {
                chatContainer.innerHTML = window.AppState.globalControlMessages;
                window.triggerProactiveRiskWarning();
            }
        }
    });

    if (window.bindProactiveRiskActions) {
        window.bindProactiveRiskActions();
    }
    const persistedUi = window.getPersistedUiState ? window.getPersistedUiState() : {};
    const memberSidebar = document.getElementById('member-sidebar');
    const memberSidebarToggle = document.getElementById('toggle-member-sidebar');
    const groupSwitchPanel = document.getElementById('group-switch-panel');
    if (memberSidebar && persistedUi.memberSidebarOpen) {
        memberSidebar.classList.remove('hidden');
        if (memberSidebarToggle) memberSidebarToggle.classList.add('text-[#1F2329]');
    }
    if (groupSwitchPanel && persistedUi.groupSwitchOpen) {
        groupSwitchPanel.classList.remove('hidden');
    }
    const bootRoom = getBootRoomFromQuery();
    if (bootRoom && bootRoom !== 'global-control') {
        window.switchChatRoom(bootRoom);
    } else if (persistedUi.lastRoom && persistedUi.lastRoom !== 'global-control') {
        window.switchChatRoom(persistedUi.lastRoom);
    } else {
        window.switchChatRoom('global-control');
    }
    if (playbookFromQuery && window.persistClientState && window.getPersistedUiState) {
        window.persistClientState(window.getPersistedUiState());
    }
    syncPlaybookSwitcherUi();
});
