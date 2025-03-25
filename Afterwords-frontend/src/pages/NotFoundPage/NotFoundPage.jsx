import './NotFoundPage.scss';
import HeaderNav from "../../components/HeaderNav/HeaderNav.jsx";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

function NotFoundPage({ filtersShowClick, showTags }) {
  // const initialItems = [
  //   { id: "1", name: "Alice" },
  //   { id: "2", name: "Bob" },
  //   { id: "3", name: "Charlie" },
  //   { id: "4", name: "David" },
  // ];

  // const DragDropList = () => {
  //   const [items, setItems] = useState(initialItems);

  //   const handleDragEnd = (result) => {
  //     if (!result.destination) return;

  //     const updatedItems = [...items];
  //     const [reorderedItem] = updatedItems.splice(result.source.index, 1);
  //     updatedItems.splice(result.destination.index, 0, reorderedItem);

  //     setItems(updatedItems);
  //   };

  return (
    <>
      <HeaderNav
        // loggedIn={loggedIn}
        isHomePage={true}
        filtersShowClick={filtersShowClick}
        showTags={showTags} />
      <section className="notFound">
        <div className="notFound__text">
          <h1 className="notFound__text">The Page You're Looking For Doesn't Exist</h1>
        </div>
      </section >
      {/* <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef} className="p-4 space-y-2 border rounded">
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-2 bg-gray-100 rounded shadow"
                      >
                        {item.name}
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext> */}
    </>
  );
  // }
}

export default NotFoundPage;
