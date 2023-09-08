import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateGame from './pages/CreateGame';
import EditGame from './pages/EditGame';
import DeleteGame from './pages/DeleteGame';
import ShowGame from './pages/ShowGame';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/games/create' element={<CreateGame />} />
      <Route path='/games/details/:id' element={<ShowGame />} />
      <Route path='/games/edit/:id' element={<EditGame />} />
      <Route path='/games/delete/:id' element={<DeleteGame />} />
    </Routes>
)}

export default App