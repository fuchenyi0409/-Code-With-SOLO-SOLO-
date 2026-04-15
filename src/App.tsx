import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { ExternalLink, TrendingUp, DollarSign, Users, Clock, RefreshCw } from 'lucide-react';

// 注册 Chart.js 组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// API 基础 URL
const API_BASE_URL = 'http://localhost:5002/api';

// 接口类型定义
interface News {
  id: number;
  title: string;
  content: string;
  url: string;
  timestamp: string;
}

interface Outlook {
  id: number;
  year: number;
  growth_rate: number;
  forecast: string;
}

interface Salary {
  id: number;
  position: string;
  min_salary: number;
  max_salary: number;
  average_salary: number;
}

interface Population {
  id: number;
  count: number;
  timestamp: string;
}

// 图表数据类型
interface ChartData {
  labels: string[];
  datasets: any[];
}

const App: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [activeNewsIndex, setActiveNewsIndex] = useState<number>(0);
  
  // 数据状态
  const [news, setNews] = useState<News[]>([]);
  const [outlookData, setOutlookData] = useState<ChartData>({
    labels: [],
    datasets: []
  });
  const [salaryData, setSalaryData] = useState<ChartData>({
    labels: [],
    datasets: []
  });
  const [populationData, setPopulationData] = useState<ChartData>({
    labels: [],
    datasets: []
  });
  const [latestPopulation, setLatestPopulation] = useState<number>(0);
  
  // 加载状态
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 更新当前时间
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 轮播新闻
  useEffect(() => {
    if (news.length > 0) {
      const interval = setInterval(() => {
        setActiveNewsIndex((prev) => (prev + 1) % news.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [news]);

  // API 调用函数
  const fetchNews = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/news`);
      if (!response.ok) {
        throw new Error('获取新闻失败');
      }
      const data = await response.json();
      setNews(data);
    } catch (err) {
      console.error('获取新闻失败:', err);
      setError('获取新闻失败');
    }
  };

  const fetchOutlook = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/outlook`);
      if (!response.ok) {
        throw new Error('获取行业前景数据失败');
      }
      const data: Outlook[] = await response.json();
      
      const chartData: ChartData = {
        labels: data.map(item => item.year.toString()),
        datasets: [{
          label: '行业增长率 (%)',
          data: data.map(item => item.growth_rate),
          borderColor: '#06b6d4',
          backgroundColor: 'rgba(6, 182, 212, 0.1)',
          tension: 0.4,
          fill: true
        }]
      };
      
      setOutlookData(chartData);
    } catch (err) {
      console.error('获取行业前景数据失败:', err);
      setError('获取行业前景数据失败');
    }
  };

  const fetchSalary = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/salary`);
      if (!response.ok) {
        throw new Error('获取薪资数据失败');
      }
      const data: Salary[] = await response.json();
      
      const chartData: ChartData = {
        labels: data.map(item => item.position),
        datasets: [{
          label: '平均薪资 (万元/年)',
          data: data.map(item => item.average_salary / 10000),
          backgroundColor: [
            'rgba(6, 182, 212, 0.8)',
            'rgba(20, 184, 166, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(168, 85, 247, 0.8)',
            'rgba(244, 114, 182, 0.8)'
          ],
          borderColor: [
            'rgba(6, 182, 212, 1)',
            'rgba(20, 184, 166, 1)',
            'rgba(59, 130, 246, 1)',
            'rgba(168, 85, 247, 1)',
            'rgba(244, 114, 182, 1)'
          ],
          borderWidth: 1
        }]
      };
      
      setSalaryData(chartData);
    } catch (err) {
      console.error('获取薪资数据失败:', err);
      setError('获取薪资数据失败');
    }
  };

  const fetchPopulation = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/population`);
      if (!response.ok) {
        throw new Error('获取人数数据失败');
      }
      const data: Population[] = await response.json();
      
      // 按时间戳排序，获取最新数据
      const sortedData = data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      
      if (sortedData.length > 0) {
        setLatestPopulation(sortedData[0].count);
      }
      
      // 准备图表数据
      const chartData: ChartData = {
        labels: sortedData.slice(0, 5).reverse().map(() => ' '),
        datasets: [{
          label: '行业从业人数 (万人)',
          data: sortedData.slice(0, 5).reverse().map(item => item.count / 10000),
          backgroundColor: 'rgba(6, 182, 212, 0.8)',
          borderColor: 'rgba(6, 182, 212, 1)',
          borderWidth: 1
        }]
      };
      
      setPopulationData(chartData);
    } catch (err) {
      console.error('获取人数数据失败:', err);
      setError('获取人数数据失败');
    }
  };

  // 初始化数据
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      await Promise.all([
        fetchNews(),
        fetchOutlook(),
        fetchSalary(),
        fetchPopulation()
      ]);
      
      setLoading(false);
    };
    
    fetchData();
    
    // 每30秒刷新一次数据
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  // 手动刷新数据
  const handleRefresh = async () => {
    setLoading(true);
    setError(null);
    
    await Promise.all([
      fetchNews(),
      fetchOutlook(),
      fetchSalary(),
      fetchPopulation()
    ]);
    
    setLoading(false);
  };

  // 图表配置
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'white'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: '#06b6d4',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      y: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white p-4">
      {/* 顶部导航 */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="text-primary text-3xl font-bold mr-2">
            <TrendingUp size={32} />
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            行业信息聚合大屏看板
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-sm text-gray-300">
            <Clock size={16} className="mr-1" />
            <span>{currentTime}</span>
          </div>
          <button
            onClick={handleRefresh}
            className="tech-button bg-dark-light hover:bg-dark-lighter text-white px-4 py-2 rounded-lg flex items-center transition-all"
            disabled={loading}
          >
            <RefreshCw size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
            刷新数据
          </button>
          <a 
            href="https://www.trae.cn" 
            target="_blank" 
            rel="noopener noreferrer"
            className="tech-button bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg flex items-center transition-all"
          >
            前往官网
            <ExternalLink size={16} className="ml-2" />
          </a>
        </div>
      </header>

      {/* 错误提示 */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* 加载状态 */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="tech-border p-4 animate-pulse">
              <div className="h-10 bg-dark-light rounded mb-4"></div>
              <div className="h-40 bg-dark-light rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* 主要内容 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 资讯面板 */}
            {news.length > 0 ? (
              <a 
                href={news[activeNewsIndex].url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="tech-border card-hover p-4 block hover:shadow-glow transition-all"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-primary/20 p-2 rounded-lg mr-3">
                    <TrendingUp size={20} className="text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">最新行业资讯</h2>
                </div>
                <div className="space-y-4">
                  <div 
                    key={news[activeNewsIndex].id}
                    className="animate-fade-slide"
                  >
                    <h3 className="text-lg font-medium text-primary mb-2 hover:underline">
                      {news[activeNewsIndex].title}
                    </h3>
                    <p className="text-gray-300 mb-2">
                      {news[activeNewsIndex].content}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(news[activeNewsIndex].timestamp).toLocaleString('zh-CN')}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    {news.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full ${index === activeNewsIndex ? 'bg-primary' : 'bg-gray-500'}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveNewsIndex(index);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </a>
            ) : (
              <div className="tech-border p-4">
                <p className="text-gray-400">暂无资讯数据</p>
              </div>
            )}

            {/* 行业前景面板 */}
            <a 
              href="https://www.gartner.com/en/newsroom/press-releases/2026-01-10-gartner-forecasts-worldwide-it-spending-to-grow-8-percent-in-2026" 
              target="_blank" 
              rel="noopener noreferrer"
              className="tech-border card-hover p-4 block hover:shadow-glow transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="bg-secondary/20 p-2 rounded-lg mr-3">
                  <TrendingUp size={20} className="text-secondary" />
                </div>
                <h2 className="text-xl font-semibold">行业发展前景</h2>
              </div>
              <div className="h-64">
                {outlookData.labels.length > 0 ? (
                  <Line data={outlookData} options={chartOptions} />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    暂无行业前景数据
                  </div>
                )}
              </div>
            </a>

            {/* 薪资情况面板 */}
            <a 
              href="https://www.glassdoor.com/Salaries/software-engineer-salary-SRCH_KO0,17.htm" 
              target="_blank" 
              rel="noopener noreferrer"
              className="tech-border card-hover p-4 block hover:shadow-glow transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="bg-primary/20 p-2 rounded-lg mr-3">
                  <DollarSign size={20} className="text-primary" />
                </div>
                <h2 className="text-xl font-semibold">行业薪资情况</h2>
              </div>
              <div className="h-64">
                {salaryData.labels.length > 0 ? (
                  <Bar data={salaryData} options={chartOptions} />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    暂无薪资数据
                  </div>
                )}
              </div>
            </a>

            {/* 实时人数面板 */}
            <a 
              href="https://www.bls.gov/emp/tables/occupations-most-job-growth.htm" 
              target="_blank" 
              rel="noopener noreferrer"
              className="tech-border card-hover p-4 block hover:shadow-glow transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="bg-secondary/20 p-2 rounded-lg mr-3">
                  <Users size={20} className="text-secondary" />
                </div>
                <h2 className="text-xl font-semibold">实时行业人数</h2>
              </div>
              <div className="h-64">
                {populationData.labels.length > 0 ? (
                  <Bar data={populationData} options={chartOptions} />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    暂无人数数据
                  </div>
                )}
              </div>
              <div className="mt-4 text-center">
                <div className="text-4xl font-bold text-primary animate-count">
                  {latestPopulation.toLocaleString()}
                </div>
                <div className="text-sm text-gray-300">当前行业从业人数</div>
              </div>
            </a>
          </div>

          {/* 资讯流 */}
          <div className="mt-8 tech-border p-4">
            <div className="flex items-center mb-4">
              <div className="bg-primary/20 p-2 rounded-lg mr-3">
                <TrendingUp size={20} className="text-primary" />
              </div>
              <h2 className="text-xl font-semibold">行业资讯流</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {news.length > 0 ? (
                news.map((item) => (
                  <a 
                    key={item.id} 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-start p-3 bg-dark-light/50 rounded-lg hover:bg-dark-light/80 transition-all cursor-pointer"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-white hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex items-center mt-2 text-xs text-gray-400">
                        <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full mr-2">
                          行业资讯
                        </span>
                        <span>{new Date(item.timestamp).toLocaleString('zh-CN')}</span>
                      </div>
                    </div>
                    <ExternalLink size={16} className="text-gray-400 hover:text-primary transition-colors ml-2 mt-1" />
                  </a>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-400 py-8">
                  暂无资讯数据
                </div>
              )}
            </div>
          </div>

          {/* 底部版权 */}
          <footer className="mt-8 text-center text-gray-400 text-sm">
            <p>©️小傅实例代码 版权所有 使用需授权(包括商用)</p>
          </footer>
        </>
      )}
    </div>
  );
};

export default App;