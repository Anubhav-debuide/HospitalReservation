import React, { useState , useEffect, useMemo} from 'react';
import axios from 'axios';

function App() {
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [message, setMessage] = useState('');
  const [availableRooms, setAvailableRooms] = useState({});

  const getAvailability = useMemo(() => async () => {
    try {
        const availability = await axios.get('http://localhost:8000/v1/getAvailableRooms');
        setAvailableRooms(availability.data);
    } catch (err) {
        setAvailableRooms({});
    }
}, []);


  useEffect(()=>{
    
    const fetchData = async()=>{
      await getAvailability();
    }
    fetchData();
  },[getAvailability])

  const makeReservation = async () => {
    if (!selectedRoomType) {
      setMessage('Please select a room type');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/v1/makeReservation', { roomType: selectedRoomType });
      setMessage(response.data.message);
      
      getAvailability();
      setSelectedRoomType("");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h1>Hospital Reservation System</h1>
      <select value={selectedRoomType} onChange={(e) => setSelectedRoomType(e.target.value)}>
        <option value="">Select Room Type</option>
        <option value="Normal Room">Normal Room</option>
        <option value="Oxygen Room">Oxygen Room</option>
        <option value="ICU">ICU</option>
      </select>
      <button onClick={makeReservation}>Reserve</button>
      {message && <p>{message}</p>}


      <div>
        <h3>Available romms</h3>
        <h4 id='availableNormalRooms'>{`Normal Rooms : ${availableRooms.availableNormal ? availableRooms.availableNormal: ""}`}</h4>
        <h4>{`Oxygen Rooms : ${availableRooms.availableOxygen? availableRooms.availableOxygen:""}`}</h4>
        <h4>{`ICU : ${availableRooms.availableIcu? availableRooms.availableIcu:""}`}</h4>
      </div>
    </div>
  );
}

export default App;
