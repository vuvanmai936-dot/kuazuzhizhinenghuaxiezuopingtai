function renderExecutionLayerMessages() {
    const chatContainer = document.getElementById('chat-container');
    chatContainer.innerHTML = window.ExecutionScenario.templates.getExecutionLayerMessageTemplate();
    window.startSlaCountdown();
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

function scrollToBottom() {
    const chatContainer = document.getElementById('chat-container');
    chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: 'smooth' });
}

window.renderExecutionLayerMessages = renderExecutionLayerMessages;
window.renderSynergyLayerMessages = renderSynergyLayerMessages;
window.triggerScenarioTwo = triggerScenarioTwo;
window.scrollToBottom = scrollToBottom;
