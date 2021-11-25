import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {

  const [weight, setWeight] = useState(0);
  const [exerciseFrecuency, setExerciseFrecuency] = useState(0);
  const [essentialCalories, setEssentialCalories] = useState(0);
  const [goal, setGoal] = useState('');
  const [maxPercentage, setMaxPercentage] = useState(0);
  const [goalPercentage, setGoalPercentage] = useState(0);
  const [goalCalories, setGoalCalories] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [proteins, setProteins] = useState(0);
  const [totalProteins, setTotalProteins] = useState(0);
  const [fats, setFats] = useState(0);
  const [totalFats, setTotalFats] = useState(0);
  const [carbohydrates, setCarbohydrates] = useState(0);

  useEffect(() => {
    setEssentialCalories(weight * exerciseFrecuency * 22);
    setGoalCalories(essentialCalories * goalPercentage / 100.0);
    setTotalCalories(goal == 'U' ? essentialCalories + goalCalories : essentialCalories - goalCalories);
    setTotalProteins(proteins * weight);
    setTotalFats(fats * weight);
    setCarbohydrates((totalCalories - (totalProteins * 4 + totalFats * 9))/4);
  });

  const objetivoU = () => {
    setGoal('U');
    setMaxPercentage(20);
  }

  const objetivoL = () => {
    setGoal('L');
    setMaxPercentage(30);
  }

  const goalUpdater = (e:any) => {
    setGoalPercentage(parseInt(e.target.value))
  }

  return (
    <div className="">
      <h1>Calc diet</h1>
      <p>weight {weight.toFixed(1)} (kg)</p>
      <button
        className="w-5  bg-red-600"
        onClick={() => {setWeight(weight - 0.1)}}
        >
        -
      </button>
      <input
        type="range"
        min="30" max="130" step="0.1"
        value={weight}
        onChange={(e) => {
          setWeight(parseFloat(e.target.value));
        }}
      />
      <button
        className="w-5  bg-red-600"
        onClick={() => {setWeight(weight + 0.1)}}
        >
        +
      </button>
      <p>diary activity {exerciseFrecuency}</p>
      <input
        type="range"
        min="1.2" max="2.2" step="0.1"
        value={exerciseFrecuency}
        onChange={(e) => {
          setExerciseFrecuency(parseFloat(e.target.value));
        }}
      />
      <p>Formula</p>
      <p>Calorias Necesarias : {weight.toFixed(2)} X {exerciseFrecuency} X 22 = {essentialCalories.toFixed(2)} kcal</p>
      <p>Objetivo</p>
      <label htmlFor="">
        <input type="radio" name={goal} value="up" onChange={objetivoU}/>
        Subir de peso
      </label>
      <label htmlFor="">
        <input type="radio" name={goal} value="low" onChange={objetivoL}/>
        bajar de peso
      </label>
      <p>Rango segun el objetivo {goal == 'U' ? "+" : "-"}  {goalPercentage}%</p>
      <input
        type="range"
        min="10" max={maxPercentage} value={goalPercentage}
        onChange={e => goalUpdater(e)}
        step="1"/>
      <p>Se muestra el valor de las calorias objetivos {goalCalories.toFixed(2)} kcal</p>
      <p>total Calories : {essentialCalories.toFixed(2)} {goal == 'U' ? "+" : "-"} {goalCalories.toFixed(2)} = {totalCalories.toFixed(2)}</p>
      <h3>Calculo de macronutrientes</h3>
      <p>Hint de los valores</p>
      <p>Proteinas {proteins} g por kilogramo de peso</p>
      <input
        type="range"
        min="1.5" max="2.5" step="0.1"
        value={proteins}
        onChange={(e) => {
          setProteins(parseFloat(e.target.value));
        }}/>
      <p>Proteinas totales: {totalProteins.toFixed(2)} g  = {(totalProteins * 4.0).toFixed(2)} kcal</p>
      <p>Grasas {fats} g por kilogramo de peso</p>
      <input
        type="range"
        min="0.3" max="1.5" step="0.1"
        value={fats}
        onChange={(e) => {
          setFats(parseFloat(e.target.value));
        }}
        />
      <p>Grasas totales: {totalFats.toFixed(2)} g = {(totalFats * 9).toFixed(2)} kcal</p>
      <p>Carbohidratos es el resto</p>
      <p>Carbohidratos totales: {carbohydrates.toFixed(2)} g = {(carbohydrates * 4.0).toFixed(2)} kcal</p>
      <p>{(totalProteins * 4.0).toFixed(2)} + {(totalFats * 9).toFixed(2)} + {(carbohydrates * 4).toFixed(2)} = {totalCalories.toFixed(2)}</p>
    </div>
  );
}

export default App;
