import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #ccc;
  min-width: 500px;
  min-height: 85px;
`;

const Checkbox = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: #fff;
  height: 20px;
  width: 20px;
  border-radius: 8px;
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
    background: #505bf0;
  }
  :checked::after {
    display: block;
  }
`;

const InfoDiv = styled.div`
  display: inline-block;
  color: ${(props) =>
    props.tag === 'Work' ? 'red' : props.tag === 'Life' ? 'blue' : 'black'};
`;
const Deadline = styled.input``;
const Modify = styled.div`
  :hover {
    color: blue;
    cursor: pointer;
  }
`;

function Task ({ add, list }) {
  // const [] = useState("")
  // const tasks = [
  //     {
  //       tag: "work",
  //       task: "일해야됨",
  //       deadline: "",
  //       check: false,
  //     },
  //     {
  //       tag: "life",
  //       task: "쉬어야됨",
  //       deadline: "2021-01-01 13:33",
  //       check: true,
  //     },
  //   ];
  const handleValue = (key) => (e) => {};

  return list.map((ele, idx) => {
    return (
      // checked={handleValue("checked")}
      <Container key={idx}>
        <Checkbox type='checkbox' checked={ele.check} />
        <InfoDiv>{ele.task}</InfoDiv>
        <InfoDiv>{ele.deadline}</InfoDiv>
        <InfoDiv tag={ele.tag}>{ele.tag}</InfoDiv>
        {/* <input type="date" />
        <input type="time" /> */}

        <Modify>수정</Modify>
        {add ? <div>+ 추가기능임</div> : null}
        {/* 작업, 날짜, 태그, 수정 및 삭제 */}
      </Container>
    );
  });
}

export default Task;
