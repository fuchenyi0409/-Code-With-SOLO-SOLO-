const express = require('express');
const router = express.Router();
const db = require('../config/database');

// 模拟数据
const mockSalary = [
  { id: 1, position: '前端开发', min_salary: 20000, max_salary: 40000, average_salary: 30000 },
  { id: 2, position: '后端开发', min_salary: 25000, max_salary: 45000, average_salary: 35000 },
  { id: 3, position: '数据科学家', min_salary: 30000, max_salary: 60000, average_salary: 45000 },
  { id: 4, position: '产品经理', min_salary: 22000, max_salary: 42000, average_salary: 32000 },
  { id: 5, position: 'UI/UX设计', min_salary: 18000, max_salary: 38000, average_salary: 28000 }
];

// 获取所有薪资数据
router.get('/', (req, res) => {
  const query = 'SELECT * FROM salary';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('获取薪资数据失败，使用模拟数据:', err);
      res.json(mockSalary);
      return;
    }
    res.json(results.rows);
  });
});

// 获取单条薪资数据
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM salary WHERE id = $1';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('获取薪资数据失败:', err);
      res.status(500).json({ error: '获取薪资数据失败' });
      return;
    }
    if (results.rows.length === 0) {
      res.status(404).json({ error: '薪资数据不存在' });
      return;
    }
    res.json(results.rows[0]);
  });
});

// 创建薪资数据
router.post('/', (req, res) => {
  const { position, min_salary, max_salary, average_salary } = req.body;
  const query = 'INSERT INTO salary (position, min_salary, max_salary, average_salary) VALUES ($1, $2, $3, $4) RETURNING *';
  
  db.query(query, [position, min_salary, max_salary, average_salary], (err, results) => {
    if (err) {
      console.error('创建薪资数据失败:', err);
      res.status(500).json({ error: '创建薪资数据失败' });
      return;
    }
    res.status(201).json(results.rows[0]);
  });
});

// 更新薪资数据
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { position, min_salary, max_salary, average_salary } = req.body;
  const query = 'UPDATE salary SET position = $1, min_salary = $2, max_salary = $3, average_salary = $4 WHERE id = $5 RETURNING *';
  
  db.query(query, [position, min_salary, max_salary, average_salary, id], (err, results) => {
    if (err) {
      console.error('更新薪资数据失败:', err);
      res.status(500).json({ error: '更新薪资数据失败' });
      return;
    }
    if (results.rows.length === 0) {
      res.status(404).json({ error: '薪资数据不存在' });
      return;
    }
    res.json(results.rows[0]);
  });
});

// 删除薪资数据
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM salary WHERE id = $1 RETURNING *';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('删除薪资数据失败:', err);
      res.status(500).json({ error: '删除薪资数据失败' });
      return;
    }
    if (results.rows.length === 0) {
      res.status(404).json({ error: '薪资数据不存在' });
      return;
    }
    res.json({ message: '薪资数据删除成功' });
  });
});

module.exports = router;