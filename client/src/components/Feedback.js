import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import { ClickToEdit as CTE } from '.';
import url from '../urlSetup';

const Container = styled.div`
  border: 1px solid green; // 테스트용 테두리
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  div {
    align-self: center;
  }
`;

const Filter = styled.input`
  width: 130px;
`;

const today = new Date();
const month = today.getMonth() + 1;

function Feedback () {
  const [day, setDay] = useState(
    `${today.getFullYear()}-${
      month.toString().length === 1 ? `0${month}` : `${month}`
    }-${today.getDate()}`
  );

  const handleClick = (e) => {
    console.log(e.target.value);
  };

  const handleChangeDate = async (e) => {
    await setDay(e.target.value);
    axios.get(`${url}/feedback/info?d=${day}`, { withCredentials: true });
  };

  return (
    <Container>
      <span>
        Filter:{' '}
        <Filter
          type='date'
          onChange={handleChangeDate}
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
