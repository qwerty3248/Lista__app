
import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import "./App.css";

function App() {
  const [tareas, setTareas] = useState([]);
  const [inputTarea, setInputTarea] = useState("");

  const guardarTareas = () => {
    const tareasArray = tareas.map((tarea) => tarea.texto);
    localStorage.setItem("tareas", JSON.stringify(tareasArray));
  };

  const cargarTareas = () => {
    const tareasArray = JSON.parse(localStorage.getItem("tareas")) || [];
    const tareasObjeto = tareasArray.map((tarea, index) => ({
      id: index,
      texto: tarea,
    }));
    setTareas(tareasObjeto);
  };

  const agregarTarea = () => {
    if (inputTarea) {
      const nuevaTarea = { id: tareas.length, texto: inputTarea };
      setTareas([...tareas, nuevaTarea]);
      setInputTarea("");
      guardarTareas();
    } else {
      alert("Por favor ingresa una tarea");
    }
  };

  const eliminarTarea = (id) => {
    try {
      const indice = tareas.findIndex((tarea) => tarea.id === id);
      const tareasActualizadas = [...tareas];
      tareasActualizadas.splice(indice, 1);
      setTareas(tareasActualizadas);
      guardarTareas();
    } catch (error) {
      alert("Por favor selecciona una tarea");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {tareas.map((tarea, index) => (
            <li key={tarea.id}>
              <button onClick={() => eliminarTarea(tarea.id)}>
                <FiTrash2 size={20} />
              </button>
              {index + 1}. {tarea.texto}
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={inputTarea}
          onChange={(e) => setInputTarea(e.target.value)}
        />
        <button onClick={agregarTarea} className="large-button">
          Agregar tarea
        </button>
        <button onClick={cargarTareas} className="large-button">
          Cargar tareas
        </button>
      </header>
    </div>
  );
}

export default App;

