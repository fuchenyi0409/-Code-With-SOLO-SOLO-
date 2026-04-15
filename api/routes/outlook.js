const express = require('express');
const router = express.Router();
const db = require('../config/database');

// 模拟数据
const mockOutlook = [
  { id: 1, year: 2022, growth_rate: 12.00, forecast: '行业开始复苏，投资增加' },
  { id: 2, year: 2023, growth_rate: 18.00, forecast: '技术创新推动增长' },
  { id: 3, year: 2024, growth_rate: 25.00, forecast: '市场需求大幅提升' },
  { id: 4, year: 2025, growth_rate: 32.00, forecast: '数字化转型加速' },
  { id: 5, year: 2026, growth_rate: 38.00, forecast: '人工智能应用爆发' },
  { id: 6, year: 2027, growth_rate: 45.00, forecast: '行业成熟，稳定增长' }
];

// 获取所有行业前景数据
router.get('/', (req, res) => {
  const query = 'SELECT * FROM outlook ORDER BY year';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('获取行业前景数据失败，使用模拟数据:', err);
      res.json(mockOutlook);
      return;
    }
    res.json(results.rows);
  });
});

// 获取单条行业前景数据
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM outlook WHERE id = $1';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('获取行业前景数据失败:', err);
      res.status(500).json({ error: '获取行业前景数据失败' });
      return;
    }
    if (results.rows.length === 0) {
      res.status(404).json({ error: '行业前景数据不存在' });
      return;
    }
    res.json(results.rows[0]);
  });
});

// 创建行业前景数据
router.post('/', (req, res) => {
  const { year, growth_rate, forecast } = req.body;
  const query = 'INSERT INTO outlook (year, growth_rate, forecast) VALUES ($1, $2, $3) RETURNING *';
  
  db.query(query, [year, growth_rate, forecast], (err, results) => {
    if (err) {
      console.error('创建行业前景数据失败:', err);
      res.status(500).json({ error: '创建行业前景数据失败' });
      return;
    }
    res.status(201).json(results.rows[0]);
  });
});

// 更新行业前景数据
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { year, growth_rate, forecast } = req.body;
  const query = 'UPDATE outlook SET year = $1, growth_rate = $2, forecast = $3 WHERE id = $4 RETURNING *';
  
  db.query(query, [year, growth_rate, forecast, id], (err, results) => {
    if (err) {
      console.error('更新行业前景数据失败:', err);
      res.status(500).json({ error: '更新行业前景数据失败' });
      return;
    }
    if (results.rows.length === 0) {
      res.status(404).json({ error: '行业前景数据不存在' });
      return;
    }
    res.json(results.rows[0]);
  });
});

// 删除行业前景数据
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM outlook WHERE id = $1 RETURNING *';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('删除行业前景数据失败:', err);
      res.status(500).json({ error: '删除行业前景数据失败' });
      return;
    }
    if (results.rows.length === 0) {
      res.status(404).json({ error: '行业前景数据不存在' });
      return;
    }
    res.json({ message: '行业前景数据删除成功' });
  });
});

module.exports = router;