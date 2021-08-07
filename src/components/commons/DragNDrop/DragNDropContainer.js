import update from 'immutability-helper';
import React from 'react';
import { useDrop } from 'react-dnd';
import { itemTypes } from '../../../constants/dragNDropConstant';
import { doSnapToGrid } from '../../../utils/dragNDrop';
import { getUuid } from '../../../utils/others';
import { DraggableBox } from './DraggableBox';

const styles = {
    width: "100%",
    height: "100%",
    position: 'relative',
};

export const DragNDropContainer = ({
    dimension = {},
    snapToGrid,
    draggableItems = {},
    updateDraggableItems = () => { }
}) => {

    /*
        @var: draggableItems
        @type: Object of Object
        @required-properties: top, left, children (must be React Component)
        @optional: title, description,  
    */

    const moveBox = React.useCallback((item, left, top) => {

        const { id } = item

        console.log('==============drop======================');
        console.log(item, left, top);
        console.log('==============drop======================');

        if (!!draggableItems[id]) {
            updateDraggableItems(update(draggableItems, {
                [id]: {
                    $merge: { left, top },
                },
            }));

        } else {

            const uid = getUuid();

            updateDraggableItems({
                ...draggableItems,
                [uid]: {
                    ...item,
                    left,
                    top,
                    id: uid
                },
            })
        }


    }, [draggableItems, dimension]);

    const [, drop] = useDrop(() => ({

        accept: itemTypes.BOX,

        drop(item, monitor) {

            const delta = monitor.getDifferenceFromInitialOffset();

            const aa = monitor.getDropResult()

            let left = Math.round(item.left + delta.x);
            let top = Math.round(item.top + delta.y);

            const { width, height } = dimension;

            if (!!width && !!height) {

                top = top <= 15 ? 15 : top;

                // width - ICON_SIZE - OFFSET
                left = (left <= 15) ? 15 : (left >= (width - 48 - 15)) ? (width - 48 - 15) : left;

            }

            if (snapToGrid) {
                [left, top] = doSnapToGrid(left, top);
            }

            moveBox(item, left, top);

            return item;

        },



    }), [moveBox]);

    return (
        <div ref={drop} style={styles}>
            {Object.keys(draggableItems).map((key) => (<DraggableBox key={key} id={key} isOnBoard {...draggableItems[key]} />))}
        </div>
    );
};
