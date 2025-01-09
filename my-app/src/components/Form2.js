import React, { useState } from "react";
import './Form2.css';

const Form2 = () => {
  const [tripType, setTripType] = useState('one-way');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [flightClass, setFlightClass] = useState('Economy class');
  const [carbonFootprint, setCarbonFootprint] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Function to calculate distance between two airports (example implementation)
  const calculateDistance = (from, to) => {
    // Replace with actual distances or API call to get distance between airports
    const airportDistances = {
      'DEL': {
        'MAA': 1761,  
        'BOM': 1137, 
        'AMD': 755, 
        'JAI': 230, 
        'LKO': 535, 
        'STV': 936, 
        'PNQ': 1155, 
        'HYD': 1267, 
        'BLR': 1701, 
        'CCU': 1312, 
      },
      'MAA': {
        'DEL': 1761,  
        'BOM': 1034, 
        'AMD': 1375, 
        'JAI': 1605, 
        'LKO': 1921, 
        'STV': 1200, 
        'PNQ': 913, 
        'HYD': 507, 
        'BLR': 237, 
        'CCU': 1387, 
      },
      'BOM': {
        'DEL': 1137,
        'MAA': 1034,  
        'AMD': 444, 
        'JAI': 912, 
        'LKO': 1366, 
        'STV': 225, 
        'PNQ': 124, 
        'HYD': 623, 
        'BLR': 834, 
        'CCU': 1665, 
      },
      'CCU': {
        'DEL': 1312,
       'MAA': 1387,  
        'BOM': 1665, 
        'AMD': 1620, 
        'JAI': 1356, 
        'LKO': 1014, 
        'STV': 1011, 
        'PNQ': 1577, 
        'HYD': 1207, 
        'BLR': 1527, 
      },
      'BLR': {
        'DEL': 1701,
       'MAA': 237,  
        'BOM': 834, 
        'AMD': 1222, 
        'JAI': 1528, 
        'LKO': 1851, 
        'STV': 1026, 
        'PNQ': 722, 
        'HYD': 455, 
        'CCU': 1527, 
      },
      'HYD': {
        'DEL': 1267,
       'MAA': 507,  
        'BOM': 623, 
        'AMD': 888, 
        'JAI': 1101, 
        'LKO': 1333, 
        'STV': 737, 
        'PNQ': 500, 
        'BLR': 455, 
        'CCU': 1207, 
      },
      'AMD': {
        'DEL': 755,
       'MAA': 1375,  
        'BOM': 444, 
        'JAI': 527, 
        'LKO': 1150, 
        'STV':218, 
        'PNQ': 517, 
        'HYD': 888, 
        'BLR': 1222, 
        'CCU': 1620, 
      },
      'JAI': {
        'DEL': 230,
       'MAA': 1605,  
        'BOM': 912, 
        'AMD': 527, 
        'LKO': 577, 
        'STV': 707, 
        'PNQ': 937, 
        'HYD': 1101, 
        'BLR': 1528, 
        'CCU': 1356, 
      },
      'LKO': {
        'DEL': 535,
       'MAA': 1921,  
        'BOM': 1366, 
        'AMD': 1150, 
        'JAI': 577, 
        'STV': 1260, 
        'PNQ': 1375, 
        'HYD': 1333, 
        'BLR': 1851, 
        'CCU': 1014, 
      },
      'STV': {
        'DEL': 936,
       'MAA': 1200,  
        'BOM': 225, 
        'AMD': 218, 
        'JAI': 707, 
        'LKO': 1260,  
        'PNQ': 307, 
        'HYD': 737, 
        'BLR': 1026, 
        'CCU': 1011, 
      },
      'PNQ': {
        'DEL': 1155,
        'MAA': 913,  
        'BOM': 124, 
        'AMD': 517, 
        'JAI': 937, 
        'LKO': 1375, 
        'STV': 307, 
        'HYD': 500, 
        'BLR': 722, 
        'CCU': 1577, 
      },
     
    };

    return airportDistances[from]?.[to] || 0; // Default to 0 if no distance found
  };

  const handleCalculate = (e) => {
    e.preventDefault();

    // Example conversion factors (replace with actual values)
    const economyFactor = 0.115; // kg CO2 per km
    const premiumEconomyFactor = 0.133;
    const businessFactor = 0.158;
    const firstClassFactor = 0.230;
    const averageFactor = 0.130;

    // Calculate distance between airports
    const distance = calculateDistance(from, to);

    // Determine the correct factor based on the selected class
    let factor;
    switch (flightClass) {
      case 'Economy class':
        factor = economyFactor;
        break;
      case 'Premium Economy':
        factor = premiumEconomyFactor;
        break;
      case 'Business class':
        factor = businessFactor;
        break;
      case 'First class':
        factor = firstClassFactor;
        break;
      default:
        factor = averageFactor;
        break;
    }

    // Calculate the carbon footprint
    const footprint = distance * factor;

    // Set the calculated carbon footprint
    setCarbonFootprint(footprint.toFixed(2)); // Round to 2 decimal places
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className='boxx'>
      <h1 className="nowrap">Calculate your carbon footprint for flight</h1>
      <form className='calculate' onSubmit={handleCalculate}>
        <div className='no_h'>
          <span className='qsn1'>You can enter up to 3 flight itineraries&nbsp;&nbsp;</span>
        </div>
        <div className="rad">
          <input
            type="radio"
            name="tripType"
            value="one-way"
            checked={tripType === 'one-way'}
            onChange={e => setTripType(e.target.value)}
          /> One-way&nbsp;&nbsp;&nbsp;
          <input
            type="radio"
            name="tripType"
            value="round-trip"
            checked={tripType === 'round-trip'}
            onChange={e => setTripType(e.target.value)}
          /> Round trip
        </div>
        <div className="whole">
          <div className="t1">
            <span className="it">From</span>
            <span className="it">To</span>
            <span className="it">Class</span>
          </div>
          <div className="t">
            <div className="one">
              <input
                type="text"
                className="ita"
                style={{ padding: "0.3rem" }}
                value={from}
                onChange={e => setFrom(e.target.value)}
              /><span className="please">(Please enter the three letter ITA)</span>
            </div>
            <div className="one">
              <input
                type="text"
                className="ita"
                value={to}
                style={{ padding: "0.3rem" }}
                onChange={e => setTo(e.target.value)}
              /><span className="please">(Please enter the three letter ITA)</span>
            </div>
            <div className="onee">
              <select
                className="optionss"
                style={{ padding: "0.3rem" }}
                value={flightClass}
                onChange={e => setFlightClass(e.target.value)}
              >
                <option>Economy class</option>
                <option>Premium Economy</option>
                <option>Business class</option>
                <option>First class</option>
                <option>Average (unknown class)</option>
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

export default Form2;

