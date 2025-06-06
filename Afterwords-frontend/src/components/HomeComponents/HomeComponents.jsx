import "./HomeComponents.scss";
import { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";


function HomeComponents({ words, index, setLoggedIn }) {
    const location = useLocation();
    const optionStatus = location.pathname;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailEmpty, setIsEmailEmpty] = useState(false);
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
    const navigate = useNavigate();
    const params = useParams();

    const handleAddEmail = (event) => {
        setEmail(event.target.value);
        setIsEmailEmpty(false);
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

        setLoggedIn(true);
        navigate("/logged");

        setEmail("");
        setPassword("");
    };

    return (
        <>
            <div className="options__container">
                <div alt="light blue sky background" className="background-photo background-photo--mobile"></div>
                {/* Home Page */}
                {optionStatus === "/" && (
                    <>
                        <section className="mission__section">
                            <h1 className="mission__text">
                                Your <span className="mission__text mission__text--changing">{words[index]}</span>
                                <br />
                                Their Comfort
                            </h1>
                        </section>
                        <div alt="light blue sky background" className="background-photo background-photo--tablet"></div>
                    </>
                )}

                {/* About Page */}
                {optionStatus === "/about" && (
                    <>
                        <div alt="light blue sky background" className="background-photo background-photo--drawer"></div>
                        <section className="about__section">
                            <p className="about__text">
                                We at <i>Afterwords</i> understand that there is no right time to speak of loss, as it is one of
                                life’s most profound challenges.
                            </p>
                            <p className="about__text">
                                So we wanted to create a space designed to shift and encourage a deeper focus towards
                                embracing the love we carry for our loved ones, and to share that beauty in a deeply
                                meaningful way.
                            </p>
                            <p className="about__text">
                                The aim is to help you leave the love and support for your loved ones, that can only be
                                truly felt through you. Your entries are meant to offer comfort, guidance, and healing
                                during their time of grief.
                            </p>
                            <p className="about__text">
                                Our mission is simple: share what you want to leave your loved one(s) in a way that
                                transcends time.
                            </p>
                        </section>
                    </>
                )}

                {/* How-To Page */}
                {optionStatus === "/how-to" && (
                    <>
                        <div alt="light blue sky background" className="background-photo background-photo--drawer"></div>
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
                                <p className="how-to__details how-to__details--no-padding"> Your words of comfort will support your loved ones forever.</p>
                            </li>
                        </ul>
                    </>
                )}
                {/* Login Page */}
                {optionStatus === "/login" && (
                    <>
                        <div alt="light blue sky background" className="background-photo background-photo--drawer"></div>
                        <form className="login__container" onSubmit={handleSubmit}>
                            <label htmlFor="email" className="form__email">Email</label>
                            <input
                                id="email"
                                className={`form__input form__input--email ${isEmailEmpty ? "form__input--error" : ""
                                    }`}
                                type="email"
                                placeholder="Enter your email"
                                name="email"
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
                                onChange={handleAddPassword}
                            />
                            <button className="form__button" type="submit">
                                LOG IN
                            </button>
                            <h3 className="form__signup">No Account?
                                <br />
                                <a href="/" className="signup-link">Sign up here</a></h3>
                        </form>
                    </>
                )}
            </div>
        </>
    );
}

export default HomeComponents;