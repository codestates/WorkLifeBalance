import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import { ClickToEdit as CTE } from '.';
import url from '../urlSetup';

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
  background-color: seagreen;
  ::-webkit-calendar-picker-indicator {
    background-color: #62b270;
    border-radius: 3px;
    cursor: pointer;
    :hover {
      background-color: #acd8a7;
    }
  }
`;

const today = new Date();
const month = today.getMonth() + 1;

function Feedback () {
  const [day, setDay] = useState(
    `${today.getFullYear()}-${
      month.toString().length === 1 ? `0${month}` : `${month}`
    }-${today.getDate()}`
    // 2022-02-22
  );

  const handleClick = (e) => {
    console.log(e.target.value);
  };

  const handleChangeDate = async (e) => {
    if (e.target.value === '') return;
    await setDay(e.target.value);
    // ? day state가 변경되지 않고 넘어가는 문제 -> Blur처리 또는 setTimeout
  };

  const handleBlur = async () => {
    const modified = day.split('-').join('.');
    await axios.get(`${url}/feedback/info?d=${modified}`, {
      withCredentials: true
    });
  };

  return (
    <Container>
      <span>
        <Filter
          type='date'
          onChange={handleChangeDate}
          onBlur={handleBlur}
          value={day}
          onClick={handleClick}
          defaultValue={day}
        />
      </span>
      <CTE day={day} setDay={setDay} />
    </Container>
  );
}

export default Feedback;
