const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/database');

// 加载环境变量
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 中间件
app.use(cors());
app.use(express.json());

// 测试数据库连接
db.connect((err) => {
  if (err) {
    console.error('数据库连接失败，将使用模拟数据:', err);
    // 不退出进程，继续启动服务
  } else {
    console.log('数据库连接成功');
  }
});

// API 路由
const newsRoutes = require('./routes/news');
const outlookRoutes = require('./routes/outlook');
const salaryRoutes = require('./routes/salary');
const populationRoutes = require('./routes/population');

app.use('/api/news', newsRoutes);
app.use('/api/outlook', outlookRoutes);
app.use('/api/salary', salaryRoutes);
app.use('/api/population', populationRoutes);

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});

module.exports = app;