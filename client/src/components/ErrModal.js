import styled from 'styled-components';

const Container = styled.div`
    position: fixed;
    height: 15rem;
    text-align: center;
    margin: 120px auto;
`;

const Button = styled.button`
    margin: 5px;
`;

const Canvas = styled.div`
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.4);
    display: grid;
    place-items: center;
`;

const View = styled.div.attrs(props => ({
  role: 'dialog'
}))`
    border-radius: 5px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 500px;
    height: 300px;

`;

function ErrModal ({ message, show, setShow }) {
  const handleClick = () => {
    setShow(!show);
  }
  return (
    <Container>
      <Canvas onClick={handleClick}>
        <View onClick={e => e.stopPropagation()}>
          <div> {message} </div>
          <Button onClick={handleClick}> 확인 </Button>
        </View>
      </Canvas>
    </Container>
  );
}

export default ErrModal;
