import { useDragLayer } from 'react-dnd';
import { itemTypes } from '../../../constants/dragNDropConstant';
import { doSnapToGrid } from '../../../utils/dragNDrop';
import DraggableItem from './DraggableItem';

const layerStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
};

function getItemStyles(initialOffset, currentOffset, isSnapToGrid) {

    if (!initialOffset || !currentOffset) {
        return {
            display: 'none',
        };
    }

    let { x, y } = currentOffset;

    if (isSnapToGrid) {
        x -= initialOffset.x;
        y -= initialOffset.y;
        [x, y] = doSnapToGrid(x, y);
        x += initialOffset.x;
        y += initialOffset.y;
    }

    const transform = `translate(${x}px, ${y}px)`;

    return {
        transform,
        WebkitTransform: transform,
    };
}

export const AppDragLayer = (props) => {

    const { itemType, isDragging, item, initialOffset, currentOffset, } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
    }));

    function renderItem() {
        switch (itemType) {
            case itemTypes.BOX:
                return <DraggableItem {...item} preview />;
            default:
                return null;
        }
    }

    if (!isDragging) {
        return null;
    }

    return (
        <div style={layerStyles}>
            <div style={getItemStyles(initialOffset, currentOffset, props.doSnapToGrid)}>
                {renderItem()}
            </div>
        </div>
    );
};
