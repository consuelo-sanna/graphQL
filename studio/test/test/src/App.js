import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MaterialTable from "material-table";
import foto from "./foto.jpg"

function App() {
  return (
    <div>
      <h1> CIAO VALENTINA </h1>
      <h2> CIAO VALENTINA </h2>
      <h3 id={"titoloBlue"}> CIAO VALENTINA </h3>
      <h4> CIAO VALENTINA </h4>
      <h5> CIAO VALENTINA </h5>
      <h6> CIAO VALENTINA </h6>
      <p> IO sono il paragrafo </p>
      <span> Io sono span </span>
      <div >io sono div
        <h1 className={"titoloVerde"}> io sono un secondo h1 </h1>
      </div>
      <ul>
        <li> io son un elemento</li>
        <li> anche io </li>
      </ul>

      <ol>
        <li> io son un elemento</li>
        <li> anche io </li>
      </ol>

    <div>
      <img src={foto} className={"immagine"} /> 
    </div>
   </div>
  );
}

export default App;
