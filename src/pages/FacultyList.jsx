import { useEffect, useState } from "react";
import FacultyCard from "../components/FacultyCard";
import { fetchFaculty } from "../api/api";

export default function FacultyList() {
  const [facultyList, setFacultyList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFaculty()
      .then((data) => {
        console.log("Faculty data:", data); //log-it-ol
        setFacultyList(data);
      })
      .catch((err) => setError(err.message));
  }, []);
  if (error) return <p>{error}</p>;
  if (!facultyList.length) return <p>Loading faculty...</p>;

  return (
    <div>
      <h2>Faculty</h2>
      {facultyList.map((prof) => (
        <FacultyCard key={prof.id} professor={prof} />
      ))}
    </div>
  );
}
