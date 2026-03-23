# src 工程结构说明

## 目录职责
- `pages/`：页面级入口。
- `components/`：可复用组件（与具体场景无关）。
- `features/`：按业务场景组织模块（例如执行层场景）。
- `styles/`：样式分层目录（base/layout/components/utilities/themes）。
- `scripts/`：交互逻辑分层（切换、渲染、抽屉、状态管理）。
- `assets/`：静态资源。
- `prototypes/`：里程碑原型快照。

## 维护原则
1. 布局样式只放 `styles/layout/`，不混入业务文案。
2. 组件样式只放 `styles/components/`，不写页面级定位。
3. 交互逻辑按功能拆分到 `scripts/`，避免单文件脚本膨胀。
