import "./LoggedComponents.scss";
import HeaderNav from "../HeaderNav/HeaderNav";
import { useState, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function LoggedComponents({ handleTagClick, selectedTag, user, isHomePage, id }) {
    const location = useLocation();
    const optionStatus = location.pathname;

    const navigate = useNavigate();
    const [authorLovedOnes, setAuthorLovedOnes] = useState([]);
    const [lovedOne, setLovedOne] = useState("");
    const [newLovedOne, setNewLovedOne] = useState(""); // Stores input value
    // const [selectedTag, setSelectedTag] = useState(null);

    const getLovedOnesForAuthor = async (id) => {
        try {
            const response = await axios.get(`${backendUrl}/loved-ones/${id}/all`);
            console.log("Before sorting:", response.data);

            const authorLovedOnesSorted = [...response.data].sort((a, b) => Number(b.loved_one_id) - Number(a.loved_one_id));

            setAuthorLovedOnes(authorLovedOnesSorted);

            console.log("After sorting:", authorLovedOnesSorted);
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
        event.preventDefault();

        if (newLovedOne.trim() === "") {
            alert("Please enter a name.");
            return;
        }

        const newEntry = {
            author_id: user.id,
            loved_one_id: authorLovedOnes.length > 0
                ? Math.max(...authorLovedOnes.map(l => Number(l.loved_one_id))) + 1 // Ensure unique ID
                : 1,
            loved_one_name: newLovedOne,
        };

        const postLovedOne = async (newEntry) => {
            try {
                await axios.post(`${backendUrl}/loved-ones/${user.id}/add-new`, newEntry);
            } catch {
                alert("Error posting new loved one.");
            }
        }

        postLovedOne(newEntry);
        setAuthorLovedOnes([newEntry, ...authorLovedOnes]);
        setNewLovedOne("");
    };

    // const handleNameSubmit = (event) => {
    //     event.preventDefault();

    //     if (lovedOne.trim().length === 0) {
    //         setIsLovedOneEmpty(true);
    //         return alert("Please fill in the name field.");
    //     }
    //     setLovedOne("");
    // }
    console.log(optionStatus);
    return (
        <>
            <div alt="light blue sky background" className="background-photo background-photo--logged">
                <div className="options__selection options__selection--logged">
                    {/* View List of Loved Ones Component */}
                    {optionStatus === `/loved-ones/${user.id}/all` && (
                        <div className="loved-list__section">
                            <h2 className="loved-list__title">LIST OF LOVED ONES</h2>
                            <form className="loved-list__form" onSubmit={handleAddLovedOne}>
                                <input
                                    type="text"
                                    className="loved-list__button"
                                    placeholder="+ Add a new name"
                                    value={newLovedOne}
                                    onChange={(e) => setNewLovedOne(e.target.value)}
                                />
                            </form>
                            <ul className="loved-list__list">
                                {authorLovedOnes.map((lovedOne) => {
                                    return (<li
                                        className={`loved-list__loved-one ${selectedTag === Number(lovedOne.loved_one_id) ? "loved-list__lovedOne--selected" : ""
                                            }`}
                                        key={lovedOne.loved_one_id}
                                        onClick={() => handleTagClick("loved-one", `/${user.id}/loved-one`)}
                                    ><h2>{lovedOne.loved_one_name}</h2>

                                    </li>)
                                })}
                            </ul>
                        </div>
                    )}
                    {/* Loved One's Entries Component */}
                    {optionStatus === `/${user.id}/loved-one` && (
                        <div className="loved-list__section">
                            <h2 className="loved-list__title">LIST OF LOVED ONES</h2>
                            <form className="loved-list__form" onSubmit={handleAddLovedOne}>
                                <input
                                    type="text"
                                    className="loved-list__button"
                                    placeholder="+ Add a new name"
                                    value={newLovedOne}
                                    onChange={(e) => setNewLovedOne(e.target.value)}
                                />
                            </form>
                            {/* <button className="loved-list__button">
                                <span className="loved-list__loved-one loved-list__loved-one--add">+</span><h2>Add A Loved One</h2>
                            </button> */}
                            <ul className="loved-list__list">
                                {authorLovedOnes.map((lovedOne) => {
                                    return (<li
                                        className={`loved-list__loved-one ${selectedTag === Number(lovedOne.loved_one_id) ? "loved-list__lovedOne--selected" : ""
                                            }`}
                                        key={lovedOne.loved_one_id}
                                    // onClick={() => handleTagClick("loved-one", `/${user.id}/loved-one`)}
                                    ><h2>{lovedOne.loved_one_name}</h2>

                                    </li>)
                                })}
                            </ul>
                        </div>
                    )}
                    {/* ---------- Component */}
                    {optionStatus === true && (
                        <section className="entry-add__section">
                            HI HI ENTRY COMPONENT HERE!
                        </section>
                    )}

                    {/* Logout Page */}
                    {optionStatus === "/logout" && (
                        <>
                        </>
                    )}
                </div>
            </div >
        </>
    );
}

export default LoggedComponents;

//  {/* Add Loved One Page */}
//  {optionStatus === `/${id}/add-loved-one` && (
//     <form className="add-loved__container" onSubmit={handleNameSubmit}>
//         {/* <button className="form__button form__login" type="submit">Add Loved One
//         </button> */}
//         <label htmlFor="name" className="form__button form__login"><h1>Loved One Name</h1></label>
//         <input
//             id="name"
//             className="form__button form__login"
//             type="name"
//             placeholder="Insert Name Here"
//             name="name"
//             value={lovedOne}
//             onChange={handleAddLovedOne} />
//         <button className="form__button form__login" type="submit">Add Loved One
//         </button>
//     </form>
// )}