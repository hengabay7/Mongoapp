import React, { useState} from 'react'
import { FaUser } from 'react-icons/fa';

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

  return (
   <>   
    <section>
       <h1 className='haedline'><FaUser /> Login to MarketApp</h1>
       <p>{email} {password}</p>
    </section>

    <section>
       <form>
         <div>
            <input 
              type='email'
              id='email'
              name='email'
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
              value={password}
              placeholder='Please enter your password'
              onChange={onChangeText}
            />
         </div>
       </form>
    </section>
   </>
  )
}

export default Login