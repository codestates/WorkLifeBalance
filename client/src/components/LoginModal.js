import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import axios from "axios";
import url from "../urlSetup";
import color from "../colorSetup";

const Container = styled.div`
  box-sizing: border-box;
  position: fixed;
  height: 15rem;
  text-align: center;
  margin: 120px auto;
`;

const Input = styled.input`
  margin: 5px;
  height: 32px;
  width: 280px;
  font-size: 1.4rem;
  border: none;
  border-bottom: 1px solid black;
  :focus {
    outline: none;
    background-color: #eee;
  }
`;

const Button = styled.button`
  margin-top: 12px;
  width: 240px;
  height: 40px;
  font-size: 1.2rem;
  border: none;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 0 2px 2px ${color.black01} inset;
  cursor: pointer;
  :hover {
    box-shadow: 0 0 2px 2px ${color.black04} inset;
  }
  :active {
    color: ${color.green01};
    box-shadow: 0 0 2px 2px ${color.black02} inset;
  }
`;

const Canvas = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

const View = styled.div.attrs((props) => ({
  role: "dialog",
}))`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background-color: #fff;
  width: 420px;
  height: 220px;
  align-items: center;
  text-align: right;
  font-size: 1.2rem;
  padding: 50px;
  .alert-box {
    font-size: 1rem;
    height: 25px;
    color: red;
    /* transition: all ease 1s 0s; */
    /* text-align: right; */
  }
  div {
    width: auto;
  }
  .yet {
    width: 100%;
    font-size: 1rem;
    text-align: right;
  }
  .yet:hover {
    color: ${color.blue01};
    cursor: pointer;
  }
  form {
    display: flex;
    flex: 2 0 auto;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    width: 75px;
  }
`;

const ExitButton = styled.div`
  flex: 1 0 25px;
  margin-top: 10px;
  padding: 0 1px 2px 1px;
  min-width: 25px;
  height: 25px;
  text-align: center;
  font-size: 1.6rem;
  /* background: coral; */
  cursor: pointer;
  :hover {
    color: ${color.black05};
  }
`;

function LoginModal({ setShowLogin, isLogin, setIsLogin }) {
  const [loginInfo, setLoginInfo] = useState({
    userId: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState(" ");
  const navigate = useNavigate();

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const handleCanvasClick = () => {
    setShowLogin(false);
  };
  const handleGotoSignup = () => {
    setShowLogin(false);
    navigate("./signup");
  };
  const handleLogin = () => {
    const { userId, password } = loginInfo;
    if (userId && password) {
      //! 테스트가 끝나면 다음 코드를 삭제해주세요
      // if (userId === 'test' && password === 'test') {
      //   setShowLogin(false);
      //   setIsLogin(true);
      //   navigate('/');
      // }
      //! --------------------------------------------//
      axios
        .post(
          `${url}/user/login`,
          {
            userId,
            password,
          },
          //! 올바르지 않은 withCredentials 사용
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          // 로그인 확인
          axios
            .get(`${url}/user/info`, { withCredentials: true })
            .then((res) => {
              // 유저 정보 저장 핸들러 함수 필요 (state)
              setIsLogin(true);
              setShowLogin(false);
              navigate("/");
              localStorage.setItem("isLogin", "1");
            });
        })
        .catch(() => {
          setErrMsg("아이디 혹은 비밀번호가 잘못되었습니다");
          setTimeout(() => {
            setErrMsg(" ");
          }, 3000);
        });
    } else {
      // 에러박스에 메시지 출력
      setErrMsg("아이디와 비밀번호를 모두 입력해주세요");
      setTimeout(() => {
        setErrMsg(" ");
      }, 3000);
    }
  };

  // useEffect(() => {
  //   console.log("로그인 모달 렌더링");
  // }, [isLogin]);
  return (
    <Container>
      <Canvas onClick={handleCanvasClick}>
        <View onClick={(e) => e.stopPropagation()}>
          <form onSubmit={(e) => e.preventDefault()}>
            <InputWrapper>
              <span>아이디</span>
              <Input type="text" onChange={handleInputValue("userId")} />
            </InputWrapper>
            <br />
            <InputWrapper>
              <span>비밀번호</span>
              <Input type="password" onChange={handleInputValue("password")} />
            </InputWrapper>
            <div className="alert-box">{errMsg}</div>
            <div className="yet" onClick={handleGotoSignup}>
              아직 아이디가 없으신가요?
            </div>
            <Button type="submit" onClick={handleLogin}>
              로그인
            </Button>
          </form>
          <ExitButton onClick={handleCanvasClick}>&times;</ExitButton>
        </View>
      </Canvas>
    </Container>
  );
}

export default LoginModal;
