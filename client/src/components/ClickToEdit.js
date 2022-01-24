import axios from "axios";
import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import url from "../urlSetup";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  cursor: pointer;
`;

const ContentInput = styled.textarea``;

const Confirm = styled.button`
  width: 100px;
  align-self: right;
`;

function ClickToEdit({ day, setDay }) {
  const contentInput = useRef(null);
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState("샘플메시지입니다.");

  const handleEdit = async () => {
    await setEdit(true);
    contentInput.current.focus();
  };

  const handleConfirm = () => {
    if (content.trim() !== "") {
      axios.post(`${url}/feedback/update`, {}, { withCredentials: true });
      setEdit(false);
    }
    contentInput.current.focus();
  };

  const handleEnter = (e) => {
    // const key = e.key;
    if (e.key === "Enter" && e.ctrlKey) handleConfirm();
  };

  const handleInputValue = (key) => (e) => {
    if (key === "content") setContent(e.target.value);
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
      {edit ? (
        <Container>
          <ContentInput
            ref={contentInput}
            onChange={handleInputValue("content")}
            value={content}
            onKeyDown={handleEnter}
          />
          <Confirm onClick={handleConfirm}>작성완료(Ctrl + Enter)</Confirm>
        </Container>
      ) : (
        <Container>
          <Content onClick={handleEdit}>{content}</Content>
        </Container>
      )}
    </>
  );
}
export default ClickToEdit;
