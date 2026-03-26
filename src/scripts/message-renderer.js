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
        <div class="flex justify-center py-1">
            <span class="text-[12px] text-[#B3B5B9]">16:00</span>
        </div>
        <div id="dynamic-content"></div>
    `;
}

function scrollExecutionChatToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
    window.scrollToBottom && window.scrollToBottom();
}

function safeInsertAroundDynamic(chatContainer, html) {
    const dynamicContent = document.getElementById('dynamic-content');
    if (dynamicContent && dynamicContent.parentElement) {
        dynamicContent.insertAdjacentHTML('beforebegin', html);
        return;
    }
    if (chatContainer) {
        chatContainer.insertAdjacentHTML('beforeend', html);
    }
}

function appendCarbonServiceConsensusScript() {
    const chatContainer = document.getElementById('chat-container');
    if (!chatContainer) return;

    const appendAndRefresh = (html) => {
        safeInsertAroundDynamic(chatContainer, html);
        applyWechatMessageGrouping(chatContainer);
        applySegmentTimeSeparators(chatContainer);
        scrollExecutionChatToBottom();
    };

    const aiReviewHtml = `
        <div id="execution-consensus-1" class="flex items-start justify-end flex-row-reverse fade-in mt-4">
            <img src="../assets/avatars/yangjin.png" class="w-10 h-10 rounded-full border border-gray-200 shrink-0" alt="">
            <div class="mr-3 w-full max-w-[min(100%,640px)]">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">鑫智链-杨进</span>
                    <span class="text-xs text-[#8F959E] ml-2">14:20</span>
                </div>
                <div class="wx-msg-self mr-3 shadow-none text-left">
                    <span class="text-[#3370FF]">@荣泽-孙康峰</span> 康峰，陶总问咱们碳足迹3月份MVP能不能跟大盘同步上线？目前开发和测试进度怎么样？
                </div>
            </div>
        </div>
    `;

    const rzReplyHtml = `
        <div id="execution-consensus-5" class="flex items-start fade-in mt-4">
            <img src="../assets/avatars/sunkangfeng.png" class="w-10 h-10 rounded-full border border-gray-200 shrink-0" alt="">
            <div class="ml-3 w-full max-w-[min(100%,640px)]">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">荣泽-孙康峰</span>
                    <span class="text-xs text-[#8F959E] ml-2">14:22</span>
                </div>
                <div class="bg-white rounded-md px-3 py-2 text-[13px] text-[#1F2329] leading-relaxed shadow-none">
                    目前整体进度90%。可以确保本阶段“从订单到报告”的闭环流程上线。但是缺几个前置条件需要你补齐：<br>
                    1. 缺平台整体名称和Logo信息，导致前端无法封版。<br>
                    2. 下周UAT测试，缺真实的供应商和核查机构账号。<br>
                    另外，鑫采商城和空间节点集成还不完善，但属于4月二期规划，不影响本月MVP。
                </div>
            </div>
        </div>
    `;

    const aiAssistHtml = `
        <div id="execution-consensus-3" class="flex items-start fade-in mt-4">
            <img src="https://ui-avatars.com/api/?name=AI&background=3370FF&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm" alt="">
            <div class="ml-3 w-full max-w-[min(100%,640px)]">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">主智能体</span>
                    <span class="wx-tag-bot">BOT</span>
                    <span class="text-xs text-[#8F959E] ml-2">14:24</span>
                </div>
                <div class="bg-white rounded-md px-3 py-2 text-[13px] text-[#1F2329] leading-relaxed shadow-none">
                    <span class="text-[#3370FF]">@鑫智链-杨进</span> 监测到碳足迹项目关键进度更新。是否需要我为您和孙总梳理一份《碳足迹MVP上线进度与依赖确认单》，以便向上汇报？
                </div>
            </div>
        </div>
    `;

    const yangNeedHtml = `
        <div id="execution-consensus-4" class="flex items-start justify-end flex-row-reverse fade-in mt-4">
            <img src="../assets/avatars/yangjin.png" class="w-10 h-10 rounded-full border border-gray-200 shrink-0" alt="">
            <div class="mr-3 w-full max-w-[min(100%,640px)]">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">鑫智链-杨进</span>
                    <span class="text-xs text-[#8F959E] ml-2">14:25</span>
                </div>
                <div class="wx-msg-self mr-3 shadow-none text-left">
                    需要，抓紧生成。
                </div>
            </div>
        </div>
    `;

    const aiDocHtml = `
        <div id="execution-consensus-6" class="flex items-start fade-in mt-4">
            <img src="https://ui-avatars.com/api/?name=AI&background=3370FF&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm" alt="">
            <div class="ml-3 w-full max-w-[min(100%,640px)]">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">主智能体</span>
                    <span class="wx-tag-bot">BOT</span>
                    <span class="text-xs text-[#8F959E] ml-2">14:27</span>
                </div>
                <div class="bg-white rounded-md px-3 py-2 text-[13px] text-[#1F2329] leading-relaxed shadow-none">
                    报告已自动生成。请两位确认风险项与解决时效。<br>
                    <div class="mt-2 p-2 bg-gray-100 rounded border border-gray-200 text-[12px] flex items-center w-fit cursor-pointer">
                        <i class="fa-solid fa-file-word text-[#2B579A] mr-2"></i>碳足迹MVP上线进度确认单.docx
                    </div>
                </div>
            </div>
        </div>
    `;

    const rzConfirmHtml = `
        <div id="execution-consensus-7" class="flex items-start fade-in mt-4">
            <img src="../assets/avatars/sunkangfeng.png" class="w-10 h-10 rounded-full border border-gray-200 shrink-0" alt="">
            <div class="ml-3 w-full max-w-[min(100%,640px)]">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">荣泽-孙康峰</span>
                    <span class="text-xs text-[#8F959E] ml-2">14:28</span>
                </div>
                <div class="bg-white rounded-md px-3 py-2 text-[13px] text-[#1F2329] leading-relaxed shadow-none">
                    报告内容属实，没问题。
                </div>
            </div>
        </div>
    `;

    const yangConfirmHtml = `
        <div id="execution-consensus-8" class="flex items-start justify-end flex-row-reverse fade-in mt-4">
            <img src="../assets/avatars/yangjin.png" class="w-10 h-10 rounded-full border border-gray-200 shrink-0" alt="">
            <div class="mr-3 w-full max-w-[min(100%,640px)]">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">鑫智链-杨进</span>
                    <span class="text-xs text-[#8F959E] ml-2">14:29</span>
                </div>
                <div class="wx-msg-self mr-3 shadow-none text-left">
                    我也确认。测试账号和Logo今天下班前我发群里。
                </div>
            </div>
        </div>
    `;

    const aiDoneHtml = `
        <div id="execution-consensus-9" class="flex items-start fade-in mt-4">
            <img src="https://ui-avatars.com/api/?name=AI&background=3370FF&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm" alt="">
            <div class="ml-3 w-full max-w-[min(100%,640px)]">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">主智能体</span>
                    <span class="wx-tag-bot">BOT</span>
                    <span class="text-xs text-[#8F959E] ml-2">14:30</span>
                </div>
                <div class="bg-white rounded-md px-3 py-2 text-[13px] text-[#1F2329] leading-relaxed shadow-none">
                    ✅ 推进层共识已达成。我这就自动将包含解决方案的报告推送至决策群。大家辛苦！
                </div>
            </div>
        </div>
    `;

    setTimeout(() => appendAndRefresh(aiReviewHtml), 500);
    setTimeout(() => appendAndRefresh(rzReplyHtml), 2000);
    setTimeout(() => appendAndRefresh(aiAssistHtml), 4000);
    setTimeout(() => appendAndRefresh(yangNeedHtml), 5500);
    setTimeout(() => appendAndRefresh(aiDocHtml), 7000);
    setTimeout(() => appendAndRefresh(rzConfirmHtml), 8500);
    setTimeout(() => appendAndRefresh(yangConfirmHtml), 10000);
    setTimeout(() => appendAndRefresh(aiDoneHtml), 11000);
}

function appendExecutionPlaybookAScript() {
    const chatContainer = document.getElementById('chat-container');
    if (!chatContainer) return;

    const appendAndRefresh = (html) => {
        safeInsertAroundDynamic(chatContainer, html);
        applyWechatMessageGrouping(chatContainer);
        applySegmentTimeSeparators(chatContainer);
        scrollExecutionChatToBottom();
    };

    const aiStartHtml = `
        <div id="execution-a-1" class="flex items-start fade-in mt-4">
            <img src="https://ui-avatars.com/api/?name=AI&background=3370FF&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm" alt="">
            <div class="ml-3 w-full max-w-[min(100%,640px)]">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">主智能体</span>
                    <span class="wx-tag-bot">BOT</span>
                    <span class="text-xs text-[#8F959E] ml-2">16:01</span>
                </div>
                <div class="bg-white rounded-md px-3 py-2 text-[13px] text-[#1F2329] leading-relaxed shadow-none">
                    <span class="text-[#3370FF]">@中信咨询-傅毅明</span> <span class="text-[#3370FF]">@数研院-张琳</span> <span class="text-[#3370FF]">@金恒-乐婷婷</span> 几位老师好，关于智慧中心8楼大屏的设计初稿意见，耿总要求今天下午 5 点前提交给陈海萍。目前没有看到各位的反馈，请问目前的进度是？
                </div>
            </div>
        </div>
    `;

    const fymReplyHtml = `
        <div id="execution-a-2" class="flex items-start fade-in mt-4">
            <img src="https://i.pravatar.cc/150?u=citic-fym" class="w-10 h-10 rounded-full border border-gray-200 shrink-0" alt="">
            <div class="ml-3 w-full max-w-[min(100%,640px)]">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">中信咨询-傅毅明</span>
                    <span class="text-xs text-[#8F959E] ml-2">16:02</span>
                </div>
                <div class="bg-white rounded-md px-3 py-2 text-[13px] text-[#1F2329] leading-relaxed shadow-none">
                    我们内部已经汇总完了，大概 12 条意见，正在走内部脱敏审批，4点半准时发给海萍。
                </div>
            </div>
        </div>
    `;

    const zlReplyHtml = `
        <div id="execution-a-3" class="flex items-start fade-in mt-4">
            <img src="https://i.pravatar.cc/150?u=zhanglin" class="w-10 h-10 rounded-full border border-gray-200 shrink-0" alt="">
            <div class="ml-3 w-full max-w-[min(100%,640px)]">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">数研院-张琳</span>
                    <span class="text-xs text-[#8F959E] ml-2">16:03</span>
                </div>
                <div class="bg-white rounded-md px-3 py-2 text-[13px] text-[#1F2329] leading-relaxed shadow-none">
                    鞠鹏上周五发的那个 大屏.zip 包，我这边下载后解压报错文件损坏，没办法看呀。
                </div>
            </div>
        </div>
    `;

    const aiPingHtml = `
        <div id="execution-a-4" class="flex items-start fade-in mt-4">
            <img src="https://ui-avatars.com/api/?name=AI&background=3370FF&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm" alt="">
            <div class="ml-3 w-full max-w-[min(100%,640px)]">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">主智能体</span>
                    <span class="wx-tag-bot">BOT</span>
                    <span class="text-xs text-[#8F959E] ml-2">16:04</span>
                </div>
                <div class="bg-white rounded-md px-3 py-2 text-[13px] text-[#1F2329] leading-relaxed shadow-none">
                    收到张老师的反馈。<span class="text-[#3370FF]">@鑫智链-架构师鞠鹏</span> 张老师这边反馈压缩包解压报错，麻烦重新发一份，或者直接发一个不限速的微盘链接，以免影响数研院提意见的进度。
                </div>
            </div>
        </div>
    `;

    const jpReplyHtml = `
        <div id="execution-a-5" class="flex items-start fade-in mt-4">
            <img src="../assets/avatars/jupeng.png" class="w-10 h-10 rounded-full border border-gray-200 shrink-0" alt="">
            <div class="ml-3 w-full max-w-[min(100%,640px)]">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">鑫智链-架构师鞠鹏</span>
                    <span class="text-xs text-[#8F959E] ml-2">16:05</span>
                </div>
                <div class="bg-white rounded-md px-3 py-2 text-[13px] text-[#1F2329] leading-relaxed shadow-none">
                    不好意思，可能周五传的时候网络断了。新的微盘链接在此：<span class="text-[#3370FF]">https://weipan.com/link/8x9k2m</span>
                </div>
            </div>
        </div>
    `;

    const aiDoneHtml = `
        <div id="execution-a-6" class="flex items-start fade-in mt-4">
            <img src="https://ui-avatars.com/api/?name=AI&background=3370FF&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm" alt="">
            <div class="ml-3 w-full max-w-[min(100%,640px)]">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">主智能体</span>
                    <span class="wx-tag-bot">BOT</span>
                    <span class="text-xs text-[#8F959E] ml-2">16:06</span>
                </div>
                <div class="bg-white rounded-md px-3 py-2 text-[13px] text-[#1F2329] leading-relaxed shadow-none">
                    <span class="text-[#3370FF]">@数研院-张琳</span> 张老师，新链接已就位，麻烦抓紧看一下。进度我先同步给陶总。大家辛苦！
                </div>
            </div>
        </div>
    `;

    setTimeout(() => appendAndRefresh(aiStartHtml), 500);
    setTimeout(() => appendAndRefresh(fymReplyHtml), 1500);
    setTimeout(() => appendAndRefresh(zlReplyHtml), 2500);
    setTimeout(() => appendAndRefresh(aiPingHtml), 3500);
    setTimeout(() => appendAndRefresh(jpReplyHtml), 4500);
    setTimeout(() => appendAndRefresh(aiDoneHtml), 5500);
}

function getGlobalDecisionClosureAppendHtmlPlaybookB() {
    return `
        <div id="finale-report-block" class="hidden w-full mb-4 fade-in">
            <div class="flex items-start">
                <img src="https://ui-avatars.com/api/?name=AI&background=3370FF&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm" alt="">
                <div class="ml-3 w-full max-w-[min(100%,640px)]">
                    <div class="flex items-center mb-1">
                        <span class="text-[13px] font-medium text-[#1F2329]">主智能体</span>
                        <span class="wx-tag-bot">BOT</span>
                        <span class="text-xs text-[#8F959E] ml-2">14:21</span>
                    </div>
                    <div class="bg-white rounded-md px-3 py-2 text-[13px] text-[#1F2329] leading-relaxed shadow-none">
                        <span class="text-[#3370FF]">@陶立春</span> <span class="text-[#3370FF]">@鑫智链-杨进</span> 陶总，杨总与荣泽科技已在碳足迹群达成共识。<strong>碳足迹3月MVP（订单到报告闭环）具备同步上线条件</strong>。核心结论如下：<br><br>
                        🟢 整体进度：开发与测试均达 90%。<br>
                        🟢 依赖卡点已解决：缺失的 Logo 和 UAT 测试账号，杨总已承诺今日下班前提供。<br>
                        🟢 外部风险排除：鑫采商城等未集成项已确认归入4月二期（分润与结算）规划，不影响本月上线。<br><br>
                        《碳足迹MVP上线进度确认单》已归档，请陶总审阅。
                    </div>
                    <div class="mt-2 flex flex-wrap items-center">
                        <span class="text-[#3370FF] cursor-pointer hover:underline text-[13px] mr-4" role="button" tabindex="0" onclick="window.openDocPreviewModal()">📄 预览上线进度确认单(Word)</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getGlobalDecisionClosureAppendHtmlPlaybookA() {
    return `
        <div id="finale-report-block" class="hidden w-full mb-4 fade-in">
            <div class="flex items-start">
                <img src="https://ui-avatars.com/api/?name=AI&background=3370FF&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm" alt="">
                <div class="ml-3 w-full max-w-[min(100%,640px)]">
                    <div class="flex items-center mb-1">
                        <span class="text-[13px] font-medium text-[#1F2329]">主智能体</span>
                        <span class="wx-tag-bot">BOT</span>
                        <span class="text-xs text-[#8F959E] ml-2">16:10</span>
                    </div>
                    <div class="bg-white rounded-md px-3 py-2 text-[13px] text-[#1F2329] leading-relaxed shadow-none">
                        <span class="text-[#3370FF]">@陶立春</span> 陶总，大屏意见征集的事项我已经追问完毕：<br><br>
                        🟢 中信咨询：已汇总12条意见，内部走完审批后 16:30 提交，进度可控。<br>
                        🟡 数研院：遇到文件损坏卡点，我已在群内协调鞠鹏补发了新链接，目前正在加急看。<br>
                        🔴 金恒：群内依然无回复。<br><br>
                        建议：是否需要我自动生成一张催办督办单，直接通过电话语音外呼给金恒的负责人？
                    </div>
                    <div class="mt-2 flex flex-wrap items-center">
                        <span class="text-[#3370FF] cursor-pointer hover:underline text-[13px] mr-4" role="button" tabindex="0" onclick="window.openDocPreviewModal()">📄 预览自动生成的督办单</span>
                        <span class="text-[#3370FF] cursor-pointer hover:underline text-[13px]" role="button" tabindex="0" onclick="window.openCalendarInviteToast && window.openCalendarInviteToast()">📞 一键语音外呼金恒负责人</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getGlobalDecisionClosureAppendHtml() {
    const mode = window.AppState && window.AppState.activePlaybook;
    return mode === 'playbookB'
        ? getGlobalDecisionClosureAppendHtmlPlaybookB()
        : getGlobalDecisionClosureAppendHtmlPlaybookA();
}

/**
 * 决策群第一幕：气泡 HTML 片段（按播放顺序），最后一段含主智能体收尾 + 灰色系统提示（暗门 onclick 勿改）。
 */
function getDecisionActOneFragmentsPlaybookB() {
    const systemNoteHtml =
        '<div id="global-promotion-system-note" class="text-center text-[12px] text-gray-400 my-4 cursor-pointer select-none" onclick="window.revealFinaleReportBlock && window.revealFinaleReportBlock()">系统提示：主智能体 已跟随杨进前往“南钢-鑫智链碳足迹项目群”</div>';
    return [
        `
            <div class="flex flex-col items-end">
                <div class="flex items-center mb-1">
                    <span class="text-xs text-[#8F959E] mr-2">10:40</span>
                    <span class="text-[13px] font-medium text-[#1F2329]">陶立春 (南钢鑫智链)</span>
                </div>
                <div class="flex items-start justify-end flex-row-reverse">
                    <div class="wx-msg-self mr-3 shadow-none"><span class="text-[#3370FF]">@鑫智链-杨进</span> 杨进，碳足迹项目下周能不能跟随可信数据空间项目同步上线MVP？</div>
                    <img src="https://i.pravatar.cc/150?img=11" class="w-10 h-10 rounded-full border border-gray-200 shrink-0">
                </div>
            </div>
        `,
        `
            <div class="flex items-start">
                <img src="../assets/avatars/yangjin.png" class="w-10 h-10 rounded-full border border-gray-200 shrink-0">
                <div class="ml-3 w-full">
                    <div class="flex items-center mb-1">
                        <span class="text-[13px] font-medium text-[#1F2329]">鑫智链-杨进</span>
                        <span class="text-xs text-[#8F959E] ml-2">10:41</span>
                    </div>
                    <div class="bg-white rounded-md px-3 py-2 text-[13px] text-[#1F2329] shadow-none">
                        陶总，我这就去跟荣泽的孙康峰确认一下具体的进度指标和依赖项。<span class="text-[#3370FF]">@主智能体</span> 帮我在静默状态下盯一下这个事情的后续情况。
                    </div>
                </div>
            </div>
        `,
        `
            <div class="flex items-start">
                <img src="https://ui-avatars.com/api/?name=AI&background=3370FF&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm">
                <div class="ml-3 w-full">
                    <div class="flex items-center mb-1">
                        <span class="text-[13px] font-medium text-[#1F2329]">主智能体</span>
                        <span class="wx-tag-bot">BOT</span>
                        <span class="text-xs text-[#8F959E] ml-2">10:42</span>
                    </div>
                    <div class="bg-white rounded-md px-3 py-2 text-[13px] text-[#1F2329] shadow-none">
                        收到杨总。我已开启静默跟进模式，随时准备协助梳理进度。
                    </div>
                </div>
            </div>
        `,
        systemNoteHtml
    ];
}

function getDecisionActOneFragmentsPlaybookA() {
    const systemNoteHtml =
        '<div id="global-promotion-system-note" class="text-center text-[12px] text-gray-400 my-4 cursor-pointer select-none" title="演示：点击展开后续汇报" onclick="window.revealFinaleReportBlock && window.revealFinaleReportBlock()">系统提示：主智能体 已前往“南钢-鑫智链可信数据空间推进群”发起协同跟进</div>';
    return [
        `
            <div class="flex flex-col items-end">
                <div class="flex items-center mb-1">
                    <span class="text-xs text-[#8F959E] mr-2">10:40</span>
                    <span class="text-[13px] font-medium text-[#1F2329]">陶立春 (南钢鑫智链)</span>
                </div>
                <div class="flex items-start justify-end flex-row-reverse">
                    <div class="wx-msg-self mr-3 shadow-none"><span class="text-[#3370FF]">@主智能体</span> 帮我过一下目前推进群里几项重点工作的进度，挑有风险的说。</div>
                    <img src="../assets/avatars/taolichun.png" class="w-10 h-10 rounded-full border border-gray-200 shrink-0">
                </div>
            </div>
        `,
        `
            <div class="flex items-start">
                <img src="https://ui-avatars.com/api/?name=AI&background=3370FF&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm">
                <div class="ml-3 w-full">
                    <div class="flex items-center mb-1">
                        <span class="text-[13px] font-medium text-[#1F2329]">主智能体</span>
                        <span class="wx-tag-bot">BOT</span>
                        <span class="text-xs text-[#8F959E] ml-2">10:41</span>
                    </div>
                    <div class="bg-white rounded-md px-3 py-2 text-[13px] text-[#1F2329] shadow-none">
                        陶总您好，根据本周推进群任务提取，目前梳理出 5 项核心任务。3 项正常，有 1 项存在延期风险（无反馈）：<br>
                        🟢 正常：探足迹系统UAT准备、碳因子库建设方案...<br>
                        🔴 无反馈风险：【智慧中心8楼大屏初稿意见征集】<br>
                        风险详情：上周五耿总要求各单位在今天下午5点前提交意见给陈海萍。信通院已确认，但中信咨询、数研院、金恒在群内无进展反馈。距截止仅剩1小时。您需要我去群里追问一下吗？
                    </div>
                </div>
            </div>
        `,
        `
            <div class="flex flex-col items-end">
                <div class="flex items-center mb-1">
                    <span class="text-xs text-[#8F959E] mr-2">10:42</span>
                    <span class="text-[13px] font-medium text-[#1F2329]">陶立春 (南钢鑫智链)</span>
                </div>
                <div class="flex items-start justify-end flex-row-reverse">
                    <div class="wx-msg-self mr-3 shadow-none">去问一下，盯紧点。</div>
                    <img src="../assets/avatars/taolichun.png" class="w-10 h-10 rounded-full border border-gray-200 shrink-0">
                </div>
            </div>
        `,
        `
            <div class="flex items-start">
                <img src="https://ui-avatars.com/api/?name=AI&background=3370FF&color=fff&rounded=true" class="w-10 h-10 rounded-full shrink-0 shadow-sm">
                <div class="ml-3 w-full">
                    <div class="flex items-center mb-1">
                        <span class="text-[13px] font-medium text-[#1F2329]">主智能体</span>
                        <span class="wx-tag-bot">BOT</span>
                        <span class="text-xs text-[#8F959E] ml-2">10:43</span>
                    </div>
                    <div class="bg-white rounded-md px-3 py-2 text-[13px] text-[#1F2329] shadow-none">
                        好的，我这就去【推进群】跟进这几家单位的进度，一有结果马上向您汇报。
                    </div>
                </div>
            </div>
        ` + systemNoteHtml
    ];
}

function getDecisionActOneFragments() {
    const mode = window.AppState && window.AppState.activePlaybook;
    return mode === 'playbookB' ? getDecisionActOneFragmentsPlaybookB() : getDecisionActOneFragmentsPlaybookA();
}

function scrollDecisionChatToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
    scrollToBottom();
}

function initDecisionActOnePlayback() {
    const input = document.getElementById('chat-input');
    const btn = document.getElementById('chat-send-btn');
    if (!input || !btn || input.dataset.decisionActBound === '1') return;
    input.dataset.decisionActBound = '1';

    const run = () => {
        input.value = '';
        if (window.AppState.currentRoom !== 'global-control') return;
        if (window.AppState.decisionActOneFinished) return;
        if (window.__decisionActOneRunning) return;

        const chatContainer = document.getElementById('chat-container');
        const dynamicContent = document.getElementById('dynamic-content');
        if (!chatContainer || !dynamicContent) return;

        window.__decisionActOneRunning = true;
        const fragments = getDecisionActOneFragments();

        const appendAndRefresh = (html) => {
            dynamicContent.insertAdjacentHTML('beforebegin', html);
            applyWechatMessageGrouping(chatContainer);
            applySegmentTimeSeparators(chatContainer);
            scrollDecisionChatToBottom();
        };

        const finishActOne = () => {
            injectGlobalDecisionClosureBlock();
            applyWechatMessageGrouping(chatContainer);
            applySegmentTimeSeparators(chatContainer);
            scrollDecisionChatToBottom();
            window.AppState.decisionActOneFinished = true;
            window.AppState.globalControlMessages = chatContainer.innerHTML;
            window.__decisionActOneRunning = false;
        };

        appendAndRefresh(fragments[0]);

        const delays = window.AppState.activePlaybook === 'playbookB'
            ? [1200, 2400, 3400]
            : [1000, 2500, 3500];
        for (let i = 0; i < delays.length; i++) {
            const idx = i + 1;
            const delay = delays[i];
            setTimeout(() => {
                appendAndRefresh(fragments[idx]);
                if (idx === fragments.length - 1) {
                    finishActOne();
                }
            }, delay);
        }
    };

    input.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter' || e.shiftKey) return;
        if (window.AppState.currentRoom !== 'global-control') return;
        e.preventDefault();
        run();
    });

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.AppState.currentRoom !== 'global-control') return;
        run();
    });
}

function injectGlobalDecisionClosureBlock() {
    const note = document.getElementById('global-promotion-system-note');
    if (!note || document.getElementById('finale-report-block')) return;
    note.insertAdjacentHTML('afterend', getGlobalDecisionClosureAppendHtml());
}

/**
 * 演示暗门：展开决策群最终收尾汇报，并滚动到底部。
 */
window.revealFinaleReportBlock = function () {
    const block = document.getElementById('finale-report-block');
    if (block) {
        block.classList.remove('hidden');
    }
    window.scrollTo(0, document.body.scrollHeight);
    const chat = document.getElementById('chat-container');
    if (chat) {
        chat.scrollTo({ top: chat.scrollHeight, behavior: 'smooth' });
    }
    if (chat && window.applyWechatMessageGrouping) {
        window.applyWechatMessageGrouping(chat);
    }
    if (chat && window.applySegmentTimeSeparators) {
        window.applySegmentTimeSeparators(chat);
    }

    if (!chat || window.AppState.activePlaybook !== 'playbookB' || document.getElementById('global-closure-followup-yangjin')) return;

    const appendAndRefresh = (html) => {
        safeInsertAroundDynamic(chat, html);
        if (window.applyWechatMessageGrouping) {
            window.applyWechatMessageGrouping(chat);
        }
        if (window.applySegmentTimeSeparators) {
            window.applySegmentTimeSeparators(chat);
        }
        window.scrollTo(0, document.body.scrollHeight);
        chat.scrollTo({ top: chat.scrollHeight, behavior: 'smooth' });
    };

    const yangFollowupHtml = `
        <div id="global-closure-followup-yangjin" class="flex items-start fade-in mt-4">
            <img src="../assets/avatars/yangjin.png" class="w-10 h-10 rounded-full border border-gray-200 shrink-0" alt="">
            <div class="ml-3">
                <div class="flex items-center mb-1">
                    <span class="text-[13px] font-medium text-[#1F2329]">鑫智链-杨进</span>
                    <span class="text-xs text-[#8F959E] ml-2">10:45</span>
                </div>
                <div class="wx-msg-other shadow-none">陶总，已确认无误。欠缺的资料我今天闭环。</div>
            </div>
        </div>
    `;

    const taoFollowupHtml = `
        <div id="global-closure-followup-taolichun" class="flex flex-col items-end fade-in mt-4">
            <div class="flex items-center mb-1">
                <span class="text-xs text-[#8F959E] mr-2">10:46</span>
                <span class="text-[13px] font-medium text-[#1F2329]">陶立春 (南钢鑫智链)</span>
            </div>
            <div class="flex items-start justify-end flex-row-reverse">
                <div class="wx-msg-self mr-3 shadow-none">收到，辛苦大家。</div>
                <img src="../assets/avatars/taolichun.png" class="w-10 h-10 rounded-full border border-gray-200 shrink-0" alt="">
            </div>
        </div>
    `;

    setTimeout(() => appendAndRefresh(yangFollowupHtml), 1000);
    setTimeout(() => appendAndRefresh(taoFollowupHtml), 2000);
};

/**
 * Opens the Word preview modal and locks the background scroll.
 * Bound to the "Preview Draft" action in the Decision Group closure block.
 */
window.openDocPreviewModal = function () {
    const modal = document.getElementById('doc-preview-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
};

/**
 * Closes the Word preview modal and unlocks the background scroll.
 * Bound to 'X' icon, 'Cancel' button, and 'Stamp' button in the modal.
 */
window.closeDocPreviewModal = function () {
    const modal = document.getElementById('doc-preview-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
};

function openCalendarInviteToast() {
    const el = document.getElementById('calendar-invite-toast');
    if (!el) return;
    el.classList.remove('hidden');
    window.clearTimeout(openCalendarInviteToast._t);
    openCalendarInviteToast._t = window.setTimeout(() => {
        el.classList.add('hidden');
    }, 2600);
}

function openDocStampPushToast() {
    window.closeDocPreviewModal();
    const el = document.getElementById('doc-stamp-toast');
    if (!el) return;
    el.classList.remove('hidden');
    window.clearTimeout(openDocStampPushToast._t);
    openDocStampPushToast._t = window.setTimeout(() => {
        el.classList.add('hidden');
    }, 2800);
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
    appendExecutionPlaybookAScript();
}

function renderCarbonServiceMessages() {
    const chatContainer = document.getElementById('chat-container');
    if (!chatContainer) return;

    chatContainer.innerHTML = getPromotionGroupScriptHtml();
    applyWechatMessageGrouping(chatContainer);
    applySegmentTimeSeparators(chatContainer);
    window.scrollToBottom && window.scrollToBottom();
    appendCarbonServiceConsensusScript();
}

function renderExecutionLayerMessagesPlaybookA() {
    renderExecutionLayerMessages();
}

function renderCarbonServiceMessagesPlaybookB() {
    renderCarbonServiceMessages();
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
window.initDecisionActOnePlayback = initDecisionActOnePlayback;
window.injectGlobalDecisionClosureBlock = injectGlobalDecisionClosureBlock;
window.openCalendarInviteToast = openCalendarInviteToast;
window.openDocStampPushToast = openDocStampPushToast;
window.getPromotionGroupScriptHtml = getPromotionGroupScriptHtml;
window.renderExecutionLayerMessages = renderExecutionLayerMessages;
window.renderExecutionLayerMessagesPlaybookA = renderExecutionLayerMessagesPlaybookA;
window.renderCarbonServiceMessages = renderCarbonServiceMessages;
window.renderCarbonServiceMessagesPlaybookB = renderCarbonServiceMessagesPlaybookB;
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
