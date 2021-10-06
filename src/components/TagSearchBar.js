import { useRef } from "react";
import { SearchBarStyled } from "./SearchBarStyles";
import useKeyPress from "../hooks/useKeyPress";

const TagSearchBar = ({
  students,
  setStudents,
  placeholder,
  searchName,
  searchTag,
  regexName,
  regexTag,
  filteredTag
}) => {
  const studentsCopy = useRef([...students]); // I use a useRef so as to keep a copy of students' first state before the re-render changes.
  const backSpacePress = useKeyPress("Backspace");
  const beforeStudentsChange = useRef();

  const handleFilter = (e) => {
    searchTag.current = e.target.value.replaceAll(/[\\]/gi, "\\\\");
    regexTag.current = new RegExp(`^(${searchTag.current})`, "i");
    if (searchName.current) {
      filteredTag = students.filter(({ tags }) => {
        /* This checks for each value in the array of tags and 
        runs a regex test on each one individually.
        This is done so that the user can search for students with multiple tags as
        long as they contain the searched for tag. */
        return tags.some((tag) => regexTag.current.test(tag));
      });
    } else {
      filteredTag = studentsCopy.current.filter(({ tags }) => {
        return tags.some((tag) => regexTag.current.test(tag));
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
        if (filteredTag.length !== prevStudents.length) {
          // When student changes length save a copy of the prev state to beforeStudentsChange.current
          beforeStudentsChange.current = [...prevStudents];
        }
        return filteredTag;
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

export default TagSearchBar;
