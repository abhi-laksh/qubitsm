import { fabric } from 'fabric';
import React from 'react';
import { getUuid } from '../../../utils/others';
import { useDrop } from 'react-dnd';
import { itemTypes } from '../../../constants/dragNDropConstant';
import update from 'immutability-helper';

fabric.Object.prototype.objectCaching = false;

const FabricCanvas = React.memo(({
    preloadFromJson,
    options = {},
    getDimention = () => { },
    draggableItems = {},
    updateDraggableItems = () => { },
    ...props
}) => {

    const containerRef = React.useRef(null);

    const [id, _] = React.useState(() => getUuid());

    const [fabricJS, setFabricJS] = React.useState({
        canvasId: `canvas_${id}`
    });

    const { fabricCanvas, canvasId } = fabricJS;

    const renderFromJSON = React.useCallback(() => {
        if (Object.keys(draggableItems).length > 0 && !!fabricCanvas) {
            fabricCanvas.loadFromJSON({ ...options, objects: Object.values(draggableItems) }, function () {
                console.log("loadFromJSON");
                console.log(draggableItems);
                fabricCanvas.renderAll();
            })
        }
    }, [fabricCanvas, JSON.stringify(draggableItems), JSON.stringify(options)]);

    React.useEffect(() => {
        renderFromJSON();
    }, [renderFromJSON, JSON.stringify(draggableItems)])

    React.useEffect(() => {

        if ((!!containerRef.current)) {

            setFabricJS({
                ...fabricJS,
                height: containerRef.current.offsetHeight,
                width: containerRef.current.offsetWidth,
                fabricCanvas: (new fabric.Canvas(canvasId, {
                    ...options,
                    height: containerRef.current.offsetHeight,
                    width: containerRef.current.offsetWidth,
                }))
            })

        }

    }, [containerRef]);

    const moveBox = React.useCallback((item, left, top) => {

        const { id } = item

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


    }, [draggableItems]);

    const [, drop] = useDrop(() => ({

        accept: itemTypes.BOX,

        drop(item, monitor) {

            // const delta = monitor.getDifferenceFromInitialOffset();
            const delta = monitor.getSourceClientOffset();

            console.log(
                "delta",
                monitor.getSourceClientOffset(),
            );

            let left = delta.x;
            let top = delta.y;

            // let left = Math.round(item.left + delta.x);
            // let top = Math.round(item.top + delta.y);

            // const { width, height } = fabricJS;

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

    const onObjectMove = function (e) {
        // target is the box
        moveBox(e.target, e.target.left, e.target.top);
    }


    React.useEffect(() => {
        if (!!fabricCanvas) {

            fabricCanvas.on("object:moved", function (e) {
                // target is the box
                // TODO: solve crash
                moveBox(e.target, e.target.left, e.target.top);
            });

            return () => {
                fabricCanvas.removeListeners();
            }
        }

    }, [fabricCanvas])

    return (

        <div
            ref={containerRef}
            className={"w-full h-full"}
            id={id}
        >
            <div
                ref={drop}
                className={"w-full h-full"}
            >
                <canvas
                    id={canvasId}
                />
            </div>
        </div>
    )
})

export default FabricCanvas
