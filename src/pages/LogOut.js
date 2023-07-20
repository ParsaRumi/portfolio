import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
    const navigate = useNavigate();

    const logOut=()=>{
        localStorage.removeItem("token")
        navigate("/login")
    }

  return (
    <div className="logout">
        <h5>You are login if you want <span className='red'>login</span>/<span className='blue'>signup</span> <span className='red'>another</span>/<span className='blue'>new</span> accont please first <Button variant='danger' onClick={logOut}>Log Out</Button></h5>
     
      </div>
  )
}

export default LogOut