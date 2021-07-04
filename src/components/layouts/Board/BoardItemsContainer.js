import React from 'react'
import { DraggableBox } from '../../commons/DragNDrop/DraggableBox'

const BoardItemsContainer = ({ boardItems = {} }) => {

    const Item = (each, index) => {
        return (
            <div class="flex-none">
                <DraggableBox id={each}  key={each} {...boardItems[each]} />
            </div>
        )
    }

    return (
        <div class="flex">
            {Object.keys(boardItems).map(Item)}
        </div>
    )
}

export default BoardItemsContainer
