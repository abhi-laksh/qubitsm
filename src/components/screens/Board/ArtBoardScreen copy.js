import Cytoscape from 'cytoscape';
// extensions
import cxtmenu from 'cytoscape-cxtmenu';
import edgeConnections from 'cytoscape-edge-connections';
import edgehandles from 'cytoscape-edgehandles';
import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import DropBox from '../../commons/DragNDrop/DropBox';


const navigator = require('cytoscape-navigator');
const autopanOnDrag = require('cytoscape-autopan-on-drag');
const undoRedo = require('cytoscape-undo-redo');

Cytoscape.use(cxtmenu);
Cytoscape.use(autopanOnDrag);
Cytoscape.use(undoRedo);
Cytoscape.use(navigator);
Cytoscape.use(edgehandles);
Cytoscape.use(edgeConnections);


const ArtBoardScreen = ({ elements = [], updateDraggableItems = () => { }, draggableItems = {} }) => {

    const { current: style } = React.useRef({ width: '100%', height: '100%' });

    // const cyRef = React.createRef();

    const [cyRef, setCyRef] = React.useState();

    const { current: stylesheet } = React.useRef([
        {
            selector: 'node[image]',
            style: {
                'background-image': 'data(image)', // specify some image
                'background-opacity': 0, // do not show the bg colour
                'border-width': 0, // no border that would increase node size
                'background-clip': 'none', // let image go beyond node shape (also better performance)
                "background-fit": 'contain',
                width: 48,
                height: 48,
            }
        },
        {
            selector: 'edge',
            style: {
                'curve-style': 'bezier',
                'width': 4,
                'target-arrow-shape': 'triangle',
                'line-color': '#3463DB',
                'target-arrow-color': '#3463DB'
            }
        }
    ]);


    const onPan = (result) => {
        console.log("PAN", result?.cy?._private?.pan);
    }

    const getCytoscapeRef = React.useCallback((ref) => {
        if (!cyRef) {
            setCyRef(ref)
        }
    }, [])


    React.useEffect(() => {

        if (cyRef) {
            cyRef.on('pan', onPan)
        }

    }, [cyRef])

    return (
        <DropBox
            updateDraggableItems={updateDraggableItems}
            draggableItems={draggableItems}
            cytoscape={cyRef}
        >
            <CytoscapeComponent
                cy={getCytoscapeRef}
                elements={Object.values(draggableItems)}
                style={style}
                stylesheet={stylesheet}

            />
        </DropBox>
    );
}

export default ArtBoardScreen
