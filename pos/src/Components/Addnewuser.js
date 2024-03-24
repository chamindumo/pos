import React from 'react'

export default function Addnewuser() {
  return (
    <div className='container'>
        <div className='header'>
            <div className='text'>Add New User</div>
        </div>
        <div className='inputs'>
            <div className='input'>
                <input type='text' placeholder='Full Name'/>                
            </div>
            <div className='input'>
                <input type='text' placeholder='Email Address'/>
            </div>
            <div className='input'>
                <input type='text' placeholder='Contact Number'/>
            </div>
            <div className='input'>
                <input type='text' placeholder='Address'/>
            </div>
            <div className='input'>
                <input type='text' placeholder='Password'/>
            </div>
        </div>
        <div className='submit-container'>
                <button className='submit-login'>Add</button>
                <button className='submit-cancel'>Cancel</button>
        </div>
    </div>
  )
}
