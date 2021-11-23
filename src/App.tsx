import React from 'react';
import './App.css';

interface Foo{
  weight: number,
  exercise: number,
  calories_essential: number,
  goal_type: string,
  goal_value: number,
  protein: number,
  fats: number,
  carbos: number,
  goal_calories: number
}

const App = () => {

  //const

  return (
    <div className="bg-purple-100">
      <h1>Calc diet</h1>
      <p>weight (kg)</p>
      <input type="range" min="10" max="150" step="0.1"/>
      <p>diary activity</p>
      <input type="range" min="1.2" max="2.0" step="0.2"/>
      <p>Formula</p>
      <h3>Resultado de formula</h3>
      <p>Objetivo</p>
      <input type="radio" name="" id="" value=""/>
      <label htmlFor="">Subir de peso</label>
      <input type="radio" name="" id="" value=""/>
      <label htmlFor="">bajar de peso</label>
      <p>Rango segun el objetivo</p>
      <input type="range" min="10" max="30" step="1"/>
      <p>Se muestra el valor de las calorias obejitvos</p>
      <p>Se muestra la formula</p>
      <p>Calculo de macronutrientes</p>
      <p>Hint de los valores</p>
      <p>Proteinas</p>
      <input type="range" min="1.8" max="2.5" step="0.1" />
      <p>Resultado</p>
      <p>Grasas</p>
      <input type="range" min="0.5" max="1.5" step="0.1" />
      <p>Resultado</p>
      <p>Carbohidratos</p>
      <p>Resultado</p>
    </div>
  );
}

export default App;
