# Changesets

本目录用于记录每次发版前的变更说明。

## 使用方式

1. 完成代码改动后，运行 `pnpm changeset` 创建变更记录
2. 按提示选择 bump 类型（patch / minor / major）与影响的包
3. 提交生成的 `.changeset/*.md` 文件到 PR
4. PR 合并到 `main` 后，GitHub Actions 会自动创建 **Version Packages** PR
5. 合并 Version PR 后，CI 会自动构建并发布到 npm（需配置 `NPM_TOKEN`）

## 预发布版本

当前包版本为 beta 线，如需继续 beta 发版：

```bash
pnpm pre:enter:beta    # 进入 beta 预发布模式
pnpm changeset         # 照常记录变更
# 合并 Version PR 后发布 beta 版本
pnpm pre:exit          # 退出预发布模式（准备发 stable 时）
```

## 提交规范

本项目使用 [Conventional Commits](https://www.conventionalcommits.org/)，本地通过 Husky + commitlint 校验，格式示例：

```
feat(formily-antd): support new field type
fix(core): correct drag offset calculation
```
