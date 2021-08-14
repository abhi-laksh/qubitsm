import React from 'react'
import { DraggableBox } from '../../commons/DragNDrop/DraggableBox'

const BoardItemsContainer = ({ boardItems = {} }) => {

    const Item = (each, index) => {
        return (
            <div key={each} className="flex-none">
                <DraggableBox id={each}  {...boardItems[each]} />
            </div>
        )
    }

    return (
        <div className="flex items-center leading-0">
            {Object.keys(boardItems).map(Item)}
        </div>
    )
}

export default BoardItemsContainer
