import "./LoggedComponents.scss";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Reorder, useDragControls } from "framer-motion";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function LoggedComponents({ selectedTag, user, id }) {
    const [lovedId, setLovedId] = useState(null);
    const [entryId, setEntryId] = useState(null);
    const location = useLocation();
    const optionStatus = location.pathname;
    const navigate = useNavigate();

    const [authorLovedOnes, setAuthorLovedOnes] = useState([]);
    const [newLovedOne, setNewLovedOne] = useState("");
    const [lovedOneEntries, setLovedOneEntries] = useState([]);
    const [newEntryTitle, setNewEntryTitle] = useState("");
    const [selectedEntry, setSelectedEntry] = useState({});

    const getLovedOnesForAuthor = async (id) => {
        try {
            const response = await axios.get(`${backendUrl}/loved-ones/${id}/all`);
            const authorLovedOnesSorted = [...response.data].sort((a, b) => Number(b.loved_one_id) - Number(a.loved_one_id));
            setAuthorLovedOnes(authorLovedOnesSorted);
        } catch (error) {
            console.error("Error fetching loved ones list:", error);
        }
    };

    useEffect(() => {

    }, [lovedId, entryId]);


    const handleLovedEntriesClick = async (lovedOneId) => {
        setLovedId(lovedOneId);
        navigate(`/${user.id}/${lovedOneId}/entries`);
        try {
            const response = await axios.get(`${backendUrl}/entries/${user.id}/${lovedOneId}/entries`);
            const entriesData = [...response.data.entries].sort((a, b) => b.timestamp - a.timestamp);
            setLovedOneEntries(entriesData);
        } catch (error) {
            console.error("Error fetching loved ones list:", error);
        }
    };

    const handleEntryClick = async (lovedOneId, lovedEntryId) => {
        setEntryId(lovedEntryId);
        navigate(`/${user.id}/${lovedOneId}/entry/${lovedEntryId}`);
        try {
            const response = await axios.get(`${backendUrl}/entries/${user.id}/${lovedOneId}/entry/${lovedEntryId}`);
            setSelectedEntry(response.data.entry);
        } catch (error) {
            console.error("Error fetching loved ones list:", error);
        }
    }

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
                                <Reorder.Group values={authorLovedOnes} onReorder={setAuthorLovedOnes}>
                                    {authorLovedOnes.map((lovedOne) => {
                                        return (
                                            <Reorder.Item value={lovedOne} key={lovedOne}>
                                                <li
                                                    className={`loved-list__loved-one ${selectedTag === Number(lovedOne.loved_one_id) ? "loved-list__lovedOne--selected" : ""}`}
                                                    key={Number(lovedOne.loved_one_id)}
                                                    onClick={() => handleLovedEntriesClick(lovedOne.loved_one_id)}
                                                >
                                                    <h2 className="loved-list__loved-one--name">{lovedOne.loved_one_name}</h2>
                                                    <a className="loved-list__loved-one--qr"></a>
                                                </li>
                                            </Reorder.Item>
                                        );
                                    })}
                                </Reorder.Group>
                            </ul>
                        </div>
                    )}
                    {/* Loved One's Entries Component */}
                    {optionStatus === `/${user.id}/${lovedId}/entries` && (
                        <div className="loved-entries-list__section">
                            <div className="loved-entries-list__container">
                                <li className="loved-list__loved-one--qr loved-list__loved-one--qr-bigger"></li>
                                <h1 className="loved-entries-list__title">
                                    {authorLovedOnes.find((l) => l.loved_one_id === lovedId).loved_one_name.toUpperCase()}'S ENTRIES</h1>
                            </div>
                            <form className="loved-list__form">
                                <input
                                    type="text"
                                    className="loved-list__button"
                                    placeholder="+ Add a new entry"
                                    value={newEntryTitle}
                                    onChange={(e) => setNewEntryTitle(e.target.value)}
                                />
                            </form>
                            <ul className="loved-entries-list__list">

                                {lovedOneEntries.length > 0 ?
                                    <Reorder.Group values={lovedOneEntries} onReorder={setLovedOneEntries}>
                                        {lovedOneEntries.map((entry) => {
                                            return (
                                                <Reorder.Item value={entry} key={entry}>
                                                    <li
                                                        className="loved-list__loved-one lovedd-list__entry-section"
                                                        key={entry.entry_id}
                                                        onClick={() => handleEntryClick(lovedId, entry.entry_id)}
                                                    >
                                                        <a className="loved-list__entry loved-list__entry-reorder" />
                                                        <div className="loved-list__entry-separator">
                                                            <h2 className="loved-list__entry loved-list__entry-title">{entry.title}</h2>
                                                            <h2 className="loved-list__entry loved-list__entry-date">{new Date(entry.timestamp).toLocaleDateString("en-US", {
                                                                year: "numeric",
                                                                month: "2-digit",
                                                                day: "2-digit",
                                                            })}</h2>
                                                        </div>
                                                    </li>
                                                </Reorder.Item>
                                            );
                                        })}</Reorder.Group>
                                    :
                                    <li>No Entries yet.</li>}
                            </ul>
                        </div>
                    )}
                    {/* Loved One's SELECTED Entry Component */}
                    {optionStatus === `/${user.id}/${lovedId}/entry/${entryId}` && (
                        <div className="loved-entry__section">
                            <div className="loved-entry__container">
                                <h2 className="loved-entry__text loved-entry__text--title">{selectedEntry.title}</h2>
                                <h2 className="loved-entry__text loved-entry__text--date">{new Date(selectedEntry.timestamp).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                })}</h2>
                                <a className="loved-list__text loved-list__text--edit" />
                                <a className="loved-list__text loved-list__text--delete" />
                            </div>
                            <h2 className="loved-entry__content">{selectedEntry.content}</h2>
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
