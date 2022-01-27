import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Task, CreateTask } from "../components";
import url from "../urlSetup";
import "@fortawesome/fontawesome-free/js/all.js";
import axios from "axios";

const Container = styled.div`
  flex: 1 0 auto;
  padding: 15px;
  align-items: ${(props) => (props.center ? "center" : "none")};
  width: 45rem;
  min-height: 70vh;
  hr {
    margin: 30px 0px;
  }
`;
const Subject = styled.h2`
  margin: 2px;
`;

const NewTask = styled.div`
  opacity: 0.4;
  /* margin-left: 10px; */
  margin: 3px;
  border: 1px dashed grey;
  text-align: center;
  :hover {
    opacity: 1;
    cursor: pointer;
    transition: all ease 0.5s 0s;
  }
`;

const Box = styled.div`
  width: 45rem;
  height: 20rem;
  overflow-y: scroll;
  border-radius: 5px;
  scroll-behavior: smooth;
`;

const Div = styled.div``;

const Bar = styled.div`
  display: block;
  background-color: black;
  height: 0.1rem;
  width: 45rem;
  margin: 1rem 0 1rem 0;
`;

const Head = styled.h2`
  display: flex;
`;
// const Temp = styled.div``;

const Loading = styled.div`
  min-height: 25rem;
  border-radius: 5px;
  background-color: wheat;
`;

function Home({ showLogin, setShowLogin, isLogin }) {
  const [createForm, setCreateForm] = useState(false);
  const [current, setCurrent] = useState(Date.now());
  const taskRef = useRef(null);
  const completeRef = useRef(null);
  const uncompleteRef = useRef(null);
  const lastRef1 = useRef(null);
  const lastRef2 = useRef(null);
  const lastRef3 = useRef(null);
  const [complete, setComplete] = useState([]);
  const [uncomplete, setUncomplete] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [idx1, setIdx1] = useState(0);
  const [idx2, setIdx2] = useState(0);
  const [idx3, setIdx3] = useState(0);
  const [timer, setTimer] = useState("불러오는 중..");
  const x = new Date();

  const add = [
    {
      id: 1,
      tag: "Work",
      task: "일해야됨",
      time: "2022-02-22T22:22",
      check: false,
    },
    {
      id: 2,
      tag: "Life",
      task: "쉬어야됨",
      time: "2022-02-22T22:22",
      check: true,
    },
    {
      id: 3,
      tag: "Life",
      task: "쉬어야됨",
      time: "2022-02-22T22:22",
      check: true,
    },
    {
      id: 4,
      tag: "Life",
      task: "쉬어야됨",
      time: "2022-02-22T22:22",
      check: true,
    },
    {
      id: 5,
      tag: "Life",
      task: "쉬어야됨",
      time: "2022-02-22T22:22",
      check: true,
    },
  ];

  const handleCreateTask = () => {
    console.log("새거 만들거임");
    setCreateForm(true);
  };

  const handleTarget1 = async ([entry], observer) => {
    if (entry.intersectionRatio === 1) {
      console.log(entry.intersectionRatio);
      const res1 = await axios.get(
        `${url}/task/list?check=0&time=1&index=${idx1}`,
        {
          withCredentials: true,
        }
      );
      console.log(res1.data.data.tasks);
      if (res1.data.data.tasks.length > 0) {
        setIdx1(idx1 + res1.data.data.tasks.length);
        setTasks([...tasks].concat([...res1.data.data.tasks]));
      }
      // setTasks([...tasks].concat(add));
      observer.unobserve(lastRef1.current);
    }
  };

  const handleTarget2 = async ([entry], observer) => {
    if (entry.intersectionRatio === 1) {
      console.log(entry.intersectionRatio);
      const res1 = await axios.get(
        `${url}/task/list?check=1&time=0&index=${idx2}`,
        {
          withCredentials: true,
        }
      );
      if (res1.data.data.tasks.length > 0) {
        setIdx2(idx2 + res1.data.data.tasks.length);
        setComplete([...complete].concat([...res1.data.data.tasks]));
      }
      // setComplete([...complete].concat(add));
      observer.unobserve(lastRef2.current);
    }
  };

  const handleTarget3 = async ([entry], observer) => {
    if (entry.intersectionRatio === 1) {
      console.log(entry.intersectionRatio);
      const res1 = await axios.get(
        `${url}/task/list?check=0&time=0&index=${idx3}`,
        {
          withCredentials: true,
        }
      );
      if (res1.data.data.tasks.length > 0) {
        setIdx3(idx3 + res1.data.data.tasks.length);
        setUncomplete([...uncomplete].concat([...res1.data.data.tasks]));
      }
      // setUncomplete([...uncomplete].concat(add));
      observer.unobserve(lastRef3.current);
    }
  };

  useEffect(async () => {
    if (isLogin) {
      const res1 = await axios.get(
        `${url}/task/list?check=0&time=1&index=${idx1}`,
        {
          withCredentials: true,
        }
      );
      if (res1.data.data.tasks.length > 0) {
        setIdx3(idx1 + res1.data.data.tasks.length);
      }
      setTasks([...tasks].concat([...res1.data.data.tasks]));
      const res2 = await axios.get(
        `${url}/task/list?check=1&time=0&index=${idx2}`,
        {
          withCredentials: true,
        }
      );
      if (res2.data.data.tasks.length > 0) {
        setIdx3(idx2 + res2.data.data.tasks.length);
      }
      setComplete([...complete].concat([...res2.data.data.tasks]));
      const res3 = await axios.get(
        `${url}/task/list?check=0&time=0&index=${idx3}`,
        {
          withCredentials: true,
        }
      );
      if (res3.data.data.tasks.length > 0) {
        setIdx3(idx3 + res3.data.data.tasks.length);
      }
      setUncomplete([...uncomplete].concat([...res3.data.data.tasks]));
    }
  }, []);

  useEffect(async () => {
    const observer1 = new IntersectionObserver(handleTarget1, {
      root: taskRef.current,
      threshold: 1.0,
    });
    console.log(idx1);
    if (lastRef1.current) {
      observer1.observe(lastRef1.current);
    }
  }, [tasks]);

  useEffect(async () => {
    const observer2 = new IntersectionObserver(handleTarget2, {
      root: completeRef.current,
      threshold: 1.0,
    });

    if (lastRef2.current) {
      observer2.observe(lastRef2.current);
    }
  }, [complete]);

  useEffect(async () => {
    const observer3 = new IntersectionObserver(handleTarget3, {
      root: uncompleteRef.current,
      threshold: 1.0,
    });

    if (lastRef3.current) {
      observer3.observe(lastRef3.current);
    }
  }, [uncomplete]);

  useEffect(() => {
    if (isLogin) {
      setTimeout(() => {
        setTimer(x.toLocaleTimeString());
      }, 1000);
    }
  }, [timer]);

  return (
    <>
      {isLogin ? (
        <Container>
          <Head>{timer}</Head>
          <Subject>Task List</Subject>
          <Box ref={taskRef}>
            {tasks.map((task, idx) => {
              return <Task key={idx} list={task} />;
            })}
            <Div ref={lastRef1} />
          </Box>
          {createForm ? (
            <CreateTask
              setCreateForm={setCreateForm}
              setTasks={setTasks}
              setIdx1={setIdx1}
            />
          ) : (
            <NewTask onClick={handleCreateTask}>+ 새 할일 추가</NewTask>
          )}
          <hr />
          <Subject>Complete List</Subject>
          <Box ref={completeRef}>
            {/* <Task list={tasks} /> */}
            {complete.map((task, idx) => {
              return <Task key={idx} list={task} />;
            })}
            <Div ref={lastRef2} />
          </Box>
          <Bar />
          <Subject>Missing List</Subject>
          <Box ref={uncompleteRef}>
            {/* <Task list={tasks} /> */}
            {uncomplete.map((task, idx) => {
              return <Task key={idx} list={task} />;
            })}
            <Div ref={lastRef3} />
          </Box>
        </Container>
      ) : (
        <Container center>
          <div>목업 이미지 보여줘야함</div>
        </Container>
      )}
    </>
  );
}

export default Home;
