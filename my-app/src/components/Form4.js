import React, { useState } from "react";
import './Form4.css';

const Form4 = () => {
  const [mileage, setMileage] = useState('');
  const [distanceUnit, setDistanceUnit] = useState('km');
  const [vehicleType, setVehicleType] = useState('small motorbike /moped / scooter upto 125cc');
  const [carbonFootprint, setCarbonFootprint] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Define emission factors based on vehicle type
  const emissionFactors = {
    'small motorbike /moped / scooter upto 125cc': 0.073, // kg CO2e per km
    'motorbike over 125 cc and upto 500 cc': 0.1, // kg CO2e per km
    'large motorbike over 500 cc': 0.13 // kg CO2e per km
  };

  // Define conversion factors for distance units
  const distanceConversion = {
    km: 1,
    miles: 1.60934
  };

  const handleCalculate = (e) => {
    e.preventDefault();

    // Parse inputs to floats, default to 0 if parsing fails
    const mileageValue = parseFloat(mileage) || 0;

    // Convert mileage to kilometers if necessary
    const mileageInKm = mileageValue * distanceConversion[distanceUnit];

    // Calculate carbon footprint
    const carbonFootprintValue = mileageInKm * emissionFactors[vehicleType];

    // Set the calculated carbon footprint
    setCarbonFootprint(carbonFootprintValue.toFixed(2)); // Round to 2 decimal places
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className='boxx'>
      <h1 className="nowrap">Calculate your carbon footprint for Motorbike</h1>
      <form className='calculate' onSubmit={handleCalculate}>
        {/* <div className="top-part1"></div> */}
        <div className='div11'>
          <div className="left-text44">
          <span className="t">Mileage&nbsp;:&nbsp;&nbsp;</span>
          <span className="t">Choose vehicle&nbsp;:&nbsp;&nbsp;</span>
          </div>
          <div className="right-text44">
          <div className="hello">
          <input type="text"  style={{ padding: "0.3rem" }} value={mileage} onChange={(e) => setMileage(e.target.value)} />
          <select className="options" value={distanceUnit} onChange={(e) => setDistanceUnit(e.target.value)}>
            <option value="km">km</option>
            <option value="miles">miles</option>
          </select>
        </div>
          <div className="hello">
            <select className="optt" style={{ padding: "0.3rem" }} value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
              <option value="small motorbike /moped / scooter upto 125cc">small motorbike /moped / scooter upto 125cc</option>
              <option value="motorbike over 125 cc and upto 500 cc">motorbike over 125 cc and upto 500 cc</option>
              <option value="large motorbike over 500 cc">large motorbike over 500 cc</option>
            </select>
          </div>
        </div>
        </div>
        <div className='submitt'>
          <button type="submit" className="button1">Calculate</button>
        </div>
      </form>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <div className="inside-content">
            <h2 className="result-text">Carbon Footprint Result</h2>
            <p className="result-text1">Your public transport carbon footprint is: {carbonFootprint} kgCO2e</p>
            <div className="result-text2">Want to decrease your Carbon footprint? Start carbon offsetting now ! </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form4;
