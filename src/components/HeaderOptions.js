import React from "react";
import pen from "../assets/pen.png";
import can from "../assets/can.png";
import { useLogic } from "../context/LogicContext";

export default function HeaderOptions() {
  const {
    handleChangePaintingItem,
    currentPaintingItem,
    colors,
    handleCurrentColor,
    currentColor,
  } = useLogic();

  return (
    <div className="header">
      <div className="header-tools">
        <div className="tool">
          <img
            src={pen}
            alt="pen"
            className="tool-img"
            style={{
              border: currentPaintingItem.id === 1 && "1px solid black",
            }}
            onClick={() => {
              handleChangePaintingItem(1);
            }}
          />
        </div>
        <div className="tool">
          <img
            src={can}
            alt="can"
            className="tool-img"
            style={{
              border: currentPaintingItem.id === 2 && "1px solid black",
            }}
            onClick={() => {
              handleChangePaintingItem(2);
            }}
          />
        </div>
      </div>

      <div className="colors-pallete">
        {colors.map((color) => {
          return (
            <div
              key={color}
              className="color"
              style={{
                background: color,
              }}
              alt={color}
              onClick={() => {
                handleCurrentColor(color);
              }}
            ></div>
          );
        })}
      </div>
      <div className="current">
        <div
          className="color"
          style={{
            background: currentColor,
          }}
          alt={currentColor}
        ></div>
      </div>
    </div>
  );
}
