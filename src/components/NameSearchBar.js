import { useRef } from "react";
import { SearchBarStyled } from "./SearchBarStyles";
import useKeyPress from "../hooks/useKeyPress";

const NameSearchBar = ({
  students,
  setStudents,
  placeholder,
  searchName,
  searchTag,
  regexName,
  regexTag,
  filteredName
}) => {
  const studentsCopy = useRef([...students]); // I use a useRef so as to keep a copy of students' first state before the re-render changes.
  const backSpacePress = useKeyPress("Backspace");
  const beforeStudentsChange = useRef();

  const handleFilter = (e) => {
    // If it's the name searchbar commence with filtering targeted towards what is inputted in the name searchbar
    searchName.current = e.target.value.replaceAll(/[\\]/gi, "\\\\");
    regexName.current = new RegExp(`^(${searchName.current})`, "i");
    if (searchTag.current) {
      filteredName = students.filter(({ firstName, lastName }) => {
        return (
          regexName.current.test(firstName) ||
          regexName.current.test(lastName) ||
          regexName.current.test(firstName + " " + lastName)
        );
      });
    } else {
      filteredName = studentsCopy.current.filter(({ firstName, lastName }) => {
        return (
          regexName.current.test(firstName) ||
          regexName.current.test(lastName) ||
          regexName.current.test(firstName + " " + lastName)
        );
      });
    }

    if (searchTag.current === "" && searchName.current === "") {
      // If both filters are empty then return everything back to default student listing.
      setStudents(studentsCopy.current);
    } else if (backSpacePress) {
      setStudents(
        beforeStudentsChange.current.filter(({ firstName, lastName, tags }) => {
          if (
            regexName.current !== "" &&
            searchName.current &&
            !searchTag.current
          ) {
            return (
              regexName.current.test(firstName) ||
              regexName.current.test(lastName) ||
              regexName.current.test(firstName + " " + lastName)
            );
          } else {
            return tags.some((tag) => regexTag.current.test(tag));
          }
        })
      );
    } else {
      setStudents((prevStudents) => {
        if (filteredName.length !== prevStudents.length) {
          // When student changes length save a copy of the prev state to beforeStudentsChange.current
          beforeStudentsChange.current = [...prevStudents];
        }
        return filteredName;
      });
    }
  };

  return (
    <SearchBarStyled
      type="text"
      placeholder={placeholder}
      onChange={handleFilter}
    />
  );
};

export default NameSearchBar;
