import React, { useState } from 'react'
import styles from "./auth.module.scss"
import loginImg from "../../assets/login.png"
import { Link } from 'react-router-dom'
import { FaGoogle } from 'react-icons/fa'
import Card from '../../components/card/Card'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../firebase/config"
import Loader from '../../components/loader/Loader'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

 const loginUser = (e) => {
    e.preventDefault()
    //console.log(email, password)

 }

  return (
    <>
        {isLoading && <Loader />}
        <ToastContainer />
        <section className={`container ${styles.auth}`}>
            <div className={styles.img}>
                <img 
                    src={loginImg} 
                    alt='Login'  
                    width="400"
                />
            </div>
            <Card>
                <div className={styles.form}>
                    <h2>Login</h2>
                    <form onSubmit={loginUser} >
                        <input  
                            type='text'
                            name='email'
                            placeholder='Email'
                            autoComplete='off'
                            required
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                        />
                        <input  
                            type='password'
                            name='password'
                            placeholder='Password'
                            autoComplete='off'
                            required
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                        />
                        <button type="text" className='--btn --btn-primary --btn-block'>
                            Login
                        </button>
                        <div className={styles.links}>
                            <Link to="/reset">Reset Password</Link>
                        </div>
                        <p>-- or --</p>
                    </form>
                    {/*Google Sign In*/}
                    <button className='--btn --btn-danger --btn-block'>
                        <FaGoogle color='#fff'  />
                        Login With Google
                    </button>
                    <span className={styles.register}>
                        <p>Don't have an account?
                        <Link to="/register">Register</Link>
                        </p>
                    </span>
                </div>
            </Card>
            
        </section>
    </>
  )
}

export default Login

