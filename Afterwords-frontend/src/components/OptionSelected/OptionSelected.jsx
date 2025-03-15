import "./OptionSelected.scss";
import { useLocation, Link } from "react-router-dom";


function OptionSelected({ words, index, handleTagClick }) {
    const location = useLocation();
    const optionStatus = location.pathname;

    return (
        <>
            <div className="options__container">
                <div alt="light blue sky background" className="background-photo"></div>
                <div className="options__selection">
                    {/* Home Page */}
                    {optionStatus === "/" && (
                        <Link to="/">
                            {/* <div onClick={() => handleTagClick("homepage", "/")}> */}
                            <section className="mission__section">
                                <h3 className="mission__text">
                                    Your <span className="mission__text mission__text--changing">{words[index]}</span>
                                    <br />
                                    Their Comfort
                                </h3>
                            </section>
                            {/* </div> */}
                        </Link>
                    )}

                    {/* About Page */}
                    {optionStatus === "/about" && (
                        <Link to="/about">
                            <section className="about__section" onClick={() => handleTagClick("about", "/about")}>
                                <p className="about__text">
                                    Afterwords understands that there is no right time to speak of loss, as it is one of
                                    life’s most profound challenges.
                                </p>
                                <p className="about__text">
                                    So we wanted to create a space designed to shift and encourage a deeper focus towards
                                    embracing the love we carry for our loved ones and sharing its beauty in a deeply
                                    meaningful way.
                                </p>
                                <p className="about__text">
                                    Our aim is to help you leave the love and support for your loved ones, that can only be
                                    truly felt through you. Your entries are meant to offer comfort, guidance, and healing
                                    during their time of grief.
                                </p>
                                <p className="about__text">
                                    Our mission is simple: share what you want to leave your loved one(s) with in a way that
                                    transcends time.
                                </p>
                            </section>
                        </Link>
                    )}

                    {/* How-To Page */}
                    {optionStatus === "/howto" && (
                        <Link to="/howto" onClick={() => handleTagClick("howto", '/howto')}>
                            <ul className="how-to__section">
                                <li className="how-to__instructions">
                                    <strong>1. Sign Up:</strong>
                                    <br /> Create an account on Afterwords to access and store your entries.
                                </li>
                                <li className="how-to__instructions">
                                    <strong>2. Add a Loved One:</strong>
                                    <br /> Enter their name to start writing.
                                    <br /> You’ll get a Unique Code (UIC)—share it with them!
                                </li>
                                <li className="how-to__instructions">
                                    <strong>3. Write Messages:</strong>
                                    <br /> Leave up to 31 messages per person,
                                    <br /> to encourage deep reflection. Edit anytime.
                                </li>
                                <li className="how-to__instructions">
                                    <strong>4. Safe & Secure:</strong>
                                    <br /> Entries are saved securely and encrypted, so only
                                    <br /> you and your loved ones with the UIC can see them.
                                </li>
                                <li className="how-to__instructions">
                                    <strong>5. Lost Code?</strong>
                                    <br /> Our future updates will provide more authentication options.
                                </li>
                                <li className="how-to__instructions">
                                    <strong>6. Leave a Legacy:</strong>
                                    <br /> Your words will comfort and support them forever.
                                </li>
                            </ul>
                        </Link>
                    )}

                    {/* Login Page */}
                    {optionStatus === "/login" && (
                        <Link to="/login" onClick={() => handleTagClick("login", "/login")}>
                            <section className="login__container">LOGIN SECTION</section>
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
}

export default OptionSelected;