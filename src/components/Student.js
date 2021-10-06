import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  StudentStyled,
  StudentPicStyled,
  StudentInfoStyled,
  StudentTagStyled,
  StudentTagBtnStyled,
  StudentNameStyled,
  StudentDetailsStyled,
  StudentGradesStyled
} from "./StudentStyles";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const PlusIcon = <FontAwesomeIcon icon={faPlus} />;
const MinusIcon = <FontAwesomeIcon icon={faMinus} />;

const StudentAverage = ({ student, isClicked }) => {
  return (
    <StudentDetailsStyled>
      {"Average: " +
        student.grades.reduce((average, currentVal, index, arr) => {
          average += parseInt(currentVal);
          if (index === arr.length - 1) {
            average = average / arr.length;
          }
          return average;
        }, 0) +
        "%"}
      {isClicked &&
        student.grades.map((value, index) => (
          <StudentGradesStyled className="mb-0 d-flex">
            Test {index + 1}: <span className="ms-4">{value}%</span>
          </StudentGradesStyled>
        ))}
    </StudentDetailsStyled>
  );
};

const StudentTag = ({ student, handleAddTag, handleRemoveTag }) => {
  return (
    <>
      {student.tags.map((tag, tagIndex) => (
        <OverlayTrigger
          key="grade-click"
          placement="bottom"
          overlay={
            <Tooltip id={`tooltip-grades`}>
              <span>
                Click to <strong>Remove</strong> tag
              </span>
            </Tooltip>
          }
        >
          <StudentTagBtnStyled
            className="btn btn-secondary"
            onClick={() => handleRemoveTag(tagIndex)}
            tagIndex={tagIndex}
          >
            {tag}
          </StudentTagBtnStyled>
        </OverlayTrigger>
      ))}
      {student.tags.length > 0 ? <br /> : null}
      <StudentTagStyled placeholder="Add a tag" onKeyDown={handleAddTag} />
    </>
  );
};

const Student = ({
  student,
  setStudents,
  students,
  studentIndex,
  searchTag,
  regexTag
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleAddTag = (e) => {
    /* A spread operator is necessary because re-renders don't happen even if the 
    state has changed due to the reference value of an array not being changed even 
    if you were to edit an item inside of it. Another thing I learned is that even with the spread operator,
    if this const were to be placed outside of this function, then it React would only re-render once for the first
    tag, but then it wouldn't re-render for the subsequent tags that would be entered until something else forces a re-render.
    Therefore this const must be placed in this function to force a re-render for each tag placement. */
    const studentsCopy = [...students];
    if (e.key === "Enter" && e.target.value !== "") {
      studentsCopy[studentIndex]["tags"].push(e.target.value);
      setStudents(studentsCopy); // Something new I learned is that React will only re-render if the state changes with something completely brand new. It can't be done by reference of the old state. Using a spread operator solves this problem.
      e.target.value = "";
    }
  };

  const handleRemoveTag = (tagIndex) => {
    let studentsCopy = [...students];
    studentsCopy[studentIndex]["tags"].splice(tagIndex, 1);

    if (searchTag.current) {
      // This handles the case when the user searches by tag and deletes the tag after students has been filtered.
      studentsCopy = studentsCopy.filter(({ tags }) => {
        return tags.some((tag) => regexTag.current.test(tag));
      });
    }
    setStudents(studentsCopy);
  };

  const handlePlusMinusClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <StudentStyled className="d-flex">
      <StudentPicStyled
        src={student.pic}
        alt={student.firstName + " " + student.lastName + "'s picture"}
      />
      <StudentInfoStyled>
        <StudentNameStyled>
          {student.firstName + " " + student.lastName}
          <OverlayTrigger
            key="grade-click"
            placement="bottom"
            overlay={
              <Tooltip id={`tooltip-grades`}>
                {isClicked ? (
                  <span>
                    Collapse <strong>grades</strong>
                  </span>
                ) : (
                  <span>
                    Expand <strong>grades</strong>
                  </span>
                )}
              </Tooltip>
            }
          >
            <button
              className="btn p-0 fs-2 text-muted"
              onClick={handlePlusMinusClick}
            >
              {isClicked ? MinusIcon : PlusIcon}
            </button>
          </OverlayTrigger>
        </StudentNameStyled>
        <StudentDetailsStyled>{"Email: " + student.email}</StudentDetailsStyled>
        <StudentDetailsStyled>
          {"Company: " + student.company}
        </StudentDetailsStyled>
        <StudentDetailsStyled>{"Skill: " + student.skill}</StudentDetailsStyled>
        <StudentAverage student={student} isClicked={isClicked} />
        <StudentTag
          className="d-flex"
          student={student}
          handleAddTag={handleAddTag}
          handleRemoveTag={handleRemoveTag}
        />
      </StudentInfoStyled>
    </StudentStyled>
  );
};

export default Student;
