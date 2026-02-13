# 从 Supabase 迁移到 JWT 认证

## 已完成的更改

### 1. 新增文件

- `src/services/api/auth.ts` - 认证 API（登录、注册、刷新 token）
- `MIGRATION_TO_JWT.md` - 本迁移文档

### 2. 删除文件

- `src/libs/supabase.ts` - Supabase 客户端配置
- `src/services/api/users.ts` - Supabase 用户同步 API

### 3. 修改文件

- `src/stores/authStore.ts` - 添加持久化，简化 API
- `src/services/http.ts` - 添加自动 token 刷新逻辑
- `src/hooks/useAuth.ts` - 完全重写，移除 Supabase 依赖
- `src/types/user.types.ts` - 移除 SupabaseUser 类型

## 后端 API 要求

你的后端需要实现以下接口：

### 1. 登录

```
POST /api/auth/login
Body: { email: string, password: string }
Response: { user: User, token: string, refreshToken: string }
```

### 2. 注册

```
POST /api/auth/register
Body: { name: string, email: string, password: string }
Response: { user: User, token: string, refreshToken: string }
```

### 3. 刷新 Token

```
POST /api/auth/refresh
Body: { refreshToken: string }
Response: { token: string, refreshToken: string }
```

### 4. 获取当前用户

```
GET /api/auth/me
Headers: { Authorization: Bearer <token> }
Response: User
```

### 5. 登出（可选）

```
POST /api/auth/logout
Headers: { Authorization: Bearer <token> }
Response: void
```

## 新的认证流程

### 登录流程

1. 用户输入邮箱密码
2. 调用 `POST /api/auth/login`
3. 后端返回 `{ user, token, refreshToken }`
4. 前端保存到 store（自动持久化到 localStorage）
5. 跳转到首页

### Token 刷新流程（自动）

1. 请求返回 401
2. HTTP 客户端自动调用 `POST /api/auth/refresh`
3. 获取新的 token 和 refreshToken
4. 更新 store
5. 使用新 token 重试原请求
6. 如果刷新失败，清空认证状态并跳转登录页

### 登出流程

1. 调用 `POST /api/auth/logout`（可选，用于使 token 失效）
2. 清空 store（自动清空 localStorage）
3. 跳转登录页

### 刷新页面

1. 从 localStorage 自动恢复认证状态（由 zustand persist 处理）
2. 如果 token 过期，下次请求时自动刷新

## 需要卸载的依赖

```bash
pnpm remove @supabase/supabase-js
```

## 环境变量

不再需要 Supabase 相关的环境变量，只需要：

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## 优势

1. **简单直接** - 不需要理解 Supabase 的黑盒逻辑
2. **完全可控** - 所有认证逻辑都在你的代码中
3. **自动刷新** - Token 过期自动刷新，无需手动处理
4. **持久化登录** - 刷新页面自动恢复登录状态
5. **并发安全** - 多个请求同时 401 时，只刷新一次 token

## 测试清单

- [ ] 登录功能
- [ ] 登出功能
- [ ] 刷新页面保持登录状态
- [ ] Token 过期自动刷新
- [ ] 刷新失败自动跳转登录页
- [ ] 记住邮箱功能
- [ ] 多标签页同步登录状态（zustand persist 自动处理）
