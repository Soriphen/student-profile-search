import styled from "styled-components";

const StudentStyled = styled.div`
  text-align: left;
  padding: 10px 25px;
  border-bottom: 1px solid lightgray;
  @media (max-width: 670px) {
    flex-direction: column;
  }
`;

const StudentPicStyled = styled.img`
  border: 1px solid grey;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  position: relative;
  top: 10px;
  @media (max-width: 670px) {
    top: 0;
    margin: 15px auto;
  }
`;

const StudentNameStyled = styled.h1`
  font-weight: 700;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  @media (max-width: 670px) {
    justify-content: center;
    flex-direction: column;
  }
`;

const StudentInfoStyled = styled.div`
  margin-left: 30px;
  width: 100%;
  @media (max-width: 670px) {
    margin: 0;
    text-align: center;
  }
`;

const StudentDetailsStyled = styled.p`
  margin: 0;
  margin-left: 22px;
  @media (max-width: 670px) {
    margin-left: 0;
  }
`;

const StudentGradesStyled = styled.p`
  display: flex;
  margin-bottom: 0;
  @media (max-width: 670px) {
    justify-content: center;
  }
`;

const StudentTagStyled = styled.input`
  border: none;
  border-bottom: 1px solid gray;
  margin: 15px 0 15px 20px;
  padding-bottom: 7px;
  padding-left: 5px;
  padding-top: 7px;
  @media (max-width: 670px) {
    margin-left: 0;
    width: calc(60% + 50px);
  }
  @media (max-width: 400px) {
    width: 100%;
  }
`;

const StudentTagBtnStyled = styled.button`
  margin-left: ${(props) =>
    props.tagIndex === 0
      ? "23px"
      : "5px"}; // This is to make the first tag have a margin-left of 23px
  margin-top: 10px;
  @media (max-width: 670px) {
    margin-left: ${(props) => (props.tagIndex === 0 ? "0" : "5px")};
  }
`;

export {
  StudentStyled,
  StudentPicStyled,
  StudentInfoStyled,
  StudentTagStyled,
  StudentTagBtnStyled,
  StudentNameStyled,
  StudentDetailsStyled,
  StudentGradesStyled
};
