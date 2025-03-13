import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PhotoSinglePage.scss";
import HeaderNav from "../../components/HeaderNav/HeaderNav";

function PhotoSinglePage() {
  const [photo, setPhoto] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [isCommentEmpty, setIsCommentEmpty] = useState(false);
  const params = useParams();

  const loadPhoto = async () => {
    const response = await axios.get(
      `https://unit-3-project-c5faaab51857.herokuapp.com/photos/${params.id}?api_key=ninjatuna`
    );
    setPhoto(response.data);
  };

  const loadComment = async () => {
    const responseComments = await axios.get(
      `https://unit-3-project-c5faaab51857.herokuapp.com/photos/${params.id}/comments?api_key=ninjatuna`
    );
    responseComments.data.sort((a, b) => b.timestamp - a.timestamp);
    setComments(responseComments.data);
  };

  const postComment = async (newComment) => {
    try {
      await axios.post(
        `https://unit-3-project-c5faaab51857.herokuapp.com/photos/${params.id}/comments?api_key=ninjatuna`,
        newComment
      );
      loadComment();
    } catch {
      alert("Error: could not post comment.");
    }
  };

  useEffect(() => {
    loadPhoto();
    loadComment();
  }, []);

  if (photo === null) {
    return <p>Loading Photo...</p>;
  }

  const handleAddName = (event) => {
    setName(event.target.value);
  };

  const handleAddComment = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    

    const isFormValid = name.length > 0 || comment.length > 0;
    const isNameFilled = name.length > 0;
    const isCommentFilled = comment.length > 0;

    if (!isFormValid) {
      setIsNameEmpty(true);
      setIsCommentEmpty(true);
      return alert("Please fill empty field(s) first.");
    } else if (!isNameFilled) {
      setIsNameEmpty(true);
      return alert("Please fill name field first.");
    } else if (!isCommentFilled) {
      setIsCommentEmpty(true);
      return alert("Please fill comment field first.");
    }

    const veryNewComment = { name, comment };
    postComment(veryNewComment);
    setName("");
    setComment("");
  };

  return (
    <>
      <HeaderNav isHomePage={false} />
      <main className="single__section">
        <div className="single__container">
          <img src={photo.photo} className="single__photo photo"></img>
          <ul className="single__tag-container">
            {photo.tags.map((tag, index) => (
              <li key={index} className="single__tag">
                {tag}
              </li>
            ))}
          </ul>
          <div className="likes__container">
            <div className="likes__numbers-photo-by">
              <div className="likes__numbers-icon">
                <svg
                  aria-hidden="true"
                  className="likes__heart--outlined"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.875 0C9.57 0 8.3175 0.617984 7.5 1.59455C6.6825 0.617984 5.43 0 4.125 0C1.815 0 0 1.84632 0 4.19619C0 7.08011 2.55 9.42997 6.4125 13.0005L7.5 14L8.5875 12.9929C12.45 9.42997 15 7.08011 15 4.19619C15 1.84632 13.185 0 10.875 0ZM7.575 11.8638L7.5 11.9401L7.425 11.8638C3.855 8.57548 1.5 6.40109 1.5 4.19619C1.5 2.6703 2.625 1.52589 4.125 1.52589C5.28 1.52589 6.405 2.2812 6.8025 3.32643H8.205C8.595 2.2812 9.72 1.52589 10.875 1.52589C12.375 1.52589 13.5 2.6703 13.5 4.19619C13.5 6.40109 11.145 8.57548 7.575 11.8638Z"
                    fill="#0C1E1A"
                  />
                </svg>
                <h2 className="likes__number">{photo.likes} likes</h2>
                <h2 className="likes__date">{comment.date}</h2>
              </div>
              <div className="single-by__container">
                <h2 className="single-by__photo-by">Photo by</h2>
                <h2 className="single-by__photographer">
                  {photo.photographer}
                </h2>
              </div>
              <h2 className="likes__date--tablet">
                {new Date(photo.timestamp).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </h2>
            </div>
            <h2 className="likes__date">
              {new Date(photo.timestamp).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </h2>
          </div>
        </div>
        <form className="form__section" onSubmit={handleSubmit}>
          <label className="form__name">Name</label>
          <input
            className={`form__input form__input--name ${isNameEmpty ? "form__input--error" : ""}`}
            type="text"
            name="name"
            value={name}
            onChange={handleAddName}
          />
          <label className="form__comment">Comment</label>
          <textarea
            className={`form__input form__input--comment ${isCommentEmpty ? "form__input--error" : ""}`}
            type="text"
            name="comment"
            value={comment}
            onChange={handleAddComment}
          />
          <button className="form__button" type="submit">
            Submit
          </button>
        </form>
        <div className="comments__container">
          <h2 className="comments__number comments__number--padding">
            {comments.length} Comment{comments.length > 1 ? "s" : ""}
          </h2>
          <ul className="comments__section">
            {comments.map((comment) => (
              <li className="comments__each" key={comment.id}>
                <div className="comments__name-date">
                  <h3 className="comments__name">{comment.name}</h3>
                  <h3 className="comments__date">
                    {new Date(comment.timestamp).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </h3>
                </div>
                <p className="comments__text">{comment.comment}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}

export default PhotoSinglePage;
