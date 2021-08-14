import React from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { itemTypes } from '../../../constants/dragNDropConstant';
import DraggableItem from './DraggableItem';

function getStyles(position, isDragging, isOnBoard) {
    const transform = `translate3d(${position.x}px, ${position.y}px, 0)`;

    return {
        // IE fallback: hide the real node using CSS when dragging
        // because IE will ignore our custom "empty image" drag preview.

        ...(isOnBoard ? {
            position: 'absolute',
            transform,
            WebkitTransform: transform,
        } : undefined),

        opacity: isDragging ? 0 : 1,
        // height: isDragging ? 0 : 'auto',
        cursor: !isDragging ? "move" : undefined
    };
}

export const DraggableBox = React.memo(({ children, isOnBoard, id, title, position, ...props }) => {

    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: itemTypes.BOX,
        item: { data: { id, title, ...props }, position },
        end: (item, monitor) => {

            const dropResult = monitor.getDropResult();

            if (item && dropResult) {

                // alert(`You dropped ${item.id} into ${dropResult.id}!`); 
                // return item
            }

        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),

    }), [id, title, position]);

    React.useEffect(() => {
        if (isOnBoard) {
            preview(getEmptyImage(), { captureDraggingState: true });
        }
    }, [isOnBoard]);

    // const [{ isDragging }, drag, preview] = useDrag(() => ({
    //     type: itemTypes.BOX,
    //     item: { id, position, title, ...props },
    //     collect: (monitor) => ({
    //         isDragging: monitor.isDragging(),
    //     }),
    // }), [id, position, title]);

    // useEffect(() => {
    //     preview(getEmptyImage(), { captureDraggingState: true });
    // }, []);

    return (
        <div
            ref={drag}
            style={getStyles(position, isDragging, isOnBoard)}
            role="DraggableBox"
            className="inline-block py-3.5 px-2"
        >
            <DraggableItem {...props} />
        </div>
    );
});
