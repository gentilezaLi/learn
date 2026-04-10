import { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import '@/App.less';
import { routes } from '@/pages/routes';
import { add } from '@auto/utils';

function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}

function App() {
  useEffect(() => {
    // 测试使用 @auto/utils 中的 add 方法
    const result = add(1, 123);
    console.log('utils add result:', result);
  }, []);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <AppRoutes />
      </Suspense>
    </Router>
  );
}

export default App;
