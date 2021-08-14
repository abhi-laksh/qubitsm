import React from 'react';
import { Draggable } from "react-beautiful-dnd";
import DraggableItem from '../DragNDrop/DraggableItem';

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",

    // styles we need to apply on draggables
    transform: isDragging ? 'scale(0.95)' : 'scale(1)',
    WebkitTransform: isDragging ? 'scale(0.95)' : 'scale(1)',
    opacity: isDragging ? 0.5 : 1,

    ...draggableStyle
});

const BeautifulDragBox = ({ id, ...props }) => {
    return (
        <Draggable
            draggableId={id}
            index={0}
        >
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )}
                    className="inline-block py-3.5 px-2"
                >
                    <DraggableItem {...props} />
                </div>
            )}
        </Draggable>
    )
}

export default BeautifulDragBox
