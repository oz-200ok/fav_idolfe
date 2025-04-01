import { useEffect, useState } from 'react';
import './mypage.scss';
import AdminInfo from '../../components/UserInfo/adminInfo';
import UserInfo from '@/components/UserInfo/userInfo';

import { useNavigate } from 'react-router-dom';
import useUserStore from '@/store/useUserStore';
function Mypage() {
  const [userRole, setUserRole] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const { user, fetchUser } = useUserStore();
  useEffect(() => {
    if (!user) {
      fetchUser();
    } else {
      setUserRole(user.is_admin);
    }
  }, [user]);

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
