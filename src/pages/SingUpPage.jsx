import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SingUpPage = () => {
    const notify = () => toast("Singup Successfull");
    let navigate =useNavigate()
    const auth = getAuth();
    let [name,setName]=useState('')
    let [email,setEmail]=useState('')
    let [password,setPassword]=useState('')
    let [error,setError]=useState('')

    let handleName=(e)=>{
  
    
            setName(e.target.value)
            if(name){
                setError('')
            }
   
    }
    let handleEmail=(e)=>{


            setEmail(e.target.value)
            if(password){
                setError('')
            }
 
    }
    let handlePassword=(e)=>{
      setPassword(e.target.value)
      if(password){
        setError('')
    }
    }

    let handleSubmit=(e)=>{
        e.preventDefault()
        if(!name){
            setError('Something is Wrong ')
        } if(!email){
            setError('Something is Wrong ')
        } if(!password){
            setError('Something is Wrong ')
        }else{
            createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                updateProfile(auth.currentUser, {
                    displayName: name, 
                  }).then(() => {
                    notify()
                    setTimeout(() => {
                        navigate('/')
                        
                    }, 2000);
                  }).catch((error) => {
                    setError(error.code)
                  });
               

            })
            .catch((error) => {
              setError(error.code)
            });

        }
    }
  return (
    <div class="wrapper">
                <ToastContainer />
    <div class="logo">
    <h1>Singup </h1>
    </div>

    <form class="p-3 mt-3">
        <div class="form-field d-flex align-items-center">
            <span class="far fa-user"></span>
            <input onChange={handleName} type="text" name="userName" id="userName" placeholder="Username"/>
        </div>
        <div class="form-field d-flex align-items-center">
            <span class="fas fa-key"></span>
            <input onChange={handleEmail} type="email" name="email" id="pwd" placeholder="Email"/>
        </div>
        <div class="form-field d-flex align-items-center">
            <span class="fas fa-key"></span>
            <input onChange={handlePassword} type="password" name="password" id="pwd" placeholder="Password"/>
        </div>
        {error &&
            <p className='error'>{error}</p>
        }

    </form>
    <div class="text-center fs-6">
        <Link class="btn mt-3" onClick={handleSubmit} >SingUp</Link> 
    </div>
    <div class="text-center fs-6">
        <Link to='/' class="btn mt-3"  > Have a Account </Link> 
    </div>
</div>
  )
}

export default SingUpPage