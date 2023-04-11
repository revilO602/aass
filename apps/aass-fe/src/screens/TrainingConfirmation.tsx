import React, { useEffect, useState } from "react";

export default function TrainingConfirmation() {

    type Confirmation = {
        id : number;
        training_id : number;
        customer_id : number;
        createdAt : string;
        updatedAt : string;
    }

    const [confirmation, setConfirmation] = useState<Confirmation[]>([]);
    //get traiing confirmatioons from the backend on load
    useEffect(() => {
        fetch("http://localhost:8080/trainings/confirmations", {
          method: "GET",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setConfirmation(data);
          })
          .catch((error) => {
          });
      }, []);
    
    //handle the confirmation button
    const handleConfirm = async (id : number) => {
        try {
            const response = await fetch(
                `http://localhost:8080/trainings/confirmations/${id}/confirm/`, 
                {
                    method: "POST",
                    mode: "cors",
                    headers: { "Content-Type": "application/json" },
                }
            );
            const data = await response.json();
            console.log(data);
        } catch (error) {
        }
    }

    
    //simple overview of the training that was selected and a confirmation button
    return (
        <div>
            <h1>Training Confirmation</h1>
            {confirmation.map((confirmation) => (
                <div key={confirmation.id}>
                    <p>Training ID: {confirmation.training_id}</p>
                    <p>Customer ID: {confirmation.customer_id}</p>
                <button onClick= {() => handleConfirm(confirmation.id)}>Confirm</button>
                </div>
            ))}

        </div>
    )
}
