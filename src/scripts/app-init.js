function bindRoomEvents() {
    const riskRoom = document.querySelector('[data-room="risk-control"]');
    const executionRoom = document.getElementById('room-execution');
    const synergyRoom = document.getElementById('room-synergy');
    const globalRoom = document.querySelector('[data-room="global-control"]');

    if (riskRoom) {
        riskRoom.addEventListener('click', () => window.switchChatRoom('risk-control'));
    }
    if (executionRoom) {
        executionRoom.addEventListener('click', () => window.switchChatRoom('execution-layer'));
    }
    if (globalRoom) {
        globalRoom.addEventListener('click', () => window.switchChatRoom('global-control'));
    }
    if (synergyRoom) {
        synergyRoom.addEventListener('click', () => window.switchChatRoom('synergy-layer'));
    }
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

    if (window.AppState.executionRoom.created) {
        executionRoom.classList.remove('hidden');
        const timeEl = executionRoom.querySelector('.text-xs');
        const clockLabel = toClockLabel(window.AppState.executionRoom.createdAt);
        if (timeEl && clockLabel) {
            timeEl.textContent = clockLabel;
        }
        return;
    }
    executionRoom.classList.add('hidden');
}

function getBootRoomFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const room = params.get('room');
    if (!room) return null;

    const validRooms = Object.keys(window.AppState.roomViewConfig || {});
    if (!validRooms.includes(room)) return null;
    return room;
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

document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat-container');
    window.AppState.globalControlMessages = chatContainer ? chatContainer.innerHTML : '';
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
    const proactiveTriggerBtn = document.getElementById('btn-trigger-proactive-risk');
    const proactiveTriggerIcon = document.getElementById('trigger-proactive-alert');
    const triggerProactiveRisk = () => {
        if (window.triggerProactiveRiskWarning) {
            window.triggerProactiveRiskWarning();
        }
    };
    if (proactiveTriggerBtn) {
        proactiveTriggerBtn.addEventListener('click', triggerProactiveRisk);
    }
    if (proactiveTriggerIcon) {
        proactiveTriggerIcon.addEventListener('click', triggerProactiveRisk);
    }

    const bootRoom = getBootRoomFromQuery();
    if (bootRoom && bootRoom !== 'global-control') {
        window.switchChatRoom(bootRoom);
    }
});
