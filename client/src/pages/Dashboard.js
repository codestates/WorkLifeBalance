import axios from "axios";
import styled from "styled-components";
import { useState, useEffect } from "react";
import url from "../urlSetup";
import { Feedback } from "../components";

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
    box-shadow: 1px 0 2px 2px white, 1px 0 1px 1px white inset;
  }
`;

const IsNothing = styled.div`
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  width: 400px;
  height: 40px;
  padding-top: 10px;
  text-align: center;
  font-size: 1.5rem;
  border-radius: 5px;
  background-color: #ddd;
  align-self: center;
  img {
    width: 40px;
  }
`;

function Dashboard() {
  const [rateInfo, setRateInfo] = useState({
    work: 2,
    life: 1,
    check: 5,
    timeout: 1,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${url}/task/info`, { withCredentials: true }).then((res) => {
      setRateInfo(res.data.data);
      setIsLoading(false);
    });
  }, []);

  const { work, life, check, timeout } = rateInfo;
  return (
    <Container>
      {/* 날씨에 따른 일일 메시지 출력? */}
      <hr />
      <Title>Work Life Balance</Title>
      {isLoading ? (
        <IsNothing>
          <img src={`${process.env.PUBLIC_URL}/loading-blank.gif`} />
        </IsNothing>
      ) : life === 0 || work === 0 ? (
        <IsNothing>Not enough information!</IsNothing>
      ) : (
        <Bar
          value={work}
          max={work + life}
          data-label={`${Math.floor((life / (work + life)) * 100)}%`}
          data-label2={`${Math.floor((work / (work + life)) * 100)}%`}
        />
      )}

      <div className="info">
        Work: {work} / Life: {life}
      </div>
      <Title>Done / Time Out Rate</Title>
      {isLoading ? (
        <IsNothing>
          <img src={`${process.env.PUBLIC_URL}/loading-blank.gif`} />
        </IsNothing>
      ) : check === 0 || timeout === 0 ? (
        <IsNothing>Not enough information!</IsNothing>
      ) : (
        <Bar
          value={timeout}
          max={check + timeout}
          data-label={`${Math.floor((check / (check + timeout)) * 100)}%`}
          data-label2={`${Math.floor((timeout / (check + timeout)) * 100)}%`}
        />
      )}

      <div className="info">
        Done: {check} / Timeout: {timeout}
      </div>
      <hr />
      <Title>Daily Feedback</Title>
      <Feedback />
    </Container>
  );
}

export default Dashboard;
