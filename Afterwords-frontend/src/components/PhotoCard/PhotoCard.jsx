import "./PhotoCard.scss";

function PhotoCard({ photo, photoDescription, photographer, tags }) {
  return (
    <>
      <div className="photo__container-author">
        <div className="photo__photo">
          <img src={photo} alt={photoDescription} className="photo" />
        </div>
        <h4 className="photo__author">{photographer}</h4>
      </div>
      <div className="photo__container-tags">
        {tags.map((tag, index) => {
          return (
            <h4 key={index} className="photo__tag">
              {tag}
            </h4>
          );
        })}
      </div>
    </>
  );
}

export default PhotoCard;
