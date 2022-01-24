import axios from 'axios';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import url from '../urlSetup';
import { Feedback } from '../components';

const Container = styled.div`
  margin: 12px;
  text-align: center;
`;
const Title = styled.h2``;
const Bar = styled.progress`
  width: 400px;
  height: 50px;
  -webkit-appearance: none;
  ::-webkit-progress-bar {
    background-color: #5768ff;
    border-radius: 5px;
  }
  ::-webkit-progress-value {
    background-color: #ff6767;
    border-radius: 5px 0 0 5px;
  }
`;

function Dashboard () {
  const [rateInfo, setRateInfo] = useState({
    work: 2,
    life: 1,
    check: 5,
    timeout: 1
  });
  useEffect(() => {
    axios.get(`${url}/task/info`, { withCredentials: true }).then((res) => {
      //! something for informations

      setRateInfo(res.data);
      // res.data.
    });
  }, []);

  const { work, life, check, timeout } = rateInfo;
  return (
    <Container>
      {/* 날씨에 따른 일일 메시지 출력? */}
      <Title>Work Life Balance</Title>
      <Bar value={work} max={work + life} />
      <Title>Done / Time Out Rate</Title>
      <Bar value={timeout} max={check + timeout} />
      <Title>Daily Feedback</Title>
      <Feedback />
    </Container>
  );
}

export default Dashboard;
