import Cytoscape from 'cytoscape';
// extensions
import cxtmenu from 'cytoscape-cxtmenu';
import edgeConnections from 'cytoscape-edge-connections';
import edgehandles from 'cytoscape-edgehandles';
import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { GlobalHotKeys } from 'react-hotkeys';
import DropBox from '../../commons/DragNDrop/DropBox';

const navigator = require('cytoscape-navigator');
const autopanOnDrag = require('cytoscape-autopan-on-drag');
const undoRedo = require('cytoscape-undo-redo');


Cytoscape.use(autopanOnDrag);
Cytoscape.use(undoRedo);
Cytoscape.use(navigator);
Cytoscape.use(edgehandles);
Cytoscape.use(edgeConnections);
Cytoscape.use(cxtmenu);
Cytoscape.use = () => { }

class ArtBoardScreen extends React.Component {

    constructor(props) {
        super(props)

        this.style = { width: '100%', height: '100%' };

        this.cyRef = null;
        this.cyNav = null;
        this.cyUndoRedo = null;
        this.circularMenu = null;

        this.edgehandle = null;

        this.stylesheet = [
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
            },
            {
                selector: 'node:selected',
                style: {
                    'border-width': 2,
                    'border-color': "#3be9fb"
                }
            }
        ]


        this.keyMap = {
            CTRL_DOWN: {
                sequence: 'ctrl',
                action: "keydown"
            },
            CTRL_UP: {
                sequence: 'ctrl',
                action: "keyup"
            },
        };

        this.handlers = {
            CTRL_DOWN: this.enableEdgeDraw,
            CTRL_UP: this.disableEdgeDraw,
        };

        this.state = {

        }
    }

    getCytoscapeRef = (ref) => { this.cyRef = ref }

    enableEdgeDraw = () => {
        this.edgehandle.start()
        this.edgehandle.enableDrawMode()
    }

    disableEdgeDraw = () => {
        this.edgehandle.stop()
        this.edgehandle.disableDrawMode()
    }

    cleanUpEverything = () => {

        this.cyRef.removeAllListeners();

        !!this.edgehandle && this.edgehandle.destroy()
        !!this.cyNav && this.cyNav.destroy()
        !!this.circularMenu && this.circularMenu.destroy()
        !!this.cyRef && this.cyRef.destroy()

        // window.removeEventListener('mouseup', () => { })
    }

    componentDidMount() {

        if (this.cyRef) {

            this.edgehandle = this.cyRef.edgehandles({
                canConnect: function (sourceNode, targetNode) {

                    return (
                        !sourceNode.same(targetNode)
                        // ! TODO: Crashes the app. SOLVE
                        // || !sourceNode.edgesWith(targetNode.id())
                        // || !targetNode.edgesWith(sourceNode.id())
                        // || !sourceNode.edgesTo(targetNode.id())
                        // || !targetNode.edgesTo(sourceNode.id())
                    )
                }
            });
            this.cyNav = this.cyRef.navigator();
            this.undoRedo = this.cyRef.undoRedo();
            this.circularMenu = this.cyRef.cxtmenu({
                commands: [
                    {
                        content: 'Delete',
                        select: (element) => {
                            console.log('====================Delete================');
                            console.log(element);
                            console.log('=================Delete===================');

                            element.remove();
                        },
                    }
                ]
            });

            this.cyRef.on('ehcomplete', (event, sourceNode, targetNode, addedEdge) => {
                this.props.updateDraggableItems({
                    ...this.props.draggableItems,
                    [(addedEdge.data()).id]: {
                        data: addedEdge.data(),
                    },
                })
            })
        }

    }

    componentWillUnmount() {
        this.cleanUpEverything()
    }

    render() {

        const { elements, updateDraggableItems, draggableItems } = this.props

        return (
            <GlobalHotKeys allowChanges={true} className="w-full h-full" keyMap={this.keyMap} handlers={this.handlers}>
                <DropBox
                    updateDraggableItems={updateDraggableItems}
                    draggableItems={draggableItems}
                    cytoscape={this.cyRef}
                >
                    <CytoscapeComponent
                        cy={this.getCytoscapeRef}
                        elements={Object.values(draggableItems)}
                        style={this.style}
                        stylesheet={this.stylesheet}

                    />
                </DropBox>
            </GlobalHotKeys>
        )
    }
}

export default ArtBoardScreen
