import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import url from '../urlSetup';
import '@fortawesome/fontawesome-free/js/all.js';

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
    /* border: solid 0.1rem #505bf0; */
    border-radius: 10px 0 0 10px;
    flex: 1;
  }

  &.center {
    padding: 0.2rem;
    /* border: solid 0.1rem #ccc; */
    flex: 4;
  }

  &.right {
    align-items: right;
    /* border: solid 0.1rem #ccc; */
    border-radius: 0 10px 10px 0;
    flex: 1.7;
  }
`;

const TaskDiv = styled.div`
  display: inline-block;
  text-decoration: ${(props) => (props.check ? 'line-through' : 'none')};
  /* float: left; */
  height: 20px;
  margin-left: 5px;
`;

const DateDiv = styled.div`
  display: flex;
  justify-content: right;
  margin: 5px;
`;

const TagDiv = styled.div`
  display: inline-block;
  margin-left: 5px;
  color: ${(props) =>
    props.tag === 'Work' ? 'red' : props.tag === 'Life' ? 'blue' : 'black'};
`;

// const Deadline = styled.input``;

const Modify = styled.div`
  display: flex;
  justify-content: right;
  max-width: auto;
  margin-right: 30px;

  :hover {
    color: blue;
    cursor: pointer;
  }
`;

const TaskInput = styled.input`
  outline: none;
`;

const DateInput = styled.input``;

const TagInput = styled.div`
  display: inline-block;
  margin-left: 5px;
  background-color: #eee;
  color: ${(props) =>
    props.tag === 'Work' ? 'red' : props.tag === 'Life' ? 'blue' : 'black'};
  cursor: pointer;
`;

function Task ({ list }) {
  const [modify, setModify] = useState(false);
  const [inputValue, setInputValue] = useState(list);
  //! 해당 상태는 렌더링시 서버로부터 받아와 갱신되어야함
  useEffect(() => {
    // ajax 요청
  }, []);

  const handleInputValue = (key) => (e) => {
    setInputValue({ ...inputValue, [key]: e.target.value });
  };
  const handleChangeCheck = (e, obj) => {
    // # check 상태 변경 코드
    setInputValue({ ...inputValue, check: e.target.checked });
    // # check 서버 요청
    console.log('check sending...');
    const { id, check } = obj;
    // ! 더미데이터로 요청테스트 해보아야함
    axios
      .post(`${url}/task/check`, { id, check }, { withCredentials: true })
      .then((res) => console.log('체크 전송완료됨!'))
      .catch((err) => console.log(err));

    // console.log(e);
  };

  const handleModify = (key) => (e) => {
    //! 서버로 변경된 정보를 보내야함
    const { id, task, tag, time } = list;
    if (key === 'ok') {
      axios
        .post(
          `${url}/task/update`,
          {
            id,
            task,
            tag,
            time
          },
          { withCredentials: true }
        )
        .then(() => {
          setModify(false);
        })
        .catch(() => {
          setModify(true);
        });
    } else if (key === 'mod') setModify(true);
  };

  const handleTagClick = () => (e) => {
    const text = e.target.textContent;

    if (text === 'Work') setInputValue({ ...inputValue, tag: 'Life' });
    if (text === 'Life') setInputValue({ ...inputValue, tag: 'Work' });
  };
  //* task = {
  //*   id: 1,
  //*   tag: "Work",
  //*   task: "일해야됨",
  //*   deadline: "2022-02-22 22:22",
  //*   check: false,
  //* }
  // console.log(task);
  // useEffect(() => {}, [inputValue]);

  // const [dateInfo, timeInfo] = list.deadline.split('T');
  const [dateInfo, setDateInfo] = useState(list.time.split('T')[0]);
  const [timeInfo, setTimeInfo] = useState(list.time.split('T')[1].split('.')[0]);

  // const [timeInfo, setTimeInfo] = useState(Date.parse(Date.now()));
  // console.log(x.toLocaleTimeString().slice(3, 8));

  return (
    <>
      {modify ? (
        <Container>
          <InfoWrapper className='left'>
            <Checkbox
              type='checkbox'
              // onChange={handleInputValue("check")}
              checked={inputValue.check}
              deactive
            />
            <TagInput onClick={handleTagClick()} tag={inputValue.tag}>
              {inputValue.tag}
            </TagInput>
          </InfoWrapper>
          <InfoWrapper className='center'>
            <TaskInput
              onChange={handleInputValue('task')}
              value={inputValue.task || ''}
            />

            {/* deadline 형식: 2022-22-22T22:22 */}
          </InfoWrapper>
          <InfoWrapper className='right'>
            <DateInput
              type='datetime-local'
              onChange={handleInputValue('deadline')}
              value={inputValue.deadline || ''}
            />
            <Modify onClick={handleModify('ok')}>적용</Modify>
          </InfoWrapper>
        </Container>
      ) : (
        <Container>
          <InfoWrapper className='left'>
            <Checkbox
              type='checkbox'
              onChange={(e) =>
                handleChangeCheck(e, { id: list.id, check: list.check })}
              checked={inputValue.check}
            />
            <TagDiv tag={list.tag}>{list.tag}</TagDiv>
          </InfoWrapper>
          <InfoWrapper className='center'>
            <TaskDiv check={inputValue.check}>{list.task}</TaskDiv>
          </InfoWrapper>
          <InfoWrapper className='right'>
            <DateDiv align='right'>
              {dateInfo}&nbsp;{timeInfo}
            </DateDiv>
            <Modify onClick={handleModify('mod')}>
              <i className='fas fa-edit' />
            </Modify>
          </InfoWrapper>
        </Container>
      )}
    </>
  );
}

export default Task;
