import React from 'react';
import { Droppable } from "react-beautiful-dnd";

const BeautifulDropBox = ({ chlidren }) => {
    return (
        <Droppable droppableId="droppable">
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                > 
                    {chlidren}
                </div>
            )}
        </Droppable> 
    )
}

export default BeautifulDropBox
