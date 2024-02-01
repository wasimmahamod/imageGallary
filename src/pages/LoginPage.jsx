import React ,{useState}from 'react'
import { Link, json } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLoginInfo } from '../slices/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
    const notify = () => toast("Login Successfull");
    let dispatch =useDispatch()
    const auth = getAuth();
    let navigate = useNavigate()

    let [email,setEmail]=useState('')
    let [password,setPassword]=useState('')
    let [error,setError]=useState('')


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
       if(!email){
            setError('Something is Wrong ')
        } if(!password){
            setError('Something is Wrong ')
        }else{
            signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
               console.log(user)
               dispatch(userLoginInfo(user.user))
               localStorage.setItem('userInfo',JSON.stringify(user.user))
               notify()
               setTimeout(() => {
                   navigate('/home')
               }, 2000);
           

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
    <h1>Login </h1>
    </div>
    <form class="p-3 mt-3">
       
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
        <Link class="btn mt-3" onClick={handleSubmit}  >Login</Link> 
    </div>
    <div class="text-center fs-6">
        <Link to='/signup' class="btn mt-3"  >Don't Have any Account </Link> 
    </div>
</div>
  )
}

export default LoginPage