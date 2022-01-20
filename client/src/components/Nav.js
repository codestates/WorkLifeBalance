import styled from 'styled-components';

const Body = styled.div`
  display: inline-block;
  flex: 1 0 125px;
  border-right: 1px solid black;
  min-width: 125px;
  max-width: 205px;
  height: 70vh;
`;

const Container = styled.nav`
  min-width: 120px;
  max-width: 200px;

  ol {
    list-style-type: none;
    padding-left: 15px;
  }
`;

const List = styled.li`
  margin: 10px 5px;
`;

function Nav () {
  return (
    <Body>
      <Container>
        <ol>
          <List>
            <a href='/'>Home</a>
          </List>
          <List>
            <a href='/dashboard'>Dashboard</a>
          </List>
          <List>
            <a href='/profile'>Profile</a>
          </List>
        </ol>
      </Container>
    </Body>
  );
}

export default Nav;
