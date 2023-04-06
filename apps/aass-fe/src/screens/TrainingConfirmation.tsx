import React from "react";

export default function TrainingConfirmation() {
    //simple overview of the training that was selected and a confirmation button
    return (
        <div>
            <h1>Training Confirmation</h1>
            <form>
                <label>
                    Training:
                    <div>
                        <p>Training 1</p>
                    </div>
                </label>
                <input type="submit" value="Accept" />
                <input type="submit" value="Decline" />
            </form>
        </div>
    )
}
