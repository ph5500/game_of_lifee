import React, { useState, useEffect } from "react";
import Grid from "./Grid";

const App = props => {
  const [generations, setGenerations] = useState(0);

  return (
    <div>
      <h1>Conway's Game of Life</h1>
      <p>
        Conway's Game of Life is a Zero player game that was invented by British
        mathematician John Horton Conway in the 70's. It is considered a zero
        player game because it will change and mutate without anybody playing.
        There are two possible states, alive or dead. Cellular automata is a
        program that runs on data that's stored on a 2D grid that can show
        complex behavior from a set of simple rules. Each time the grid changes
        is considered a generation.This game has been used to simulate many real
        life scenarios across Physics, Biology, Economics, and Philosophy. There
        are a number of patterns that continually reappear over time including
        the Block, Boat, Blinker, Toad, Glider, LWSS, and the Pulsar.
      </p>
      <h2>The Rules are the following:</h2>
      <ol>
        <li>
          Any live cell with fewer than two live neighbours dies, as if by
          underpopulation.
        </li>
        <li>
          Any live cell with two or three live neighbours lives on to the next
          generation.
        </li>
        <li>
          Any live cell with more than three live neighbours dies, as if by
          overpopulation.
        </li>
        <li>
          Any dead cell with exactly three live neighbours becomes a live cell,
          as if by reproduction.
        </li>
      </ol>

      <Grid generations={generations} />
      {/* old implementation */}
      {/* <h2> Generations: {generations}</h2> */}
    </div>
  );
};

export default App;
