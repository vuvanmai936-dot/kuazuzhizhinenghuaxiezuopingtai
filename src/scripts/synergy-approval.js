function getNowClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    return `${h}:${m}`;
}

function renderSynergyApprovalResult() {
    const state = window.AppState.synergyApproval;
    const container = document.getElementById('synergy-dynamic-content');
    if (!container) return;
    if (document.getElementById('synergy-approval-result')) return;

    const replyHtml = `
        <div id="synergy-approval-result" class="flex items-start fade-in">
            <img src="https://ui-avatars.com/api/?name=AI&background=3370FF&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm">
            <div class="ml-3 w-full">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">协同管控智能体</span>
                    <span class="fs-tag-bot">BOT</span>
                    <span class="text-xs text-[#8F959E] ml-2">${getNowClock()}</span>
                </div>
                <div class="bg-[#E4F5E9] border border-[#C5EACF] rounded-md px-4 py-3 text-[13px] text-[#1F2329]">
                    <div class="font-semibold text-[#239C46] mb-1">
                        <i class="fa-solid fa-circle-check mr-1.5"></i>${state.closureMessage}
                    </div>
                    <div class="text-[12px] text-[#5A616A]">
                        工单 ${state.ticketCode} 已归档，审批人：${state.approvedBy}，时间：${state.approvedAt}
                    </div>
                </div>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', replyHtml);
}

function setSynergyCardClosed() {
    const statusTag = document.getElementById('synergy-ticket-status');
    if (statusTag) {
        statusTag.className = 'inline-flex items-center text-[12px] px-2 py-0.5 rounded border bg-[#E4F5E9] border-[#C5EACF] text-[#239C46]';
        statusTag.innerHTML = '<i class="fa-solid fa-check mr-1"></i>已闭环';
    }

    const approveBtn = document.getElementById('btn-approve-policy');
    const rejectBtn = document.getElementById('btn-reject-policy');
    if (approveBtn) {
        approveBtn.disabled = true;
        approveBtn.classList.remove('fs-btn-primary');
        approveBtn.classList.add('bg-[#E4F5E9]', 'text-[#239C46]', 'border', 'border-[#C5EACF]', 'cursor-not-allowed');
        approveBtn.innerHTML = '<i class="fa-solid fa-circle-check mr-1.5"></i>策略已放行';
    }
    if (rejectBtn) {
        rejectBtn.disabled = true;
        rejectBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }
}

function approveSynergyPolicy() {
    const state = window.AppState.synergyApproval;
    if (!state || state.status === 'approved') return;

    state.status = 'approved';
    state.approvedBy = '王总监 (业主方)';
    state.approvedAt = `2026-03-23 ${getNowClock()}`;
    state.closureMessage = '授权成功！已调用底层云接口放行策略。工单闭环。';

    setSynergyCardClosed();
    renderSynergyApprovalResult();
    window.scrollToBottom && window.scrollToBottom();
}

function initSynergyApproval() {
    const state = window.AppState.synergyApproval;
    if (state && state.status === 'approved') {
        setSynergyCardClosed();
        renderSynergyApprovalResult();
    }

    const approveBtn = document.getElementById('btn-approve-policy');
    if (!approveBtn) return;
    approveBtn.addEventListener('click', approveSynergyPolicy);
}

window.initSynergyApproval = initSynergyApproval;
