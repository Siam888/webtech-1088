import React, { useState } from 'react';

const App = () => {
  let [count, setCount] = useState(0);

  function handleClick() {
    setCount((prevCount) => prevCount + 1);
  }

  function resetCount(){
    setCount(0)
  }

  return <div>
    <div>{count == 0 ? 'No clicks' : `Clicked ${count} times`} </div>
    <button onClick={handleClick}>Click</button>
    <button onClick={resetCount}>Reset</button>
  </div>;
};
export default App;