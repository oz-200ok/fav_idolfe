import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuitModal.scss';
// import axios from 'axios';

function QuitModal() {
  //모달 상태
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);

  const handleQuitClick = () => {
    if (clickCount === 1) {
      navigate('/quit_page');
    } else {
      setClickCount(clickCount + 1);
    }
  };

  return (
    <div className="quit_page">
      <div className="quit_container">
        <div>
          {clickCount === 1 ? (
            <h1 className="quit_title">
              당신의 최애 아이돌... <br />
              진짜 놔두고 가시는 거에요? 정말요?
            </h1>
          ) : (
            <h1 className="quit_title">
              모든 회원 정보가 삭제됩니다. <br />
              그럼에도 탈퇴하시겠습니까?
            </h1>
          )}
        </div>

        <div>
          {clickCount === 1 ? (
            <p className="quit_text">
              삭제된 정보는 절.대.로. 복구되지 않습니다.
            </p>
          ) : (
            <p className="quit_text">삭제된 정보는 복구되지 않습니다.</p>
          )}
        </div>
        <div className="buttons">
          <button onClick={handleQuitClick} className="quit_btn">
            탈퇴
          </button>
          <button
            onClick={() => {
              '/mypage';
            }}
            className="cancel_btn"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
export default QuitModal;
