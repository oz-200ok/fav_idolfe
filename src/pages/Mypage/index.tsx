import { useEffect, useState } from 'react';
import './mypage.scss';
import AdminInfo from '../../components/UserInfo/adminInfo';
import UserInfo from '@/components/UserInfo/userInfo';
import UserInstance from '@/utils/UserInstance';
import { useNavigate } from 'react-router-dom';

function Mypage() {
  const [userRole, setUserRole] = useState<boolean | null>(null);

  const navigate = useNavigate();
  useEffect(() => {
    const GetUserInfo = async () => {
      try {
        const response = await UserInstance.get('/account/me/');
        const userState = response.data.data.is_admin;

        setUserRole(userState);
      } catch (error) {
        console.log(error);
      }
    };
    GetUserInfo();
  }, []);

  useEffect(() => {
    if (userRole === null) return;
    if (userRole === undefined) return;

    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/guset');
    }
  }, [userRole]);

  return <>{userRole === true ? <AdminInfo /> : <UserInfo />}</>;
}

export default Mypage;
