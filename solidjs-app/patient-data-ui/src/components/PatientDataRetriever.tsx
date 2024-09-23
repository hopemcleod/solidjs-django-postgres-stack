import { createSignal, createResource } from "solid-js";

interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
  diagnosis:`string`;
}

const fetchPatientData = async () => {
  // Fetch from your API endpoint
  const response = await fetch("http://localhost:8000/api/patients/"); // http://127.0.0.1:8000/api/patients/
  if (!response.ok) {
    throw new Error("Failed to fetch patient data");
  }

  const result = await response.json();
  return result;
};

const PatientComponent = () => {
  const [shouldFetch, setShouldFetch] = createSignal<boolean>(false);
  const [isVisible, setIsVisible] = createSignal<boolean>(true);

  // Think of this as useState in React
  // Could rename refetch to whatever you like e.g. {refetch: reloadData}. 
  // Regardless it is calling the fetchPatientData function
  const [data, { refetch }] = createResource<Patient[], boolean>(shouldFetch, fetchPatientData); // if createSignal is a number then would be specifying number instead of boolean

  const handleClick = () => {
    setShouldFetch(true); // Trigger the fetch on button click
    setIsVisible(false);
    // refetch(); // Re-fetch data
  };

  return (
    <div>
      {isVisible() && <button onClick={handleClick}>Fetch Patient Data</button>}
      <div>
        {data.loading && <p>Loading...</p>}
        {data.error && <p>Error: {data.error.message}</p>}
        {data() && (
          <ul>
            {data()?.map((patient) => (
              <div>{`${patient.first_name} ${patient.last_name}`}</div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PatientComponent;
