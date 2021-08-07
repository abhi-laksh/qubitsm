import React from 'react';

const Dstyles = {
    display: 'inline-block',
    transform: 'scale(0.95)',
    WebkitTransform: 'scale(0.95)',
    opacity: 0.5
};

const DraggableItem = React.memo(({ preview, title, name, description, src }) => {
    return (
        <div title={title} style={preview ? Dstyles : undefined}>
            {src && <img
                src={src}
                alt={name}
                className="w-8 h-8 object-contain"
            />}
        </div>
    )
})

export default DraggableItem
