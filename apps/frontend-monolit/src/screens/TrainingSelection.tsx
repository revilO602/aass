import React, { ChangeEvent } from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


export default function TrainingSelection() {
  //define traing type
  type Training = {
    id: number;
    trainer_id: number;
    duration_min: number;
    calories_per_min: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };

  const [trainings, setTrainings] = useState<Training[]>([]);
  const [selectedTrainingId, setSelectedTrainingId] = useState<number | null>(null);
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedTrainingId(parseInt(event.target.value));
  };
  const navigate = useNavigate();

  const id = localStorage.getItem("id");


  useEffect(() => {

    fetch("http://localhost:8080/trainings/", {
      method: "GET",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTrainings(data);
      })
      .catch((error) => {
      });
  }, []);

  const handleReserve = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/trainings/${selectedTrainingId}/reserve`,
        {
          method: "POST",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({id}),
        }
      );
      //const data = await response.json();
        navigate("/trainingConfirmation");
    } catch (error) {
    }
  };

  return (
    <div>
      <h1>Training Selection</h1>
      <div>
        {/* Render a list of trainings with buttons to select them */}
        <select value={selectedTrainingId || ""} onChange={handleChange}>
          {trainings.map((training) => (
            <option key={training.id} value={training.id}>
              {training.name}
            </option>
          ))}
        </select>
        <button onClick={handleReserve}>
          Reserve
        </button>
      </div>
    </div>
  );
}
