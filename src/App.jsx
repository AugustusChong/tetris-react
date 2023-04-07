import React from "react";
import { configureStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";
import "./App.css";
import GridBoard from "./components/GridBoard/GridBoard";
import NextBlock from "./components/NextBlock/NextBlock";
import ScoreBoard from "./components/ScoreBoard/ScoreBoard";
import Controls from "./components/Controls/Controls";
import MessagePopup from "./components/MessagePopup/MessagePopup";

const store = configureStore({ reducers });

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Tetris Redux</h1>
        </header>
        <GridBoard />
        <NextBlock />
        <ScoreBoard />
        <Controls />
        <MessagePopup />
      </div>
    </Provider>
  );
}

export default App;
