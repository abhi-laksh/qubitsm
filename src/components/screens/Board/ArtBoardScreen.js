import Cytoscape from 'cytoscape';
// extensions
import cxtmenu from 'cytoscape-cxtmenu';
import edgeConnections from 'cytoscape-edge-connections';
import edgehandles from 'cytoscape-edgehandles';
import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { configure, GlobalHotKeys } from 'react-hotkeys';
import DropBox from '../../commons/DragNDrop/DropBox';
import BoardItemsContainer from '../../layouts/Board/BoardItemsContainer';


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

configure({ defaultKeyEvent: 'keypress' });
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
            A_DOWN: {
                sequence: 'e',
                action: "keydown"
            },
            A_UP: {
                sequence: 'e',
                action: "keyup"
            },
        };

        this.handlers = {
            A_DOWN: this.enableEdgeDraw,
            A_UP: this.disableEdgeDraw,
        };

        this.state = {

        }
    }

    getCytoscapeRef = (ref) => { this.cyRef = ref }

    enableEdgeDraw = () => {
        console.log("CTRL_DOWN");
        this.edgehandle.start()
        this.edgehandle.enableDrawMode()
    }

    disableEdgeDraw = () => {
        console.log("CTRL_UP");
        this.edgehandle.stop()
        this.edgehandle.disableDrawMode()
        this.cyRef.autolock(false);
        this.cyRef.autoungrabify(false);
        this.cyRef.nodes().unlock()
    }

    cleanUpEverything = () => {

        this.cyRef.removeAllListeners();

        // !!this.edgehandle && this.edgehandle.destroy()
        // !!this.cyNav && this.cyNav.destroy()
        // !!this.circularMenu && this.circularMenu.destroy()
        // !!this.cyRef && this.cyRef.destroy()

        // window.removeEventListener('mouseup', () => { })
    }

    deleteNodes = (element) => {
        // By ctxmenu
        if (!!element && element.remove) {
            return element.remove();
        }

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
                        select: this.deleteNodes,
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

            this.cyRef.on('lock', (event, sourceNode, targetNode, addedEdge) => {
                console.log("ehLOCKED");
            })

            this.cyRef.on('ehdrawon', (event, sourceNode, targetNode, addedEdge) => {
                console.log("ehdrawon");
            })

            this.cyRef.on('ehdrawoff', (event, sourceNode, targetNode, addedEdge) => {
                console.log("ehdrawoff");
            })

            this.cyRef.on('ehstop', (event, sourceNode, targetNode, addedEdge) => {
                console.log("ehstop");
            })
        }

    }

    componentWillUnmount() {
        this.cleanUpEverything()
    }

    render() {

        const { elements, updateDraggableItems, draggableItems, items } = this.props

        return (
            <GlobalHotKeys allowChanges={true} className="w-full h-full" keyMap={this.keyMap} handlers={this.handlers}>
                <div tabIndex="1" className="relative h-full z-0">
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
                    <div className="absolute bottom-0 left-0 px-8 w-full">
                        <div
                            className="px-2.5 overflow-hidden shadow-bottomBar bg-white rounded-t-3xl"
                        >
                            <BoardItemsContainer boardItems={items} />
                        </div>
                    </div>
                </div>
            </GlobalHotKeys>
        )
    }
}

export default ArtBoardScreen
