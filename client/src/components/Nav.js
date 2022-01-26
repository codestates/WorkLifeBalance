import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Body = styled.div`
  display: flex;
  position: absolute;
  left: 10px;
  top: 100px;
  border: 1px solid black;
  border-radius: 0 0 5px 5px;
  width: 140px;
  ${(props) => (props.navOn ? '' : 'height: 0px')}
  transition: all ease 1s 0s;
  min-height: 30vh;
  max-height: 70vh;
  background-color: #fff;
  box-shadow: 0 0 3px black;
  z-index: 1;
  /* &:before,
  &:after {
    transition: transform cubic-bezier(0.77, 0, 0.175, 1) 0.8s;
    transform: translateX(0%) translateY(-100%);
  } */
`;

const Button = styled.div`
  --size: 28px;
  display: flex;
  flex-direction: column;
  position: fixed;
  padding: 3px;
  left: 20px;
  top: 90px;
  /* border: 2px solid grey; */
  border-radius: 5px;
  height: var(--size);
  width: var(--size);
  text-align: center;
  color: white;
  background-color: #333;
  box-shadow: 0 0 3px 1px #333;
  cursor: pointer;
  z-index: 2;
  :hover {
    background-color: #555;
    box-shadow: 0 0 3px 1px #555;
  }
  .__line {
    height: 2px;
    width: var(--size);
    display: block;
    background-color: white;
    margin: 2px 0px;
    transition: transform 0.2s ease, background-color 0.5s ease;
    ${(props) =>
      props.navOn ? 'transform: translateX(0px) rotate(-45deg);' : ''}
  }
  .__line-left {
    margin-top: 8px;
    margin-bottom: 1px;
    width: 14px;
    ${(props) =>
      props.navOn ? 'transform: translateX(2px) rotate(45deg);' : ''}
  }
  .__line-right {
    width: 14px;
    margin-top: 1px;
    align-self: flex-end;
    ${(props) =>
      props.navOn ? 'transform: translateX(-2px) rotate(45deg);' : ''}
  }
`;

const Container = styled.nav`
  flex: 1 0 auto;
  /* min-width: 120px;
  max-width: 200px; */
  padding: 0px;

  /* transition: transform cubic-bezier(0.77, 0, 0.175, 1) 0.8s; */
  /* transform: translateX(0%) translateY(-100%); */
  ol {
    list-style-type: none;
    padding: 3px;
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
    text-decoration: none;
    color: black;
    :hover {
      color: #aaa;
      box-shadow: 0 0 3px black inset;
    }
  }
`;

function Nav ({ navOn, setNavOn }) {
  const handleButtonClick = () => {
    setNavOn(!navOn);
  };

  return (
    <>
      <Button navOn={navOn} onClick={handleButtonClick}>
        <span class='__line __line-left' />
        <span class='__line' />
        <span class='__line __line-right' />
      </Button>
      {navOn
        ? (
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
          )
        : null}
    </>
  );
}

export default Nav;
