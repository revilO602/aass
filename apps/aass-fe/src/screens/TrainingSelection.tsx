import React from "react";
import { redirect } from "react-router-dom";
import { useEffect } from "react";

export default function TrainingSelection() {

    //define traing type
    type Training = {
        id: number;
        trainer_id: number;
        duration_min: number;
        calories_per_min: number;
        name: string;
        created_at: string;
        updated_at: string;
    }

   
    const [trainings, setTrainings] = React.useState([]);

        useEffect(() => {
            fetch('http://localhost:8080/trainings/', {
                method: "GET",
                mode : "no-cors",
                headers: { "Content-Type": "application/json" }
            })
    
                .then(response => response.json())
                .then(data => setTrainings(data));

        }, []);

        console.log(trainings);

    return (   
        <div>
            <h1>Training Selection</h1>
            <form>
                <label>
                    Training:
                    <select>
                        {/* {trainings.map((training) => (
                            <option value={training.id}>{training.name}</option>
                        ))} */}
                        <option value="1">Training 1</option>
                        <option value="2">Training 2</option>
                        <option value="3">Training 3</option>
                    </select>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}