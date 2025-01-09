import React from 'react';
import { BrowserRouter, Routes, Route,  RouterProvider } from 'react-router-dom'
import { router } from './routes';
import Home from './components/Home';
import Tasks from './components/Tasks';
import NotFound from './components/NotFound';
import { About } from './components/Ex1-About';




// const App = () => {
//   return <RouterProvider router={router} />;
// };

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        {/* Ex1 */}
        <Route path='/about' element={<About/>}/>
        <Route path='/tasks' element={<Tasks/>}/>
        <Route path='/tasks/:id' element={<Tasks/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
};
export default App;