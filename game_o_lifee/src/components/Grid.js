import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import styled from "styled-components";

import {
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";

const numRows = 40;
const numCols = 40;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]
];

const Button = styled.button`
  border-radius: 5px;
  margin: 3px;
  background-color: white;
`;

const Cells = styled.div`
  background-color: white;
`;

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }

  return rows;
};

var randomColor = require("randomcolor");
var color = randomColor();

const Grid = props => {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });

  const [running, setRunning] = useState(false);
  const [generation, setGeneration] = useState(0);

  const [pace, setPace] = useState(1000);
  const [cellColor, setCellColor] = useState(color);
  //stores reference of the current state

  const [dropdownOpen, setOpen] = useState(false);
  const toggleDropColor = () => setOpen(!dropdownOpen);

  const runnningRef = useRef(running);
  runnningRef.current = running;

  const gens = useRef(generation);
  gens.current = generation;

  const speedRef = useRef(pace);
  speedRef.current = pace;

  const runSimulation = useCallback(() => {
    if (!runnningRef.current) {
      return;
    }

    setGeneration(gens => {
      return (gens = gens + 1);
    });

    setGrid(g => {
      return produce(g, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, speedRef.current);
  }, []);

  return (
    <>
      <Button
        onClick={() => {
          setRunning(!running);
          if (!running) {
            runnningRef.current = true;
            runSimulation();
          }
        }}
      >
        {running ? "Stop(Dead)" : "Start(Alive)"}
      </Button>
      <Button
        onClick={() => {
          const rows = [];
          for (let i = 0; i < numRows; i++) {
            rows.push(
              Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
            );
          }

          setGrid(rows);
          setGeneration(0);
        }}
      >
        Random
      </Button>
      <Button
        onClick={() => {
          setGrid(generateEmptyGrid());
          setGeneration(0);
        }}
      >
        Clear
      </Button>

      <h3>Speed Settings</h3>
      <Button
        onClick={() => {
          setPace(150);
        }}
      >
        .15 Seconds
      </Button>
      <Button
        onClick={() => {
          setPace(250);
        }}
      >
        .25 Seconds
      </Button>
      <Button
        onClick={() => {
          setPace(500);
        }}
      >
        .5 Seconds
      </Button>
      <Button
        onClick={() => {
          setPace(1000);
        }}
      >
        1 Second
      </Button>
      <Button
        onClick={() => {
          setPace(5000);
        }}
      >
        5 Seconds
      </Button>

      <div>
        <h3>Select a color:</h3>

        <ButtonDropdown isOpen={dropdownOpen} toggle={toggleDropColor}>
          <DropdownToggle caret>colors</DropdownToggle>

          <DropdownMenu>
            <DropdownItem
              onClick={() => {
                setCellColor("purple");
              }}
            >
              Purple
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                setCellColor("pink");
              }}
            >
              Pink
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                setCellColor("Green");
              }}
            >
              Green
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                setCellColor("Black");
              }}
            >
              Black
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                setCellColor("Blue");
              }}
            >
              Blue
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
      <h2>Generations: {generation}</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}}`}
              onClick={() => {
                const newGrid = produce(grid, gridCopy => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][k] ? `${cellColor}` : undefined,
                border: "solid 1px black"
              }}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Grid;
