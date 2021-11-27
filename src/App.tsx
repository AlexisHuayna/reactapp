import React, { useEffect, useState } from 'react';
import './App.css';
import Slider from './components/Slider';

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
    setTotalCalories(goal === 'U' ? essentialCalories + goalCalories : essentialCalories - goalCalories);
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

  return (
    <div className="">

      <h1>Calc diet {weight}</h1>

      <Slider
        title="Weight"
        min="30"
        max="130"
        step="0.1"
        value={weight}
        setValue={setWeight}
        measurement="Kg"
      />

      <p>diary activity {exerciseFrecuency}</p>

      <Slider
        title="Actividad fisica"
        min="1.2"
        max="2.2"
        step="0.1"
        value={exerciseFrecuency}
        setValue={setExerciseFrecuency}
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

      <Slider
        title={goal === 'U' ? "Porcentage de ganancia" : "Porcentage de perdida"}
        min="10"
        max={maxPercentage}
        step="1"
        value={goalPercentage}
        setValue={setGoalPercentage}
        measurement="%"
      />

      <p>Se muestra el valor de las calorias objetivos {goalCalories.toFixed(2)} kcal</p>
      <p>Calorias totales : {essentialCalories.toFixed(2)} {goal == 'U' ? "+" : "-"} {goalCalories.toFixed(2)} = {totalCalories.toFixed(2)}</p>
      <h3>Calculo de macronutrientes</h3>

      <Slider
        title="Pretinas"
        min="1.5"
        max="2.5"
        step="0.1"
        value={proteins}
        setValue={setProteins}
        measurement="g por Kg de peso"
      />

      <p>Proteinas totales: {totalProteins.toFixed(2)} g  = {(totalProteins * 4.0).toFixed(2)} kcal</p>

      <Slider
        title="Grasas"
        min="0.3"
        max="1.5"
        step="0.1"
        value={fats}
        setValue={setFats}
        measurement="g por Kg de peso"
      />

      <p>Grasas totales: {totalFats.toFixed(2)} g = {(totalFats * 9).toFixed(2)} kcal</p>
      <p>Carbohidratos es el resto</p>
      <p>Carbohidratos totales: {carbohydrates.toFixed(2)} g = {(carbohydrates * 4.0).toFixed(2)} kcal</p>
      <p>{(totalProteins * 4.0).toFixed(2)} + {(totalFats * 9).toFixed(2)} + {(carbohydrates * 4).toFixed(2)} = {totalCalories.toFixed(2)}</p>
    </div>
  );
}

export default App;
