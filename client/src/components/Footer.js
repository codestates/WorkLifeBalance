import styled from 'styled-components';

const Foot = styled.footer`
  display: flex;
  margin: 0;
  flex-direction: column;
  flex: 1 0 100px;
  width: 101%;
  height: fit-content;
  box-shadow: 0 -3px 3px -3px #555;
  color: #666;
  align-items: center;
  /* text-align: right; */
  div {
    width: 60vw;
    margin: 12px 0 6px 0;
    img {
      width: 48px;
    }
    .team-name {
      font-weight: 500;
      font-size: 1.4rem;
    }
    .chrome {
      text-align: right;
      color: black;
      font-weight: bold;
      font-size: 0.8rem;
    }
  }
`;
function Footer () {
  return (
    <Foot>
      <div>
        <div className='team-name'>
          <img src={`${process.env.PUBLIC_URL}/team-logo.png`} />
          Team Chickabiddy
        </div>
        <div className='contents'>
          Github repo: codestates/WorkLifeBalance
          <br />
          Front-end: 곽명우, 임지호&nbsp;&nbsp;&nbsp;Back-end: 전상인, 이승연
        </div>
        <div className='chrome'>아마도 구글 크롬에 최적화 되어있습니다</div>
      </div>
    </Foot>
  );
}

export default Footer;
