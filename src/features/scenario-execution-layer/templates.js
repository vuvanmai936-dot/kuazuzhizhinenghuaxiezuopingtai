function getExecutionLayerMessageTemplate() {
    return `
        <div class="flex items-start fade-in">
            <img src="https://ui-avatars.com/api/?name=AI&background=3370FF&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm">
            <div class="ml-3 w-full">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">主智能体</span>
                    <span class="wx-tag-bot">BOT</span>
                    <span class="text-xs text-[#8F959E] ml-2">14:13</span>
                </div>
                <div class="bg-white rounded-md px-3 py-2 text-[13px] text-[#1F2329] shadow-none">
                    @魏强 @傅毅明 两位领导好，决策群的陶总非常关注咱们月底上线进度。想请教一下，目前省局的合规批复和中信集团审批，大概什么时间能下来？有没有需要决策层协调的卡点？
                </div>
            </div>
        </div>

        <div class="flex items-start fade-in">
            <img src="https://i.pravatar.cc/150?u=weiqiang" class="w-10 h-10 rounded-full border border-gray-200 shrink-0">
            <div class="ml-3">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">魏强</span>
                    <span class="text-xs text-[#8F959E] ml-2">14:15</span>
                </div>
                <div class="bg-white rounded-md px-3 py-2 text-[13px] text-[#1F2329] shadow-none">
                    省局那边材料已经交上去了，正在排队走流程，没有大问题，估计这周五能拿到批文。
                </div>
            </div>
        </div>

        <div class="flex items-start fade-in">
            <img src="https://i.pravatar.cc/150?u=fym" class="w-10 h-10 rounded-full border border-gray-200 shrink-0">
            <div class="ml-3">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">傅毅明</span>
                    <span class="text-xs text-[#8F959E] ml-2">14:16</span>
                </div>
                <div class="bg-white rounded-md px-3 py-2 text-[13px] text-[#1F2329] shadow-none">
                    集团这边有点卡壳。法务部对数据确权的几条细则有疑问，流程退回了。需要补充一份《联合运营权责声明》，不然月底肯定走不完。
                </div>
            </div>
        </div>

        <div class="flex items-start fade-in">
            <img src="https://i.pravatar.cc/150?u=jp" class="w-10 h-10 rounded-full border border-gray-200 shrink-0">
            <div class="ml-3">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">鞠鹏</span>
                    <span class="text-xs text-[#8F959E] ml-2">14:17</span>
                </div>
                <div class="bg-white rounded-md px-3 py-2 text-[13px] text-[#1F2329] shadow-none">
                    这个声明的技术细节我可以提供，但最终得南钢和荣泽盖章才行。
                </div>
            </div>
        </div>

        <div class="flex items-start fade-in">
            <img src="https://i.pravatar.cc/150?u=fym-doc" class="w-10 h-10 rounded-full border border-gray-200 shrink-0">
            <div class="ml-3">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">傅毅明</span>
                    <span class="text-xs text-[#8F959E] ml-2">14:19</span>
                </div>
                <div class="wx-file-bubble">
                    <div class="wx-file-row">
                        <div class="min-w-0">
                            <div class="wx-file-name">联合运营权责声明.docx</div>
                            <div class="wx-file-size">75.9K</div>
                        </div>
                        <div class="w-10 h-10 rounded bg-[#2B579A] text-white text-[12px] flex items-center justify-center shrink-0">W</div>
                    </div>
                    <div class="wx-file-tag">微信电脑端</div>
                </div>
            </div>
        </div>

        <div class="flex items-start fade-in" style="animation-delay: 0.2s;">
            <img src="https://ui-avatars.com/api/?name=AI&background=3370FF&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm">
            <div class="ml-3 w-full">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">主智能体</span>
                    <span class="wx-tag-bot">BOT</span>
                    <span class="text-xs text-[#8F959E] ml-2">14:18</span>
                </div>
                <div class="bg-white rounded-md px-3 py-2 text-[13px] text-[#1F2329] shadow-none">
                    收到，情况已记录。我马上把这个风险和《权责声明》这个前置条件汇总回决策群，请陶总协调。
                </div>
                <div class="mt-3 flex flex-wrap gap-2">
                    <button class="text-[#3370FF] border border-[#3370FF]/30 hover:bg-[#EAF2FF] px-3 py-1 rounded-full text-[13px] transition-colors" data-action="open-proactive-risk-review">去风险管控群发起授权</button>
                    <button class="text-[#3370FF] border border-[#3370FF]/30 hover:bg-[#EAF2FF] px-3 py-1 rounded-full text-[13px] transition-colors" data-action="report-proactive-global">回决策群同步进展</button>
                </div>
            </div>
        </div>
    `;
}

function getScenarioTwoLoadingTemplate(loadingMsgId) {
    return `
        <div class="flex items-start mt-6 fade-in" id="${loadingMsgId}">
            <img src="https://ui-avatars.com/api/?name=AI&background=3370FF&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm">
            <div class="ml-3">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">主智能体</span><span class="wx-tag-bot">BOT</span>
                </div>
                <div class="bg-white border border-[#DEE0E3] rounded-md px-3 py-2 text-[13px] text-[#646A73] shadow-sm flex items-center">
                    <div class="typing-indicator mr-2"><span></span><span></span><span></span></div>
                    正在跨群组检索 [应用开发专项群] 与 [管理方数据审核群] 的日志流...
                </div>
            </div>
        </div>
    `;
}

function getScenarioTwoResultTemplate() {
    return `
        <div class="flex items-start mt-6 fade-in">
            <img src="https://ui-avatars.com/api/?name=AI&background=3370FF&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm">
            <div class="ml-3 w-full">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">主智能体</span><span class="wx-tag-bot">BOT</span>
                </div>
                <div class="bg-white rounded-md px-3 py-2 text-[13px] text-[#1F2329] shadow-none">
                    我刚把跨机构的链路又复核了一遍：系统开发本身问题不大，真正会影响上线的是外部审批。现在省局合规批复和集团法务审批都没完全落听，如果这两块还拖着，月底上线就会被动。建议先在推进群把信通院和中信咨询老师的时间点问清楚，我拿到回执后第一时间回决策群汇报，避免大家盲等。
                    <div class="mt-3">
                        <button class="text-[#3370FF] border border-[#3370FF]/30 hover:bg-[#EAF2FF] px-3 py-1 rounded-full text-[13px] transition-colors" onclick="approveDispatch(this)">同意执行调度</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getTicketDrawerShellTemplate(ticketDetail) {
    return `
        <div class="ticket-drawer-overlay" data-action="close-ticket-detail"></div>
        <aside class="ticket-drawer-panel">
            <div class="h-16 border-b border-[#DEE0E3] px-5 flex items-center justify-between">
                <div>
                    <h3 class="text-[16px] font-medium text-[#1F2329]">协同工单详情</h3>
                    <p class="text-[12px] text-[#8F959E]">执行层自动工单追踪</p>
                </div>
                <button class="w-8 h-8 rounded hover:bg-[#F2F3F5]" data-action="close-ticket-detail">
                    <i class="fa-solid fa-xmark text-[#646A73]"></i>
                </button>
            </div>
            <div class="p-5 space-y-4 overflow-y-auto">
                <section class="border border-[#DEE0E3] rounded-md p-3">
                    <h4 class="text-[13px] font-semibold text-[#1F2329] mb-2">工单信息</h4>
                    <div class="text-[13px] text-[#646A73] space-y-1">
                        <p>工单编号：<span class="text-[#1F2329] font-medium">${ticketDetail.code}</span></p>
                        <p>责任人：<span class="text-[#1F2329] font-medium">${ticketDetail.owner}</span></p>
                        <p>创建时间：${ticketDetail.createdAt}</p>
                        <p>SLA 倒计时：<span class="text-[#D83931] font-semibold js-sla-countdown">01小时:59分:42秒</span></p>
                    </div>
                </section>
                <section class="border border-[#D1E2FF] bg-[#EAF2FF] rounded-md p-3">
                    <h4 class="text-[13px] font-semibold text-[#1F2329] mb-2">可信数据空间校验记录</h4>
                    <ul class="text-[13px] text-[#1F2329] space-y-1">
                        ${ticketDetail.auditTrail.map(item => `<li><i class="fa-solid fa-check text-[#239C46] mr-1"></i>${item}</li>`).join('')}
                    </ul>
                </section>
                <section class="border border-[#FFE1A6] bg-[#FFF7E8] rounded-md p-3">
                    <h4 class="text-[13px] font-semibold text-[#1F2329] mb-2">升级规则</h4>
                    <p class="text-[13px] text-[#646A73]">若超时未响应，自动抄送二级协同层并触发熔断升级。</p>
                </section>
            </div>
        </aside>
    `;
}

window.ExecutionScenarioTemplates = {
    getExecutionLayerMessageTemplate,
    getScenarioTwoLoadingTemplate,
    getScenarioTwoResultTemplate,
    getTicketDrawerShellTemplate
};
