import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './GroupManagement.scss';
import instagramIcon from '../../../assets/instagram.png';
import type { GroupType } from './GroupManagement.types';
import {
  fetchGroupList,
  addGroupSchedule,
  downloadGroupSchedule,
} from '@/utils/group';

const GroupManagement = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState<GroupType[]>([]);
  const accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQzNDc1MzE4LCJpYXQiOjE3NDMzODg5MTgsImp0aSI6IjY3NDljN2ZjYTNmMjQ4OWRhMGI0ZmQ2Y2MwMTVhN2RhIiwidXNlcl9pZCI6MX0.pcs8WpaAQtj4x0owzy6E8OdhhTSO_tWRT-U87oSGQXs';

  //그룹 정보 불러오기
  useEffect(() => {
    const loadGroups = async () => {
      try {
        const data = await fetchGroupList(accessToken);
        console.log('✅ 불러온 그룹:', data); // ✅ 콘솔 확인용!
        setGroups(
          data.map((group: any) => ({
            id: group.id,
            name: group.name,
            agency: group.agency_name,
            image: group.image,
            sns: group.sns,
            members: [], // 멤버는 별도 API일 경우 생략 가능
          })),
        );
      } catch (error) {
        console.error('그룹 목록 불러오기 실패:', error);
      }
    };
    loadGroups();
  }, [accessToken]);

  const handleScheduleAdd = async (groupId: number) => {
    try {
      await addGroupSchedule(groupId, accessToken);
      alert('일정이 추가되었습니다.');
    } catch (err) {
      console.error(err);
      alert('일정 추가 실패');
    }
  };

  const handleScheduleDownload = async (groupId: number) => {
    try {
      await downloadGroupSchedule(groupId, accessToken);
    } catch (err) {
      console.error(err);
      alert('일정 다운로드 실패');
    }
  };

  return (
    <div className="group-management">
      <div className="group-management_container">
        {groups.map((group) => (
          <div className="group-management_card" key={group.id}>
            <div className="group-management_card_image">
              {group.image ? (
                <img src={group.image} alt={group.name} />
              ) : (
                <div className="group-management_card-placeholder">
                  그룹 이미지
                  <br />
                  혹은
                  <br />
                  그룹 로고
                </div>
              )}
            </div>

            <div className="group_management_card_info">
              <h3>{group.name}</h3>
              <p>{group.members.join(', ')}</p>
              <p>소속사: {group.agency}</p>
              <a href={group.sns} target="_blank" rel="noopener noreferrer">
                <img
                  src={instagramIcon}
                  alt="Instagram"
                  className="group-management_instagram-icon"
                />
              </a>
            </div>

            <div className="group_management_card_btns">
              <button
                className="schedule_add"
                onClick={() => handleScheduleAdd(group.id)}
              >
                일괄 일정 추가
              </button>
              <button
                className="schedule_download"
                onClick={() => handleScheduleDownload(group.id)}
              >
                일괄 일정 다운
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        className="group_management_edit"
        onClick={() => navigate('/group_add_page')}
      >
        + 새 그룹 추가
      </button>
    </div>
  );
};

export default GroupManagement;
