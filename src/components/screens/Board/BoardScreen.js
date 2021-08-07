import React from 'react';
import json from '../../../assets/a.json';
import pc from "../../../assets/images/pc.png";
import router from "../../../assets/images/router.webp";
// import switchImg from "../../../assets/images/switch.jpeg";
import { accessPointTypes } from '../../../constants/dragNDropConstant';
import { getUuid } from '../../../utils/others';
import FabricCanvas from '../../commons/Fabric/FabricCanvas';
import BoardItemsContainer from '../../layouts/Board/BoardItemsContainer';


export const rand = (min = 0, max = 100) => Math.floor(Math.random() * (max - min + 1) + min)

const BoardScreen = () => {

    const containerRef = React.useRef(null);

    const [items, setItems] = React.useState({
        [accessPointTypes.COMPUTER]: {
            src: `${process.env.REACT_APP_IMAGE_URL}/pc.png`,
            title: "this is a computer",
            name: accessPointTypes.COMPUTER,
            // "width": 36,
            // "height": 36,
            "scaleToHeight": true,

            top: rand(50, 400),
            left: rand(50, 1000),
            "fill": "rgb(0,0,0)",
            "type": "image",
            "scaleX": 0.5,
            "scaleY": 0.5,
            "skewX": 0,
            "skewY": 0,
            "cropX": 0,
            "cropY": 0,
        },

        [accessPointTypes.ROUTER]: {
            src: `${process.env.REACT_APP_IMAGE_URL}/router.webp`,
            src: router,
            title: "this is a router",
            name: accessPointTypes.ROUTER,
            "width": 36,
            "height": 36,
            top: rand(50, 400),
            left: rand(50, 1000),
        },

        [accessPointTypes.SWITCH]: {
            src: `${process.env.REACT_APP_IMAGE_URL}/switch.jpeg`,
            title: "this is a switch",
            name: accessPointTypes.SWITCH,
            "width": 36,
            "height": 36,
            top: rand(50, 400),
            left: rand(50, 1000),
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

    console.log('================draggableItems====================');
    console.log(draggableItems);
    console.log('================draggableItems====================');

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
        <div className="flex flex-col h-full relative">
            <div className="flex-grow" ref={containerRef}>
                <FabricCanvas
                    preloadFromJson={json}
                    draggableItems={draggableItems}
                    updateDraggableItems={updateDraggableItems}
                    options={{
                        backgroundColor: "#ff6",
                        allowTouchScrolling: true,
                    }}
                    imageSrc={pc}
                />
            </div>
            <div className="absolute bottom-0 left-0 flex-initial px-8 w-full">
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
