import { memo, useEffect, useState } from 'react';
import { Box } from './Box';

const styles = {
    display: 'inline-block',
    transform: 'scale(0.85)',
    WebkitTransform: 'scale(0.85)',
};

export const BoxDragPreview = memo(function BoxDragPreview({ title }) {
    
    const [tickTock, setTickTock] = useState(false);
    
    useEffect(function subscribeToIntervalTick() {
        const interval = setInterval(() => setTickTock(!tickTock), 500);
        return () => clearInterval(interval);
    }, [tickTock]);

    return (
        <div style={styles}>
            <Box title={title} yellow={tickTock} preview />
        </div>
    );
});
