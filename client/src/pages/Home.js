
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Task, CreateTask } from '../components';
import url from '../urlSetup';
import '@fortawesome/fontawesome-free/js/all.js';

const Container = styled.div`
  padding: 15px;
  align-items: ${(props) => (props.center ? 'center' : 'none')};
  width: 45rem;
  min-height: 70vh;
  border: solid 0.1rem rgb(80, 91, 239);
  hr {
    margin: 30px 0px;
  }
`;
const Subject = styled.h2`
  margin: 2px;
`;

const NewTask = styled.div`
  opacity: 0;
  /* margin-left: 10px; */
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
  border: solid 0.1rem rgb(80, 91, 239);
  scroll-behavior: smooth;
`;

const Div = styled.div`
`;

const Bar = styled.div`
  background-color: black;
  height: 0.1rem;
  margin-bottom: 2rem;
`;

const Head = styled.h2`
  display: flex;
`;
// const Temp = styled.div``;

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
  const x = new Date();
  const [timer, setTimer] = useState(x.toLocaleTimeString());

  const add = [
    {
      id: 1,
      tag: 'Work',
      task: '일해야됨',
      time: '2022-02-22T22:22',
      check: false
    },
    {
      id: 2,
      tag: 'Life',
      task: '쉬어야됨',
      time: '2022-02-22T22:22',
      check: true
    },
    {
      id: 3,
      tag: 'Life',
      task: '쉬어야됨',
      time: '2022-02-22T22:22',
      check: true
    },
    {
      id: 4,
      tag: 'Life',
      task: '쉬어야됨',
      time: '2022-02-22T22:22',
      check: true
    },
    {
      id: 5,
      tag: 'Life',
      task: '쉬어야됨',
      time: '2022-02-22T22:22',
      check: true
    }
  ];
  //! 서버에 요청하기 전에 create 폼을 완성한 후 보내야함
  //! create 폼은 state로 구성해서 휘발될 수 있도록
  const handleCreateTask = () => {
    console.log("새거 만들거임");
    setCreateForm(true);
  };

  const handleTarget1 = async ([entry], observer) => {
    if (entry.intersectionRatio === 1) {
      console.log(entry.intersectionRatio);
      // const res1 = await axios.get(`${url}/task/list?check=0&time=1&index=${idx1}`, {
      //   withCredentials: true
      // });
      // setTasks([...tasks].concat([...res1.data]));
      setIdx1(idx1 + 5);
      setTasks([...tasks].concat(add));
      observer.unobserve(lastRef1.current);
    }
  };

  const handleTarget2 = async ([entry], observer) => {
    if (entry.intersectionRatio === 1) {
      console.log(entry.intersectionRatio);
      // const res1 = await axios.get(`${url}/task/list?check=1&time=0&index=${idx2}`, {
      //   withCredentials: true
      // });
      // setComplete([...complete].concat([...res1.data]));
      setIdx2(idx2 + 5);
      setComplete([...complete].concat(add));
      observer.unobserve(lastRef2.current);
    }
  };

  const handleTarget3 = async ([entry], observer) => {
    if (entry.intersectionRatio === 1) {
      console.log(entry.intersectionRatio);
      // const res1 = await axios.get(`${url}/task/list?check=0&time=0&index=${idx3}`, {
      //   withCredentials: true
      // });
      // setUncomplete([...uncomplete].concat([...res1.data]));
      setIdx3(idx3 + 5);
      setUncomplete([...uncomplete].concat(add));
      observer.unobserve(lastRef3.current);
    }
  };

  useEffect(async () => {
    const observer1 = new IntersectionObserver(handleTarget1, { root: taskRef.current, threshold: 1.0 });
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
          {createForm
            ? (
              <CreateTask setCreateForm={setCreateForm} />
              )
            : (
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
