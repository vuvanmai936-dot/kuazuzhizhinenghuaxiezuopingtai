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
            executionPreview.textContent = '执行辅助智能体: 已派发协同工单...';
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
    bindRoomEvents();
    window.initTicketDrawer();
    syncRoomPreviewByStatus(window.AppState.ticketStatus);

    window.AppEvents.addEventListener('ticket-status-changed', event => {
        const status = event.detail.status;
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

    if (window.bindProactiveRiskActions) {
        window.bindProactiveRiskActions();
    }
    const proactiveTrigger = document.getElementById('btn-trigger-proactive-risk');
    if (proactiveTrigger) {
        proactiveTrigger.addEventListener('click', () => {
            if (window.triggerProactiveRiskWarning) {
                window.triggerProactiveRiskWarning();
            }
        });
    }

    const bootRoom = getBootRoomFromQuery();
    if (bootRoom && bootRoom !== 'global-control') {
        window.switchChatRoom(bootRoom);
    }
});
