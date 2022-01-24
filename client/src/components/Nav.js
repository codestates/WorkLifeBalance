import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Body = styled.div`
  display: inline-block;
  flex: 1 0 125px;
  border-right: 1px solid black;
  min-width: 125px;
  max-width: 205px;
  height: 70vh;
  a {
    text-decoration: none;
    color: black;
  }
  a:hover {
    color: #aaa;
  }
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
  display: flex;
  height: 40px;
  margin: 10px 5px;

  a {
    flex: 1 0 0;
    border-bottom: 1px solid black;
    text-align: center;
    padding: 10px;
  }
`;

function Nav () {
  return (
    <Body>
      <Container>
        <ol>
          <List>
            <Link to='/'>Home</Link>
          </List>
          <List>
            <Link to='/dashboard'>Dashboard</Link>
          </List>
          <List>
            <Link to='/profile'>Profile</Link>
          </List>
        </ol>
      </Container>
    </Body>
  );
}

export default Nav;
