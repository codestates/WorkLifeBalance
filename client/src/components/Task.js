import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import url from "../urlSetup";

const Container = styled.div`
  min-width: 500px;
  min-height: 70px;
  margin-bottom: 5px;
`;

const Checkbox = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: ${(props) => (props.deactive ? "#ddd" : "#fff")};
  height: 20px;
  width: 20px;
  border-radius: 8px;
  margin: 5px;
  ::after {
    border: solid #fff;
    border-width: 0 3px 3px 0;
    content: "";
    display: none;
    height: 45%;
    left: 35%;
    position: relative;
    top: 15%;
    transform: rotate(45deg);
    width: 20%;
  }
  :checked {
    background: ${(props) => (props.deactive ? "#aaa" : "#505bf0")};
  }
  :checked::after {
    display: block;
  }
`;

const InfoWrapper = styled.div`
  background-color: #ccc;
  height: 30px;
  overflow: hidden;
`;

const TaskDiv = styled.div`
  display: inline-block;
  text-decoration: ${(props) => (props.check ? "line-through" : "none")};
  /* float: left; */
  height: 20px;
  margin-left: 5px;
`;

const DateDiv = styled.div`
  float: right;
  margin: 5px;
`;

const TagDiv = styled.div`
  display: inline-block;
  margin-left: 5px;
  color: ${(props) =>
    props.tag === "Work" ? "red" : props.tag === "Life" ? "blue" : "black"};
`;

// const Deadline = styled.input``;

const Modify = styled.div`
  float: right;
  max-width: auto;
  margin-right: 30px;

  :hover {
    color: blue;
    cursor: pointer;
  }
`;

const TaskInput = styled.input``;

const DateInput = styled.input``;

const TagInput = styled.div`
  display: inline-block;
  margin-left: 5px;
  background-color: #eee;
  color: ${(props) =>
    props.tag === "Work" ? "red" : props.tag === "Life" ? "blue" : "black"};
  cursor: pointer;
`;

function Task({ list }) {
  const [modify, setModify] = useState(false);
  const [inputValue, setInputValue] = useState(list);
  //! 해당 상태는 렌더링시 서버로부터 받아와 갱신되어야함
  useEffect(() => {
    // ajax 요청
  }, []);

  const handleInputValue = (key) => (e) => {
    setInputValue({ ...inputValue, [key]: e.target.value });
  };
  const handleChangeCheck = (e, obj) => {
    // # check 상태 변경 코드
    setInputValue({ ...inputValue, check: e.target.checked });
    // # check 서버 요청
    console.log("check sending...");
    const { id, check } = obj;
    // ! 더미데이터로 요청테스트 해보아야함
    axios
      .post(`${url}/task/check`, { id, check }, { withCredentials: true })
      .then((res) => console.log("체크 전송완료됨!"))
      .catch((err) => console.log(err));

    // console.log(e);
  };

  const handleModify = (key) => (e) => {
    //! 서버로 변경된 정보를 보내야함
    const { id, task, tag, deadline } = list;
    if (key === "ok") {
      axios
        .post(
          `${url}/task/update`,
          {
            id,
            task,
            tag,
            deadline,
          },
          { withCredentials: true }
        )
        .then(() => {
          setModify(false);
        })
        .catch(() => {
          setModify(true);
        });
    } else if (key === "mod") setModify(true);
  };

  const handleTagClick = () => (e) => {
    const text = e.target.textContent;

    if (text === "Work") setInputValue({ ...inputValue, tag: "Life" });
    if (text === "Life") setInputValue({ ...inputValue, tag: "Work" });
  };
  //* task = {
  //*   id: 1,
  //*   tag: "Work",
  //*   task: "일해야됨",
  //*   deadline: "2022-02-22 22:22",
  //*   check: false,
  //* }
  // console.log(task);
  // useEffect(() => {}, [inputValue]);

  const [dateInfo, timeInfo] = list.deadline.split("T");

  return (
    <>
      {modify ? (
        <Container>
          <InfoWrapper>
            <Checkbox
              type="checkbox"
              // onChange={handleInputValue("check")}
              checked={inputValue.check}
              deactive
            />
            <TaskInput
              onChange={handleInputValue("task")}
              value={inputValue.task || ""}
            />
            <DateInput
              type="datetime-local"
              onChange={handleInputValue("deadline")}
              value={inputValue.deadline || ""}
            />
            {/* deadline 형식: 2022-22-22T22:22 */}
          </InfoWrapper>
          <InfoWrapper>
            <TagInput onClick={handleTagClick()} tag={inputValue.tag}>
              {inputValue.tag}
            </TagInput>
            <Modify onClick={handleModify("ok")}>적용</Modify>
            {/* 적용 눌렀을 때 변경하는 코드 작성 */}
          </InfoWrapper>
        </Container>
      ) : (
        <Container>
          <InfoWrapper>
            <Checkbox
              type="checkbox"
              onChange={(e) =>
                handleChangeCheck(e, { id: list.id, check: list.check })
              }
              checked={inputValue.check}
            />
            <TaskDiv check={inputValue.check}>{list.task}</TaskDiv>
            <DateDiv align="right">
              {dateInfo}&nbsp;{timeInfo}
            </DateDiv>
          </InfoWrapper>
          <InfoWrapper>
            <TagDiv tag={list.tag}>{list.tag}</TagDiv>
            <Modify onClick={handleModify("mod")}>수정(img)</Modify>
          </InfoWrapper>
        </Container>
      )}
    </>
  );
}

export default Task;
