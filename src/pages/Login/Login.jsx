import React, { useState } from "react";
import "./Login.css";
import logo from '../../assets/logo.png'
import { login, signUp } from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif';

const Login = () => {

    const [signState, setSignState] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const userAuth = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (!signState) {
            await signUp(name, email, password)
        } else {
            await login(email, password)
        }
        setLoading(false);
    }

    return (
        loading ? <div className="login-spinner">
            <img src={netflix_spinner} alt="" />
        </div> : 
        <div className="login">
            <img src={logo} className="login-logo" alt="" />
            <div className="login-form">
                <h1>{signState ? "Sign In" : "Sign Up"}</h1>
                <form>
                    {!signState ? <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="You name" /> : null}

                    <input type="email" value={email}
                        onChange={(e) => setEmail(e.target.value)} placeholder="Email" />

                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

                    <button onClick={userAuth} type="submit">{signState ? "Sign In" : "Sign Up"}</button>
                    <div className="form-help">
                        <div className="remember">
                            <input type="checkbox" />
                            <label htmlFor="">Remember me</label>
                        </div>
                        <p>Need Help?</p>
                    </div>
                </form>
                <div className="form-switch">
                    {
                        !signState ? <p>Already have an account <span onClick={() => { setSignState(true) }}>Sign In Now</span></p> : <p>New to Netflix? <span onClick={() => { setSignState(false) }}>Sign Up Now</span></p>
                    }
                </div>
            </div>
        </div>
    )
}

export default Login