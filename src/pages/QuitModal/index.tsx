import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuitModal.scss';
import axios from 'axios';

function QuitModal() {
  //모달 상태
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0); // 탈퇴버튼 클릭횟수상태
  const [loading, setLoading] = useState(false); // API요청중 로딩상태 관리
  const [error, setError] = useState<string | null>(null); //에러 메시지 상태

  //탈퇴요청 처리하는 함수
  const handleQuit = async () => {
    setLoading(true); //api요청 시작되면 로딩시작
    setError(null); //에러 초기화

    try {
      const token = localStorage.getItem('access_token');

      //토큰이 없으면 에러표시

      if (!token) {
        throw new Error('로그인을 해주세요.');
      }

      //api에 delete 요청
      await axios.delete('http://100.26.111.172/account/delete/', {
        headers: { Authorization: `Bearer ${token}` }, // Authorization 헤더에 토큰 추가
      });
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');

      //탈퇴완료페이지이동
      navigate('/quit_page');
    } catch (err: any) {
      //에러발생시 에러메시지 저장
      setError(err.response?.data?.message || '탈퇴 실패');
    } finally {
      setLoading(false); //요청 완료후 로딩종료
    }
  };
  //탈퇴버튼 클릭처리함수
  const handleQuitClick = () => {
    if (clickCount === 1) {
      handleQuit();
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

        {/* 에러메시지 화면에 출력 */}
        {error && <p className="error_message">{error}</p>}

        <div className="buttons">
          {/* 탈퇴버튼 클릭시 로딩중이면 버튼 비활성화*/}
          <button onClick={handleQuitClick} className="quit_btn">
            {loading ? '탈퇴중...' : '탈퇴'}
            {/* 로딩 중에는 '탈퇴 중...'으로 변경 */}
          </button>
          {/* 취소버튼 클릭시 마이페이지로*/}
          <button onClick={() => navigate('/mypage')} className="cancel_btn">
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
export default QuitModal;
