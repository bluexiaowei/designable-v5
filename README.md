# Designable v5

基于 [Designable](https://github.com/alibaba/designable) 的可视化设计器 monorepo，已适配 **Ant Design v5** 与 **Formily 2.x**，可用于搭建表单设计器、Schema 编辑器等低代码场景。

**在线 Playground：** [https://bluexiaowei.github.io/designable-v5/](https://bluexiaowei.github.io/designable-v5/)

**仓库地址：** [https://github.com/bluexiaowei/designable-v5](https://github.com/bluexiaowei/designable-v5)

## 特性

- **拖拽式设计** — 流畅的组件拖拽、嵌套与布局调整
- **Formily 深度集成** — 设计态与运行态 Schema 互通，支持预览与代码导出
- **Ant Design v5** — 基于 `@formily/antd-v5`，使用 antd v5 推荐 API（如 Tabs / Collapse `items`）
- **可扩展架构** — 通过 Behavior、Resource、Setter 自定义组件与属性面板
- **多视图模式** — 设计视图、JSON Schema、Markup 代码、实时预览

## 技术栈

| 类别             | 版本    |
| ---------------- | ------- |
| React            | 18.x    |
| Ant Design       | ^5.13.0 |
| Formily          | ^2.3.7  |
| @formily/antd-v5 | ^1.2.4  |
| TypeScript       | ^5.7.0  |
| Vite             | ^6.0.0  |
| Turborepo        | ^2.5.0  |
| Changesets       | ^2.29.0 |
| tsup             | ^8.4.0  |
| pnpm             | ^10.6.0 |
| Vitest           | ^3.0.0  |
| ESLint           | ^9.0.0  |
| Prettier         | ^3.5.0  |
| Husky            | ^9.0.0  |

## 项目结构

```
designable-v5/
├── apps/
│   └── playground/            # Vite 演示应用（GitHub Pages）
├── packages/
│   ├── core/                  # 设计器引擎（节点树、拖拽、快捷键等）
│   ├── react/                 # 设计器 UI 组件（面板、工具栏、大纲树等）
│   ├── react-settings-form/   # 右侧属性配置面板
│   ├── react-sandbox/         # 沙箱运行时
│   └── shared/                # 公共工具函数
├── formily/
│   ├── antd/                  # Formily + Ant Design 组件物料（纯库）
│   ├── setters/               # 高级 Setter（联动、数据源、校验等）
│   └── transformer/           # 设计树 ↔ Formily Schema 转换
└── styles/
    └── antd-theme.less        # 设计器自定义样式的 antd 变量
```

### 主要包说明

| 包名                                 | 说明                    |
| ------------------------------------ | ----------------------- |
| `@designable-v5/core`                | 设计器核心引擎          |
| `@designable-v5/react`               | 设计器 React 组件库     |
| `@designable-v5/react-settings-form` | 属性设置表单            |
| `@designable-v5/formily-antd`        | Ant Design 表单组件物料 |
| `@designable-v5/formily-setters`     | Formily 专用 Setter     |
| `@designable-v5/formily-transformer` | Schema 转换器           |

## 快速开始

### 环境要求

- Node.js >= 18（推荐 20 LTS 或更高）
- pnpm >= 10（推荐通过 Corepack 启用：`corepack enable`）

### 安装依赖

```bash
pnpm install
```

### 启动 Playground

```bash
pnpm start:playground
```

启动后访问 [http://127.0.0.1:3000](http://127.0.0.1:3000) 即可体验表单设计器（基于 Vite，冷启动约 1 秒内）。

### 在线演示

Push 到 `main` 分支后，GitHub Actions 会自动将 Playground 部署到 GitHub Pages：

[https://bluexiaowei.github.io/designable-v5/](https://bluexiaowei.github.io/designable-v5/)

首次使用前，请在仓库 **Settings → Pages → Build and deployment** 中选择 **GitHub Actions** 作为来源。

构建 Playground 静态产物：

```bash
pnpm build:playground
```

### 构建

```bash
# 构建所有 packages（Turborepo 并行 + 缓存，库包使用 tsup）
pnpm build

# 单独构建某个包
pnpm turbo run build --filter=@designable-v5/formily-antd
```

### 测试与代码检查

```bash
pnpm test
pnpm lint
```

### 版本发布（Changesets）

8 个子包采用 **固定版本**（fixed），通过 Changesets 统一 bump 与发版：

```bash
# 1. 记录本次变更（会生成 .changeset/*.md）
pnpm changeset

# 2. 本地预览版本 bump（可选）
pnpm version-packages

# 3. 构建并发布到 npm（CI 也会自动执行）
pnpm release
```

**CI 自动化流程：**

1. PR 合并到 `main` 且包含 changeset 文件 → Actions 自动创建 **Version Packages** PR
2. 合并 Version PR → 自动 `pnpm build` + `changeset publish` 发布到 npm

发布 npm 需在仓库 Secrets 中配置 `NPM_TOKEN`。当前为 beta 线，可先用 `pnpm pre:enter:beta` 进入预发布模式。

## 常用脚本

| 命令                                                        | 说明                                          |
| ----------------------------------------------------------- | --------------------------------------------- |
| `pnpm start:playground`                                     | 启动 Ant Design 表单设计器 Playground（Vite） |
| `pnpm build:playground`                                     | 构建 Playground 静态站点                      |
| `pnpm build`                                                | 构建所有 workspace 包（Turborepo + tsup）     |
| `pnpm turbo run build --filter=@designable-v5/formily-antd` | 仅构建指定包                                  |
| `pnpm changeset`                                            | 创建发版变更记录                              |
| `pnpm version-packages`                                     | 根据 changeset 更新版本号与 CHANGELOG         |
| `pnpm release`                                              | 构建并发布到 npm                              |
| `pnpm test`                                                 | 运行单元测试                                  |
| `pnpm lint`                                                 | ESLint 检查并自动修复                         |

## 与原版 Designable 的差异

本仓库是面向 **Ant Design v5** 的适配版本，主要变更包括：

- UI 组件库由 antd v4 升级至 **antd v5**（CSS-in-JS，不再引入 `antd.less`）
- Formily 适配包由 `@formily/antd` 替换为 **`@formily/antd-v5`**
- 设计器内 Tabs / Collapse 使用 antd v5 **`items`** API
- Modal 等组件 API 已同步 v5（如 `open` 替代 `visible`）
- npm scope 为 **`@designable-v5/*`**
- Playground 由 webpack 4 迁移至 **Vite 6**
- 包管理由 Yarn 1 迁移至 **pnpm 10**
- 库包构建由 tsc 双编译迁移至 **tsup**（仅 lib/esm，不再发布 UMD）
- React 由 17 升级至 **18**
- Git 钩子由 ghooks 迁移至 **Husky + commitlint**
- 测试由 Jest 26 迁移至 **Vitest 3**
- ESLint 迁移至 **v9 flat config**，Prettier 升级至 **v3**
- 移除 `shamefully-hoist`，子包显式声明 devDependencies

## 许可证

[MIT](./LICENSE.md)

## 致谢

本项目基于 [alibaba/designable](https://github.com/alibaba/designable) 开发，感谢原作者与社区贡献者的开源工作。
