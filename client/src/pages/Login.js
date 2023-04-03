import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch, } from 'react-redux';

import { FaUser } from 'react-icons/fa';
import { Button, Container , Row , Col, Carousel , Navbar , NavDropdown, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { login, reset } from '../Store/Reducers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Login() {
   
  const [fromData, setFromData] = useState({
    email: '',
    password: ''
  });     
  
  const onChangeText = (e) => {
    setFromData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
    }))
  }


  const {email, password} = fromData;

  const dispatch = useDispatch();
  const {user, isLoading, isError, isSuccess, message} = useSelector((state)=> state.auth);

  useEffect(() => {
    if(isError){
      toast.error(message)
    }
    if(isSuccess || user){
      toast.success('OK')
    }
    dispatch(reset);
  },[user,isLoading,isSuccess,isError,message,dispatch]) 
  

  const onSubmit = async (e) => {
    e.preventDefult()
    if(email === '' || password === ''){
      toast.success('All inputs are required')
    } else {
      const userData = {email, password}
      dispatch(login(userData))
    }
  }

  return (
   <>   
  <ToastContainer />

  <Container>
  <Row>
    <Col lg={12} xs={12}>
      <h1 className='headline'><FaUser /> Login to MarketApp</h1>
    </Col>
  </Row>

  <Navbar collapseOnSelect expand= "lg" bg="dark" variant='dark'>
    <Container>
      <Navbar.Brand>My app Logo</Navbar.Brand>
      <Navbar.Toggle aria-controls='respinsive-navbar-nav' />
      <Navbar.Collapse id='respinsive-navbar-nav'>
      <Nav className='me-auto'>
        <Nav.Link href='#'>Abut Us</Nav.Link>
        <Nav.Link href='#'>Product</Nav.Link>
        <Nav.Link href='#'>Cart</Nav.Link>
        <Nav.Link href='#'>Contact</Nav.Link>

        <NavDropdown>
          <NavDropdown.Item>Test1</NavDropdown.Item>
          <NavDropdown.Item>Test2</NavDropdown.Item>
          <NavDropdown.Item>Test3</NavDropdown.Item>
        </NavDropdown>

      </Nav>
      <Nav>
      <Nav.Link href='#'>Login</Nav.Link>
      <Nav.Link href='#'>Signup</Nav.Link>
      </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>



    <Carousel fade>
      <Carousel.Item>
        <img style={{width:1170,height:500}} src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'></img>
        <Carousel.Caption>
        <h3>This is image</h3>
        <p>This is the inage description</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img style={{width:1170,height:500}} src='https://www.planetware.com/wpimages/2019/11/canada-in-pictures-beautiful-places-to-photograph-morraine-lake.jpg'></img>
        <Carousel.Caption>
        <h3>This is image</h3>
        <p>This is the inage description</p>
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>


  <Row>
    <Col lg={12} xs={12}>            
       <form onSubmit={onSubmit}>
         <div>
            <input 
              type='email'
              id='email'
              name='email'
              className='from-control'
              placeholder='Please enter your email'
              value={email}
              onChange={onChangeText}
            />
         </div>
        
         <div>
            <input 
              type='password'
              id='password'
              name='password'
              className='from-control'
              value={password}
              placeholder='Please enter your password'
              onChange={onChangeText}
            />
         </div>
          <Button type= 'submit' variant= 'danger'>Login</Button>
         
       </form>      
        </Col>
       </Row>
    </Container>
   </>
  )
}

export default Login