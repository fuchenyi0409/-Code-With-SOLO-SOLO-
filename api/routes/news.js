const express = require('express');
const router = express.Router();
const db = require('../config/database');

// 模拟数据
const mockNews = [
  { id: 1, title: '人工智能行业迎来新一轮投资热潮', content: '据最新数据显示，2026年第一季度人工智能行业投资金额同比增长35%', url: 'https://www.techcrunch.com/category/artificial-intelligence/', timestamp: new Date().toISOString() },
  { id: 2, title: '云计算市场规模突破万亿美元', content: '全球云计算市场持续扩张，预计2026年将达到1.2万亿美元', url: 'https://www.zdnet.com/cloud/', timestamp: new Date().toISOString() },
  { id: 3, title: '5G技术在工业领域应用加速', content: '5G技术正在改变工业生产方式，提高生产效率30%以上', url: 'https://www.telecoms.com/5g/', timestamp: new Date().toISOString() },
  { id: 4, title: '区块链技术在金融领域的应用日益广泛', content: '越来越多的金融机构开始采用区块链技术，提高交易安全性和效率', url: 'https://www.coindesk.com/tag/blockchain/', timestamp: new Date().toISOString() },
  { id: 5, title: '元宇宙概念持续升温', content: '元宇宙相关技术和应用不断涌现，市场规模快速增长', url: 'https://www.wired.com/tag/metaverse/', timestamp: new Date().toISOString() }
];

// 获取所有新闻
router.get('/', (req, res) => {
  const query = 'SELECT * FROM news ORDER BY timestamp DESC';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('获取新闻失败，使用模拟数据:', err);
      res.json(mockNews);
      return;
    }
    res.json(results.rows);
  });
});

// 获取单条新闻
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM news WHERE id = $1';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('获取新闻失败:', err);
      res.status(500).json({ error: '获取新闻失败' });
      return;
    }
    if (results.rows.length === 0) {
      res.status(404).json({ error: '新闻不存在' });
      return;
    }
    res.json(results.rows[0]);
  });
});

// 创建新闻
router.post('/', (req, res) => {
  const { title, content, url } = req.body;
  const query = 'INSERT INTO news (title, content, url) VALUES ($1, $2, $3) RETURNING *';
  
  db.query(query, [title, content, url], (err, results) => {
    if (err) {
      console.error('创建新闻失败:', err);
      res.status(500).json({ error: '创建新闻失败' });
      return;
    }
    res.status(201).json(results.rows[0]);
  });
});

// 更新新闻
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, content, url } = req.body;
  const query = 'UPDATE news SET title = $1, content = $2, url = $3 WHERE id = $4 RETURNING *';
  
  db.query(query, [title, content, url, id], (err, results) => {
    if (err) {
      console.error('更新新闻失败:', err);
      res.status(500).json({ error: '更新新闻失败' });
      return;
    }
    if (results.rows.length === 0) {
      res.status(404).json({ error: '新闻不存在' });
      return;
    }
    res.json(results.rows[0]);
  });
});

// 删除新闻
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM news WHERE id = $1 RETURNING *';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('删除新闻失败:', err);
      res.status(500).json({ error: '删除新闻失败' });
      return;
    }
    if (results.rows.length === 0) {
      res.status(404).json({ error: '新闻不存在' });
      return;
    }
    res.json({ message: '新闻删除成功' });
  });
});

module.exports = router;