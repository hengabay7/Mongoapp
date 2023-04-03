import React, { useState} from 'react'
import { FaUser } from 'react-icons/fa';

import { Button, button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


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


  const onSubmit = async () => {
    
  }

  return (
   <>   
    <section>
       <h1 className='haedline'><FaUser /> Login to MarketApp</h1>
       <p>{email} {password}</p>
    </section>

    <section>
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
    </section>
   </>
  )
}

export default Login