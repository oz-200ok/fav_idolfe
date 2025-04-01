import { useState, useEffect } from 'react';
import './common.scss';
import down from '../../assets/chevron-down.png';
import up from '../../assets/chevron-up.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchGroupList } from '@/utils/group';

type Group = {
  id: number;
  name: string;
  image: string;
};

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userType] = useState('admin');
  const isAdmin = userType === 'admin';
  const [isListOpen, setIsListOpen] = useState(true);
  const [groupList, setGroupList] = useState<Group[]>([]);

  const fetchGroups = async () => {
    try {
      const data = await fetchGroupList();
      setGroupList(data);
    } catch (error) {
      console.error('❌ 그룹 목록 불러오기 실패:', error);
    }
  };

  const handleEdit = (groupId: number) => {
    navigate(`/group_edit/${groupId}`);
  };

  useEffect(() => {
    if (isAdmin) {
      fetchGroups();
    }
  }, [isAdmin, location.pathname]); // ✅ location이 변경될 때마다 fetch

  return (
    <aside className="sidebar">
      <div className="sidebar_header">
        <span>그룹 관리</span>
        <button
          className="sidebar_toggle"
          onClick={() => setIsListOpen(!isListOpen)}
        >
          <img src={isListOpen ? down : up} alt="toggle" />
        </button>
      </div>

      {isAdmin && isListOpen && (
        <ul className="sidebar_list">
          {groupList.map((group) => (
            <li key={group.id} className="sidebar_item with_image">
              <img
                src={group.image}
                alt={group.name}
                className="sidebar_thumb"
              />
              <span className="sidebar_group_name">{group.name}</span>
              <button
                className="sidebar_edit"
                onClick={() => handleEdit(group.id)}
              >
                수정
              </button>
            </li>
          ))}
        </ul>
      )}

      {isAdmin && (
        <button
          className="sidebar_view"
          onClick={() => navigate('/group_management_page')}
        >
          관리 그룹 보기
        </button>
      )}
    </aside>
  );
}

export default SideBar;
