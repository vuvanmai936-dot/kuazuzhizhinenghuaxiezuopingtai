window.AppState = {
    globalControlMessages: '',
    CHAT_SWITCH_ANIMATION_MS: 220,
    countdownTimer: null,
    slaDeadlineTs: Date.now() + 2 * 60 * 60 * 1000,
    ticketDetail: {
        code: 'WO-20260323-8080',
        owner: '建设方-李工',
        createdAt: '2026-03-23 11:18:00',
        scope: '云环境网络策略核查与 8080 端口放通',
        auditTrail: [
            '最小权限校验：通过',
            '脱敏策略校验：通过',
            '跨组织授权票据：有效'
        ]
    },
    roomViewConfig: {
        'global-control': {
            title: '项目全域总控超级群组',
            statusClass: 'text-[#D83931] bg-[#FEECEE] border border-[#FDC3C8] text-[12px] px-2 py-0.5 rounded-sm flex items-center',
            statusHTML: '<i class="fa-solid fa-microphone-lines-slash mr-1"></i>全员禁言',
            metaHTML: '<i class="fa-solid fa-user-group mr-1"></i>18 人 · 仅总控层高管可下达指令',
            inputPlaceholder: '输入 @ 唤起智能体，或者输入自然语言指令...'
        },
        'execution-layer': {
            title: '子项目A-集成协同群组',
            statusClass: 'text-[#B54708] bg-[#FFF7E8] border border-[#FFE1A6] text-[12px] px-2 py-0.5 rounded-sm flex items-center',
            statusHTML: '<i class="fa-solid fa-screwdriver-wrench mr-1"></i>一线作业与异常上报节点',
            metaHTML: '<i class="fa-solid fa-user-group mr-1"></i>42 人 · 执行层联调、异常上报与现场协同',
            inputPlaceholder: '输入 @执行辅助智能体，快速发起异常上报与跨域协作...'
        },
        'synergy-layer': {
            title: '网络策略变更-临时协同群组',
            statusClass: 'text-[#531DAB] bg-[#F3EDFF] border border-[#D8C8FF] text-[12px] px-2 py-0.5 rounded-sm flex items-center',
            statusHTML: '<i class="fa-solid fa-diagram-project mr-1"></i>&lt;跨组织协同与审批节点&gt;',
            metaHTML: '<i class="fa-solid fa-user-group mr-1"></i>11 人 · 二级群组（跨参与方临时协同）',
            inputPlaceholder: '二级协同层仅支持审批意见记录，普通成员不可直接下发策略指令...'
        }
    },
    synergyApproval: {
        ticketCode: 'TCK-8080-NW',
        status: 'pending',
        approvedBy: '',
        approvedAt: '',
        closureMessage: ''
    }
};
