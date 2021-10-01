import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BoardScreen2 from './components/screens/Board/BoardScreen2';


function App() {

	return (
			<DndProvider backend={HTML5Backend}>
				<div className="App h-screen bg-white">
					<BoardScreen2 />
				</div>
			</DndProvider>
	);
}

export default App;
