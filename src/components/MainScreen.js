import React from "react";
import { useLogic } from "../context/LogicContext";

export default function MainScreen() {
  const {
    grid,
    setMouseIsClicked,
    currentPaintingItem,
    currentColor,
    mouseIsClicked,
    setGrid,
  } = useLogic();

  return (
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
  );
}
