import "./LoggedComponents.scss";
import HeaderNav from "../HeaderNav/HeaderNav";
import { useState, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function LoggedComponents({ handleTagClick, selectedTag, user, isHomePage, id }) {
    const location = useLocation();
    const optionStatus = location.pathname;

    const [lovedOne, setLovedOne] = useState("");
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [isLovedOneEmpty, setIsLovedOneEmpty] = useState(false);
    const navigate = useNavigate();
    // const { id } = useParams();
    // const userId = params.id;
    // console.log(id);
    // console.log(lovedOne);
    const [authorLovedOnes, setAuthorLovedOnes] = useState([]);

    const getLovedOnesForAuthor = async (id) => {
        try {
            const response = await axios.get(`${backendUrl}/loved-ones/${id}/all`);
            setAuthorLovedOnes(response.data);
            // console.log("here is response:", response.data);
        } catch (error) {
            console.error("Error fetching loved ones list:", error);
        }
    };

    useEffect(() => {
        if (id) {
            getLovedOnesForAuthor(id);
        } else {
            getLovedOnesForAuthor(user.id);
        }
    }, []);

    const handleAddLovedOne = (event) => {
        setLovedOne(event.target.value);
        setIsLovedOneEmpty(false);
    };

    const handleNameSubmit = (event) => {
        event.preventDefault();

        if (lovedOne.trim().length === 0) {
            setIsLovedOneEmpty(true);
            return alert("Please fill in the name field.");
        }
        setLovedOne("");
    }

    return (
        <>
            <div alt="light blue sky background" className="background-photo background-photo--logged">
                <div className="options__selection options__selection--logged">
                    {/* Add Loved One Page */}
                    {optionStatus === `/${id}/add-loved-one` && (
                        <form className="add-loved__container" onSubmit={handleNameSubmit}>
                            {/* <button className="form__button form__login" type="submit">Add Loved One
                            </button> */}
                            <label htmlFor="name" className="form__loved-one"><h1>Loved One Name</h1></label>
                            <input
                                id="name"
                                className={`form__input form__input--loved-one ${isLovedOneEmpty ? "form__input--error" : ""
                                    }`}
                                type="name"
                                placeholder="Insert Name Here"
                                name="name"
                                value={lovedOne}
                                onChange={handleAddLovedOne} />
                            <button className="form__button form__login" type="submit">Add Loved One
                            </button>
                        </form>
                    )}
                    {/* Add Entry */}
                    {optionStatus === `/${id}/add-entry` && (
                        <section className="entry-add__section">
                            HI HI ENTRY COMPONENT HERE!
                        </section>
                    )}
                    {/* View List of Loved Ones Page */}
                    {optionStatus === `/loved-ones/${id}/all` && (
                        <div className="loved-list__section">
                            <h2 className="loved-list__title">LIST OF LOVED ONES</h2>
                            <button className="loved-list__button">
                                <div className="loved-list__loved-one loved-list__loved-one--add">+</div><h2>Add A Loved One</h2>
                            </button>
                            <ul className="loved-list__list">
                                {authorLovedOnes.map((lovedOne) => {
                                    console.log(lovedOne);
                                    return (<li
                                        className={`loved-list__loved-one ${selectedTag === Number(lovedOne.loved_one_id) ? "loved-list__lovedOne--selected" : ""
                                            }`}
                                        key={lovedOne.loved_one_id}
                                        onClick={() => setSelectedTag(lovedOne.loved_one_id)}
                                    ><h2>{lovedOne.loved_one_name}</h2>

                                    </li>)
                                })}
                            </ul>
                        </div>
                    )}
                    {/* Logout Page */}
                    {optionStatus === "/logout" && (
                        <>
                        </>
                    )}
                    {/* Login Page */}
                    {/* {optionStatus === "/login" && (
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
                    )} */}
                </div>
            </div >
        </>
    );
}

export default LoggedComponents;