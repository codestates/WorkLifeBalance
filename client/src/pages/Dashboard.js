import axios from 'axios';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import url from '../urlSetup';
import { Feedback } from '../components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 50 0 auto;
  margin: 12px;
  /* padding: 5px; */
  text-align: center;
  align-items: auto;
  min-width: 500px;
  max-width: 800px;
  /* border: 1px solid blue; */
  .info {
    margin: 5px;
    margin-bottom: 12px;
    text-align: right;
  }

  hr {
    height: 3px;
    border: 0;
    margin: 0px;
    box-shadow: 0 3px 3px -3px black inset;
  }
`;

const Title = styled.h2`
  margin: 0px;
  padding: 12px;
`;

const Bar = styled.progress`
  /* margin: 5px; */
  width: 400px;
  height: 50px;

  align-self: center;
  display: inline-block;
  position: relative;

  /* position: relative; */
  -webkit-appearance: none;
  :before {
    content: attr(data-label);
    font-size: 1.5rem;
    position: absolute;
    top: 11px;
    right: 12px;
  }
  :after {
    content: attr(data-label2);
    font-size: 1.5rem;
    position: absolute;
    top: 11px;
    left: 12px;
  }
  ::-webkit-progress-bar {
    background-color: #5768ff;
    border-radius: 5px;
    box-shadow: 1px 0 1px 1px white inset;
  }
  ::-webkit-progress-value {
    background-color: #ff6767;
    border-radius: 5px 0 0 5px;
    /* border-right: 1px solid white; */
    box-shadow: 1px 0 2px 2px white, 1px 0 1px 1px white inset;
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

      setRateInfo(res.data.data);
      // res.data.
    });
  }, []);

  const { work, life, check, timeout } = rateInfo;
  return (
    <Container>
      {/* 날씨에 따른 일일 메시지 출력? */}
      <hr />
      <Title>Work Life Balance</Title>
      <Bar
        value={work}
        max={work + life}
        data-label={`${Math.floor((life / (work + life)) * 100)}%`}
        data-label2={`${Math.floor((work / (work + life)) * 100)}%`}
      />
      <div className='info'>
        Work: {work} / Life: {life}
      </div>
      <Title>Done / Time Out Rate</Title>
      <Bar
        value={timeout}
        max={check + timeout}
        data-label={`${Math.floor((check / (check + timeout)) * 100)}%`}
        data-label2={`${Math.floor((timeout / (check + timeout)) * 100)}%`}
      />
      <div className='info'>
        Done: {check} / Timeout: {timeout}
      </div>
      <hr />
      <Title>Daily Feedback</Title>
      <Feedback />
    </Container>
  );
}

export default Dashboard;
