import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import './App.css'
import Login from './screens/Login';
import TrainingConfirmation from './screens/TrainingConfirmation';
import TrainingDebrief from './screens/TrainingDebrief';
import TrainingSelection from './screens/TrainingSelection';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/trainingSelection" element={<TrainingSelection />} />
        <Route path="/trainingConfirmation" element={<TrainingConfirmation />} />
        <Route path="/trainingDebrief" element={<TrainingDebrief />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
