import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ClickToEdit as Cte } from ".";
import url from "../urlSetup";
import color from "../colorSetup";

const Container = styled.div`
  /* border: 1px solid green; // 테스트용 테두리 */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-height: 350px;
  div {
    align-self: center;
  }
`;

const Filter = styled.input`
  margin: 7px;
  padding: 4px 4px 4px 10px;
  width: 130px;
  height: 22px;
  /* outline: none; */
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  background-color: ${color.green01};
  ::-webkit-calendar-picker-indicator {
    background-color: ${color.green02};
    border-radius: 3px;
    cursor: pointer;
    :hover {
      background-color: ${color.green03};
    }
  }
`;

const today = new Date();
const month = today.getMonth() + 1;

function Feedback() {
  const [day, setDay] = useState(
    `${today.getFullYear()}-${
      month.toString().length === 1 ? `0${month}` : `${month}`
    }-${today.getDate()}`
    // 2022-02-22
  );
  const [content, setContent] = useState("불러오는 중..");

  const handleChangeDate = async (e) => {
    if (e.target.value === "") return;
    await setDay(e.target.value);
    // ? day state가 변경되지 않고 넘어가는 문제 -> Blur처리 또는 setTimeout
    // ! useEffect의 활용
  };

  const handleBlur = async () => {
    const modified = day.split("-").join(".");
    await axios
      .get(`${url}/feedback/info?d=${modified}`, {
        withCredentials: true,
      })
      .then((res) => {
        setContent(res.data.data.content);
      })
      .catch(() => {
        setContent("일일 자가 피드백 내용을 입력해주세요\n'^'");
      });
  };

  useEffect(() => {
    handleBlur();
  }, [day]);

  return (
    <Container>
      <span>
        <Filter
          type="date"
          onChange={handleChangeDate}
          value={day}
          defaultValue={day}
        />
      </span>
      <Cte
        day={day}
        setDay={setDay}
        content={content}
        setContent={setContent}
      />
    </Container>
  );
}

export default Feedback;
