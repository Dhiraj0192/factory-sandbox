import { useState } from "react";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <h1>Factory Sandbox</h1>
      <p>Walking skeleton for the Jarvis software factory.</p>
      <button onClick={() => setCount((current) => current + 1)}>
        count is {count}
      </button>
      <button onClick={() => setCount(0)}>Reset</button>
    </main>
  );
}
