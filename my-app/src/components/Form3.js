import React, { useState } from "react";
import './Form3.css';

const Form3 = () => {
  const [distance, setDistance] = useState('');
  const [distanceUnit, setDistanceUnit] = useState('km');
  const [efficiency, setEfficiency] = useState('');
  const [fuelType, setFuelType] = useState('Petrol');
  const [carbonFootprint, setCarbonFootprint] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Define emission factors based on fuel type
  const emissionFactors = {
        Petrol: 2.31, // kg CO2e per liter
        Diesel: 2.68, // kg CO2e per liter
        CNG: 2.75 // kg CO2e per kg
  };

  // Define conversion factors for distance units
  const distanceConversion = {
    km: 1,
    miles: 1.60934
  };

  const handleCalculate = (e) => {
    e.preventDefault();

    // Parse inputs to floats, default to 0 if parsing fails
    const distanceValue = parseFloat(distance) || 0;
    const efficiencyValue = parseFloat(efficiency) || 0;

    // Convert distance to kilometers if necessary
    const distanceInKm = distanceValue * distanceConversion[distanceUnit];

    // Calculate fuel consumption
    const fuelConsumption = distanceInKm / efficiencyValue;

    // Calculate carbon footprint
    const carbonFootprintValue = fuelConsumption * emissionFactors[fuelType];

    // Set the calculated carbon footprint
    setCarbonFootprint(carbonFootprintValue.toFixed(2)); // Round to 2 decimal places
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className='boxx'>
      <h1 className="nowrap">Calculate your carbon footprint for Car</h1>
      <form className='calculate' onSubmit={handleCalculate}>
        <div className="whole6">
          <div className="t11">
            <div className='left-part33'>
              <span className="it9">Distance Travelled&nbsp;:&nbsp;&nbsp;</span>
              <span className="it1">Enter Fuel efficiency&nbsp;:&nbsp;&nbsp;</span>
              <span className="it1">Enter Fuel&nbsp;:&nbsp;&nbsp;</span>
              </div>
              <div className="right-part33">
              <input type="text" className="itaa1"  style={{ padding: "0.3rem" }} value={distance} onChange={(e) => setDistance(e.target.value)} />
              <select className="options1-1"  style={{ padding: "0.3rem" }} value={distanceUnit} onChange={(e) => setDistanceUnit(e.target.value)}>
                <option value="km">km</option>
                <option value="miles">miles</option>
              </select>
              <div className="it1-1">
              <input type="text" className="itaa"  style={{ padding: "0.3rem" }} value={efficiency} onChange={(e) => setEfficiency(e.target.value)} />
              <select className="options-1" value={fuelType} onChange={(e) => setFuelType(e.target.value)}>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="CNG">CNG</option>
              </select>
            </div>
            </div>
          </div>
          <div className='submitt-3'>
            <button type="submit" className="button1">Calculate</button>
          </div>
        </div>
      </form>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <div className="inside-content">
            <h2 className="result-text">Carbon Footprint Result</h2>
            <p className="result-text1">Your public transport carbon footprint is: {carbonFootprint} kgCO2e</p>
            <div className="result-text2">Want to decrease your Carbon footprint? Start carbon offsetting now !. Start carbon offsetting now ! </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form3;
