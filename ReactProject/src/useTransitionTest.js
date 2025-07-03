import React, { useState, useTransition } from 'react';

function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  // 使用 useTransition 钩子
  const [isPending, startTransition] = useTransition();

  // 模拟搜索 API 调用
  const searchAPI = (query) => {
    return new Promise(resolve => {
      // 模拟网络延迟
      setTimeout(() => {
        const mockResults = [
          `${query} 结果 1`,
          `${query} 结果 2`,
          `${query} 结果 3`,
          `${query} 结果 4`,
          `${query} 结果 5`,
        ];
        resolve(mockResults);
      }, 800); // 800ms 延迟模拟网络请求
    });
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value); // 立即更新输入框
    
    // 使用 startTransition 包裹非紧急更新
    startTransition(async () => {
      if (value.trim() === '') {
        setResults([]);
        return;
      }
      
      const data = await searchAPI(value);
      setResults(data); // 延迟更新结果列表
    });
  };

  return (
    <div style={{ maxWidth: 500, margin: '40px auto' }}>
      <h2>产品搜索</h2>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="输入搜索内容..."
        style={{ padding: '10px', width: '100%', fontSize: '16px' }}
      />
      
      {/* 显示加载状态 */}
      {isPending && (
        <div style={{ padding: '10px', color: '#666' }}>
          加载中 <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</span>
        </div>
      )}
      
      {/* 搜索结果列表 */}
      <ul style={{ marginTop: 20, paddingLeft: 0, listStyle: 'none' }}>
        {results.map((item, index) => (
          <li 
            key={index} 
            style={{
              padding: '12px',
              borderBottom: '1px solid #eee',
              background: index % 2 === 0 ? '#f9f9f9' : 'white'
            }}
          >
            {item}
          </li>
        ))}
      </ul>
      
      {/* 添加一些动画样式 */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default SearchResults;