import React, { useState } from "react";
import Positive_input from './Positive_input';
import './Form.css';

const Form = () => {
  const [householdSize, setHouseholdSize] = useState(1);
  const [electricity, setElectricity] = useState('');
  const [electricityFactor, setElectricityFactor] = useState('');
  const [naturalGas, setNaturalGas] = useState('');
  const [naturalGasUnit, setNaturalGasUnit] = useState('kWh');
  const [heatingOil, setHeatingOil] = useState('');
  const [heatingOilUnit, setHeatingOilUnit] = useState('kWh');
  const [coal, setCoal] = useState('');
  const [coalUnit, setCoalUnit] = useState('tonnes');
  const [lpg, setLpg] = useState('');
  const [lpgUnit, setLpgUnit] = useState('kWh');
  const [propane, setPropane] = useState('');
  const [propaneUnit, setPropaneUnit] = useState('litres');
  const [wood, setWood] = useState('');
  const [woodUnit, setWoodUnit] = useState('tonnes');
  const [carbonFootprint, setCarbonFootprint] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Define conversion factors based on units
  const conversionFactors = {
    naturalGas: {
      kWh: 0.184, // kgCO2e per kWh
      therms: 5.3 // kgCO2e per therm
    },
    heatingOil: {
      kWh: 0.265, // kgCO2e per kWh
      litres: 2.52 // kgCO2e per litre
    },
    coal: {
      tonnes: 2414, // kgCO2e per tonne
      'x 10kg bags': 24.14 // kgCO2e per 10kg bag
    },
    lpg: {
      kWh: 0.214, // kgCO2e per kWh
      litres: 1.51 // kgCO2e per litre
    },
    propane: {
      litres: 1.51, // kgCO2e per litre
      'US gallons': 5.79 // kgCO2e per US gallon
    },
    wood: {
      tonnes: 393, // kgCO2e per tonne
      'x 10kg bags': 3.93 // kgCO2e per 10kg bag (assumed similar to coal)
    }
  };

  const handleCalculate = (e) => {
    e.preventDefault();

    // Parse inputs to floats, default to 0 if parsing fails
    const electricityValue = parseFloat(electricity) || 0;
    const electricityFactorValue = parseFloat(electricityFactor) || 0;
    const naturalGasValue = parseFloat(naturalGas) || 0;
    const heatingOilValue = parseFloat(heatingOil) || 0;
    const coalValue = parseFloat(coal) || 0;
    const lpgValue = parseFloat(lpg) || 0;
    const propaneValue = parseFloat(propane) || 0;
    const woodValue = parseFloat(wood) || 0;

    // Get conversion factors based on selected units
    const naturalGasFactor = conversionFactors.naturalGas[naturalGasUnit] || 0;
    const heatingOilFactor = conversionFactors.heatingOil[heatingOilUnit] || 0;
    const coalFactor = conversionFactors.coal[coalUnit] || 0;
    const lpgFactor = conversionFactors.lpg[lpgUnit] || 0;
    const propaneFactor = conversionFactors.propane[propaneUnit] || 0;
    const woodFactor = conversionFactors.wood[woodUnit] || 0;

    // Calculate carbon footprint for each input
    const electricityFootprint = electricityValue * electricityFactorValue;
    const naturalGasFootprint = naturalGasValue * naturalGasFactor;
    const heatingOilFootprint = heatingOilValue * heatingOilFactor;
    const coalFootprint = coalValue * coalFactor;
    const lpgFootprint = lpgValue * lpgFactor;
    const propaneFootprint = propaneValue * propaneFactor;
    const woodFootprint = woodValue * woodFactor;

    // Sum all footprints
    const totalFootprint = electricityFootprint + naturalGasFootprint + heatingOilFootprint + coalFootprint + lpgFootprint + propaneFootprint + woodFootprint;

    // Set the calculated carbon footprint
    setCarbonFootprint(totalFootprint.toFixed(2) / 1000); // Round to 2 decimal places
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleElectricityFactorHelp = () => {
    alert("The electricity conversion factor is suggested for the country you have selected, but you can replace it with your own if you wish (e.g. a factor provided by your energy provider which may be on your energy bill).");
  };

  return (
    <div className='boxx'>
      <h1 className="calc-heading">Calculate your carbon footprint for household</h1>
      <form className='calculate-1' onSubmit={handleCalculate}>
        <div className='no_h'>
          <span className='qsn1'>How many people are in your household?&nbsp;&nbsp;</span>
          <Positive_input value={householdSize} onChange={e => setHouseholdSize(e.target.value)} />
        </div>
        <span className='qsn2'>(Note: To calculate for your full household footprint e.g. for your family, keep this as "1")</span>
        <div className='div2'>
          <div className="left-part11">
          <span className="t-1">Electricity&nbsp;:&nbsp;&nbsp;</span>
          <span className="t-1">Natural gas&nbsp;:&nbsp;&nbsp;</span>
          <span className="t-1">Heating oil&nbsp;:&nbsp;&nbsp;</span>
          <span className="t-1">Coal&nbsp;:&nbsp;&nbsp;</span>
          <span className="t-1">LPG&nbsp;:&nbsp;&nbsp;</span>
          <span className="t-1">Propane&nbsp;:&nbsp;&nbsp;</span>
          <span className="t-1">Wood&nbsp;:&nbsp;&nbsp;</span>
          </div>
          < div className="right-part11">
          <div className='div11'>
          <input type="text" className="enter2"  style={{ padding: "0.3rem" }} value={electricity} onChange={e => setElectricity(e.target.value)} />
          <span className='text2'>&nbsp;&nbsp;kWh with a factor of&nbsp;&nbsp;</span>
          <input type="text" className="text7"  style={{ padding: "0.3rem" }} value={electricityFactor} onChange={e => setElectricityFactor(e.target.value)} />
          <span className='text2'>&nbsp;&nbsp;kgCO2e/kWh&nbsp;&nbsp;</span>
          <span className='text33' onClick={handleElectricityFactorHelp}>whats this?</span>
        </div>
        <div className='div11'>
          <input type="text" value={naturalGas}  style={{ padding: "0.3rem" }} onChange={e => setNaturalGas(e.target.value)} />
          <select className="options-12"  style={{ padding: "0.3rem" }} value={naturalGasUnit} onChange={e => setNaturalGasUnit(e.target.value)}>
            <option value="kWh">kWh</option>
            <option value="therms">therms</option>
          </select>
        </div>
        <div className='div11'>
          <input type="text"  style={{ padding: "0.3rem" }} value={heatingOil} onChange={e => setHeatingOil(e.target.value)} />
          <select className="options-12"  style={{ padding: "0.3rem" }} value={heatingOilUnit} onChange={e => setHeatingOilUnit(e.target.value)}>
            <option value="kWh">kWh</option>
            <option value="litres">litres</option>
            <option value="tonnes">tonnes</option>
          </select>
        </div>
        <div className='div11'>
          <input type="text"  style={{ padding: "0.3rem" }} value={coal} onChange={e => setCoal(e.target.value)} />
          <select className="options-12"  style={{ padding: "0.3rem" }} value={coalUnit} onChange={e => setCoalUnit(e.target.value)}>
            <option value="kWh">kWh</option>
            <option value="tonnes">tonnes</option>
            <option value="x 10kg bags">x 10kg bags</option>
            <option value="x 20kg bags">x 20kg bags</option>
            <option value="x 25kg bags">x 25kg bags</option>
            <option value="x 50kg bags">x 50kg bags</option>
          </select>
        </div>
        <div className='div11'>
          <input type="text" value={lpg}   style={{ padding: "0.3rem" }}onChange={e => setLpg(e.target.value)} />
          <select className="options-12"  style={{ padding: "0.3rem" }} value={lpgUnit} onChange={e => setLpgUnit(e.target.value)}>
            <option value="kWh">kWh</option>
            <option value="litres">litres</option>
            <option value="tonnes">tonnes</option>
          </select>
        </div>
        <div className='div11'>
          <input type="text" style={{ padding: "0.3rem" }}  value={propane} onChange={e => setPropane(e.target.value)} />
          <select className="options-12"  style={{ padding: "0.3rem" }} value={propaneUnit} onChange={e => setPropaneUnit(e.target.value)}>
            <option value="litres">litres</option>
            <option value="US gallons">US gallons</option>
          </select>
        </div>
        <div className='div11'>
          <input type="text"  style={{ padding: "0.3rem" }} value={wood} onChange={e => setWood(e.target.value)} />
          <select className="options-12"  style={{ padding: "0.3rem" }} value={woodUnit} onChange={e => setWoodUnit(e.target.value)}>
            <option value="tonnes">tonnes</option>
          </select>
        </div>
        </div>
        </div>
        <div className='submitt-1'>
          <button className="button-11"  style={{ padding: "0.3rem" }} type="submit">Calculate</button>
        </div>
      </form>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <div className="inside-content">
              <h2 className="result-text">Carbon Footprint Result</h2>
              <p className="result-text1">Your public transport carbon footprint is: {carbonFootprint} kgCO2e</p>
              <div className="result-text2">Want to decrease your Carbon footprint? Start carbon offsetting now! </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;

