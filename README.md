# 行业信息聚合大屏看板平台

## 项目介绍
行业信息聚合大屏看板平台是一个实时展示行业最新资讯、发展前景、薪资情况和实时人数的可视化平台。该平台采用现代化的科技风格设计，提供直观的数据展示和交互体验。

## 核心功能

### 1. 最新行业资讯
- 自动轮播展示最新行业新闻
- 支持手动切换新闻
- 点击跳转至资讯来源网站
- 带有平滑的转场动画效果

### 2. 行业发展前景
- 使用折线图展示行业增长率趋势
- 点击跳转至行业前景分析网站
- 数据可视化展示

### 3. 行业薪资情况
- 使用柱状图展示不同职位的薪资水平
- 点击跳转至薪资数据来源网站
- 数据可视化展示

### 4. 实时行业人数
- 使用柱状图展示从业人数增长趋势
- 显示当前行业从业总人数
- 点击跳转至人数数据来源网站

### 5. 行业资讯流
- 展示多条行业新闻
- 每条资讯包含标题、来源和时间戳
- 点击跳转至资讯来源网站

### 6. 其他功能
- 实时时间显示
- 手动刷新数据功能
- 前往官网按钮
- 响应式布局设计

## 技术栈

### 前端
- React 18 + TypeScript
- Tailwind CSS 3
- Vite
- Chart.js + react-chartjs-2
- Lucide Icons

### 后端
- Express.js
- Node.js
- PostgreSQL (可选，默认使用模拟数据)

## 项目结构

```
industry-dashboard/
├── api/                # 后端代码
│   ├── config/         # 配置文件
│   │   └── database.js # 数据库连接配置
│   ├── routes/         # API 路由
│   │   ├── news.js     # 新闻相关 API
│   │   ├── outlook.js  # 行业前景相关 API
│   │   ├── salary.js   # 薪资相关 API
│   │   └── population.js # 人数相关 API
│   ├── .env            # 环境变量配置
│   ├── db-init.sql     # 数据库初始化脚本
│   ├── package.json    # 后端依赖
│   └── server.js       # 后端服务器
├── src/                # 前端代码
│   ├── App.tsx         # 主应用组件
│   ├── main.tsx        # 应用入口
│   └── index.css       # 全局样式
├── dist/               # 构建输出目录
├── .gitignore          # Git 忽略文件
├── index.html          # HTML 模板
├── package.json        # 前端依赖
├── postcss.config.js   # PostCSS 配置
├── tailwind.config.js  # Tailwind CSS 配置
├── tsconfig.json       # TypeScript 配置
├── tsconfig.node.json  # TypeScript 节点配置
├── vite.config.ts      # Vite 配置
└── README.md           # 项目说明
```

## 安装与运行

### 前置要求
- Node.js 14.0 或更高版本
- npm 6.0 或更高版本
- PostgreSQL (可选，用于生产环境)

### 前端
1. 安装依赖
   ```bash
   npm install
   ```

2. 启动开发服务器
   ```bash
   npm run dev
   ```

3. 构建生产版本
   ```bash
   npm run build
   ```

4. 预览生产构建
   ```bash
   npm run preview
   ```

### 后端
1. 进入后端目录
   ```bash
   cd api
   ```

2. 安装依赖
   ```bash
   npm install
   ```

3. 启动开发服务器
   ```bash
   npm run dev
   ```

## 访问地址

- **前端**：http://localhost:5173/
- **后端 API**：http://localhost:5002/api

## API 接口

### 1. 新闻接口
- **GET /api/news** - 获取所有新闻
- **GET /api/news/:id** - 获取单条新闻
- **POST /api/news** - 创建新闻
- **PUT /api/news/:id** - 更新新闻
- **DELETE /api/news/:id** - 删除新闻

### 2. 行业前景接口
- **GET /api/outlook** - 获取所有行业前景数据
- **GET /api/outlook/:id** - 获取单条行业前景数据
- **POST /api/outlook** - 创建行业前景数据
- **PUT /api/outlook/:id** - 更新行业前景数据
- **DELETE /api/outlook/:id** - 删除行业前景数据

### 3. 薪资接口
- **GET /api/salary** - 获取所有薪资数据
- **GET /api/salary/:id** - 获取单条薪资数据
- **POST /api/salary** - 创建薪资数据
- **PUT /api/salary/:id** - 更新薪资数据
- **DELETE /api/salary/:id** - 删除薪资数据

### 4. 人数接口
- **GET /api/population** - 获取所有人数数据
- **GET /api/population/latest** - 获取最新人数数据
- **GET /api/population/:id** - 获取单条人数数据
- **POST /api/population** - 创建人数数据
- **PUT /api/population/:id** - 更新人数数据
- **DELETE /api/population/:id** - 删除人数数据

## 数据库初始化

如果需要使用 PostgreSQL 数据库，可以运行以下命令初始化数据库：

```bash
psql -U postgres -f api/db-init.sql
```

## 配置说明

### 后端配置
编辑 `api/.env` 文件：

```env
# 服务器配置
PORT=5002

# 数据库配置
DB_USER=postgres
DB_HOST=localhost
DB_NAME=industry_dashboard
DB_PASSWORD=password
DB_PORT=5432
```

### 前端配置
编辑 `src/App.tsx` 文件中的 API 基础 URL：

```typescript
// API 基础 URL
const API_BASE_URL = 'http://localhost:5002/api';
```

## 功能使用说明

### 新闻轮播
- 自动轮播：新闻会每 5 秒自动切换
- 手动切换：点击轮播图左右两侧的箭头可以手动切换新闻
- 点击跳转：点击新闻卡片会跳转到对应的新闻来源网站

### 数据面板
- 点击任意数据面板会跳转到对应的数据来源网站
- 点击面板右上角的刷新按钮可以手动刷新数据
- 数据会每 30 秒自动刷新

### 资讯流
- 点击资讯流中的任意资讯会跳转到对应的资讯来源网站
- 资讯流会显示最新的 5 条行业资讯

### 前往官网
- 点击页面右上角的 "前往官网" 按钮会跳转到重庆建筑工程职业学院官网

## 响应式设计

- 大屏设备：完整展示所有面板和资讯
- 平板设备：调整布局为两列显示
- 移动设备：调整布局为单列显示，优化触摸交互

## 性能优化

- 使用 React.memo 优化组件渲染
- 使用 Chart.js 进行高效的数据可视化
- 实现数据缓存，减少重复请求
- 图片懒加载，提高页面加载速度

## 常见问题

### 1. 后端服务无法启动
- 检查端口是否被占用
- 检查环境变量配置是否正确
- 检查依赖是否安装完整

### 2. 前端无法连接后端
- 检查后端服务是否运行
- 检查 API_BASE_URL 是否配置正确
- 检查网络连接是否正常

### 3. 数据不显示
- 检查后端服务是否运行
- 检查浏览器控制台是否有错误信息
- 检查 API 接口是否正常响应

## 贡献指南

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 版权信息
©️小傅实例代码 版权所有 使用需授权(包括商用)

## 联系方式

如有问题或建议，请联系项目维护者。