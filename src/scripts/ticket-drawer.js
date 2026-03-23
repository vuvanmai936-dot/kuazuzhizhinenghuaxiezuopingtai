function formatMsToClock(ms) {
    const safeMs = Math.max(ms, 0);
    const totalSeconds = Math.floor(safeMs / 1000);
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const s = String(totalSeconds % 60).padStart(2, '0');
    return `${h}小时:${m}分:${s}秒`;
}

function renderDrawerShell() {
    const host = document.createElement('div');
    host.id = 'ticket-drawer-root';
    host.innerHTML = window.ExecutionScenario.templates.getTicketDrawerShellTemplate(window.AppState.ticketDetail);
    document.body.appendChild(host);
}

function setDrawerOpen(isOpen) {
    const root = document.getElementById('ticket-drawer-root');
    if (!root) return;
    if (isOpen) {
        root.classList.add('ticket-drawer-open');
    } else {
        root.classList.remove('ticket-drawer-open');
    }
}

function startSlaCountdown() {
    if (window.AppState.countdownTimer) {
        clearInterval(window.AppState.countdownTimer);
    }

    const updateCountdown = () => {
        const remain = window.AppState.slaDeadlineTs - Date.now();
        const clock = formatMsToClock(remain);
        document.querySelectorAll('.js-sla-countdown').forEach(node => {
            node.textContent = clock;
        });
    };

    updateCountdown();
    window.AppState.countdownTimer = setInterval(updateCountdown, 1000);
}

function initTicketDrawer() {
    renderDrawerShell();

    document.addEventListener('click', event => {
        const trigger = event.target.closest('[data-action]');
        if (!trigger) return;

        const action = trigger.getAttribute('data-action');
        if (action === 'open-ticket-detail') {
            setDrawerOpen(true);
        }
        if (action === 'close-ticket-detail') {
            setDrawerOpen(false);
        }
    });
}

window.initTicketDrawer = initTicketDrawer;
window.startSlaCountdown = startSlaCountdown;
