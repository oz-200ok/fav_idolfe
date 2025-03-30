import { useState, useEffect } from 'react';
import LabeledInput from './LabeledInput';
import './GroupEdit.scss';
import { MemberType } from './GroupEdit';
import { saveGroup, getGroup } from '@/utils/group';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AGENCIES = [
  { id: '5', name: 'SM' },
  { id: '6', name: 'JYP' },
  { id: '7', name: 'HYBE' },
];

const GroupEdit = () => {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState('');
  const [agencyId, setAgencyId] = useState('');
  const [snsLink, setSnsLink] = useState('');
  const [groupImage, setGroupImage] = useState<string | null>(null);
  const [groupImageFile, setGroupImageFile] = useState<File | null>(null);

  const [memberName, setMemberName] = useState('');
  const [memberImage, setMemberImage] = useState<string | null>(null);
  const [memberImageFile, setMemberImageFile] = useState<File | null>(null);
  const [members, setMembers] = useState<MemberType[]>([]);

  const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQzNDQyMjExLCJpYXQiOjE3NDMzNTU4MTEsImp0aSI6ImQ3NWUxMDM1ZWU0ZDQyMzNhM2E1MGRlMTk3NWU2NTJhIiwidXNlcl9pZCI6MX0.b9tVqeQBC0muaSLW3k100XkFCREh1Lk8kX2lHLovnBw';
  const groupId = 1;

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const data = await getGroup(groupId, accessToken);
        setGroupName(data.group_name);
        const agencyObj = AGENCIES.find((a) => a.name === data.agency_name);
        setAgencyId(agencyObj?.id || '');
        setSnsLink(data.sns_links?.instagram || '');
        setGroupImage(data.group_image);
        setMembers(
          data.members.map((m: any, idx: number) => ({
            id: idx,
            name: m.name,
            image: m.image,
            imageFile: null,
          })),
        );
      } catch (error) {
        console.error('불러오기 실패:', error);
      }
    };

    fetchGroup();
  }, [accessToken]);

  const handleGroupImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setGroupImage(URL.createObjectURL(file));
      setGroupImageFile(file);
    }
  };

  const handleMemberImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setMemberImage(URL.createObjectURL(file));
      setMemberImageFile(file);
    }
  };

  const handleAddMember = () => {
    if (!memberName.trim() || !memberImage) return;
    setMembers((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: memberName,
        image: memberImage,
        imageFile: memberImageFile,
      },
    ]);
    setMemberName('');
    setMemberImage(null);
    setMemberImageFile(null);
  };

  const handleRemoveMember = (id: number) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  };

  const handleSaveGroup = async () => {
    if (!groupName.trim() || !agencyId || !snsLink.trim()) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    const snsUrl = snsLink.trim();
    if (!/^https?:\/\/.+\..+/.test(snsUrl)) {
      alert('올바른 SNS 주소를 입력해주세요');
      return;
    }

    const formData = new FormData();
    formData.append('name', groupName);
    formData.append('agency', agencyId);
    formData.append('sns', snsUrl);
    formData.append('color', '#C88DDD');
    formData.append('member_count', String(members.length));
    if (groupImageFile) formData.append('image_file', groupImageFile);

    members.forEach((member, idx) => {
      formData.append(`member_name_${idx + 1}`, member.name);
      if (member.imageFile) {
        formData.append(`member_image_${idx + 1}`, member.imageFile);
      }
    });

    try {
      await saveGroup(
        {
          name: groupName,
          agency: agencyId,
          sns: snsLink.trim(),
          color: '#C88DDD',
          imageFile: groupImageFile,
        },
        accessToken,
      );

      alert('그룹 저장 성공!');
      navigate('/group_management_page');
    } catch (error) {
      console.error('❌ 저장 실패:', error);
      if (axios.isAxiosError(error)) {
        console.log('서버 응답:', error.response?.data);
      }
      alert('저장 실패');
    }
  };

  return (
    <div className="group_edit">
      <div className="group_edit_left">
        <div className="group_edit_image">
          <label htmlFor="groupImageUpload">
            {!groupImage && (
              <div className="group_edit_placeholder">이미지 추가</div>
            )}
            {groupImage && <img src={groupImage} alt="Group" />}
          </label>
          <input
            type="file"
            id="groupImageUpload"
            onChange={handleGroupImageUpload}
          />
        </div>

        <LabeledInput
          label="그룹명"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="그룹명을 입력해주세요"
        />

        <div className="agency_select">
          <label>소속사</label>
          <select
            value={agencyId}
            onChange={(e) => setAgencyId(e.target.value)}
          >
            <option value="">소속사를 선택해주세요</option>
            {AGENCIES.map((agency) => (
              <option key={agency.id} value={agency.id}>
                {agency.name}
              </option>
            ))}
          </select>
        </div>

        <LabeledInput
          label="인스타그램"
          value={snsLink}
          onChange={(e) => setSnsLink(e.target.value)}
          placeholder="인스타그램 주소를 입력해주세요"
        />
      </div>

      <div className="group_edit_right">
        <h3>멤버 추가</h3>
        <div className="member_add">
          <div className="member_add_image">
            <label htmlFor="memberImageUpload">
              {!memberImage && <div className="member_add_placeholder">+</div>}
              {memberImage && <img src={memberImage} alt="Member" />}
            </label>
            <input
              type="file"
              id="memberImageUpload"
              onChange={handleMemberImageUpload}
            />
          </div>
          <div className="member_info_add">
            <input
              type="text"
              placeholder="멤버 이름"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
            />
            <button onClick={handleAddMember} className="add_button">
              +
            </button>
          </div>
        </div>

        <h3 className="add_member_title">추가된 멤버</h3>
        <div className="member_list">
          {members.map((member) => (
            <div key={member.id} className="member">
              <img src={member.image} alt={member.name} />
              <span className="member_name">{member.name}</span>
              <button
                className="member_remove"
                onClick={() => handleRemoveMember(member.id)}
              >
                -
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="group_edit_actions">
        <button className="delete" onClick={() => navigate(-1)}>
          취소
        </button>
        <button className="save" onClick={handleSaveGroup}>
          저장 완료
        </button>
      </div>
    </div>
  );
};

export default GroupEdit;
