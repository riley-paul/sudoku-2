import React from "react";
import Grid from "./components/grid";
import Numbers from "./components/numbers";

const App: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-screen-sm px-4 py-12">
      <div className="flex gap-8">
        <Grid />
        <Numbers />
      </div>
    </div>
  );
};

export default App;
