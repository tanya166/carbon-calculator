import React, { useState, useEffect } from "react";
import './Form5.css';

const Form5 = () => {
  const [bus, setBus] = useState({ distance: '', unit: 'km' });
  const [taxi, setTaxi] = useState({ distance: '', unit: 'km' });
  const [coach, setCoach] = useState({ distance: '', unit: 'km' });
  const [nationalRail, setNationalRail] = useState({ distance: '', unit: 'km' });
  const [internationalRail, setInternationalRail] = useState({ distance: '', unit: 'km' });
  const [tram, setTram] = useState({ distance: '', unit: 'km' });
  const [tube, setTube] = useState({ distance: '', unit: 'km' });
  const [showModal, setShowModal] = useState(false);
  const [carbonFootprint, setCarbonFootprint] = useState(null);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [showModal]);
  // Dummy conversion factors
  const conversionFactors = {
    km: 0.1, // Example conversion factor per km
    miles: 0.16 // Example conversion factor per mile
  };

  const calculateFootprint = (distance, unit) => {
    return parseFloat(distance) * conversionFactors[unit] || 0;
  };

  const handleCalculate = (e) => {
    e.preventDefault();

    const busFootprint = calculateFootprint(bus.distance, bus.unit);
    const taxiFootprint = calculateFootprint(taxi.distance, taxi.unit);
    const coachFootprint = calculateFootprint(coach.distance, coach.unit);
    const nationalRailFootprint = calculateFootprint(nationalRail.distance, nationalRail.unit);
    const internationalRailFootprint = calculateFootprint(internationalRail.distance, internationalRail.unit);
    const tramFootprint = calculateFootprint(tram.distance, tram.unit);
    const tubeFootprint = calculateFootprint(tube.distance, tube.unit);

    const totalFootprint = busFootprint + taxiFootprint + coachFootprint + nationalRailFootprint + internationalRailFootprint + tramFootprint + tubeFootprint;

    setCarbonFootprint(totalFootprint.toFixed(2));
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className='boxx'> 
      <h1 className="nowrap">Calculate your carbon footprint for Public Transport</h1>  
      <form className='calculate' onSubmit={handleCalculate}>
        <span className="detail">Enter mileage for each type of public transport, and press the Calculate button</span>
        <div className='div1'>
          <div className="div1-1">
          <div className='left-text11'>
          <span className="t">Bus&nbsp;:&nbsp;&nbsp;</span>
          <span className="t">Taxi &nbsp;:&nbsp;&nbsp;</span>
          <span className="t">Coach&nbsp;:&nbsp;&nbsp;</span>
          <span className="t">National Rail&nbsp;:&nbsp;&nbsp;</span>
          <span className="t">International rail&nbsp;:&nbsp;&nbsp;</span>
          <span className="t">Tram&nbsp;:&nbsp;&nbsp;</span>
          <span className="t">Tube/Subway&nbsp;:&nbsp;&nbsp;</span>
          </div>
          <div className="right-text11">
            <div className="options11">
          <input type="text" className="text-boxx" value={bus.distance} onChange={(e) => setBus({ ...bus, distance: e.target.value })}/>
          <select className="options" value={bus.unit} onChange={(e) => setBus({ ...bus, unit: e.target.value })}>
            <option value="km">km</option>
            <option value="miles">miles</option>
          </select>     
          </div>     
          <div className="options11">
          <input type="text" className="text-boxx" value={taxi.distance} onChange={(e) => setTaxi({ ...taxi, distance: e.target.value })}/>
          <select className="options" value={taxi.unit} onChange={(e) => setTaxi({ ...taxi, unit: e.target.value })}>
            <option value="km">km</option>
            <option value="miles">miles</option>
          </select>
          </div>
          <div className="options11">
          <input type="text" className="text-boxx" value={coach.distance} onChange={(e) => setCoach({ ...coach, distance: e.target.value })}/>
          <select className="options" value={coach.unit} onChange={(e) => setCoach({ ...coach, unit: e.target.value })}>
            <option value="km">km</option>
            <option value="miles">miles</option>
          </select>
          </div>
          <div className="options11">
          <input type="text" className="text-boxx" value={nationalRail.distance} onChange={(e) => setNationalRail({ ...nationalRail, distance: e.target.value })}/>
          <select className="options" value={nationalRail.unit} onChange={(e) => setNationalRail({ ...nationalRail, unit: e.target.value })}>
            <option value="km">km</option>
            <option value="miles">miles</option>
          </select>
          </div>
          <div className="options11">
          <input type="text" className="text-boxx" value={internationalRail.distance} onChange={(e) => setInternationalRail({ ...internationalRail, distance: e.target.value })}/>
          <select className="options" value={internationalRail.unit} onChange={(e) => setInternationalRail({ ...internationalRail, unit: e.target.value })}>
            <option value="km">km</option>
            <option value="miles">miles</option>
          </select>
          </div>
          <div className="options11">
          <input type="text" className="text-boxx" value={tram.distance} onChange={(e) => setTram({ ...tram, distance: e.target.value })}/>
          <select className="options" value={tram.unit} onChange={(e) => setTram({ ...tram, unit: e.target.value })}>
            <option value="km">km</option>
            <option value="miles">miles</option>
          </select>
          </div>
          <div className="options11">
          <input type="text" className="text-boxx" value={tube.distance} onChange={(e) => setTube({ ...tube, distance: e.target.value })}/>
          <select className="options" value={tube.unit} onChange={(e) => setTube({ ...tube, unit: e.target.value })}>
            <option value="km">km</option>
            <option value="miles">miles</option>
          </select>
          </div>
        </div>
        </div>
        <div className="button-1">
        <button className="button1" type="submit">Calculate</button>
        </div>
        </div>
      </form>
      {showModal && (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={closeModal}>&times;</span>
      <div className="inside-content">
        <h2 className="result-text">Carbon Footprint Result</h2>
        <p className="result-text1">
          Your public transport carbon footprint is: {carbonFootprint} kgCO2e
        </p>
        <div className="result-text2">
          Want to decrease your Carbon footprint? Start carbon offsetting now!
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Form5;
