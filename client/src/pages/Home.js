import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Task, CreateTask } from '../components';

const Container = styled.div`
  padding: 15px;
  align-items: ${(props) => (props.center ? 'center' : 'none')};
  max-width: 500px;
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

// const Temp = styled.div``;

function Home ({ showLogin, setShowLogin, isLogin }) {
  const [createForm, setCreateForm] = useState(false);
  const [current, setCurrent] = useState(Date.now());
  const tasks = [
    {
      id: 1,
      tag: 'Work',
      task: '일해야됨',
      deadline: '2022-02-22T22:22',
      check: false
    },
    {
      id: 2,
      tag: 'Life',
      task: '쉬어야됨',
      deadline: '2022-02-22T22:22',
      check: true
    }
  ];
  //! 서버에 요청하기 전에 create 폼을 완성한 후 보내야함
  //! create 폼은 state로 구성해서 휘발될 수 있도록
  const handleCreateTask = () => {
    console.log('새거 만들거임');
    setCreateForm(true);
  };

  useEffect(async () => {
    const res1 = await axios.get(`http://localhost:4000/task/list?check=${false}&time=${true}`, {
      withCredentials: true
    });
    const res2 = await axios.get(`http://localhost:4000/task/list?check=${true}&time=${false}`, {
      withCredentials: true
    })
    const res3 = await axios.get(`http://localhost:4000/task/list?check=${false}&time=${false}`, {
      withCredentials: true
    })
  }, [tasks]);

  return (
    <>
      {isLogin ? (
        <Container>
          <Subject>할 일 목록임</Subject>
          <div>
          {tasks.map((task) => {
            return <Task key={task.id} list={task} />;
          })}
<<<<<<< HEAD
          </div>
          task들을 하나의 board로 묶어 스크롤 할수있게? (optional) 무한스크롤
          {createForm
=======
          task들을 하나의 board로 묶어 스크롤 할수있게?
          <br />
          (optional) 무한스크롤 또는 더보기 기능
          {createForm
>>>>>>> code/dev
            ? (
              <CreateTask setCreateForm={setCreateForm} />
              )
            : (
              <NewTask onClick={handleCreateTask}>+ 새 할일 추가</NewTask>
              )}
          <hr />
          <Subject>한 일 목록임</Subject>
          {/* <Task list={tasks} /> */}
          <Subject>시간초과임ㅅㄱ</Subject>
          {/* <Task list={tasks} /> */}
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
