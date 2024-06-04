import React, { useState } from "react";
import "./Auth.scss";
import { useDispatch } from 'react-redux';
import { register, login } from '../../features/auth/authActions';


const Auth = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const dispatch = useDispatch();

    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        setRole(value);
    };

    const clearFields = () => {
        setName("");
        setEmail("");
        setPassword("");
        setRole("student");
    }

    const signUp = async(event) => {
        event.preventDefault();

        try {
            await dispatch(register({ name, email, password, role })).unwrap();
            console.log('User registered successfully');
          } catch (error) {
            console.error('Failed to register user:', error);
          }

        document.querySelector('.auth').style.display = 'none';
        clearFields();
    };

    const loginButton = async(event) => {
        event.preventDefault();
        
        try {
            await dispatch(login({ email, password })).unwrap();
            console.log('User logged in successfully');
        } catch (error) {
            console.error('Failed to login:', error);
        }
        document.querySelector('.auth').style.display = 'none';
        clearFields();
    }
    const closePop = () => {
        document.querySelector('.auth').style.display = 'none';
        clearFields();
    }

    return (
        <div className="auth">
            <div className="close" onClick={closePop}>
                <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                >
                    <g id="SVGRepo_bgCarrier"
                        strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier"> 
                        <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path> 
                        <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" 
                        stroke="#ffffff" 
                        strokeWidth="1.5" 
                        strokeLinecap="round"></path> </g>
                </svg>
            </div>
            <div className="auth-popup" style={{ background: "url('/sky.jpeg') no-repeat center/cover" }}>
                <input type="checkbox" id="chk" aria-hidden="true"/>

                <div className="signup">
                    <form onSubmit={signUp}>
                        <label htmlFor="chk" aria-hidden="true">Sign up</label>
                        <input 
                            type="text" 
                            name="text" 
                            placeholder="User name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required    
                        />
                        <input 
                            type="Password" 
                            name="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className="checkbox-group">
                            <label>
                                Teacher
                                <input
                                    type="checkbox"
                                    name="role"
                                    value="teacher"
                                    checked={role === "teacher"}
                                    onChange={handleCheckboxChange}
                                />
                            </label>
                            <label>
                                Student
                                <input
                                    type="checkbox"
                                    name="role"
                                    value="student"
                                    checked={role === "student"}
                                    onChange={handleCheckboxChange}
                                />
                            </label>
                        </div>
                        <button type="submit">Sign up</button>
                    </form>
                </div>

                <div className="login">
                <form onSubmit={loginButton}>
                        <label htmlFor="chk" aria-hidden="true">Login</label>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required    
                        />
                        <input 
                            type="Password" 
                            name="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Login</button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Auth;