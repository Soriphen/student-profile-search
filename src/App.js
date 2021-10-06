import "./sass/styles.scss";
import { useEffect, useState, useRef } from "react";
import Student from "./components/Student";
import NameSearchBar from "./components/NameSearchBar";
import TagSearchBar from "./components/TagSearchBar";

export default function App() {
  const [students, setStudents] = useState(null);
  const studentsWithTags = useRef();
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const searchName = useRef("");
  const searchTag = useRef("");
  const regexName = useRef(null);
  const regexTag = useRef(null);
  const filteredName = useRef([]);
  const filteredTag = useRef([]);

  const fetchData = () => {
    const userData = "https://api.hatchways.io/assessment/students";

    fetch(userData)
      .then((res) => res.json())
      .then(
        (data) => {
          studentsWithTags.current = data.students;
          // This adds a tags property in each student object
          studentsWithTags.current.forEach((student) => {
            student["tags"] = [];
          });
          setStudents(studentsWithTags.current);
          setIsLoaded(true);
        },
        (err) => {
          setIsLoaded(true);
          setError(err);
        }
      );
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="App wrapper">
        <NameSearchBar
          students={students}
          setStudents={setStudents}
          placeholder={"Search by name"}
          nameOrTag={"name"}
          searchName={searchName}
          searchTag={searchTag}
          regexName={regexName}
          regexTag={regexTag}
          filteredName={filteredName.current}
        />
        <TagSearchBar
          students={students}
          setStudents={setStudents}
          placeholder={"Search by tag"}
          nameOrTag={"tag"}
          searchName={searchName}
          searchTag={searchTag}
          regexName={regexName}
          regexTag={regexTag}
          filteredTag={filteredTag.current}
        />
        {students.length !== 0 &&
          students.map((student, index) => (
            <Student
              key={"student" + student.id}
              student={student}
              students={students}
              setStudents={setStudents}
              studentIndex={index}
              searchTag={searchTag}
              regexTag={regexTag}
            />
          ))}
      </div>
    );
  }
}
