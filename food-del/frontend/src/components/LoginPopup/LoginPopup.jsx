import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const LoginPopup = ({ setShowLogin }) => {

    const { setToken, url, loadCartData } = useContext(StoreContext)
    const [currState, setCurrState] = useState("Sign Up");
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (e) => {
        e.preventDefault()

        if (currState === "Sign Up" && data.password !== data.confirmPassword) {
            toast.error("Passwords do not match")
            return
        }

        let new_url = url;
        if (currState === "Login") {
            new_url += "/api/user/login";
        } else {
            new_url += "/api/user/register"
        }
        const response = await axios.post(new_url, data);
        if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            loadCartData({ token: response.data.token })
            setShowLogin(false)
        } else {
            toast.error(response.data.message)
        }
    }
    

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2> <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Sign Up" && (
                        <>
                            <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' required />
                            <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' required />
                            <input name='address' onChange={onChangeHandler} value={data.address} type="text" placeholder='Address' required />
                        </>
                    )}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                    <div className="password-input">
                        <input
                            name='password'
                            onChange={onChangeHandler}
                            value={data.password}
                            type={passwordVisible ? "text" : "password"}
                            placeholder='Password'
                            required
                        />
                        <button type="button" onClick={togglePasswordVisibility}>
                            {passwordVisible ? "Hide" : "Show"}
                        </button>
                    </div>
                    {currState === "Sign Up" && (
                        <div className="password-input">
                            <input
                                name='confirmPassword'
                                onChange={onChangeHandler}
                                value={data.confirmPassword}
                                type={passwordVisible ? "text" : "password"}
                                placeholder='Confirm Password'
                                required
                            />
                            <button type="button" onClick={togglePasswordVisibility}>
                                {passwordVisible ? "Hide" : "Show"}
                            </button>
                        </div>
                    )}
                </div>
                <button type='submit'>{currState==="Sign Up"?"Create an account":"Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" name="" id="" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login"
                    ? <p>Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup
