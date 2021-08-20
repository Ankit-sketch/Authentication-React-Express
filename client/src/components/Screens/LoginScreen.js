import { useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./LoginScreen.css";

const RegisterScreen = ({ history }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
          history.push("/login");
        }
      }, [history]);

    const LoginHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json",
            }
        }

        try {
            const { data } = await axios.post(
                "/api/login",
                {
                    email,
                    password,
                },
                config
            );
            console.log(data);
            localStorage.setItem("authToken", data.access_token);
            history.push("/");

        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }

    }

    return (
        <div className="register-screen">
            <form onSubmit={LoginHandler} className="register-screen__form">
                <h3 className="register-screen__title">Register</h3>
                {error && <span className="error-message">{error}</span>}
                
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        required
                        id="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        required
                        id="password"
                        autoComplete="true"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                
                <button type="submit" className="btn btn-primary">
                    Login
                </button>

                <span className="register-screen__subtext">
                    Forgot Password? <Link to="/forgotpassword">forgotpassword</Link>
                </span>
            </form>
        </div>
    );
};

export default RegisterScreen;