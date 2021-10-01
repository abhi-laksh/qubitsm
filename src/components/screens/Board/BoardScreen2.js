import React from 'react';
import { accessPointTypes } from '../../../constants/dragNDropConstant';
import ArtBoardScreen from './ArtBoardScreen';


export const rand = (min = 0, max = 100) => Math.floor(Math.random() * (max - min + 1) + min)

const BoardScreen = () => {

    const containerRef = React.useRef(null);

    const [items, setItems] = React.useState({
        [accessPointTypes.COMPUTER]: {
            image: `${process.env.REACT_APP_IMAGE_URL}/pc.svg`,
            title: "this is a computer",
            name: accessPointTypes.COMPUTER,
            position: {
                x: 0,
                y: 0,
            }
        },

        [accessPointTypes.ROUTER]: {
            image: `${process.env.REACT_APP_IMAGE_URL}/router.svg`,
            title: "this is a router",
            name: accessPointTypes.ROUTER,
            position: {
                x: 0,
                y: 0,
            }
        },

        [accessPointTypes.SWITCH]: {
            image: `${process.env.REACT_APP_IMAGE_URL}/switch.svg`,
            title: "this is a switch",
            name: accessPointTypes.SWITCH,
            position: {
                x: 0,
                y: 0,
            }
        },

    });

    const [draggableItems, setDraggableItems] = React.useState({});

    const updateDraggableItems = (updatedItems) => {
        setDraggableItems(updatedItems);
    }

    console.log('===========draggableItems=========================');
    console.log(draggableItems);
    console.log('===========draggableItems=========================');

    return (

        <ArtBoardScreen
            updateDraggableItems={updateDraggableItems}
            draggableItems={draggableItems}
            items={items}
        />
    )
}

export default BoardScreen
