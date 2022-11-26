import React from "react";
import { useLogic } from "../context/LogicContext";
import Switch from "./SwitchComponent";
export default function MainScreen() {
  const {
    grid,
    setMouseIsClicked,
    currentPaintingItem,
    currentColor,
    mouseIsClicked,
    setGrid,
    showGrid,
    toggleShowGrid,
    clearScreen,
  } = useLogic();

  return (
    <div style={{ display: "flex" }}>
      <div className="main-screen-wrapper">
        {grid &&
          grid.map((row, i) => {
            return (
              <div className="row-wrap" key={i}>
                {row &&
                  row.map((item, j) => {
                    return (
                      <div
                        key={j}
                        className="cell"
                        style={{
                          background: `${item}`,
                          border: showGrid && "0.5px solid gray",
                        }}
                        onMouseDown={() => {
                          setMouseIsClicked(true);
                        }}
                        onMouseUp={() => {
                          setMouseIsClicked(false);
                        }}
                        onMouseOver={(e) => {
                          if (currentPaintingItem.id === 2 || !mouseIsClicked)
                            return;
                          currentPaintingItem.paint(
                            i,
                            j,
                            grid,
                            currentColor,
                            setGrid
                          );
                        }}
                        onClick={() => {
                          if (currentColor === grid[i][j]) return;
                          currentPaintingItem.paint(
                            i,
                            j,
                            grid,
                            currentColor,
                            setGrid
                          );
                        }}
                      ></div>
                    );
                  })}
              </div>
            );
          })}
      </div>
      <div className="main-screen-options">
        <div className="clr-screen">
          <button onClick={() => clearScreen()}>Clear screen</button>
        </div>
        <div className="toggle-grid">
          <span>Toggle grid: </span>
          <Switch isOn={showGrid} handleToggle={toggleShowGrid} />
        </div>
      </div>
    </div>
  );
}
