import React, { useState } from 'react'
import styles from "./auth.module.scss"
import registerImg from "../../assets/register.png"
import { Link, useNavigate } from 'react-router-dom'
import Card from '../../components/card/Card'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../firebase/config"
import Loader from '../../components/loader/Loader'

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate();

    const registerUser = (e) => {
        e.preventDefault()
        //console.log(email, password, cPassword)

        //Password match
        if(password !== cPassword) {
            toast.error("Passwords do not match.")
        }
        setIsLoading(true)

        //create user account in db
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user);
            setIsLoading(false);
            toast("Registration Successful...");
            navigate("/login")
        })
        .catch((error) => {
            toast.error(error.message)
            setIsLoading(false)
        });
        // setEmail("")
        // setPassword("")
        // setCPassword("")
    }
    

  return (
    <>
        {isLoading && <Loader />}
        <ToastContainer />
        <section className={`container ${styles.auth}`}>
            <Card>
                <div className={styles.form}>
                    <h2>Register</h2>
                    <form onSubmit={registerUser} >
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
                        <input  
                            type='password'
                            name='new-password'
                            placeholder='Confirm Password'
                            autoComplete='off'
                            required
                            value={cPassword}
                            onChange={(e)=> setCPassword(e.target.value)}
                        />
                        <button type='submit' className='--btn --btn-primary --btn-block'>
                            Register
                        </button>
                    </form>
                    <span className={styles.register}>
                        <p>Already have an account?
                        <Link to="/login">Login</Link>
                        </p>
                    </span>
                </div>
            </Card>
            <div className={styles.img}>
                <img 
                    src={registerImg} 
                    alt='Register'  
                    width="400"
                />
            </div>
        </section>
    </>
  )
}

export default Register
