import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import right from '../../assets/chevron-right.png';
import './mypage.scss';
function Mypage() {
  const [userRole, setUserRole] = useState('admin');
  const navigate = useNavigate();
  const Role = { USER: 'user', ADMIN: 'admin' };

  useEffect(() => {
    if (![Role.USER, Role.ADMIN].includes(userRole)) {
      setUserRole(Role.USER); // 🚀 잘못된 값이면 기본값('user')으로 설정
    }
  }, [userRole]); // userRole이 변경될 때만 실행

  return (
    <>
      {userRole === 'user' ? (
        <div className="mypage_container">
          <div className="mypage_title">
            <h2>마이페이지</h2>
            <p>원하시는 서비스를 선택해주세요</p>
          </div>
          <div className="user_info">
            <div className="nickname-wrapper">
              <h1 className="nickname">동해번쩍홍길동</h1>
              <span>님</span>
            </div>
            <p className="user-email">3399__ss@naver.com</p>
          </div>
          <div className="mypage_list">
            <ul>
              <li
                className="mypage_index"
                onClick={() => {
                  navigate('/user_info');
                }}
              >
                <img src={right} alt="오른쪽 화살표 이미지" />
                <p>회원정보 수정</p>
              </li>
              <li
                className="mypage_index"
                onClick={() => {
                  navigate('/schedule_alarm');
                }}
              >
                <img src={right} alt="오른쪽 화살표 이미지" />
                <p>알림 설정</p>
              </li>
              <li
                className="mypage_index"
                onClick={() => {
                  navigate('/privacy_policy');
                }}
              >
                <img src={right} alt="오른쪽 화살표 이미지" />
                <p>개인정보 처리 방침</p>
              </li>
              <li
                className="mypage_index"
                onClick={() => {
                  navigate('/quit_modal');
                }}
              >
                <img src={right} alt="오른쪽 화살표 이미지" />
                <p>회원 탈퇴</p>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="mypage_container">
          <div className="mypage_title">
            <h2>관리자페이지</h2>
            <p>원하시는 서비스를 선택해주세요</p>
          </div>
          <div className="user_info">
            <div className="nickname-wrapper">
              <h1 className="nickname">동해번쩍홍길동</h1>
              <span>님</span>
            </div>
            <p className="user-email">3399__ss@naver.com</p>
          </div>
          <div className="mypage_list">
            <ul>
              <li
                className="mypage_index"
                onClick={() => {
                  navigate('/user-info');
                }}
              >
                <img src={right} alt="오른쪽 화살표 이미지" />
                <p>회원정보 수정</p>
              </li>
              <li
                className="mypage_index"
                onClick={() => {
                  navigate('/group_add_page');
                }}
              >
                <img src={right} alt="오른쪽 화살표 이미지" />
                <p>그룹 추가</p>
              </li>
              <li
                className="mypage_index"
                onClick={() => {
                  navigate('/group_management_page');
                }}
              >
                <img src={right} alt="오른쪽 화살표 이미지" />
                <p> 관리 그룹 보기 </p>
              </li>
              <li
                className="mypage_index"
                onClick={() => {
                  navigate('/schedule_alarm');
                }}
              >
                <img src={right} alt="오른쪽 화살표 이미지" />
                <p>알림 설정</p>
              </li>
              <li
                className="mypage_index"
                onClick={() => {
                  navigate('/privacy_policy');
                }}
              >
                <img src={right} alt="오른쪽 화살표 이미지" />
                <p>개인정보 처리 방침</p>
              </li>
              <li
                className="mypage_index"
                onClick={() => {
                  navigate('/quit_modal');
                }}
              >
                <img src={right} alt="오른쪽 화살표 이미지" />
                <p>회원 탈퇴</p>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Mypage;
