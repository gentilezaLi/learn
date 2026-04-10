import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.less';
import HomePage from './business/home/index.tsx';
import DetailPage from './business/detail/index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
