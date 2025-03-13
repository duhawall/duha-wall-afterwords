import "./PhotoList.scss";
import PhotoCard from "../PhotoCard/PhotoCard.jsx";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const apiKey = "ninjatuna";
function PhotosList({ selectedTag }) {
  const [photos, setPhotos] = useState([]);

  const fetchPhotos = async () => {
    try {
      const response = await axios.get(
        `https://unit-3-project-c5faaab51857.herokuapp.com/photos?api_key=${apiKey}`
      );
      setPhotos(response.data);
    } catch {
      console.error("Could not fetch photos data from the API.");
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  useEffect(() => { }, [photos]);

  return (
    <div className="photo__container-all">
      {photos
        .filter((photo) =>
          selectedTag ? photo.tags.includes(selectedTag) : photo
        )
        .map((photo) => {
          return (
            <div className="photo__container" key={photo.id}>
              <Link
                to={`/photos/${photo.id}`}
                key={photo.id}
                className="photo__container-link"
              >
                <PhotoCard
                  photo={photo.photo}
                  photographer={photo.photographer}
                  tags={photo.tags}
                  apiKey={apiKey}
                />
              </Link>
            </div>
          );
        })}
    </div>
  );
}

export default PhotosList;
