import { Route, Routes } from 'react-router-dom';
import Auto from './Auto';
import Login from './Login';
import Message from './Message';
import Demo2 from './pages/Demo2';
import FinancialDispute from './pages/FinancialDispute';

export default function Links() {
  return (
    <Routes>
      <Route path='/message' element={<Message />} />
      <Route path='/auto' element={<Auto />} />
      <Route path='/login' element={<Login />} />
      <Route path='/financial_dispute' element={<FinancialDispute />} />
      <Route path='/demo2' element={<Demo2 />} />
    </Routes>
  );
}
