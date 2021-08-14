import React from 'react';
import { accessPointTypes } from '../../../constants/dragNDropConstant';
import BoardItemsContainer from '../../layouts/Board/BoardItemsContainer';
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
        <div tabIndex="1" className="relative h-full z-0">

            <ArtBoardScreen
            updateDraggableItems={updateDraggableItems}
            draggableItems={draggableItems}
            />
            <div className="absolute bottom-0 left-0 px-8 w-full">
                <div
                    className="px-2.5 overflow-hidden shadow-bottomBar bg-white rounded-t-3xl"
                >
                    <BoardItemsContainer boardItems={items} />
                </div>
            </div>
        </div>
    )
}

export default BoardScreen
