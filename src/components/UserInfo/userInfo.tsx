import { useNavigate } from 'react-router-dom';
import right from '../../assets/chevron-right.png';
import UserInstance from '@/utils/UserInstance';
import { useEffect, useState } from 'react';
import { T_UserInfo } from './infoType';
const UserInfo = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<T_UserInfo | null>(null);

  useEffect(() => {
    const GetUserInfo = async () => {
      try {
        const response = await UserInstance.get('/account/me/');
        const userInfo = response.data.data;
        setUserData(userInfo);
      } catch (error) {
        console.log(error);
      }
    };
    GetUserInfo();
  }, []);

  console.log('✨밖에서 확인하는 용도', userData);
  if (!userData) return null;

  return (
    <div className="mypage_container">
      <div className="mypage_title">
        <h2>마이페이지</h2>
        <p>원하시는 서비스를 선택해주세요</p>
      </div>
      <div className="user_info">
        <div className="nickname-wrapper">
          <h1 className="nickname">{userData.username}</h1>
          <span>님</span>
        </div>
        <p className="user-email">{userData.email}</p>
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
  );
};

export default UserInfo;
