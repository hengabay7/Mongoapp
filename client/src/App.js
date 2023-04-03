//IMPORT LIBS
import  {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//IMPORT APP PAGES
import Login from './pages/Login';
import Register from './pages/Register';
import Dashbord from './pages/Dashbord';


//IMPORT COMPONENTS
import Header from './components/Header';


function App() {
  return (
    <BrowserRouter>
    <div className='container'>
    <Header />
    <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Dashbord' element={<Dashbord />} />       
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
