import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BoardScreen2 from './components/screens/Board/BoardScreen2';


function App() {

	const keyMap = {
		down: ["k"],
		shiftDown: ["shift+k"],
		up: ["i"],
		shiftUp: ["shift+i"],
		delete: ["r"],
		addFocus: ["a"]
	};

	const handlers = {
		down: event => console.log("Move up hotkey called!")
	};


	return (
			<DndProvider backend={HTML5Backend}>
				<div className="App h-screen bg-white">
					<BoardScreen2 />
				</div>
			</DndProvider>
	);
}

export default App;
