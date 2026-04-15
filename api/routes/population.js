const express = require('express');
const router = express.Router();
const db = require('../config/database');

// 模拟数据
const mockPopulation = [
  { id: 1, count: 1200000, timestamp: new Date().toISOString() },
  { id: 2, count: 1500000, timestamp: new Date().toISOString() },
  { id: 3, count: 1800000, timestamp: new Date().toISOString() },
  { id: 4, count: 2200000, timestamp: new Date().toISOString() },
  { id: 5, count: 2600000, timestamp: new Date().toISOString() }
];

// 获取所有人数数据
router.get('/', (req, res) => {
  const query = 'SELECT * FROM population ORDER BY timestamp DESC';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('获取人数数据失败，使用模拟数据:', err);
      res.json(mockPopulation);
      return;
    }
    res.json(results.rows);
  });
});

// 获取最新人数数据
router.get('/latest', (req, res) => {
  const query = 'SELECT * FROM population ORDER BY timestamp DESC LIMIT 1';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('获取最新人数数据失败，使用模拟数据:', err);
      res.json(mockPopulation[0]);
      return;
    }
    if (results.rows.length === 0) {
      res.json(mockPopulation[0]);
      return;
    }
    res.json(results.rows[0]);
  });
});

// 获取单条人数数据
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM population WHERE id = $1';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('获取人数数据失败:', err);
      res.status(500).json({ error: '获取人数数据失败' });
      return;
    }
    if (results.rows.length === 0) {
      res.status(404).json({ error: '人数数据不存在' });
      return;
    }
    res.json(results.rows[0]);
  });
});

// 创建人数数据
router.post('/', (req, res) => {
  const { count } = req.body;
  const query = 'INSERT INTO population (count) VALUES ($1) RETURNING *';
  
  db.query(query, [count], (err, results) => {
    if (err) {
      console.error('创建人数数据失败:', err);
      res.status(500).json({ error: '创建人数数据失败' });
      return;
    }
    res.status(201).json(results.rows[0]);
  });
});

// 更新人数数据
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { count } = req.body;
  const query = 'UPDATE population SET count = $1 WHERE id = $2 RETURNING *';
  
  db.query(query, [count, id], (err, results) => {
    if (err) {
      console.error('更新人数数据失败:', err);
      res.status(500).json({ error: '更新人数数据失败' });
      return;
    }
    if (results.rows.length === 0) {
      res.status(404).json({ error: '人数数据不存在' });
      return;
    }
    res.json(results.rows[0]);
  });
});

// 删除人数数据
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM population WHERE id = $1 RETURNING *';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('删除人数数据失败:', err);
      res.status(500).json({ error: '删除人数数据失败' });
      return;
    }
    if (results.rows.length === 0) {
      res.status(404).json({ error: '人数数据不存在' });
      return;
    }
    res.json({ message: '人数数据删除成功' });
  });
});

module.exports = router;