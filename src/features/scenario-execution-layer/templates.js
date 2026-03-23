function getExecutionLayerMessageTemplate() {
    return `
        <div class="flex items-start fade-in">
            <img src="https://ui-avatars.com/api/?name=AI&background=3370FF&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm">
            <div class="ml-3 w-full">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">主智能体</span>
                    <span class="fs-tag-bot">BOT</span>
                    <span class="text-xs text-[#8F959E] ml-2">14:13</span>
                </div>
                <div class="bg-[#EAF2FF] border border-[#D1E2FF] rounded-md px-4 py-3 text-[13px] text-[#1F2329]">
                    <span class="text-[#3370FF]">@张三 (应用开发方-现场工程师)</span> 总控群反馈“子系统A接口联调停滞”，请先完成现场定位并回报阻断点。
                </div>
            </div>
        </div>

        <div class="flex flex-col items-end fade-in">
            <div class="flex items-center mb-1">
                <span class="text-xs text-[#8F959E] mr-2">14:15</span>
                <span class="text-[13px] font-medium text-[#1F2329]">张三 (应用开发方-现场工程师)</span>
            </div>
            <div class="flex items-start justify-end">
                <div class="fs-msg-user mr-3 shadow-sm text-left">
                    <span class="text-[#3370FF]">@执行辅助智能体</span> 现场定位完成：云环境 8080 端口不通，网络策略拦截导致部署测试卡死。请发起跨组织协同。
                </div>
                <img src="https://ui-avatars.com/api/?name=张三&background=E1EAFF&color=3370FF" class="w-10 h-10 rounded-full border border-gray-200 shrink-0">
            </div>
        </div>

        <div class="flex items-start fade-in" style="animation-delay: 0.3s;">
            <img src="https://ui-avatars.com/api/?name=AI&background=3370FF&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm">
            <div class="ml-3 w-full">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">执行辅助智能体</span>
                    <span class="fs-tag-bot">BOT</span>
                    <span class="text-xs text-[#8F959E] ml-2">14:16</span>
                </div>
                <div class="fs-card">
                    <div class="fs-card-header bg-[#FFF7E8] border-b-[#FFE1A6]">
                        <div class="flex items-center font-bold text-[#D83931]">
                            <i class="fa-solid fa-satellite-dish mr-2"></i>异常上报响应 & 自动协同调度
                        </div>
                        <span class="text-xs text-[#8F959E]">工单号: TCK-8080-NW</span>
                    </div>
                    <div class="fs-card-body space-y-4">
                        <div class="flex items-start">
                            <div class="w-1.5 h-1.5 rounded-full bg-[#D83931] mt-1.5 mr-2"></div>
                            <div>
                                <span class="text-[13px] text-[#8F959E]">智能体定性评估：</span>
                                <span class="text-[13px] font-bold text-[#1F2329]">跨组织资源对接异常 </span>
                                <span class="text-[12px] bg-[#FEECEE] text-[#D83931] border border-[#FDC3C8] px-1.5 py-0.5 rounded ml-1">级别：较重</span>
                            </div>
                        </div>

                        <div class="bg-gray-50 border border-gray-200 rounded p-3 relative overflow-hidden">
                            <div class="absolute right-0 top-0 bottom-0 w-1 bg-[#3370FF]"></div>
                            <div class="text-[12px] text-[#8F959E] mb-1"><i class="fa-solid fa-people-arrows mr-1"></i> 跨域协同匹配结果</div>
                            <div class="flex items-center justify-between">
                                <div class="text-[13px]">
                                    判定责任方：<span class="font-bold text-[#1F2329]">建设方 (网络与云环境实施组)</span>
                                </div>
                                <div class="flex items-center bg-white border border-[#DEE0E3] px-2 py-1 rounded shadow-sm">
                                    <img src="https://ui-avatars.com/api/?name=李工&background=F2F3F5" class="w-4 h-4 rounded-full mr-1.5">
                                    <span class="text-[12px] font-medium text-[#1F2329]">已锁定对接人：李工</span>
                                </div>
                            </div>
                        </div>

                        <div class="bg-[#EAF2FF] border border-[#D1E2FF] rounded p-3 flex items-start">
                            <i class="fa-solid fa-clock-rotate-left text-[#3370FF] mt-0.5 mr-2"></i>
                            <div>
                                <div class="text-[13px] font-bold text-[#3370FF] mb-1">已完成异常定级，待升级审批</div>
                                <div class="text-[12px] text-[#646A73] leading-relaxed">
                                    建议向二级协同层提交网络策略放行审批，责任方：<span class="font-medium">建设方-李工</span>。<br>
                                    <span class="flex items-center mt-1">
                                        预计 SLA：<span class="text-[#F59E0B] font-bold bg-[#FFF7E8] px-1.5 rounded ml-1 pulse-orange border border-[#FCD34D] js-sla-countdown">01小时:59分:42秒</span>
                                    </span>
                                </div>
                                <div class="text-[11px] text-[#8F959E] mt-2 border-t border-[#D1E2FF] pt-2">
                                    * 若倒计时结束未响应，风险管控智能体将自动 <span class="text-[#D83931]">向上熔断升级</span> 至二级协同层总监。
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="fs-card-footer">
                        <button class="px-3 py-1.5 rounded text-[13px] fs-btn-primary flex items-center" data-action="escalate-to-synergy">
                            <i class="fa-solid fa-arrow-up-right-dots mr-1.5"></i>升级至临时协同群审批
                        </button>
                        <button class="px-3 py-1.5 rounded text-[13px] fs-btn-default flex items-center" data-action="open-ticket-detail">
                            <i class="fa-solid fa-list-check mr-1.5 text-[#8F959E]"></i>查看工单详情
                        </button>
                        <button class="px-3 py-1.5 rounded text-[13px] fs-btn-default flex items-center">
                            <i class="fa-solid fa-file-code mr-1.5"></i>补充现场错误日志
                            <span class="fs-tag-role-lead">组长权限</span>
                        </button>
                    </div>
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
                    <span class="text-[13px] font-medium text-[#1F2329]">全域管控智能体</span><span class="fs-tag-bot">BOT</span>
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
                    <span class="text-[13px] font-medium text-[#1F2329]">全域管控智能体</span><span class="fs-tag-bot">BOT</span>
                </div>
                <div class="fs-card">
                    <div class="fs-card-header bg-[#F8F9FA]">
                        <div class="flex items-center font-medium text-[#1F2329]">
                            <i class="fa-solid fa-magnifying-glass-chart text-[#3370FF] mr-2"></i>深度归因与穿透分析报告
                        </div>
                    </div>
                    <div class="fs-card-body space-y-4">
                        <div class="bg-[#EAF2FF] border border-[#D1E2FF] rounded p-3">
                            <div class="text-[13px] font-bold text-[#3370FF] mb-1.5"><i class="fa-solid fa-lightbulb mr-1.5"></i>智能体处置建议</div>
                            <p class="text-[13px] text-[#1F2329] mb-2">已为您生成跨域调度指令，授权后将拉起子项目A执行群；如需跨组织策略审批，再升级至临时协同群。</p>
                        </div>
                    </div>
                    <div class="fs-card-footer">
                        <button class="px-3 py-1.5 rounded text-[13px] fs-btn-primary flex items-center" onclick="approveDispatch(this)">
                            <i class="fa-solid fa-check mr-1.5"></i>同意执行调度
                        </button>
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
