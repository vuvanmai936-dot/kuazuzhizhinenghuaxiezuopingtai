window.AppState = {
    globalControlMessages: '',
    currentRoom: 'global-control',
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
            title: '可信数据空间项目决策群',
            statusClass: 'text-[#D83931] bg-[#FEECEE] border border-[#FDC3C8] text-[12px] px-2 py-0.5 rounded-sm flex items-center',
            statusHTML: '<i class="fa-solid fa-microphone-lines-slash mr-1"></i>全员禁言',
            metaHTML: '<i class="fa-solid fa-user-group mr-1"></i>18 人 · 决策层与关键责任方协同群',
            inputPlaceholder: '输入 @ 唤起智能体，或者输入自然语言指令...'
        },
        'risk-control': {
            title: '风险管控专项群',
            statusClass: 'text-[#166534] bg-[#ECFDF3] border border-[#BBF7D0] text-[12px] px-2 py-0.5 rounded-sm flex items-center',
            statusHTML: '<i class="fa-solid fa-shield-halved mr-1"></i>&lt;可信数据空间·审计节点&gt;',
            metaHTML: '<i class="fa-solid fa-user-group mr-1"></i>15 人 · 业主方安全总监与审计智能体联动',
            inputPlaceholder: '输入 @数据安全智能体，发起可信存证调阅或整改审查...'
        },
        'execution-layer': {
            title: '南钢-鑫智链可信数据空间推进群',
            statusClass: 'text-[#B54708] bg-[#FFF7E8] border border-[#FFE1A6] text-[12px] px-2 py-0.5 rounded-sm flex items-center',
            statusHTML: '<i class="fa-solid fa-screwdriver-wrench mr-1"></i>一线作业与异常上报节点',
            metaHTML: '<i class="fa-solid fa-user-group mr-1"></i>42 人 · 外部机构推进与执行协同',
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
    },
    ticketStatus: 'pending',
    ticketRejectReason: '',
    ticketLastActionAt: '',
    ticketResubmitMessage: '',
    dispatchAuthorized: false,
    executionRoom: {
        created: false,
        createdAt: ''
    },
    proactiveRisk: {
        warningPushed: false,
        supervisionIssued: false,
        hiddenRiskCount: 0,
        status: 'risk_detected',
        supervisionCode: 'SUP-20260323-001',
        owner: '张三 (应用开发方-现场工程师)',
        issuedAt: '',
        dueAt: '2026-03-23 17:00',
        mitigationPlan: '',
        evidenceHash: '0x8f2a...3b9c',
        reviewDecision: '',
        closedAt: '',
        closureSummary: ''
    },
    synergyRoom: {
        created: false,
        createdAt: '',
        ticketCode: 'TCK-8080-NW'
    },
    resolutionBroadcasted: false
};

window.AppEvents = new EventTarget();

function updateTicketStatus(nextStatus, payload) {
    const safePayload = payload || {};
    window.AppState.ticketStatus = nextStatus;
    window.AppState.ticketRejectReason = safePayload.reason || window.AppState.ticketRejectReason || '';
    window.AppState.ticketLastActionAt = safePayload.actionAt || window.AppState.ticketLastActionAt || '';
    window.AppState.ticketResubmitMessage = safePayload.resubmitMessage || window.AppState.ticketResubmitMessage || '';

    window.AppEvents.dispatchEvent(new CustomEvent('ticket-status-changed', {
        detail: {
            status: nextStatus,
            reason: window.AppState.ticketRejectReason,
            actionAt: window.AppState.ticketLastActionAt,
            resubmitMessage: window.AppState.ticketResubmitMessage
        }
    }));
}

window.updateTicketStatus = updateTicketStatus;

function updateProactiveRiskStatus(nextStatus, payload) {
    const state = window.AppState.proactiveRisk;
    const safePayload = payload || {};
    state.status = nextStatus;
    state.issuedAt = safePayload.issuedAt || state.issuedAt;
    state.mitigationPlan = safePayload.mitigationPlan || state.mitigationPlan;
    state.reviewDecision = safePayload.reviewDecision || state.reviewDecision;
    state.closureSummary = safePayload.closureSummary || state.closureSummary;
    state.closedAt = safePayload.closedAt || state.closedAt;

    window.AppEvents.dispatchEvent(new CustomEvent('proactive-risk-status-changed', {
        detail: {
            status: state.status,
            issuedAt: state.issuedAt,
            mitigationPlan: state.mitigationPlan,
            reviewDecision: state.reviewDecision,
            closureSummary: state.closureSummary,
            closedAt: state.closedAt
        }
    }));
}

window.updateProactiveRiskStatus = updateProactiveRiskStatus;
