// import "./PhotosPage.scss";
// import PhotoList from "../../components/PhotoList/PhotoList.jsx";
// import TagsList from "../../components/TagsList/TagsList.jsx";
// import HeaderNav from "../../components/HeaderNav/HeaderNav.jsx";
// import { useState } from "react";

// function PhotosPage() {
//   const [showTags, setShowTags] = useState(false);
//   const [selectedTag, setSelectedTag] = useState("");

//   function filtersShowClick() {
//     setShowTags(!showTags);
//     console.log("clicked");
//   }

//   function handleTagClick(clickedTag) {
//     if (selectedTag !== clickedTag) {
//       setSelectedTag(clickedTag);
//     } else {
//       setSelectedTag("");
//     }
//   }

//   return (
//     <>
//       <HeaderNav
//         isHomePage={true}
//         filtersShowClick={filtersShowClick}
//         showTags={showTags}
//       />
//       <main className="main__section">
//         <TagsList
//           handleTagClick={handleTagClick}
//           showTags={showTags}
//           selectedTag={selectedTag}
//         />
//         <div className="mission-photos__section">
//           <section className="mission__section">
//             <h4 className="mission__title">Our mission:</h4>
//             <h3 className="mission__text">
//               Provide photographers a space to share photos of the neighborhoods
//               they cherish, <i>expressed in their unique style.</i>
//             </h3>
//           </section>
//           <PhotoList selectedTag={selectedTag} />
//         </div>
//       </main>
//     </>
//   );
// }

// export default PhotosPage;
