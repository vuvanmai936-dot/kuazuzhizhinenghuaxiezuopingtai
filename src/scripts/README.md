# 脚本职责拆分建议

## 推荐模块
- `chat-room.js`：会话切换与上下文更新。
- `message-renderer.js`：消息流渲染与模板管理。
- `adaptive-card.js`：智能体响应卡片逻辑。
- `ticket-drawer.js`：工单详情抽屉交互。
- `state.js`：页面状态与权限态管理。

## 约束
- 每个文件只做一类职责。
- 公共方法统一导出，避免重复定义。
