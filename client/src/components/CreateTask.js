import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import url from '../urlSetup';

const Container = styled.div`
  /* min-width: 500px;
  min-height: 70px; */
  height: 4rem;
  width: 44rem;
  margin-bottom: 5px;
  display: flex;
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
  box-sizing: border-box;
  background-color: #ccc;
  height: 3.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &.left {
    align-items: center;
    justify-content: center;
    border: solid 0.1rem rgb(80, 91, 239);
    border-radius: 10px 0 0 10px;
    flex: 1;
  }

  &.center {
    padding: 0.2rem;
    border: solid 0.1rem #ccc; 
    flex: 4;
  }

  &.right {
    align-items: right;
    justify-content: space-evenly;
    border: solid 0.1rem #ccc;
    border-radius: 0 10px 10px 0;
    flex: 1.7;
  }
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
    time: '',
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
    const { task, tag, time } = inputValue;

    axios
      .post(
        `${url}/task/create`,
        {
          task,
          tag,
          time
        },
        { withCredentials: true }
      )
      .then(() => {
        axios
          .get(`${url}/task/list`)
          .then((res) => {})
          .catch();
        setCreateForm(false);
        setInputValue({
          tag: 'Work',
          task: '',
          time: '',
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
      <InfoWrapper className='left'>
        {/* <Checkbox
          type='checkbox'
          // onChange={handleInputValue("check")}
          checked={inputValue.check}
          deactive
        /> */}
        <TagInput onClick={handleTagClick()} tag={inputValue.tag}>
          {inputValue.tag}
        </TagInput>

        {/* deadline 형식: 2022-22-22T22:22 */}
      </InfoWrapper>
      <InfoWrapper className='center'>
        <TaskInput
          onChange={handleInputValue('task')}
          value={inputValue.task || ''}
        />
        {/* 작성완료 눌렀을 때 서버로 요청하는 코드 작성 */}
      </InfoWrapper>
      <InfoWrapper className='right'>
        <DateInput
          type='datetime-local'
          onChange={handleInputValue('time')}
          value={inputValue.time || ''}
        />
        <div>
          <ButtonDiv onClick={handleCancel}>취소</ButtonDiv>
          <ButtonDiv onClick={handleConfirm}>작성완료</ButtonDiv>
        </div>
      </InfoWrapper>
    </Container>
  );
}

export default CreateTask;
