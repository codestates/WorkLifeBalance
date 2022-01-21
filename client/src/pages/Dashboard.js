import styled from 'styled-components';

const Container = styled.div`
  margin: 12px;
`;
const Title = styled.h2``;
const Bar = styled.progress`
  width: 400px;
  height: 50px;
`;
function Dashboard () {
  return (
    <Container>
      날씨에 따른 일일 메시지 출력?
      <Title>대시보드</Title>
      <Bar value='40' max='100' low optimum high />
    </Container>
  );
}

export default Dashboard;
