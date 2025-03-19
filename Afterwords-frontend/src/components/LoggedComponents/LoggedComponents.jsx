import "./LoggedComponents.scss";
import HeaderNav from "../HeaderNav/HeaderNav";
import { useState } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function LoggedComponents({ words, index, handleTagClick, isHomePage }) {
    const location = useLocation();
    const optionStatus = location.pathname;

    const [email, setLovedOne] = useState("");
    const [password, setPassword] = useState("");
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [isEmailEmpty, setIsLovedOneEmpty] = useState(false);
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
    const navigate = useNavigate();
    const params = useParams();

    const checkLogin = async () => {
        try {
            const getLoginData = await axios.get(
                `${backendUrl}/login/${params.email}`
            );
            setEmail(response.data.email);
            console.log("hollup", setEmail);
            if (!checkLogin) {
                return resizeBy.status(404).json({
                    message: `Email ${req.params.email} not found`,
                });
            }
        } catch {
            alert("Error: could not find email. Please check if it is correct");
        }
    };

    const handleAddLovedOne = (event) => {
        setLovedOne(event.target.value);
        setIsLovedOneEmpty(false);
    };

    const handleAddPassword = (event) => {
        setPassword(event.target.value);
        setIsPasswordEmpty(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const isFormValid = email.length > 0 || password.length > 0;
        const isEmailFilled = email.length > 0;
        const isPasswordFilled = password.length > 0;

        if (!isFormValid) {
            setIsEmailEmpty(true);
            setIsPasswordEmpty(true);
            return alert("Please fill in both email and password field first.");
        } else if (!isEmailFilled) {
            setIsEmailEmpty(true);
            return alert("Please fill in the email field first.");
        } else if (!isPasswordFilled) {
            setIsPasswordEmpty(true);
            return alert("Please fill in the password field first.");
        }

        console.log("Logged in:", { email, password });

        navigate("/logout");

        setEmail("");
        setPassword("");
    };

    return (
        <>
            <div className="options__container">
                <div alt="light blue sky background" className="background-photo"></div>
                <div className="options__selection">
                    {/* Add Loved One Page */}
                    {optionStatus === "/add-loved-one" && (
                        <form className="add-loved__container" onSubmit={() => handleTagClick("add-loved-one", "/")}>
                            <label htmlFor="name" className="form__loved-one">+ Add A Loved One</label>
                            <input
                                id="name"
                                className={`form__input form__input--loved-one ${isEmailEmpty ? "form__input--error" : ""
                                    }`}
                                type="name"
                                placeholder="Please Enter Loved One's Name"
                                name="name"
                                value={name}
                                onChange={handleAddLovedOne} />
                            <button className="form__button form__login" type="submit">Add Loved One
                            </button>
                        </form>
                    )}

                    {/* Loved Ones Page */}

                    {optionStatus === "/about" && (
                        <section className="about__section">
                        </section>
                    )}

                    {/* Logout Page */}
                    {optionStatus === "/how-to" && (
                        <ul className="how-to__section">
                            <li className="how-to__instructions">
                                <strong>1. Sign Up:</strong>
                                <p className="how-to__details"> Create an account on Afterwords to access and store your entries.</p>
                            </li>
                            <li className="how-to__instructions">
                                <strong>2. Add a Loved One:</strong>
                                <p className="how-to__details"> Enter their name to start writing.
                                    You’ll get a Unique Code (UIC)—share it with them!</p>
                            </li>
                            <li className="how-to__instructions">
                                <strong>3. Write Messages:</strong>
                                <p className="how-to__details"> Leave up to 31 messages per person,
                                    to encourage deep reflection. Edit anytime.</p>
                            </li>
                            <li className="how-to__instructions">
                                <strong>4. Safe & Secure:</strong>
                                <p className="how-to__details"> Entries are saved securely and encrypted, so only
                                    you and your loved ones with the UIC can see them.</p>
                            </li>
                            <li className="how-to__instructions">
                                <strong>5. Lost Code?</strong>
                                <p className="how-to__details"> Our future updates will provide more safety and authentication options.</p>
                            </li>
                            <li className="how-to__instructions">
                                <strong>6. Leave a Legacy:</strong>
                                <p className="how-to__details how-to__details--no-padding"> Your words will comfort and support your loved ones forever.</p>
                            </li>
                        </ul>
                    )}
                    {/* Login Page */}
                    {optionStatus === "/login" && (
                        <>
                            <form className="login__container" onSubmit={handleSubmit}>
                                <label htmlFor="email" className="form__email">Email</label>
                                <input
                                    id="email"
                                    className={`form__input form__input--email ${isEmailEmpty ? "form__input--error" : ""
                                        }`}
                                    type="email"
                                    placeholder="Enter your email"
                                    name="email"
                                    // autoComplete="email"
                                    value={email}
                                    onChange={handleAddEmail}
                                />
                                <label htmlFor="password" className="form__password">
                                    Name
                                </label>
                                <input
                                    id="password"
                                    className={`form__input form__input--password ${isPasswordEmpty ? "form__input--error" : ""
                                        }`}
                                    type="password"
                                    placeholder="Enter your password"
                                    name="password"
                                    value={password}
                                    // autoComplete="current-password"
                                    onChange={handleAddPassword}
                                />
                                <button className="form__button" type="submit">
                                    LOG IN
                                </button>
                            </form>
                        </>
                    )}
                </div >
            </div >
        </>
    );
}

export default LoggedComponents;