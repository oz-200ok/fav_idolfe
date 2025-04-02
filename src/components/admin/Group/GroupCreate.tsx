import { useEffect, useState } from 'react';
import LabeledInput from './LabeledInput';
import './GroupEdit.scss';
import { MemberType } from '@/types/groupFormData';
import { saveGroup } from '@/utils/group';
import { useNavigate } from 'react-router-dom';
import { useGroupContext } from '@/context/GroupContext';

const GroupCreate = () => {
  const navigate = useNavigate();
  const { agencies, fetchAgencies } = useGroupContext();
  console.log(agencies);

  const [groupName, setGroupName] = useState('');
  const [agencyId, setAgencyId] = useState<number | ''>('');
  const [snsLink, setSnsLink] = useState('');

  const [groupImageData, setGroupImageData] = useState({
    url: null as string | null,
    file: null as File | null,
  });

  const [memberName, setMemberName] = useState('');
  const [memberImageData, setMemberImageData] = useState({
    url: null as string | null,
    file: null as File | null,
  });

  const [members, setMembers] = useState<MemberType[]>([]);

  useEffect(() => {
    fetchAgencies();
  }, []);

  const handleGroupImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setGroupImageData({
        url: URL.createObjectURL(file),
        file,
      });
    }
  };

  const handleMemberImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMemberImageData({
        url: URL.createObjectURL(file),
        file,
      });
    }
  };

  const resetMemberInput = () => {
    setMemberName('');
    setMemberImageData({ url: null, file: null });
  };

  const handleAddMember = () => {
    if (!memberName.trim() || !memberImageData.url) return;
    const newMember: MemberType = {
      id: Date.now(),
      name: memberName,
      image: memberImageData.url || '',
      imageFile: memberImageData.file,
    };
    setMembers((prev): MemberType[] => [...prev, newMember]);
    resetMemberInput();
  };

  const handleRemoveMember = (id: number) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  };

  const handleSaveGroup = async () => {
    if (!groupName.trim() || agencyId === '' || !snsLink.trim()) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    const snsUrl = snsLink.trim();
    if (!/^https?:\/\/.+\..+/.test(snsUrl)) {
      alert('올바른 SNS 주소를 입력해주세요');
      return;
    }

    try {
      const savedGroup = await saveGroup({
        name: groupName,
        agency: Number(agencyId),
        sns: snsUrl,
        color: '#C88DDD',
        imageFile: groupImageData.file,
      });
      console.log('✅ 저장된 그룹:', savedGroup);

      alert('그룹 저장 성공!');
      navigate(`/group_edit_page/${savedGroup.id}`);
    } catch (error) {
      console.error('❌ 저장 실패:', error);
      alert('저장 실패');
    }
  };

  return (
    <div className="group_edit">
      <div className="group_edit_left">
        <div className="group_edit_image">
          <label htmlFor="groupImageUpload">
            {!groupImageData.url && (
              <div className="group_edit_placeholder">이미지 추가</div>
            )}
            {groupImageData.url && <img src={groupImageData.url} alt="Group" />}
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
            onChange={(e) => setAgencyId(Number(e.target.value))}
          >
            <option value="">소속사를 선택해주세요</option>
            {Array.isArray(agencies) && agencies.length > 0 ? (
              agencies.map((agency) => (
                <option key={agency.id} value={agency.id}>
                  {agency.name}
                </option>
              ))
            ) : (
              <option disabled>소속사 목록이 없습니다</option>
            )}
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
              {!memberImageData.url && (
                <div className="member_add_placeholder">+</div>
              )}
              {memberImageData.url && (
                <img src={memberImageData.url} alt="Member" />
              )}
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

export default GroupCreate;
