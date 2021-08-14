import update from 'immutability-helper';
import React from 'react';
import { useDrop } from 'react-dnd';
import { itemTypes } from '../../../constants/dragNDropConstant';
import { getUuid } from '../../../utils/others';


const DropBox = ({
    updateDraggableItems = () => { },
    draggableItems = {},
    children,
    cytoscape,
    panPosition = {},
}) => {

    const moveBox = React.useCallback((item, left, top) => {

        const { id } = item;

        console.log('==============moveBox======================');
        console.log(item)
        console.log('==============moveBox======================');

        if (!!draggableItems[id]) {

            updateDraggableItems(update(draggableItems, {
                [id]: {
                    position: {
                        $merge: { x: left, y: top },
                    }
                },
            }));

        } else {

            const uid = getUuid();

            updateDraggableItems({
                ...draggableItems,
                [`${item.data.id}_${uid}`]: {
                    ...item,
                    position: {
                        x: left,
                        y: top,
                    },
                    data: {
                        ...item.data,
                        id: `${item.data.id}_${uid}`
                    }
                },
            })
        }


    }, [draggableItems, cytoscape]);


    const [, drop] = useDrop(() => ({

        accept: itemTypes.BOX,

        drop: (item, monitor) => {

            // const delta = monitor.getDifferenceFromInitialOffset();
            const delta = monitor.getClientOffset();

            console.log(
                "delta",
                delta,
            );

            // let left = delta.x;
            // let top = delta.y;
            let left;
            let top;

            console.log('cytoscape.pan()', cytoscape);

            if (cytoscape && (cytoscape.pan)) {

                console.log('cytoscape.pan()', cytoscape.pan());

                left = Math.round((item.position.x + delta.x) - (cytoscape.pan()).x);
                top = Math.round((item.position.y + delta.y) - (cytoscape.pan()).y);
            } else {

                left = Math.round((item.position.x + delta.x));
                top = Math.round((item.position.y + delta.y));

            }

            // if (!!width && !!height) {

            //     top = top <= 15 ? 15 : top;

            //     // width - ICON_SIZE - OFFSET
            //     left = (left <= 15) ? 15 : (left >= (width - 48 - 15)) ? (width - 48 - 15) : left;

            // }

            // if (snapToGrid) {
            //     [left, top] = doSnapToGrid(left, top);
            // }

            moveBox(item, left, top);

            return item;

        },



    }), [moveBox]);

    return (<div ref={drop} className="w-full h-full absolute top-0 left-0 z--1">{children}</div>)
}

export default DropBox
