import React from "react";

export default function TrainingSelection() {
    return (
        <div>
            <h1>Training Selection</h1>
            <form>
                <label>
                    Training:
                    <select>
                        <option value="1">Training 1</option>
                        <option value="2">Training 2</option>
                        <option value="3">Training 3</option>
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}