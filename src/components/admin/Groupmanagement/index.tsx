import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 훅 추가
import './Groupmanagement.scss';
import instagramIcon from '../../../assets/instagram.png'; // 인스타그램 아이콘 추가
import type { GroupType } from './GroupManagement.types';

const GroupManagement = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 함수

  // 예시 데이터 (추후 API 연동)
  const groups: GroupType[] = [
    {
      id: 1,
      name: '에스파(aespa)',
      members: ['카리나', '윈터', '지젤', '닝닝'],
      agency: 'SM',
      sns: 'https://www.instagram.com/aespa_official',
      image:
        'https://i.namu.wiki/i/snfqOzBTWZBT6TCzj7kWdYJHVykbTJ45KpdlFbHyN1RgvaCtHOucSWducsyC4qVWgBlYbi7DUaFbTtunP5BW1I9MOau4LdTCggAJiF6iK7guwuCUXseAXCGH-yO0_svO9Id2vYbtX5Ov1lHYYEYD4Q.svg',
    },
    {
      id: 2,
      name: '라이즈(riize)',
      members: ['원빈', '쇼타로', '은석', '성찬', '소희', '앤톤'],
      agency: 'SM',
      sns: 'https://www.instagram.com/riize_official',
      image:
        'https://i.namu.wiki/i/VeRqyeR9EVx18nfxs3QUZkCfin5Fq5t3Z9mq3bMoSgXJNVhm4aZ68-VF0KbATbBAn3K-1M828anK8mIqkSqDIg.svg',
    },
    {
      id: 2,
      name: '라이즈(riize)',
      members: ['원빈', '쇼타로', '은석', '성찬', '소희', '앤톤'],
      agency: 'SM',
      sns: 'https://www.instagram.com/riize_official',
      image:
        'https://i.namu.wiki/i/VeRqyeR9EVx18nfxs3QUZkCfin5Fq5t3Z9mq3bMoSgXJNVhm4aZ68-VF0KbATbBAn3K-1M828anK8mIqkSqDIg.svg',
    },
  ];

  return (
    <div className="group-management">
      <div className="group-management_container">
        {groups.map((group) => (
          <div className="group-management_card" key={group.id}>
            {/* 그룹 로고 */}
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

            {/* 그룹 정보 */}
            <div className="group_management_card_info">
              <h3>{group.name}</h3>
              <p>{group.members.join(', ')}</p>
              <p>소속사: {group.agency}</p>

              {/* 인스타그램 아이콘 클릭 시 SNS 이동 */}
              <a href={group.sns} target="_blank" rel="noopener noreferrer">
                <img
                  src={instagramIcon}
                  alt="Instagram"
                  className="group-management_instagram-icon"
                />
              </a>
            </div>

            {/* 버튼 */}
            <div className="group_management_card_btns">
              <button className="schedule_add">일괄 일정 추가</button>
              <button className="schedule_download">일괄 일정 다운</button>
            </div>
          </div>
        ))}
      </div>

      {/* 새 그룹 추가 버튼 클릭 시 그룹 추가 페이지로 이동 */}
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
