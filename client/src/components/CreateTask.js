import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-width: 500px;
  min-height: 70px;
  margin-bottom: 5px;
`;

const Checkbox = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: ${(props) => (props.deactive ? '#ddd' : '#fff')};
  height: 20px;
  width: 20px;
  border-radius: 8px;
  margin: 5px;
  ::after {
    border: solid #fff;
    border-width: 0 3px 3px 0;
    content: "";
    display: none;
    height: 45%;
    left: 35%;
    position: relative;
    top: 15%;
    transform: rotate(45deg);
    width: 20%;
  }
  :checked {
    background: ${(props) => (props.deactive ? '#aaa' : '#505bf0')};
  }
  :checked::after {
    display: block;
  }
`;

const InfoWrapper = styled.div`
  background-color: #ccc;
  height: 30px;
  overflow: hidden;
`;

const TaskInput = styled.input``;

const DateInput = styled.input``;

const TagInput = styled.div`
  display: inline-block;
  margin-left: 5px;
  background-color: #eee;
  color: ${(props) =>
    props.tag === 'Work' ? 'red' : props.tag === 'Life' ? 'blue' : 'black'};
  cursor: pointer;
`;

const ButtonDiv = styled.div`
  float: right;
  max-width: auto;
  margin-right: 30px;

  :hover {
    color: blue;
    cursor: pointer;
  }
`;

function CreateTask ({ setCreateForm }) {
  const [inputValue, setInputValue] = useState({
    tag: 'Work',
    task: '',
    deadline: '',
    check: false
  });

  const handleInputValue = (key) => (e) => {
    setInputValue({ ...inputValue, [key]: e.target.value });
  };
  const handleTagClick = () => (e) => {
    const text = e.target.textContent;

    if (text === 'Work') setInputValue({ ...inputValue, tag: 'Life' });
    if (text === 'Life') setInputValue({ ...inputValue, tag: 'Work' });
  };

  const handleConfirm = () => {
    // 요청 바디는 task, tag, deadline, 해더에 cookie
    const { task, tag, deadline } = inputValue;
    const url = 'https://localhost:4000/task/';
    axios
      .post('https://localhost:4000/task/create', {
        task,
        tag,
        deadline
      })
      .then(() => {
        axios
          .get('https://localhost:4000/task/list')
          .then((res) => {})
          .catch();
        setCreateForm(false);
        setInputValue({
          tag: 'Work',
          task: '',
          deadline: '',
          check: false
        });
      })
      .catch();
  };
  const handleCancel = () => {
    setCreateForm(false);
  };
  return (
    <Container>
      <InfoWrapper>
        <Checkbox
          type='checkbox'
          // onChange={handleInputValue("check")}
          checked={inputValue.check}
          deactive
        />
        <TaskInput
          onChange={handleInputValue('task')}
          value={inputValue.task || ''}
        />
        <DateInput
          type='datetime-local'
          onChange={handleInputValue('deadline')}
          value={inputValue.deadline || ''}
        />
        {/* deadline 형식: 2022-22-22T22:22 */}
      </InfoWrapper>
      <InfoWrapper>
        <TagInput onClick={handleTagClick()} tag={inputValue.tag}>
          {inputValue.tag}
        </TagInput>
        <ButtonDiv onClick={handleCancel}>취소</ButtonDiv>
        <ButtonDiv onClick={handleConfirm}>작성완료</ButtonDiv>
        {/* 작성완료 눌렀을 때 서버로 요청하는 코드 작성 */}
      </InfoWrapper>
    </Container>
  );
}

export default CreateTask;
