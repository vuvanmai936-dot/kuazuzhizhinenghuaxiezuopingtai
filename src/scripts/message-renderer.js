function renderExecutionLayerMessages() {
    const chatContainer = document.getElementById('chat-container');
    chatContainer.innerHTML = window.ExecutionScenario.templates.getExecutionLayerMessageTemplate();
    renderExecutionReverseFlowCard();
    bindExecutionReworkAction();
    window.startSlaCountdown();
}

function renderExecutionReverseFlowCard() {
    const state = window.AppState;
    const chatContainer = document.getElementById('chat-container');
    if (!chatContainer) return;

    if (state.ticketStatus === 'rejected' || state.ticketStatus === 'needs_rework') {
        const rejectedCard = `
            <div class="flex items-start fade-in mt-6">
                <img src="https://ui-avatars.com/api/?name=AI&background=3370FF&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm">
                <div class="ml-3 w-full">
                    <div class="flex items-center mb-1">
                        <span class="text-[13px] font-medium text-[#1F2329]">执行辅助智能体</span>
                        <span class="fs-tag-bot">BOT</span>
                        <span class="text-xs text-[#8F959E] ml-2">14:28</span>
                    </div>
                    <div class="fs-card border-red-200">
                        <div class="fs-card-header bg-red-50 border-b border-red-200">
                            <div class="flex items-center font-semibold text-red-600">
                                <i class="fa-solid fa-triangle-exclamation mr-2"></i>【协同层驳回通知】网络放行工单 TCK-8080-NW 已被打回。
                            </div>
                            <span class="inline-flex items-center text-[12px] px-2 py-0.5 rounded border border-red-200 bg-red-50 text-red-600">
                                <i class="fa-solid fa-rotate-left mr-1"></i>待整改
                            </span>
                        </div>
                        <div class="fs-card-body space-y-3">
                            <div class="text-[13px] text-[#646A73]">协同层总监驳回原因：</div>
                            <div class="text-[13px] text-red-600 bg-red-50 border border-red-200 rounded p-2.5">
                                ${state.ticketRejectReason || '违反数据可信空间第4条安全基线，应用方未提供数据脱敏声明，拒绝直接放行网络策略。'}
                            </div>
                        </div>
                        <div class="fs-card-footer">
                            <button id="btn-regenerate-desensitize" class="px-3 py-1.5 rounded text-[13px] fs-btn-primary flex items-center">
                                <i class="fa-solid fa-wand-magic-sparkles mr-1.5"></i>一键生成脱敏声明并重新提单
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        chatContainer.insertAdjacentHTML('beforeend', rejectedCard);
    }

    if (state.ticketStatus === 'resubmitted') {
        const resubmittedCard = `
            <div class="flex items-start fade-in mt-6">
                <img src="https://ui-avatars.com/api/?name=AI&background=3370FF&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm">
                <div class="ml-3 w-full">
                    <div class="flex items-center mb-1">
                        <span class="text-[13px] font-medium text-[#1F2329]">执行辅助智能体</span>
                        <span class="fs-tag-bot">BOT</span>
                    </div>
                    <div class="bg-[#E4F5E9] border border-[#C5EACF] rounded-md px-4 py-3 text-[13px] text-[#1F2329]">
                        <div class="font-semibold text-[#239C46]">
                            <i class="fa-solid fa-circle-check mr-1.5"></i>${state.ticketResubmitMessage || '已自动为您挂载标准脱敏规则，工单已重新向上提交审批。'}
                        </div>
                    </div>
                </div>
            </div>
        `;
        chatContainer.insertAdjacentHTML('beforeend', resubmittedCard);
    }
}

function bindExecutionReworkAction() {
    const btn = document.getElementById('btn-regenerate-desensitize');
    if (!btn) return;
    btn.addEventListener('click', () => {
        if (window.AppState.ticketStatus === 'resubmitted') return;
        window.updateTicketStatus('resubmitted', {
            actionAt: new Date().toISOString(),
            resubmitMessage: '已自动为您挂载标准脱敏规则，工单已重新向上提交审批。'
        });
    });
}

function renderSynergyLayerMessages() {
    const chatContainer = document.getElementById('chat-container');
    chatContainer.innerHTML = `
        <div class="flex items-start fade-in">
            <img src="https://ui-avatars.com/api/?name=AI&background=3370FF&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm">
            <div class="ml-3 w-full">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">协同管控智能体</span>
                    <span class="fs-tag-bot">BOT</span>
                    <span class="text-xs text-[#8F959E] ml-2">14:20</span>
                </div>

                <div class="fs-card">
                    <div class="fs-card-header bg-[#FFF7E8] border-b-[#FFE1A6]">
                        <div class="flex items-center font-bold text-[#D83931]">
                            <i class="fa-solid fa-arrow-up-right-dots mr-2"></i>【工单升级】由于涉及跨域安全策略，执行层网络放行工单 TCK-8080-NW 已自动升级至本群。
                        </div>
                        <span id="synergy-ticket-status" class="inline-flex items-center text-[12px] px-2 py-0.5 rounded border bg-[#FEECEE] border-[#FDC3C8] text-[#D83931]">
                            <i class="fa-solid fa-hourglass-half mr-1"></i>待审批
                        </span>
                    </div>

                    <div class="fs-card-body space-y-4">
                        <section class="border border-[#DEE0E3] bg-[#F8F9FA] rounded p-3">
                            <h3 class="text-[13px] font-semibold text-[#1F2329] mb-2">
                                <i class="fa-solid fa-code-compare text-[#3370FF] mr-1.5"></i>冲突分析
                            </h3>
                            <p class="text-[13px] text-[#646A73] leading-relaxed">
                                业主方安全基线要求默认封禁非白名单端口；应用方部署需求要求在联调窗口临时放行 8080 端口用于服务验收，当前策略存在直接冲突。
                            </p>
                        </section>

                        <section class="border border-[#FFE1A6] bg-[#FFF7E8] rounded p-3">
                            <h3 class="text-[13px] font-semibold text-[#1F2329] mb-2">
                                <i class="fa-solid fa-chart-line text-[#B54708] mr-1.5"></i>影响面评估
                            </h3>
                            <p class="text-[13px] text-[#646A73] leading-relaxed">
                                若本次变更不通过，执行层部署任务无法完成，预计将导致整体进度延期 2%，并影响后续跨组织联调排期。
                            </p>
                        </section>
                    </div>

                    <div class="fs-card-footer">
                        <button id="btn-reject-policy" class="px-3 py-1.5 rounded text-[13px] fs-btn-default flex items-center">
                            <i class="fa-solid fa-ban mr-1.5 text-[#8F959E]"></i>驳回并要求应用方整改
                        </button>
                        <button id="btn-approve-policy" class="px-3 py-1.5 rounded text-[13px] fs-btn-primary flex items-center">
                            <i class="fa-solid fa-key mr-1.5"></i>授权一键放行策略
                            <span class="fs-tag-role-lead">业主方总监可见</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div id="synergy-dynamic-content" class="space-y-6"></div>
    `;

    if (window.initSynergyApproval) {
        window.initSynergyApproval();
    }
}

function renderRiskControlMessages() {
    const chatContainer = document.getElementById('chat-container');
    chatContainer.innerHTML = `
        <div class="flex flex-col items-end fade-in">
            <div class="flex items-center mb-1">
                <span class="text-xs text-[#8F959E] mr-2">09:15</span>
                <span class="text-[13px] font-medium text-[#1F2329]">陈总监 (业主方-数据安全)</span>
            </div>
            <div class="flex items-start justify-end">
                <div class="fs-msg-user mr-3 shadow-sm text-left">
                    <span class="text-[#3370FF]">@数据安全智能体</span> 调阅今早『应用方越权调用底层数据』的完整审计追踪日志，需包含可信存证的哈希值。
                </div>
                <img src="https://ui-avatars.com/api/?name=陈总监&background=E1EAFF&color=3370FF" class="w-10 h-10 rounded-full border border-gray-200 shrink-0">
            </div>
        </div>

        <div class="flex items-start fade-in mt-6">
            <img src="https://ui-avatars.com/api/?name=AI&background=166534&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm">
            <div class="ml-3 w-full">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">数据安全智能体</span>
                    <span class="fs-tag-bot">BOT</span>
                    <span class="text-xs text-[#8F959E] ml-2">09:15</span>
                </div>
                <div class="fs-card border-[#BBF7D0]" style="max-width: 640px; width: 100%;">
                    <div class="fs-card-header bg-[#ECFDF3] border-b border-[#BBF7D0]">
                        <div class="flex items-center font-semibold text-[#166534]">
                            <i class="fa-solid fa-shield-check mr-2"></i>可信空间拦截审计存证 (Audit Trail)
                        </div>
                        <span class="inline-flex items-center text-[11px] px-2 py-0.5 rounded border border-[#86EFAC] bg-[#DCFCE7] text-[#166534]">不可篡改 Immutable</span>
                    </div>

                    <div class="fs-card-body space-y-4">
                        <section class="border border-[#D1D5DB] rounded-md p-3 bg-[#F8FAFC]">
                            <div class="text-[12px] font-semibold text-[#475569] mb-2 uppercase tracking-wide">Context</div>
                            <div class="grid grid-cols-[120px_1fr] gap-x-3 gap-y-2 text-[13px]">
                                <div class="text-[#64748B] font-mono">请求方</div>
                                <div class="text-[#1F2937]">子项目A-应用开发方 <span class="font-mono text-[#475569]">(IP: 192.168.1.105)</span></div>
                                <div class="text-[#64748B] font-mono">目标接口</div>
                                <div class="font-mono text-[#111827]">/api/v2/core-db/users_raw <span class="text-red-600">(极密数据域)</span></div>
                                <div class="text-[#64748B] font-mono">触发策略</div>
                                <div class="text-[#B91C1C] font-semibold">违反“最小权限与默认脱敏”基线</div>
                            </div>
                        </section>

                        <section class="bg-slate-900 text-green-400 border border-slate-700 rounded-md p-3 font-mono text-[12px] leading-6">
                            <div>[2026-03-23 09:14:22.051 UTC]</div>
                            <div>ACTION: DENY_ACCESS</div>
                            <div>TxHash: 0x8f2a...3b9c <span class="text-green-300">(链上已固化)</span></div>
                        </section>
                    </div>

                    <div class="fs-card-footer">
                        <button class="px-3 py-1.5 rounded text-[13px] fs-btn-primary flex items-center">
                            <i class="fa-solid fa-file-pdf mr-1.5"></i>一键生成合规审查报告 (PDF)
                        </button>
                        <button class="px-3 py-1.5 rounded text-[13px] fs-btn-default flex items-center">
                            <i class="fa-solid fa-ban mr-1.5 text-[#8F959E]"></i>封禁该端点并下发整改通报
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function triggerScenarioTwo() {
    const container = document.getElementById('dynamic-content');
    const btns = document.querySelectorAll('button');
    btns.forEach(btn => (btn.style.pointerEvents = 'none'));

    const userMsg = `
        <div class="flex flex-col items-end fade-in mt-6">
            <div class="flex items-center justify-end mb-1">
                <span class="text-[13px] font-medium text-[#1F2329]">王总监 (业主方高层)</span>
            </div>
            <div class="flex items-start justify-end">
                <div class="fs-msg-user mr-3 shadow-sm">
                    <span class="text-[#3370FF]">@主智能体</span> 查一下为什么子系统A接口联调停滞？到底是哪家公司、哪个环节卡住了？给我一个详细的归因报告和解决方案。
                </div>
                <img src="https://i.pravatar.cc/150?img=11" class="w-10 h-10 rounded-full border border-gray-200 shrink-0">
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', userMsg);
    scrollToBottom();

    setTimeout(() => {
        const loadingMsgId = 'loading-' + Date.now();
        const loadingMsg = window.ExecutionScenario.templates.getScenarioTwoLoadingTemplate(loadingMsgId);
        container.insertAdjacentHTML('beforeend', loadingMsg);
        scrollToBottom();

        setTimeout(() => {
            document.getElementById(loadingMsgId).remove();
            const botCardMsg = window.ExecutionScenario.templates.getScenarioTwoResultTemplate();
            container.insertAdjacentHTML('beforeend', botCardMsg);
            scrollToBottom();
            btns.forEach(btn => (btn.style.pointerEvents = 'auto'));
        }, 2000);
    }, 500);
}

function getProactiveRiskWarningTemplate() {
    return `
        <div id="proactive-risk-card" class="flex items-start fade-in mt-6">
            <img src="https://ui-avatars.com/api/?name=AI&background=7C3AED&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm">
            <div class="ml-3 w-full">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">全域管控智能体</span>
                    <span class="fs-tag-bot">BOT</span>
                    <span class="text-xs text-[#8F959E] ml-2">实时巡检</span>
                </div>
                <div class="fs-card border-[#D8C8FF]">
                    <div class="fs-card-header bg-[#F3EDFF] border-b border-[#D8C8FF]">
                        <div class="flex items-center font-semibold text-[#531DAB]">
                            <i class="fa-solid fa-satellite-dish mr-2"></i>⚠️ 智能体主动巡检预警（由代码仓库数据触发）
                        </div>
                    </div>
                    <div class="fs-card-body space-y-3">
                        <div class="text-[13px] text-[#1F2329]">
                            监测到 <strong>应用开发方（子项目A）</strong> 连续3天核心代码仓库提交频次下降 60%，且测试环境 API 活跃度骤降。
                        </div>
                        <div class="text-[13px] text-[#D83931] bg-[#FEECEE] border border-[#FDC3C8] rounded p-2.5">
                            如果不加干预，预测本周五的『API接口联调』里程碑有 <strong>85% 概率延期</strong>。
                        </div>
                    </div>
                    <div class="fs-card-footer">
                        <button data-action="issue-preventive-supervision" class="px-3 py-1.5 rounded text-[13px] fs-btn-primary flex items-center">
                            <i class="fa-solid fa-bullhorn mr-1.5"></i>一键下发预警督办单
                        </button>
                        <button data-action="view-risk-insight-chart" class="px-3 py-1.5 rounded text-[13px] fs-btn-default flex items-center">
                            <i class="fa-solid fa-chart-column mr-1.5 text-[#8F959E]"></i>查看底层效能洞察图表
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getPreventiveSupervisionReplyTemplate() {
    return `
        <div id="preventive-supervision-reply" class="flex items-start fade-in mt-6">
            <img src="https://ui-avatars.com/api/?name=AI&background=7C3AED&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm">
            <div class="ml-3 w-full">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">全域管控智能体</span>
                    <span class="fs-tag-bot">BOT</span>
                </div>
                <div class="bg-[#E4F5E9] border border-[#C5EACF] rounded-md px-4 py-3 text-[13px] text-[#1F2329]">
                    <i class="fa-solid fa-circle-check text-[#239C46] mr-1.5"></i>✅ 指令已执行。已自动向应用开发方项目总监下发【红色督办单】，要求今日 17:00 前提交进度说明及补救计划。全局风险监控已将该项列入【重点跟踪名单】。
                </div>
            </div>
        </div>
    `;
}

function triggerProactiveRiskWarning() {
    if (window.AppState.currentRoom !== 'global-control') {
        window.switchChatRoom('global-control');
        setTimeout(triggerProactiveRiskWarning, window.AppState.CHAT_SWITCH_ANIMATION_MS + 40);
        return;
    }

    const chatContainer = document.getElementById('chat-container');
    if (!chatContainer || document.getElementById('proactive-risk-card')) return;

    const dynamicContainer = document.getElementById('dynamic-content') || chatContainer;
    dynamicContainer.insertAdjacentHTML('beforeend', getProactiveRiskWarningTemplate());
    window.AppState.proactiveRisk.warningPushed = true;
    window.AppState.globalControlMessages = chatContainer.innerHTML;
    scrollToBottom();
}

function bindProactiveRiskActions() {
    document.addEventListener('click', event => {
        const trigger = event.target.closest('[data-action]');
        if (!trigger) return;

        const action = trigger.getAttribute('data-action');
        if (action === 'view-risk-insight-chart') {
            trigger.innerHTML = '<i class="fa-solid fa-chart-line mr-1.5 text-[#3370FF]"></i>效能图谱已加载（演示态）';
            trigger.classList.add('cursor-not-allowed');
            trigger.disabled = true;
            return;
        }

        if (action === 'issue-preventive-supervision') {
            if (window.AppState.proactiveRisk.supervisionIssued) return;
            trigger.disabled = true;
            trigger.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1.5"></i>督办下发中...';

            setTimeout(() => {
                window.AppState.proactiveRisk.supervisionIssued = true;
                window.AppState.proactiveRisk.hiddenRiskCount += 1;
                const dynamicContainer = document.getElementById('dynamic-content') || document.getElementById('chat-container');
                if (dynamicContainer && !document.getElementById('preventive-supervision-reply')) {
                    dynamicContainer.insertAdjacentHTML('beforeend', getPreventiveSupervisionReplyTemplate());
                    const chatContainer = document.getElementById('chat-container');
                    if (chatContainer) {
                        window.AppState.globalControlMessages = chatContainer.innerHTML;
                    }
                    scrollToBottom();
                }
                trigger.innerHTML = '<i class="fa-solid fa-circle-check mr-1.5"></i>督办单已下发';
            }, 1000);
        }
    });
}

function scrollToBottom() {
    const chatContainer = document.getElementById('chat-container');
    chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: 'smooth' });
}

window.renderExecutionLayerMessages = renderExecutionLayerMessages;
window.renderRiskControlMessages = renderRiskControlMessages;
window.renderSynergyLayerMessages = renderSynergyLayerMessages;
window.triggerScenarioTwo = triggerScenarioTwo;
window.scrollToBottom = scrollToBottom;
window.triggerProactiveRiskWarning = triggerProactiveRiskWarning;
window.bindProactiveRiskActions = bindProactiveRiskActions;
