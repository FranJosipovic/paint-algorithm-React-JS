import React, { useContext, useState } from "react";

const LogicContext = React.createContext();

const MATRIX_WIDTH = 80;
const MATRIX_HEIGHT = 35;

const PEN = {
  id: 1,
  type: "pen",
  paint: function (iPos, jPos, someGrid, color, setGrid) {
    setGrid((prevGrid) => {
      return prevGrid.map((row, i) => {
        return row.map((item, j) => {
          if (i === iPos && j === jPos) {
            return color;
          } else return item;
        });
      });
    });
  },
};

const CAN = {
  id: 2,
  type: "can",
  paint: async function (x, y, matrix, color, setGrid) {
    let stack = [];
    const timer = (ms) => new Promise((res) => setTimeout(res, ms));
    let clickedColor = matrix[x][y];
    let iterrations = 0;

    //postavljanje flag arraya
    let flagMatrix = new Array(MATRIX_HEIGHT)
      .fill("")
      .map(() => new Array(MATRIX_WIDTH).fill("blank"));

    function stackIsEmpty() {
      return stack.length <= 0;
    }

    //funkcija provjere
    function isSafe(x, y) {
      if (
        x < 0 ||
        x > 34 ||
        y < 0 ||
        y > MATRIX_WIDTH ||
        matrix[x][y] !== clickedColor ||
        flagMatrix[x][y] === "flagged"
      )
        return false;
      return true;
    }

    //funkcija provjere i dodavanja na stack
    function checkAndPushToStack(x, y) {
      if (isSafe(x, y)) {
        stack.push(x);
        stack.push(y);
        flagMatrix[x][y] = "flagged";
      }
    }

    //glavni dio algoritma
    stack.push(x);
    stack.push(y);
    flagMatrix[x][y] = "flagged";

    while (!stackIsEmpty()) {
      y = stack.pop();
      x = stack.pop();
      //bojanje
      matrix[x][y] = color;
      setGrid([...matrix]);
      //provjera gore
      checkAndPushToStack(x - 1, y);
      //provjera desno
      checkAndPushToStack(x, y + 1);
      //provjera dolje
      checkAndPushToStack(x + 1, y);
      //provjera lijevo
      checkAndPushToStack(x, y - 1);

      iterrations++;
      //await timer();
    }
    console.log(flagMatrix);
    console.log(iterrations);
  },
};

export function useLogic() {
  return useContext(LogicContext);
}

export const LogicProvider = ({ children }) => {
  const [grid, setGrid] = useState(() => {
    return Array(MATRIX_HEIGHT)
      .fill("")
      .map(() => new Array(MATRIX_WIDTH).fill("white"));
  });

  const [colors] = useState([
    "white",
    "black",
    "grey",
    "darkred",
    "red",
    "orange",
    "yellow",
    "green",
    "turquoise",
    "indigo",
    "purple",
    "lightgrey",
    "brown",
    "pink",
    "gold",
    "lightyellow",
    "yellowgreen",
    "lightblue",
    "lightsteelblue",
    "lavender",
  ]);

  const [currentColor, setCurrentColor] = useState(colors[1]);

  const [mouseIsClicked, setMouseIsClicked] = useState(false);

  const [paintingItems] = useState([PEN, CAN]);

  const [currentPaintingItem, setCurrnetPaintingItem] = useState(PEN);

  function handleCurrentColor(color) {
    setCurrentColor(color);
  }

  function handleChangePaintingItem(id) {
    paintingItems.forEach((item) => {
      if (item.id === id) {
        setCurrnetPaintingItem(item);
      }
    });
  }

  return (
    <LogicContext.Provider
      value={{
        setMouseIsClicked,
        setGrid,
        grid,
        handleChangePaintingItem,
        currentPaintingItem,
        colors,
        handleCurrentColor,
        currentColor,
        mouseIsClicked,
      }}
    >
      {children}
    </LogicContext.Provider>
  );
};
