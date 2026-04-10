import { useEffect } from "react";
import "./App.css";
import { add } from "@lishengzhi/utils";

function App() {
  useEffect(() => {
    console.log(11);
    const result = add(1, 123);
    console.log(result);
  }, []);

  return <main className="page">qqq</main>;
}

export default App;
