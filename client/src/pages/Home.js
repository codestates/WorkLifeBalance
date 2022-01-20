import styled from 'styled-components';
import { Task } from '../components';

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

function Home ({ showLogin, setShowLogin, isLogin }) {
  const tasks = [
    {
      tag: 'Work',
      task: '일해야됨',
      deadline: '2022-02-22 22:22',
      check: false
    },
    {
      tag: 'Life',
      task: '쉬어야됨',
      deadline: '2022-02-22 22:22',
      check: true
    }
  ];
  return (
    <>
      {isLogin
        ? (
          <Container>
            <Subject>할 일 목록임</Subject>
            <Task add list={tasks} />

            <br />
            <hr />
            <Subject>한 일 목록임</Subject>
            <Task add={false} list={tasks} />
            <Subject>시간초과임ㅅㄱ</Subject>
            <Task add={false} list={tasks} />
          </Container>
          )
        : (
          <Container center>
            <div>목업 이미지 보여줘야함</div>
          </Container>
          )}
    </>
  );
}

export default Home;
