import React from "react";
import { redirect } from "react-router-dom";
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
}

   
    const [trainings, setTrainings] = useState<Training[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/trainings/', {
            method: "GET",
            mode: "cors",
            headers: { "Content-Type": "application/json" }
        })
        .then(response => {
            console.log("API response received:", response);
            return response.json();
        })
        .then(data => {
            console.log("API data received:", data);
            setTrainings(data);
        })
        .catch(error => {
            console.error("API request failed:", error);
        });
    }, []);
    

        console.log(trainings);

    return (   
        <div>
            <h1>Training Selection</h1>
            <form>
                <label>
                    Training:
                    <select>
                        {trainings.map((training) => (
                            <option value={training.id}>{training.name}</option>
                        ))}
                    </select>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}