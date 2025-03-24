import GroupManagement from '../../components/admin/GroupManagement/index';
import './GroupManagementPage.scss';

const GroupManagementPage = () => {
  return (
    <div className="admin-container">
      <div className="admin-title">
        <h1>관리 그룹</h1>
      </div>
      <GroupManagement />
    </div>
  );
};

export default GroupManagementPage;