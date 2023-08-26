import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './pages/Homepage/Index';
import DetailTodo from './pages/Details/Index';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<DetailTodo />} path="/details/:id" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
