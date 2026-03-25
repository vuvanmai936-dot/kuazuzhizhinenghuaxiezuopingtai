function applyWechatMessageGrouping(container) {
    if (!container) return;
    const blocks = Array.from(container.children).filter((node) => node instanceof HTMLElement);
    let lastSender = '';
    let lastSide = '';

    blocks.forEach((block) => {
        if (block.id === 'dynamic-content' || block.classList.contains('wx-system-note')) {
            lastSender = '';
            lastSide = '';
            return;
        }
        const senderEl = block.querySelector('span[class*="font-medium"][class*="text-[13px]"]');
        const sender = senderEl ? senderEl.textContent.trim() : '';
        const rightAligned = block.className.includes('items-end') || !!block.querySelector('.justify-end');
        const side = rightAligned ? 'right' : 'left';
        if (!sender) return;

        if (sender === lastSender && side === lastSide) {
            const header = block.querySelector('div[class*="items-center"][class*="mb-1"]');
            if (header) header.classList.add('hidden');
        }
        lastSender = sender;
        lastSide = side;
    });
}

function getPromotionGroupScriptHtml() {
    return `
        <div class="flex items-start fade-in">
            <img src="https://ui-avatars.com/api/?name=AI&background=3370FF&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm" alt="">
            <div class="ml-3 w-full max-w-[min(100%,640px)]">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">主智能体</span>
                    <span class="wx-tag-bot">BOT</span>
                    <span class="text-xs text-[#8F959E] ml-2">14:13</span>
                </div>
                <div class="bg-white rounded-md px-3 py-2 text-[13px] text-[#1F2329] leading-relaxed shadow-none">
                    <span class="text-[#3370FF]">@魏强</span> <span class="text-[#3370FF]">@傅毅明</span> 两位老师好，决策群的陶总非常关注咱们月底上线的进度。想请教一下，目前省局的合规批复和中信集团的法务审批，大概什么时间能下来？有没有需要决策层协调的卡点？
                </div>
            </div>
        </div>

        <div class="flex items-start fade-in mt-4">
            <img src="https://i.pravatar.cc/150?u=caict-wq" class="w-10 h-10 rounded-full border border-gray-200 shrink-0" alt="">
            <div class="ml-3 w-full max-w-[min(100%,640px)]">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">中国信通院-魏强</span>
                    <span class="text-xs text-[#8F959E] ml-2">14:15</span>
                </div>
                <div class="bg-white rounded-md px-3 py-2 text-[13px] text-[#1F2329] leading-relaxed shadow-none">
                    省局那边材料已经交上去了，正在排队走流程，没有大问题，估计这周五能拿到批文。
                </div>
            </div>
        </div>

        <div class="flex items-start fade-in mt-4">
            <img src="https://i.pravatar.cc/150?u=citic-fym" class="w-10 h-10 rounded-full border border-gray-200 shrink-0" alt="">
            <div class="ml-3 w-full max-w-[min(100%,640px)]">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">中信咨询-傅毅明</span>
                    <span class="text-xs text-[#8F959E] ml-2">14:16</span>
                </div>
                <div class="bg-white rounded-md px-3 py-2 text-[13px] text-[#1F2329] leading-relaxed shadow-none">
                    集团这边有点卡壳。法务部对数据确权的几条细则有疑问，流程退回了。需要补充一份《联合运营权责声明》重新走签，不然月底肯定走不完。
                </div>
            </div>
        </div>

        <div class="flex items-start fade-in mt-4">
            <img src="https://i.pravatar.cc/150?u=xzl-jp" class="w-10 h-10 rounded-full border border-gray-200 shrink-0" alt="">
            <div class="ml-3 w-full max-w-[min(100%,640px)]">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">鑫智链-架构师鞠鹏</span>
                    <span class="text-xs text-[#8F959E] ml-2">14:17</span>
                </div>
                <div class="bg-white rounded-md px-3 py-2 text-[13px] text-[#1F2329] leading-relaxed shadow-none">
                    这个声明的技术细节和系统架构边界我可以提供，但最终得南钢和荣泽两家盖公章才行。
                </div>
            </div>
        </div>

        <div class="flex items-start fade-in mt-4">
            <img src="https://ui-avatars.com/api/?name=AI&background=3370FF&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm" alt="">
            <div class="ml-3 w-full max-w-[min(100%,640px)]">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">主智能体</span>
                    <span class="wx-tag-bot">BOT</span>
                    <span class="text-xs text-[#8F959E] ml-2">14:20</span>
                </div>
                <div class="bg-white rounded-md px-3 py-2 text-[13px] text-[#1F2329] leading-relaxed shadow-none">
                    收到，情况已记录。我已经根据前期技术方案，由底层大模型辅助草拟了一份《联合运营权责声明》草案大纲。我马上将该唯一风险点和草案同步至决策群，供陶总批复决策。大家辛苦！
                </div>
            </div>
        </div>
    `;
}

function getGlobalDecisionClosureAppendHtml() {
    return `
        <div id="global-decision-closure-wrap" class="flex items-start fade-in mt-4">
            <img src="https://ui-avatars.com/api/?name=AI&background=3370FF&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm" alt="">
            <div class="ml-3 w-full max-w-[min(100%,640px)]">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">主智能体</span>
                    <span class="wx-tag-bot">BOT</span>
                    <span class="text-xs text-[#8F959E] ml-2">14:21</span>
                </div>
                <div class="bg-white rounded-md px-3 py-2 text-[13px] text-[#1F2329] leading-relaxed shadow-none">
                    <span class="text-[#3370FF]">@陶立春</span> 陶总，推进群的进度已经摸底完毕：<br><br>
                    🟢 信通院-魏强：省局合规批复预计本周五拿单，风险可控。<br>
                    🔴 中信咨询-傅毅明：集团审批被法务部退回，要求补充《联合运营权责声明》。这是导致月底无法上线的唯一卡点。<br><br>
                    解决方案：我已经基于咱们系统内的架构文档，自动草拟了这份声明。您看是直接发给荣泽和咱们的法务盖章，还是开个短会过一下？
                </div>
                <div class="mt-2 flex flex-wrap items-center">
                    <span class="text-[#3370FF] cursor-pointer hover:underline text-[13px] mr-4" onclick="alert('已打开Word预览区')">📄 预览声明草稿(Word)</span>
                    <span class="text-[#3370FF] cursor-pointer hover:underline text-[13px]" onclick="alert('已向相关方发送日历邀请')">📅 拉取紧急对齐会议</span>
                </div>
            </div>
        </div>
    `;
}

function injectGlobalDecisionClosureBlock() {
    const note = document.getElementById('global-promotion-system-note');
    if (!note || document.getElementById('global-decision-closure-wrap')) return;
    note.insertAdjacentHTML('afterend', getGlobalDecisionClosureAppendHtml());
}

function applySegmentTimeSeparators(container) {
    if (!container) return;
    const blocks = Array.from(container.children).filter((node) => node instanceof HTMLElement);
    let lastTime = '';
    blocks.forEach((block) => {
        if (block.id === 'dynamic-content' || block.classList.contains('wx-system-note')) return;
        const timeEl = block.querySelector('span.text-xs');
        if (!timeEl) return;
        const timeLabel = timeEl.textContent.trim();
        if (!timeLabel || timeLabel === lastTime) {
            timeEl.classList.add('hidden');
            return;
        }
        lastTime = timeLabel;
    });
}

function renderExecutionLayerMessages() {
    const chatContainer = document.getElementById('chat-container');
    if (!chatContainer) return;
    chatContainer.innerHTML = getPromotionGroupScriptHtml();
    applyWechatMessageGrouping(chatContainer);
    applySegmentTimeSeparators(chatContainer);
    window.scrollToBottom && window.scrollToBottom();
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
                        <span class="wx-tag-bot">BOT</span>
                        <span class="text-xs text-[#8F959E] ml-2">14:28</span>
                    </div>
                    <div class="bg-white rounded-md border border-red-200">
                        <div class="px-4 py-3 bg-red-50 border-b border-red-200 flex items-center justify-between">
                            <div class="flex items-center font-semibold text-red-600">
                                <i class="fa-solid fa-triangle-exclamation mr-2"></i>【协同层驳回通知】网络放行工单 TCK-8080-NW 已被打回。
                            </div>
                            <span class="inline-flex items-center text-[12px] px-2 py-0.5 rounded border border-red-200 bg-red-50 text-red-600">
                                <i class="fa-solid fa-rotate-left mr-1"></i>待整改
                            </span>
                        </div>
                        <div class="px-4 py-3 space-y-3">
                            <div class="text-[13px] text-[#646A73]">协同层总监驳回原因：</div>
                            <div class="text-[13px] text-red-600 bg-red-50 border border-red-200 rounded p-2.5">
                                ${state.ticketRejectReason || '违反数据可信空间第4条安全基线，应用方未提供数据脱敏声明，拒绝直接放行网络策略。'}
                            </div>
                        </div>
                        <div class="px-4 py-3 border-t border-red-200 bg-white flex gap-2 justify-end">
                            <button id="btn-regenerate-desensitize" class="px-3 py-1.5 rounded text-[13px] wx-btn-primary flex items-center">
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
                        <span class="wx-tag-bot">BOT</span>
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

    if (state.ticketStatus === 'approved') {
        const approvedCard = `
            <div class="flex items-start fade-in mt-6">
                <img src="https://ui-avatars.com/api/?name=AI&background=3370FF&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm">
                <div class="ml-3 w-full">
                    <div class="flex items-center mb-1">
                        <span class="text-[13px] font-medium text-[#1F2329]">协同管控智能体</span>
                        <span class="wx-tag-bot">BOT</span>
                    </div>
                    <div class="bg-[#E4F5E9] border border-[#C5EACF] rounded-md px-4 py-3 text-[13px] text-[#1F2329]">
                        <div class="font-semibold text-[#239C46] mb-1">
                            <i class="fa-solid fa-circle-check mr-1.5"></i>网络策略已放行，云环境 8080 端口恢复连通，工单 TCK-8080-NW 已闭环。
                        </div>
                        <div class="text-[12px] text-[#5A616A]">已同步通知 @张三 完成验证并回报主智能体。</div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col items-end fade-in mt-4">
                <div class="flex items-center mb-1">
                    <span class="text-xs text-[#8F959E] mr-2">14:36</span>
                    <span class="text-[13px] font-medium text-[#1F2329]">张三 (应用开发方-现场工程师)</span>
                </div>
                <div class="flex items-start justify-end">
                    <div class="wx-msg-self mr-3 shadow-sm text-left">
                        <span class="text-[#3370FF]">@主智能体</span> 已复测通过，8080 端口恢复，联调任务继续推进。我的提报工单可关闭。
                    </div>
                    <img src="https://ui-avatars.com/api/?name=张三&background=E1EAFF&color=3370FF" class="w-10 h-10 rounded-full border border-gray-200 shrink-0">
                </div>
            </div>
            <div class="flex items-start fade-in mt-4">
                <img src="https://ui-avatars.com/api/?name=AI&background=3370FF&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm">
                <div class="ml-3">
                    <button id="btn-report-global-resolution" class="px-3 py-1.5 rounded text-[13px] wx-btn-primary flex items-center">
                        <i class="fa-solid fa-bullhorn mr-1.5"></i>回传总控群并播报结论
                    </button>
                </div>
            </div>
        `;
        chatContainer.insertAdjacentHTML('beforeend', approvedCard);
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
                    <span class="wx-tag-bot">BOT</span>
                    <span class="text-xs text-[#8F959E] ml-2">14:20</span>
                </div>
                <div class="text-[14px] text-[#1F2329] leading-relaxed space-y-3">
                    <p>各位领导，我这边同步一个刚升级过来的现场情况。执行层刚提报了网络放行工单 <span class="font-medium">TCK-8080-NW</span>，他们现在需要临时放通 8080 端口，才能继续做联调验收。</p>
                    <p>但这个请求和咱们当前“默认封禁非白名单端口”的安全基线有直接冲突，所以我先把流程拦截并提到这里让您拍板。如果现在不放行，底层核心联调预计会有大约 <span class="text-[#D83931] font-medium">2%</span> 的延期风险。</p>
                    <p>数据安全智能体已经把可信存证哈希准备好了。接下来您看，是现在授权放行，还是先打回让执行层调整方案再提？</p>
                </div>
                <div id="synergy-ticket-status" class="text-[12px] text-[#D83931] mt-2">审批状态：待审批</div>
                <div class="mt-4 flex flex-wrap gap-2">
                    <button id="btn-approve-policy" class="text-[#3370FF] border border-[#3370FF]/40 hover:bg-[#EAF2FF] px-3 py-1.5 rounded-full text-[13px] transition-colors">授权一键放行</button>
                    <button id="btn-reject-policy" class="text-[#D83931] border border-[#D83931]/40 hover:bg-[#FEECEE] px-3 py-1.5 rounded-full text-[13px] transition-colors">打回并要求整改</button>
                </div>
            </div>
        </div>
        <div id="synergy-dynamic-content" class="space-y-6"></div>
    `;

    if (window.initSynergyApproval) {
        window.initSynergyApproval();
    }
    applyWechatMessageGrouping(chatContainer);
    applySegmentTimeSeparators(chatContainer);
}

function renderRiskControlMessages() {
    const chatContainer = document.getElementById('chat-container');
    const riskState = window.AppState.proactiveRisk;
    const hasProactiveThread = riskState.status !== 'risk_detected';
    const proactiveReviewBlock = hasProactiveThread ? `
        <div class="flex items-start fade-in mt-6">
            <img src="https://ui-avatars.com/api/?name=AI&background=166534&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm">
            <div class="ml-3 w-full">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">数据安全智能体</span>
                    <span class="wx-tag-bot">BOT</span>
                    <span class="text-xs text-[#8F959E] ml-2">主动巡检复核</span>
                </div>
                <div class="bg-white rounded-md px-4 py-3 text-[13px] text-[#1F2329] space-y-2">
                    <p>陈总监，主动巡检这条我先汇总一下：督办单 <span class="font-mono">${riskState.supervisionCode}</span> 的证据已经补齐，可信哈希是 <span class="font-mono">${riskState.evidenceHash}</span>。</p>
                    <p class="text-[#646A73]">当前状态是「${riskState.reviewDecision || '待授权'}」，请您确认是否允许继续推进执行层整改。</p>
                    <div class="pt-2 flex gap-2 justify-end">
                        <button data-action="approve-proactive-review" class="px-3 py-1.5 rounded text-[13px] wx-btn-primary flex items-center">
                            <i class="fa-solid fa-shield-heart mr-1.5"></i>第2步 请陈总监授权（允许继续）
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ` : '';
    chatContainer.innerHTML = `
        <div class="flex flex-col items-end fade-in">
            <div class="flex items-center mb-1">
                <span class="text-xs text-[#8F959E] mr-2">09:15</span>
                <span class="text-[13px] font-medium text-[#1F2329]">陈总监 (业主方-数据安全)</span>
            </div>
            <div class="flex items-start justify-end">
                <div class="wx-msg-self mr-3 shadow-sm text-left">
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
                    <span class="wx-tag-bot">BOT</span>
                    <span class="text-xs text-[#8F959E] ml-2">09:15</span>
                </div>
                <div class="bg-white rounded-md px-4 py-3 text-[13px] text-[#1F2329] space-y-2" style="max-width: 640px; width: 100%;">
                    <p>已定位到今早一次越权访问：子项目A应用方（IP: <span class="font-mono">192.168.1.105</span>）请求了 <span class="font-mono">/api/v2/core-db/users_raw</span>，命中极密数据域拦截策略。</p>
                    <p class="text-[#D83931]">触发原因：违反“最小权限与默认脱敏”基线，系统已自动拒绝该请求。</p>
                    <div class="bg-[#1F2937] text-[#A7F3D0] rounded-md px-3 py-2 font-mono text-[12px] leading-5">
                        <div>[2026-03-23 09:14:22.051 UTC] ACTION: DENY_ACCESS</div>
                        <div>TxHash: 0x8f2a...3b9c（链上固化，不可篡改）</div>
                    </div>
                    <div class="pt-2 flex gap-2 justify-end">
                        <button class="px-3 py-1.5 rounded text-[13px] wx-btn-primary flex items-center">
                            <i class="fa-solid fa-file-pdf mr-1.5"></i>一键生成合规审查报告 (PDF)
                        </button>
                        <button class="px-3 py-1.5 rounded text-[13px] wx-btn-default flex items-center">
                            <i class="fa-solid fa-ban mr-1.5 text-[#8F959E]"></i>封禁该端点并下发整改通报
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex items-start fade-in mt-4">
            <img src="https://ui-avatars.com/api/?name=AI&background=166534&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm">
            <div class="ml-3">
                <div class="wx-file-bubble">
                    <div class="wx-file-row">
                        <div class="min-w-0">
                            <div class="wx-file-name">应用方越权调用审计报告.docx</div>
                            <div class="wx-file-size">75.9K</div>
                        </div>
                        <div class="w-10 h-10 rounded bg-[#2B579A] text-white text-[12px] flex items-center justify-center shrink-0">W</div>
                    </div>
                    <div class="wx-file-tag">微信电脑版</div>
                </div>
            </div>
        </div>
        ${proactiveReviewBlock}
    `;
    applyWechatMessageGrouping(chatContainer);
    applySegmentTimeSeparators(chatContainer);
}

function triggerScenarioTwo() {
    const container = document.getElementById('dynamic-content');
    const btns = document.querySelectorAll('button');
    btns.forEach(btn => (btn.style.pointerEvents = 'none'));

    const userMsg = `
        <div class="flex flex-col items-end fade-in mt-6">
            <div class="flex items-center justify-end mb-1">
                <span class="text-[13px] font-medium text-[#1F2329]">陶立春 (南钢鑫智链)</span>
            </div>
            <div class="flex items-start justify-end">
                <div class="wx-msg-self mr-3 shadow-sm">
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
    const riskState = window.AppState.proactiveRisk;
    const statusLabelMap = {
        risk_detected: '已发现风险',
        supervision_issued: '督办已下发',
        execution_acknowledged: '执行层已接单',
        evidence_collected: '证据已齐备',
        mitigated: '风险已缓解',
        closed: '已归档'
    };
    const statusLabel = statusLabelMap[riskState.status] || '处理中';
    const closeBtn = riskState.status === 'mitigated' ? `
        <button data-action="close-proactive-risk" class="px-3 py-1.5 rounded text-[13px] wx-btn-primary flex items-center">
            <i class="fa-solid fa-folder-check mr-1.5"></i>归档并播报闭环结论
        </button>
    ` : '';
    return `
        <div id="proactive-risk-card" class="flex items-start fade-in mt-6">
            <img src="https://ui-avatars.com/api/?name=AI&background=7C3AED&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm">
            <div class="ml-3 w-full">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">主智能体</span>
                    <span class="wx-tag-bot">BOT</span>
                    <span class="text-xs text-[#8F959E] ml-2">实时巡检 · ${statusLabel}</span>
                </div>
                <div class="wx-msg-other max-w-none">
                    预警同步：应用开发方（子项目A）连续3天代码提交频次下降 60%，测试环境 API 活跃度同步下滑。若不干预，本周五“API接口联调”预计有 85% 概率延期。
                </div>
                <div class="mt-2 flex gap-2 justify-end">
                    <button data-action="issue-preventive-supervision" class="px-3 py-1.5 rounded text-[13px] wx-btn-default flex items-center">
                        <i class="fa-solid fa-bullhorn mr-1.5 text-[#8F959E]"></i>第1步 下发督办单（支线）
                    </button>
                    <button data-action="view-risk-insight-chart" class="px-3 py-1.5 rounded text-[13px] wx-btn-default flex items-center">
                        <i class="fa-solid fa-chart-column mr-1.5 text-[#8F959E]"></i>查看底层效能洞察图表
                    </button>
                    ${closeBtn}
                </div>
            </div>
        </div>
    `;
}

function getPreventiveSupervisionReplyTemplate() {
    const riskState = window.AppState.proactiveRisk;
    const issueTime = riskState.issuedAt || `2026-03-23 ${getNowClockLabel()}`;
    return `
        <div id="preventive-supervision-reply" class="flex items-start fade-in mt-6">
            <img src="https://ui-avatars.com/api/?name=AI&background=7C3AED&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm">
            <div class="ml-3 w-full">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">主智能体</span>
                    <span class="wx-tag-bot">BOT</span>
                </div>
                <div class="wx-msg-other max-w-none">
                    督办单 ${riskState.supervisionCode} 已下发。责任人：${riskState.owner}。下发时间：${issueTime}，请在 ${riskState.dueAt} 前提交“进度说明 + 补救计划”。并行要求：数据安全智能体已发起可信存证哈希复核。
                </div>
                <div class="mt-2 flex gap-2 justify-end">
                    <button data-action="open-proactive-execution" class="px-3 py-1.5 rounded text-[13px] wx-btn-primary flex items-center">
                        <i class="fa-solid fa-people-arrows-left-right mr-1.5"></i>第1步 查看执行层接单回执
                    </button>
                    <button data-action="open-proactive-risk-review" class="px-3 py-1.5 rounded text-[13px] wx-btn-default flex items-center">
                        <i class="fa-solid fa-shield-check mr-1.5 text-[#8F959E]"></i>查看安全审计复核
                    </button>
                </div>
            </div>
        </div>
    `;
}

function getProactiveClosureCardTemplate() {
    const riskState = window.AppState.proactiveRisk;
    return `
        <div id="proactive-closure-card" class="flex items-start fade-in mt-6">
            <img src="https://ui-avatars.com/api/?name=AI&background=239C46&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm">
            <div class="ml-3 w-full">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">主智能体</span>
                    <span class="wx-tag-bot">BOT</span>
                </div>
                <div class="wx-msg-other max-w-none">
                    主动巡检闭环播报：${riskState.supervisionCode}。处理结论：${riskState.closureSummary || '风险已缓解，转入观察。'}；整改耗时 12 分钟，责任人 ${riskState.owner}；证据哈希 ${riskState.evidenceHash}，安全复核 ${riskState.reviewDecision || '允许继续'}。下一检查点：今日 17:30。
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
    if (!chatContainer) return;

    const dynamicContainer = document.getElementById('dynamic-content') || chatContainer;
    const existingCard = document.getElementById('proactive-risk-card');
    if (existingCard) {
        existingCard.outerHTML = getProactiveRiskWarningTemplate();
    } else {
        dynamicContainer.insertAdjacentHTML('beforeend', getProactiveRiskWarningTemplate());
    }
    window.AppState.proactiveRisk.warningPushed = true;
    window.AppState.globalControlMessages = chatContainer.innerHTML;
    window.persistClientState && window.persistClientState(window.getPersistedUiState ? window.getPersistedUiState() : {});
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
                window.AppState.executionRoom.created = true;
                window.AppState.executionRoom.createdAt = new Date().toISOString();
                window.updateProactiveRiskStatus && window.updateProactiveRiskStatus('supervision_issued', {
                    issuedAt: `2026-03-23 ${getNowClockLabel()}`
                });
                revealExecutionRoomFromDispatch();
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
                window.persistClientState && window.persistClientState(window.getPersistedUiState ? window.getPersistedUiState() : {});
                setTimeout(() => {
                    window.switchChatRoom && window.switchChatRoom('execution-layer');
                }, 300);
            }, 1000);
        }

        if (action === 'open-proactive-execution') {
            window.updateProactiveRiskStatus && window.updateProactiveRiskStatus('execution_acknowledged', {
                mitigationPlan: '张三已接单：15:30前提交补救计划，16:30前恢复联调节奏。'
            });
            window.switchChatRoom && window.switchChatRoom('execution-layer');
            return;
        }

        if (action === 'open-proactive-risk-review') {
            window.updateProactiveRiskStatus && window.updateProactiveRiskStatus('evidence_collected', {
                reviewDecision: '审计证据完整，允许在监控条件下继续推进。'
            });
            window.switchChatRoom && window.switchChatRoom('risk-control');
            return;
        }

        if (action === 'approve-proactive-review') {
            window.updateProactiveRiskStatus && window.updateProactiveRiskStatus('mitigated', {
                reviewDecision: '陈总监复核通过，允许继续执行并纳入观察。'
            });
            window.switchChatRoom && window.switchChatRoom('execution-layer');
            return;
        }

        if (action === 'report-proactive-global') {
            if (window.AppState.proactiveRisk.status !== 'closed') {
                window.updateProactiveRiskStatus && window.updateProactiveRiskStatus('closed', {
                    closureSummary: '风险已解除，里程碑延期概率从85%降至20%。',
                    closedAt: `2026-03-23 ${getNowClockLabel()}`
                });
            }
            const replyHtml = getProactiveClosureCardTemplate();
            if (!window.AppState.globalControlMessages.includes('proactive-closure-card')) {
                window.AppState.globalControlMessages += replyHtml;
            }
            window.switchChatRoom && window.switchChatRoom('global-control');
            return;
        }

        if (action === 'close-proactive-risk') {
            if (document.getElementById('proactive-closure-card')) return;
            window.updateProactiveRiskStatus && window.updateProactiveRiskStatus('closed', {
                closureSummary: '风险已解除，里程碑延期概率从85%降至20%。',
                closedAt: `2026-03-23 ${getNowClockLabel()}`
            });
            const replyHtml = getProactiveClosureCardTemplate();
            if (!window.AppState.globalControlMessages.includes('proactive-closure-card')) {
                window.AppState.globalControlMessages += replyHtml;
            }
            window.switchChatRoom && window.switchChatRoom('global-control');
            return;
        }
    });
}

function renderProactiveExecutionThread(container) {
    const riskState = window.AppState.proactiveRisk;
    if (riskState.status === 'risk_detected') return;
    if (document.getElementById('proactive-execution-thread')) return;

    const escalateButton = riskState.status === 'supervision_issued' || riskState.status === 'execution_acknowledged' ? `
            <div class="flex items-start fade-in">
                <img src="https://ui-avatars.com/api/?name=AI&background=3370FF&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm">
                <div class="ml-3">
                    <button data-action="open-proactive-risk-review" class="px-3 py-1.5 rounded text-[13px] wx-btn-default flex items-center">
                        <i class="fa-solid fa-shield-check mr-1.5 text-[#8F959E]"></i>第2步 转风险群请陈总监授权
                    </button>
                </div>
            </div>
    ` : '';
    const postApproveBlock = riskState.status === 'mitigated' || riskState.status === 'closed' ? `
            <div class="flex items-start fade-in">
                <img src="https://ui-avatars.com/api/?name=AI&background=3370FF&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm">
                <div class="ml-3 w-full">
                    <div class="bg-[#E4F5E9] border border-[#C5EACF] rounded-md px-4 py-3 text-[13px] text-[#1F2329]">
                        <i class="fa-solid fa-circle-check text-[#239C46] mr-1.5"></i>陈总监已授权放行，整改任务可继续推进，请张三持续回传进度。
                    </div>
                </div>
            </div>
            <div class="flex flex-col items-end fade-in">
                <div class="flex items-center mb-1">
                    <span class="text-xs text-[#8F959E] mr-2">${getNowClockLabel()}</span>
                    <span class="text-[13px] font-medium text-[#1F2329]">${riskState.owner}</span>
                </div>
                <div class="flex items-start justify-end">
                    <div class="wx-msg-self mr-3 shadow-sm text-left">
                        <span class="text-[#3370FF]">@主智能体</span> 已收到授权，恢复联调节奏，后续按每30分钟回传执行进度。
                    </div>
                    <img src="https://ui-avatars.com/api/?name=张三&background=E1EAFF&color=3370FF" class="w-10 h-10 rounded-full border border-gray-200 shrink-0">
                </div>
            </div>
            <div class="flex items-start fade-in">
                <img src="https://ui-avatars.com/api/?name=AI&background=3370FF&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm">
                <div class="ml-3">
                    <button data-action="report-proactive-global" class="px-3 py-1.5 rounded text-[13px] wx-btn-primary flex items-center">
                        <i class="fa-solid fa-bullhorn mr-1.5"></i>第3步 回传总控群（主动巡检结论）
                    </button>
                </div>
            </div>
    ` : '';

    const reply = `
        <div id="proactive-execution-thread" class="space-y-4 mt-6">
            <div class="flex items-start fade-in">
                <img src="https://ui-avatars.com/api/?name=AI&background=3370FF&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm">
                <div class="ml-3 w-full">
                    <div class="flex items-center mb-1">
                        <span class="text-[13px] font-medium text-[#1F2329]">主智能体</span>
                        <span class="wx-tag-bot">BOT</span>
                    </div>
                    <div class="bg-[#EAF2FF] border border-[#D1E2FF] rounded-md px-4 py-3 text-[13px] text-[#1F2329]">
                        <span class="text-[#3370FF]">@${riskState.owner}</span> 主智能体已下发主动巡检督办单 ${riskState.supervisionCode}，请在 ${riskState.dueAt} 前提交“进度说明 + 补救计划”。
                    </div>
                </div>
            </div>
            <div class="flex flex-col items-end fade-in">
                <div class="flex items-center mb-1">
                    <span class="text-xs text-[#8F959E] mr-2">${getNowClockLabel()}</span>
                    <span class="text-[13px] font-medium text-[#1F2329]">${riskState.owner}</span>
                </div>
                <div class="flex items-start justify-end">
                    <div class="wx-msg-self mr-3 shadow-sm text-left">
                        <span class="text-[#3370FF]">@主智能体</span> 已接单，补救计划：${riskState.mitigationPlan || '15:30前完成进度说明，16:30前恢复联调节奏，并每30分钟回传一次进度。'}
                    </div>
                    <img src="https://ui-avatars.com/api/?name=张三&background=E1EAFF&color=3370FF" class="w-10 h-10 rounded-full border border-gray-200 shrink-0">
                </div>
            </div>
            ${escalateButton}
            ${postApproveBlock}
        </div>
    `;
    container.insertAdjacentHTML('beforeend', reply);
}

function showMacroToast(buttonEl) {
    if (!buttonEl || buttonEl.disabled) return;
    buttonEl.disabled = true;
    buttonEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-1.5"></i>下发中...';

    setTimeout(() => {
        buttonEl.classList.remove('wx-btn-primary');
        buttonEl.classList.add('wx-btn-default', 'opacity-60', 'cursor-not-allowed');
        buttonEl.innerHTML = '<i class="fa-solid fa-check mr-1.5"></i>已群发督办';
    }, 800);
}

function getNowClockLabel() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    return `${h}:${m}`;
}

function revealSynergyRoomFromDispatch() {
    const synergyRoom = document.getElementById('room-synergy');
    if (!synergyRoom) return;

    const clockLabel = getNowClockLabel();
    const timeEl = synergyRoom.querySelector('.text-xs');
    const previewEl = synergyRoom.querySelector('p');
    if (timeEl) {
        timeEl.textContent = clockLabel;
    }
    if (previewEl) {
        previewEl.className = 'text-[13px] text-[#3370FF] truncate';
        previewEl.textContent = '协同管控智能体: 已创建临时协同群并同步工单。';
    }
    synergyRoom.classList.remove('hidden');
}

function revealExecutionRoomFromDispatch() {
    const executionRoom = document.getElementById('room-execution');
    if (!executionRoom) return;

    const clockLabel = getNowClockLabel();
    const timeEl = executionRoom.querySelector('.text-xs');
    const previewEl = executionRoom.querySelector('p');
    if (timeEl) {
        timeEl.textContent = clockLabel;
    }
    if (previewEl) {
        previewEl.className = 'text-[13px] text-[#3370FF] truncate';
        previewEl.textContent = '主智能体: 已接收总控调度，正在@责任人定位问题...';
    }
    executionRoom.classList.remove('hidden');
}

function bindExecutionEscalationAction() {
    const btn = document.querySelector('[data-action="escalate-to-synergy"]');
    if (!btn) return;
    btn.addEventListener('click', () => {
        if (window.AppState.synergyRoom.created) return;

        window.AppState.synergyRoom.created = true;
        window.AppState.synergyRoom.createdAt = new Date().toISOString();
        revealSynergyRoomFromDispatch();
        window.updateTicketStatus('pending', {
            actionAt: new Date().toISOString(),
            reason: ''
        });
        btn.disabled = true;
        btn.classList.remove('wx-btn-primary');
        btn.classList.add('wx-btn-default', 'opacity-60', 'cursor-not-allowed');
        btn.innerHTML = '<i class="fa-solid fa-circle-check mr-1.5"></i>已升级至临时协同群';
        window.persistClientState && window.persistClientState(window.getPersistedUiState ? window.getPersistedUiState() : {});
        setTimeout(() => {
            window.switchChatRoom && window.switchChatRoom('synergy-layer');
        }, 300);
    });
}

function getGlobalResolutionReplyHtml() {
    return `
        <div id="global-resolution-reply" class="flex items-start fade-in mt-6">
            <img src="https://ui-avatars.com/api/?name=AI&background=3370FF&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm">
            <div class="ml-3 w-full">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">主智能体</span>
                    <span class="wx-tag-bot">BOT</span>
                </div>
                <div class="bg-[#E4F5E9] border border-[#C5EACF] rounded-md px-4 py-3 text-[13px] text-[#1F2329]">
                    ✅ 王总监，问题已闭环：执行层反馈 8080 端口已放行，张三提报工单已关闭，接口联调恢复正常。
                </div>
            </div>
        </div>
    `;
}

function bindExecutionResolutionReportAction() {
    const btn = document.getElementById('btn-report-global-resolution');
    if (!btn) return;
    btn.addEventListener('click', () => {
        if (window.AppState.resolutionBroadcasted) return;
        window.AppState.resolutionBroadcasted = true;
        btn.disabled = true;
        btn.classList.remove('wx-btn-primary');
        btn.classList.add('wx-btn-default', 'opacity-60', 'cursor-not-allowed');
        btn.innerHTML = '<i class="fa-solid fa-circle-check mr-1.5"></i>已回传总控群';
        window.persistClientState && window.persistClientState(window.getPersistedUiState ? window.getPersistedUiState() : {});
        appendGlobalResolutionReply();
        setTimeout(() => {
            window.switchChatRoom && window.switchChatRoom('global-control');
        }, 300);
    });
}

function appendGlobalResolutionReply() {
    const chatContainer = document.getElementById('chat-container');
    if (!chatContainer) return;
    const replyHtml = getGlobalResolutionReplyHtml();
    if (window.AppState.currentRoom === 'global-control') {
        const targetContainer = document.getElementById('dynamic-content') || chatContainer;
        if (targetContainer && !document.getElementById('global-resolution-reply')) {
            targetContainer.insertAdjacentHTML('beforeend', replyHtml);
            window.AppState.globalControlMessages = chatContainer.innerHTML;
        }
    } else if (!window.AppState.globalControlMessages.includes('global-resolution-reply')) {
        window.AppState.globalControlMessages += replyHtml;
    }
    window.scrollToBottom && window.scrollToBottom();
}

function approveDispatch(buttonEl) {
    if (!buttonEl || buttonEl.disabled) return;
    buttonEl.disabled = true;
    buttonEl.classList.remove('wx-btn-primary');
    buttonEl.classList.add('wx-btn-default', 'opacity-60', 'cursor-not-allowed');
    buttonEl.innerHTML = '<i class="fa-solid fa-circle-check mr-1.5"></i>已授权调度';

    if (document.getElementById('dispatch-approved-reply')) {
        return;
    }

    window.AppState.dispatchAuthorized = true;
    window.AppState.executionRoom.created = true;
    window.AppState.executionRoom.createdAt = new Date().toISOString();
    window.persistClientState && window.persistClientState(window.getPersistedUiState ? window.getPersistedUiState() : {});
    revealExecutionRoomFromDispatch();

    const container = document.getElementById('dynamic-content') || document.getElementById('chat-container');
    if (!container) return;

    const replyHtml = `
        <div id="dispatch-approved-reply" class="flex items-start fade-in mt-6">
            <img src="https://ui-avatars.com/api/?name=AI&background=3370FF&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm">
            <div class="ml-3 w-full">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">主智能体</span>
                    <span class="wx-tag-bot">BOT</span>
                </div>
                <div class="bg-[#E4F5E9] border border-[#C5EACF] rounded-md px-4 py-3 text-[13px] text-[#1F2329]">
                    ✅ <strong>调度指令已下发</strong>。已同步至「子项目A-集成协同群组」进入执行；若触发跨组织策略审批，将自动创建二级临时协同群。
                </div>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', replyHtml);
    scrollToBottom();

    setTimeout(() => {
        window.switchChatRoom && window.switchChatRoom('execution-layer');
    }, 500);
}

function scrollToBottom() {
    const chatContainer = document.getElementById('chat-container');
    chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: 'smooth' });
}

window.bindExecutionResolutionReportAction = bindExecutionResolutionReportAction;
window.injectGlobalDecisionClosureBlock = injectGlobalDecisionClosureBlock;
window.getPromotionGroupScriptHtml = getPromotionGroupScriptHtml;
window.renderExecutionLayerMessages = renderExecutionLayerMessages;
window.renderRiskControlMessages = renderRiskControlMessages;
window.renderSynergyLayerMessages = renderSynergyLayerMessages;
window.applyWechatMessageGrouping = applyWechatMessageGrouping;
window.applySegmentTimeSeparators = applySegmentTimeSeparators;
window.triggerScenarioTwo = triggerScenarioTwo;
window.scrollToBottom = scrollToBottom;
window.triggerProactiveRiskWarning = triggerProactiveRiskWarning;
window.bindProactiveRiskActions = bindProactiveRiskActions;
window.showMacroToast = showMacroToast;
window.approveDispatch = approveDispatch;
