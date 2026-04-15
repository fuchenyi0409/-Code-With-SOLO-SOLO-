-- 创建数据库
CREATE DATABASE industry_dashboard;

-- 连接到数据库
\c industry_dashboard;

-- 创建新闻表
CREATE TABLE news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    url VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建行业前景表
CREATE TABLE outlook (
    id SERIAL PRIMARY KEY,
    year INT NOT NULL,
    growth_rate DECIMAL(5,2) NOT NULL,
    forecast TEXT
);

-- 创建薪资表
CREATE TABLE salary (
    id SERIAL PRIMARY KEY,
    position VARCHAR(100) NOT NULL,
    min_salary INT NOT NULL,
    max_salary INT NOT NULL,
    average_salary INT NOT NULL
);

-- 创建人数表
CREATE TABLE population (
    id SERIAL PRIMARY KEY,
    count INT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 插入测试数据
-- 新闻数据
INSERT INTO news (title, content, url) VALUES
('人工智能行业迎来新一轮投资热潮', '据最新数据显示，2026年第一季度人工智能行业投资金额同比增长35%', 'https://www.techcrunch.com/category/artificial-intelligence/'),
('云计算市场规模突破万亿美元', '全球云计算市场持续扩张，预计2026年将达到1.2万亿美元', 'https://www.zdnet.com/cloud/'),
('5G技术在工业领域应用加速', '5G技术正在改变工业生产方式，提高生产效率30%以上', 'https://www.telecoms.com/5g/'),
('区块链技术在金融领域的应用日益广泛', '越来越多的金融机构开始采用区块链技术，提高交易安全性和效率', 'https://www.coindesk.com/tag/blockchain/'),
('元宇宙概念持续升温', '元宇宙相关技术和应用不断涌现，市场规模快速增长', 'https://www.wired.com/tag/metaverse/');

-- 行业前景数据
INSERT INTO outlook (year, growth_rate, forecast) VALUES
(2022, 12.00, '行业开始复苏，投资增加'),
(2023, 18.00, '技术创新推动增长'),
(2024, 25.00, '市场需求大幅提升'),
(2025, 32.00, '数字化转型加速'),
(2026, 38.00, '人工智能应用爆发'),
(2027, 45.00, '行业成熟，稳定增长');

-- 薪资数据
INSERT INTO salary (position, min_salary, max_salary, average_salary) VALUES
('前端开发', 20000, 40000, 30000),
('后端开发', 25000, 45000, 35000),
('数据科学家', 30000, 60000, 45000),
('产品经理', 22000, 42000, 32000),
('UI/UX设计', 18000, 38000, 28000);

-- 人数数据
INSERT INTO population (count) VALUES
(1200000),
(1500000),
(1800000),
(2200000),
(2600000);

-- 查看所有表
\dt;

-- 查看数据
SELECT * FROM news;
SELECT * FROM outlook;
SELECT * FROM salary;
SELECT * FROM population;