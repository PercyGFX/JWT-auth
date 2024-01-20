import React from "react";
import "./App.css";
import Header from "./componants/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Login /> */}
      <Register />
    </div>
  );
}

export default App;
