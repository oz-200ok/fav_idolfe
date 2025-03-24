import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuitModal.scss';

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
  const handleCancel = () => {
    navigate('/mypage');
  };
  return (
    <div className="quit_Page">
      <div className="quit_Container">
        <h1 className="quit_Title">
          {clickCount === 1 ? (
            <>
              당신의 최애 아이돌... <br />
              진짜 놔두고 가시는 거에요? <br />
              정말요?
            </>
          ) : (
            <>
              모든 회원 정보가 삭제됩니다. <br />
              그럼에도 탈퇴하시겠습니까?
            </>
          )}
        </h1>
        <h1 className="quit_Text">
          {clickCount === 1 ? (
            <>삭제된 정보는 절.대.로. 복구되지 않습니다.</>
          ) : (
            <>삭제된 정보는 복구되지 않습니다.</>
          )}
        </h1>
        <div className="buttons">
          <button onClick={handleQuitClick} className="quit_Button">
            탈퇴
          </button>
          <button onClick={handleCancel} className="cancel_Button">
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
export default QuitModal;
