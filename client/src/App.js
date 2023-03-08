//IMPORT LIBS
import  {BrowserRouter, Routes, Route} from 'react-router-dom';

//IMPORT APP PAGES
import Login from './pages/Login';
import Register from './pages/Register';
import Dashbord from './pages/Dashbord';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Dashbord' element={<Dashbord />} />       
    </Routes>
    </BrowserRouter>
  );
}

export default App;
