import React from 'react';

const styles = {
    display: 'inline-block',
    transform: 'scale(0.95)',
    WebkitTransform: 'scale(0.95)',
    opacity: 0.5
};

const DraggableItem = React.memo(({ preview, title, name, description, image }) => {
    return (
        // removing 'draggable="false" 
        <div draggable="true" title={title} style={preview ? styles : undefined}>
            {image && <img
                draggable="false"
                src={image}
                alt={name}
                className="w-8 h-8 object-contain"
            />}
        </div>
    )
})

export default DraggableItem
