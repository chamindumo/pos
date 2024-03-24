import React from 'react'
import './Login.css'

function Forgotpassword() {
  return (
    <div className='container'>
        <div className='header'>
            <div className='text'>Forgot-Password</div>
            <div className='texts'>Reset password link will share to your email</div>
        </div>
        <div className='inputs'>
            <div className='input'>
                <input type='text' placeholder='Enter your email Address'/>
                <button className='submit-login'>Submit</button>
            </div>
            <div className='forgot-password'>
                Login 
                <a id="myLink" href="./" onclick="MyFunction();return false;"><span>Click here </span></a>
            </div>
        </div>
    </div>
  )
}

export default Forgotpassword