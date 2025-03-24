import GroupEdit from '../../components/admin/GroupEdit';
import './Admin.scss';

const GroupAddpage = () => {
  return (
    <div className="admin-container">
      <div className="admin-title">
        <h1>관리 그룹 추가</h1>
        <p>관리하시는 그룹과 멤버를 추가해주세요</p>
      </div>
      <GroupEdit />
    </div>
  );
};

export default GroupAddpage;
