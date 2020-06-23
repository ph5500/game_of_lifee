import React, { useState, useEffect } from "react";
import Grid from "./Grid";

const App = props => {
  const [generations, setGenerations] = useState(0);

  return (
    <div>
      <h1>Conway's Game of Life</h1>
      <Grid />
      <h2> Generations: {generations}</h2>
    </div>
  );
};

export default App;
