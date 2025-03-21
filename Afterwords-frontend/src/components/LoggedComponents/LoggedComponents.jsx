import "./LoggedComponents.scss";
import HeaderNav from "../HeaderNav/HeaderNav";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function LoggedComponents({ handleTagClick, selectedTag, user, isHomePage, id }) {
    const location = useLocation();
    const optionStatus = location.pathname;
    const navigate = useNavigate();
    const [authorLovedOnes, setAuthorLovedOnes] = useState([]);
    const [newLovedOne, setNewLovedOne] = useState("");
    const [lovedOneEntries, setLovedOneEntries] = useState([]);
    const [lovedId, setLovedId] = useState(null);

    const getLovedOnesForAuthor = async (id) => {
        try {
            const response = await axios.get(`${backendUrl}/loved-ones/${id}/all`);
            const authorLovedOnesSorted = [...response.data].sort((a, b) => Number(b.loved_one_id) - Number(a.loved_one_id));
            setAuthorLovedOnes(authorLovedOnesSorted);
            console.log("sorted authors from axios", authorLovedOnesSorted);
        } catch (error) {
            console.error("Error fetching loved ones list:", error);
        }
    };

    useEffect(() => {

    }, [lovedId]);

    const handleLovedEntriesClick = async (lovedOneId) => {
        setLovedId(lovedOneId);
        console.log("setlovedId is:", lovedOneId);
        console.log("lovedId is:", lovedId);

        navigate(`/${user.id}/${lovedId}/entries`);
        try {
            const lovedOneEntriesData = await axios.get(`${backendUrl}/entries/${user.id}/${lovedOneId}/entries`);
            setLovedOneEntries(lovedOneEntriesData);
            console.log("sorted authors from axios", lovedOneEntriesData);
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
                ? Math.max(...authorLovedOnes.map(l => Number(l.loved_one_id))) + 1
                : 1,
            loved_one_name: newLovedOne,
        };

        const postLovedOne = async (newEntry) => {
            try {
                const response = await axios.post(`${backendUrl}/loved-ones/${user.id}/add-new`, newEntry);
                setAuthorLovedOnes([response.data, ...authorLovedOnes]);
            } catch {
                alert("Error posting new loved one.");
            }
        };

        postLovedOne(newEntry);
        setAuthorLovedOnes([newEntry, ...authorLovedOnes]);
        setNewLovedOne("");
    };

    // console.log(optionStatus);  // Debugging line to log current URL status

    return (
        <>
            <div alt="light blue sky background" className="background-photo background-photo--logged">
                <div className="options__selection options__selection--logged">
                    {/* View List of Loved Ones Component */}
                    {optionStatus === `/${user.id}/loved-ones/all` && (
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
                                    return (
                                        <li
                                            className={`loved-list__loved-one ${selectedTag === Number(lovedOne.loved_one_id) ? "loved-list__lovedOne--selected" : ""}`}
                                            key={Number(lovedOne.loved_one_id)}
                                            onClick={() => handleLovedEntriesClick(lovedOne.loved_one_id)}
                                        >
                                            <h2>{lovedOne.loved_one_name}</h2>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}

                    {/* Loved One's Entries Component */}
                    {optionStatus === `/${user.id}/loved-one/${lovedId}/entries` && (
                        <div className="loved-list__section">
                            <h2 className="loved-list__title">
                                {lovedOneEntries.find((l) => l.loved_one_id === selectedNameId)?.loved_one_name?.toUpperCase()}'S ENTRIES
                            </h2>
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
                                    return (
                                        <li
                                            className={`loved-list__loved-one ${selectedTag === Number(lovedOne.loved_one_id) ? "loved-list__lovedOne--selected" : ""}`}
                                            key={lovedOne.loved_one_id}
                                        >
                                            <h2>{lovedOne.loved_one_name}</h2>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}

                    {/* Logout Page */}
                    {optionStatus === "/logout" && <></>}
                </div>
            </div>
        </>
    );
}

export default LoggedComponents;
