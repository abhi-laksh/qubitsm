import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BoardScreen from './components/screens/Board/BoardScreen';


function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App h-screen bg-white">
        <BoardScreen />
      </div>
    </DndProvider>
  );
}

export default App;
