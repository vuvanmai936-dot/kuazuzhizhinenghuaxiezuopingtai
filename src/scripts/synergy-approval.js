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

function renderSynergyRejectResult() {
    const state = window.AppState;
    const container = document.getElementById('synergy-dynamic-content');
    if (!container) return;
    if (document.getElementById('synergy-reject-result')) return;

    const rejectHtml = `
        <div id="synergy-reject-result" class="flex items-start fade-in">
            <img src="https://ui-avatars.com/api/?name=AI&background=3370FF&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm">
            <div class="ml-3 w-full">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">协同管控智能体</span>
                    <span class="fs-tag-bot">BOT</span>
                    <span class="text-xs text-[#8F959E] ml-2">${getNowClock()}</span>
                </div>
                <div class="fs-card border-red-200">
                    <div class="fs-card-header bg-red-50 border-b border-red-200">
                        <div class="flex items-center font-semibold text-red-600">
                            <i class="fa-solid fa-xmark-circle mr-2"></i>【驳回确认】工单 TCK-8080-NW 审批结论
                        </div>
                        <span class="inline-flex items-center text-[12px] px-2 py-0.5 rounded border border-red-200 bg-red-50 text-red-600">
                            <i class="fa-solid fa-ban mr-1"></i>已驳回
                        </span>
                    </div>
                    <div class="fs-card-body space-y-3">
                        <div class="text-[13px]">
                            <div class="text-[#646A73] mb-1">驳回原因</div>
                            <div class="text-red-600 bg-red-50 border border-red-200 rounded p-2.5">
                                ${state.ticketRejectReason}
                            </div>
                        </div>
                        <div class="text-[13px]">
                            <div class="text-[#646A73] mb-1">处置结果</div>
                            <div class="text-[#1F2329] bg-[#F8F9FA] border border-[#DEE0E3] rounded p-2.5">
                                已将工单打回至执行层，等待应用方补充脱敏规则后重新提单。
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', rejectHtml);
}

function renderSynergySettlementCard() {
    const container = document.getElementById('synergy-dynamic-content');
    if (!container) return;
    if (document.getElementById('synergy-settlement-card')) return;

    const settlementHtml = `
        <div id="synergy-settlement-card" class="flex items-start fade-in">
            <img src="https://ui-avatars.com/api/?name=AI&background=B54708&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm">
            <div class="ml-3 w-full">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">协同管控智能体</span>
                    <span class="fs-tag-bot">BOT</span>
                    <span class="text-xs text-[#8F959E] ml-2">${getNowClock()}</span>
                </div>
                <div class="fs-card border-[#FFE1A6]">
                    <div class="fs-card-header bg-[#FFF7E8] border-b border-[#FFE1A6]">
                        <div class="flex items-center font-semibold text-[#B54708]">
                            <i class="fa-solid fa-receipt mr-2"></i>🧾 跨组织协同效能与结算单 (自动生成)
                        </div>
                        <span class="inline-flex items-center text-[11px] px-2 py-0.5 rounded border border-[#FFE1A6] bg-white text-[#B54708]">自动核算</span>
                    </div>
                    <div class="fs-card-body space-y-4">
                        <section class="border border-[#C5EACF] bg-[#E4F5E9] rounded-md p-3 flex items-center justify-between">
                            <div class="text-[13px] text-[#1F2329]">SLA 履约分析：响应耗时 12 分钟</div>
                            <span class="inline-flex items-center text-[12px] px-2 py-0.5 rounded border border-[#C5EACF] bg-white text-[#239C46]">
                                <i class="fa-solid fa-circle-check mr-1"></i>评级：优秀
                            </span>
                        </section>

                        <section class="border border-[#DEE0E3] bg-[#F8F9FA] rounded-md p-3">
                            <div class="text-[12px] font-semibold text-[#646A73] mb-2 uppercase tracking-wide">资源消耗核算</div>
                            <div class="grid grid-cols-[120px_1fr] gap-x-3 gap-y-2 text-[13px]">
                                <div class="text-[#8F959E]">援助方</div>
                                <div class="text-[#1F2329]">建设方 (网络与云环境实施组 - 李工)</div>
                                <div class="text-[#8F959E]">资源折算</div>
                                <div class="text-[#1F2329] font-semibold">1.5 人时 <span class="text-[#646A73] font-normal">(标准化基础算力)</span></div>
                            </div>
                        </section>

                        <section class="border border-[#DEE0E3] rounded-md p-3 bg-white">
                            <div class="text-[12px] font-semibold text-[#646A73] mb-2 uppercase tracking-wide">数字绩效流转</div>
                            <div class="space-y-2 text-[13px]">
                                <div class="flex items-center justify-between border border-[#C5EACF] bg-[#E4F5E9] rounded-md px-3 py-2">
                                    <span class="text-[#1F2329]">[建设方] 本月协同贡献度</span>
                                    <span class="font-semibold text-[#239C46]">+15 分</span>
                                </div>
                                <div class="flex items-center justify-between border border-[#FDC3C8] bg-[#FEECEE] rounded-md px-3 py-2">
                                    <span class="text-[#1F2329]">[应用开发方] 本月协同配额扣减</span>
                                    <span class="font-semibold text-[#D83931]">-15 分</span>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div class="fs-card-footer">
                        <button class="px-3 py-1.5 rounded text-[13px] fs-btn-primary flex items-center">
                            <i class="fa-solid fa-file-pdf mr-1.5"></i>下载不可篡改结算凭证 (PDF)
                        </button>
                        <button class="px-3 py-1.5 rounded text-[13px] fs-btn-default flex items-center">
                            <i class="fa-solid fa-ranking-star mr-1.5 text-[#8F959E]"></i>查看项目全局 SLA 排行榜
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', settlementHtml);
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

function setSynergyCardRejected() {
    const statusTag = document.getElementById('synergy-ticket-status');
    if (statusTag) {
        statusTag.className = 'inline-flex items-center text-[12px] px-2 py-0.5 rounded border border-red-200 bg-red-50 text-red-600';
        statusTag.innerHTML = '<i class="fa-solid fa-ban mr-1"></i>已驳回';
    }

    const approveBtn = document.getElementById('btn-approve-policy');
    const rejectBtn = document.getElementById('btn-reject-policy');
    if (approveBtn) {
        approveBtn.disabled = true;
        approveBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }
    if (rejectBtn) {
        rejectBtn.disabled = true;
        rejectBtn.classList.remove('fs-btn-default');
        rejectBtn.classList.add('bg-red-50', 'text-red-600', 'border', 'border-red-200', 'cursor-not-allowed');
        rejectBtn.innerHTML = '<i class="fa-solid fa-ban mr-1.5"></i>已驳回并下发整改';
    }
}

function approveSynergyPolicy() {
    const state = window.AppState.synergyApproval;
    if (!state || state.status === 'approved') return;

    state.status = 'approved';
    state.approvedBy = '王总监 (业主方)';
    state.approvedAt = `2026-03-23 ${getNowClock()}`;
    state.closureMessage = '授权成功！已调用底层云接口放行策略。工单闭环。';
    window.updateTicketStatus('approved', {
        actionAt: new Date().toISOString(),
        reason: ''
    });

    setSynergyCardClosed();
    renderSynergyApprovalResult();
    setTimeout(() => {
        renderSynergySettlementCard();
        window.scrollToBottom && window.scrollToBottom();
    }, 1500);
    window.scrollToBottom && window.scrollToBottom();
}

function rejectSynergyPolicy() {
    const state = window.AppState;
    if (!state || state.ticketStatus === 'rejected' || state.ticketStatus === 'needs_rework') return;

    const rejectReason = '违反数据可信空间第4条安全基线，应用方未提供数据脱敏声明，拒绝直接放行网络策略。';
    window.updateTicketStatus('rejected', {
        actionAt: new Date().toISOString(),
        reason: rejectReason
    });
    state.synergyApproval.status = 'rejected';

    setSynergyCardRejected();
    renderSynergyRejectResult();
    window.scrollToBottom && window.scrollToBottom();
}

function initSynergyApproval() {
    const state = window.AppState;
    if (state && state.ticketStatus === 'approved') {
        setSynergyCardClosed();
        renderSynergyApprovalResult();
    }
    if (state && (state.ticketStatus === 'rejected' || state.ticketStatus === 'needs_rework')) {
        setSynergyCardRejected();
        renderSynergyRejectResult();
    }

    const approveBtn = document.getElementById('btn-approve-policy');
    if (approveBtn) {
        approveBtn.addEventListener('click', approveSynergyPolicy);
    }
    const rejectBtn = document.getElementById('btn-reject-policy');
    if (rejectBtn) {
        rejectBtn.addEventListener('click', rejectSynergyPolicy);
    }
}

window.initSynergyApproval = initSynergyApproval;
