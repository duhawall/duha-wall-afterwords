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
        // console.log("lovedOneId is:", lovedOneId);
        // console.log("lovedId is:", lovedId);
        // console.log(`/${user.id}/${lovedOneId}/entries`);
        navigate(`/${user.id}/${lovedOneId}/entries`);
        try {
            const response = await axios.get(`${backendUrl}/entries/${user.id}/${lovedOneId}/entries`);
            setLovedOneEntries(response.data.entries);
            // console.log("loved ones entries DATA:", response.data);

            // console.log("sorted authors from axios", response);
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

        const newLovedOneName = {
            author_id: user.id,
            loved_one_id: authorLovedOnes.length > 0
                ? Math.max(...authorLovedOnes.map(l => Number(l.loved_one_id))) + 1
                : 1,
            loved_one_name: newLovedOne,
        };

        const postLovedOne = async (newLovedOne) => {
            try {
                await axios.post(`${backendUrl}/loved-ones/${user.id}/add-new`, newLovedOne);
                getLovedOnesForAuthor(user.id);
            } catch {
                alert("Error posting new loved one.");
            }
        };

        postLovedOne(newLovedOneName);
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
                    {optionStatus === `/${user.id}/${lovedId}/entries` && (
                        <div className="loved-entries-list__section">
                            {/* {console.log("test")}
                            {console.log("loved one entries:", typeof lovedOneEntries)} */}
                            {/* <h2 className="loved-entries-list__title">
                                {lovedOneEntries.find((l) => l.loved_one_id === selectedNameId)?.loved_one_name?.toUpperCase()}'S ENTRIES
                            </h2>
                            <form className="loved-entries-list__form">
                                <input
                                    type="text"
                                    className="loved-entries-list__button"
                                    placeholder="+ Add a new name"
                                    value={newLovedOne}
                                    onChange={(e) => setNewLovedOne(e.target.value)}
                                />
                            </form> */}
                            <ul className="loved-entries-list__list">
                                {lovedOneEntries.length > 0 ?
                                    lovedOneEntries.map((entry) => {
                                        return (
                                            <li
                                                className="entry__title"
                                                key={entry.entry_id}
                                            >
                                                <h2>{entry.title}</h2>
                                                <h2>{entry.content}</h2>
                                                <h2>{entry.timestamp}</h2>
                                                {/* onSubmit={handleAddEntry} */}
                                            </li>
                                        );
                                    })
                                    :
                                    <li>No Entries yet.</li>}
                            </ul>
                        </div>
                    )}

                    {/* Logout Page */}
                    {optionStatus === "/logout" && <></>}
                </div>
            </div >
        </>
    );
}

export default LoggedComponents;
