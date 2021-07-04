import { useDrag } from 'react-dnd';
import { itemTypes } from '../../../constants/dragNDropConstant';
import DraggableItem from './DraggableItem';


const style = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    cursor: 'move',
    float: 'left',
};
export const Box = ({ id, ...props }) => {
    
    const [{ isDragging }, drag] = useDrag(() => ({
        type: itemTypes.BOX,
        item: { id, ...props },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                alert(`You dropped ${item.id} into ${dropResult.id}!`);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [id]);

    const opacity = isDragging ? 0.4 : 1;

    return (<div ref={drag} style={{ ...style, opacity }}>
            <DraggableItem {...props} />
    </div>);

};
