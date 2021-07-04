import React from 'react';
import pc from "../../../assets/images/pc.png";
import router from "../../../assets/images/router.webp";
import switchImg from "../../../assets/images/switch.jpeg";
import { getUuid } from '../../../utils/others';
import { AppDragLayer } from '../../commons/DragNDrop/AppDragLayer';
import { DragNDropContainer } from '../../commons/DragNDrop/DragNDropContainer';
import BoardItemsContainer from '../../layouts/Board/BoardItemsContainer';
export const rand = (min = 0, max = 100) => Math.floor(Math.random() * (max - min + 1) + min)

const BoardScreen = () => {

    const containerRef = React.useRef(null);

    const [items, setItems] = React.useState({
        COMPUTER: {
            src: pc,
            title: "this is a computer",
            name: "Computer",
            top: 50,
            left: 50,
        },

        ROUTER: {
            src: router,
            title: "this is a router",
            name: "router",
            top: 50,
            left: 50,
        },

        SWITCH: {
            src: switchImg,
            title: "this is a switch",
            name: "switch",
            top: 50,
            left: 50,
        },

    });

    const [draggableItems, setDraggableItems] = React.useState({});

    const [dimension, setDimension] = React.useState({});

    const updateDraggableItems = (updatedItems) => {
        setDraggableItems(updatedItems);
    }

    const addDummyItemsOnBoard = (params) => {

        let dumIt = {}

        for (let index = 0; index < 20; index++) {
            const uid = getUuid();

            const { ...initaldumIt } = dumIt;

            dumIt = {
                ...initaldumIt,
                [uid]: {
                    src: pc,
                    title: "this is a computer",
                    name: "Computer",
                    top: rand(50, 400),
                    left: rand(50, 1280),
                }
            }

        }

        setDraggableItems(dumIt);

    }



    React.useEffect(() => {

        const { width, height } = dimension;

        if ((!!containerRef.current) && (!width && !height)) {
            setDimension({
                height: containerRef.current.offsetHeight,
                width: containerRef.current.offsetWidth,
            })

            // addDummyItemsOnBoard();
        }


    }, [containerRef]);



    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow" ref={containerRef}>
                <DragNDropContainer dimension={dimension} draggableItems={draggableItems} updateDraggableItems={updateDraggableItems} />
                <AppDragLayer />
            </div>
            <div className="flex-initial px-2.5 mx-8 overflow-hidden shadow-bottomBar	 bg-white rounded-t-3xl">
                <BoardItemsContainer boardItems={items} />
            </div>
        </div>
    )
}

export default BoardScreen
