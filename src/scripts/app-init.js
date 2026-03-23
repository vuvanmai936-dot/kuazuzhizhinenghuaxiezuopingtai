function bindRoomEvents() {
    const executionRoom = document.getElementById('room-execution');
    const synergyRoom = document.getElementById('room-synergy');
    const globalRoom = document.querySelector('[data-room="global-control"]');

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

document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat-container');
    window.AppState.globalControlMessages = chatContainer ? chatContainer.innerHTML : '';
    bindRoomEvents();
    window.initTicketDrawer();
});
