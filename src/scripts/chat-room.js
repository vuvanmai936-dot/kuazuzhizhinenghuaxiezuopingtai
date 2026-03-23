function applyRoomConfig(roomKey, chatTitle, chatStatusTag, chatMeta, chatInput) {
    const config = window.AppState.roomViewConfig[roomKey] || window.AppState.roomViewConfig['global-control'];
    chatTitle.textContent = config.title;
    chatStatusTag.className = config.statusClass;
    chatStatusTag.innerHTML = config.statusHTML;
    chatMeta.innerHTML = config.metaHTML;
    chatInput.placeholder = config.inputPlaceholder;
}

function switchChatRoom(roomKey) {
    const switchStart = performance.now();
    const chatContainer = document.getElementById('chat-container');
    const chatTitle = document.getElementById('chat-title');
    const chatStatusTag = document.getElementById('chat-status-tag');
    const chatMeta = document.getElementById('chat-meta');
    const chatInput = document.querySelector('textarea');

    document.querySelectorAll('.chat-room-item').forEach(item => item.classList.remove('active-room'));
    const activeRoom = document.querySelector(`[data-room="${roomKey}"]`);
    if (activeRoom) activeRoom.classList.add('active-room');

    chatContainer.classList.remove('chat-fade-in');
    chatContainer.classList.add('chat-fade-out');

    setTimeout(() => {
        applyRoomConfig(roomKey, chatTitle, chatStatusTag, chatMeta, chatInput);
        window.AppState.currentRoom = roomKey;
        if (roomKey === 'execution-layer') {
            window.renderExecutionLayerMessages();
        } else if (roomKey === 'risk-control') {
            window.renderRiskControlMessages();
        } else if (roomKey === 'synergy-layer') {
            window.renderSynergyLayerMessages();
        } else {
            chatContainer.innerHTML = window.AppState.globalControlMessages;
        }
        chatContainer.classList.remove('chat-fade-out');
        chatContainer.classList.add('chat-fade-in');
        window.scrollToBottom();
        const switchDuration = Math.round(performance.now() - switchStart);
        console.log(`[chat-switch] room=${roomKey}, duration=${switchDuration}ms, pass=${switchDuration <= 300}`);
    }, window.AppState.CHAT_SWITCH_ANIMATION_MS);
}

window.switchChatRoom = switchChatRoom;
