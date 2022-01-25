import axios from 'axios';
import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import url from '../urlSetup';

const Container = styled.div`
  margin: 0px 5px 5px 5px;
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  min-width: 400px;
  min-height: 280px;
  border-radius: 10px;
  border: ${(props) => (props.edit ? 'none' : '1px dashed black')};
  align-items: flex-end;
  cursor: ${(props) => (props.edit ? 'inherit' : 'pointer')};
  :hover {
    background-color: ${(props) => (props.edit ? 'inherit' : '#eee')};
  }
`;

const Content = styled.div`
  margin: 12px;
`;

const ContentInput = styled.textarea`
  padding: 10px;
  font-size: 1.5rem;
  border-radius: 10px;
  width: 380px;
  height: 260px;
`;

const Confirm = styled.button`
  margin: 10px;
  padding: 6px;
  width: 180px;
  flex: 1 0 0;
  background-color: seagreen;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  /* align-self: right; */
  :hover {
    background-color: #62b270;
    /* color: grey; */
  }
  :active {
    background-color: #0a634a;
    box-shadow: none;
    color: white;
  }
`;

function ClickToEdit ({ day, setDay }) {
  const contentInput = useRef(null);
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState('샘플메시지입니다.');

  const handleEdit = async () => {
    await setEdit(true);
    contentInput.current.focus();
  };

  const handleConfirm = () => {
    if (content.trim() !== '') {
      axios.post(
        `${url}/feedback/update`,
        { day, content },
        { withCredentials: true }
      );
      setEdit(false);
    }
    contentInput.current.focus();
  };

  const handleEnter = (e) => {
    // const key = e.key;
    if (e.key === 'Enter' && e.ctrlKey) handleConfirm();
  };

  const handleInputValue = (key) => (e) => {
    if (key === 'content') {
      setContent(e.target.value);
      console.log('입력');
    }
  };

  useEffect(() => {
    axios
      .get(`${url}/feedback/info?d=${day}`, { withCredentials: true })
      .then((res) => {
        // res.data.content
        // res.data.day
        setContent(res.data.content);
        setDay(res.data.day);
      });
  }, []);
  return (
    <>
      {edit
        ? (
          <Container edit={edit}>
            <ContentInput
              ref={contentInput}
              onChange={handleInputValue('content')}
              value={content}
              onKeyDown={handleEnter}
            />
            <Confirm onClick={handleConfirm}>작성완료(Ctrl + Enter)</Confirm>
          </Container>
          )
        : (
          <Container edit={edit} onClick={handleEdit}>
            <Content>{content}</Content>
          </Container>
          )}
    </>
  );
}
export default ClickToEdit;
