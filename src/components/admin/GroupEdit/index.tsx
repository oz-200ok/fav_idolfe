import { useState, useEffect } from 'react';
import LabeledInput from './LabeledInput';
import './GroupEdit.scss';
import { MemberType, InputFieldType } from './GroupEdit';
import { saveGroup, getGroup, deleteGroup } from '@/utils/group';

const GroupEdit = () => {
  const [groupName, setGroupName] = useState('');
  const [agency, setAgency] = useState('');
  const [snsLink, setSnsLink] = useState('');
  const [groupImage, setGroupImage] = useState<string | null>(null);
  const [_groupImageFile, setGroupImageFile] = useState<File | null>(null);

  const [memberName, setMemberName] = useState('');
  const [memberImage, setMemberImage] = useState<string | null>(null);
  const [memberImageFile, setMemberImageFile] = useState<File | null>(null);
  const [members, setMembers] = useState<MemberType[]>([]);

  const accessToken = 'access-token'; // 로그인 상태에서 가져와야 함
  const groupId = 1;

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const data = await getGroup(groupId, accessToken);
        setGroupName(data.group_name);
        setAgency(data.agency_name);
        setSnsLink(data.sns_links?.instagram || '');
        setGroupImage(data.group_image);
        setMembers(
          data.members.map((m: any, idx: number) => ({
            id: idx,
            name: m.name,
            image: m.image,
            imageFile: null,
          }))
        );
      } catch (error) {
        console.error('불러오기 실패:', error);
      }
    };
    fetchGroup();
  }, []);

  const handleGroupImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      setGroupImage(URL.createObjectURL(file));
      setGroupImageFile(file);
    }
  };

  const handleMemberImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
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
    if (!groupName.trim() || !agency.trim()) {
      alert('그룹명과 소속사는 필수입니다!');
      return;
    }

    const formData = new FormData();
    formData.append('name', groupName);
    formData.append('agency_name', agency);
    formData.append('sns', snsLink);
    formData.append('color', '#C88DDD');
    if (_groupImageFile) formData.append('group_image', _groupImageFile);
    formData.append('member_count', String(members.length));

    members.forEach((member, idx) => {
      formData.append(`member_name_${idx + 1}`, member.name);
      if (member.imageFile) {
        formData.append(`member_image_${idx + 1}`, member.imageFile);
      }
    });

    try {
      await saveGroup(formData, accessToken);
      alert('그룹 저장 성공!');
    } catch (error) {
      console.error(error);
      alert('저장 실패');
    }
  };

  const handleDeleteGroup = async () => {
    try {
      await deleteGroup(groupId, accessToken);
      alert('그룹 삭제 성공!');
    } catch (error) {
      console.error(error);
      alert('삭제 실패');
    }
  };

  const inputFields: InputFieldType[] = [
    {
      label: '그룹명',
      value: groupName,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setGroupName(e.target.value),
      placeholder: '그룹명을 입력해주세요',
    },
    {
      label: '소속사',
      value: agency,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setAgency(e.target.value),
      placeholder: '소속사를 입력해주세요',
    },
    {
      label: '인스타그램',
      value: snsLink,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSnsLink(e.target.value),
      placeholder: '인스타그램 주소를 입력해주세요',
    },
  ];

  return (
    <div className="group_edit">
      <div className="group_edit_left">
        <div className="group_edit_image">
          <label htmlFor="groupImageUpload">
            {!groupImage && <div className="group_edit_placeholder">이미지 추가</div>}
            {groupImage && <img src={groupImage} alt="Group" />}
          </label>
          <input type="file" id="groupImageUpload" onChange={handleGroupImageUpload} />
        </div>

        {inputFields.map((field, idx) => (
          <LabeledInput
            key={idx}
            label={field.label}
            value={field.value}
            onChange={field.onChange}
            placeholder={field.placeholder}
          />
        ))}
      </div>

      <div className="group_edit_right">
        <h3>멤버 추가</h3>
        <div className="member_add">
          <div className="member_add_image">
            <label htmlFor="memberImageUpload">
              {!memberImage && <div className="member_add_placeholder">+</div>}
              {memberImage && <img src={memberImage} alt="Member" />}
            </label>
            <input type="file" id="memberImageUpload" onChange={handleMemberImageUpload} />
          </div>
          <div className="member_info_add">
            <input
              type="text"
              placeholder="멤버 이름"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
            />
            <button onClick={handleAddMember} className="add_button">+</button>
          </div>
        </div>

        <h3 className="add_member_title">추가된 멤버</h3>
        <div className="member_list">
          {members.map((member) => (
            <div key={member.id} className="member">
              <img src={member.image} alt={member.name} />
              <span className="member_name">{member.name}</span>
              <button className="member_remove" onClick={() => handleRemoveMember(member.id)}>-</button>
            </div>
          ))}
        </div>
      </div>

      <div className="group_edit_actions">
        <button className="delete" onClick={handleDeleteGroup}>그룹 삭제</button>
        <button className="save" onClick={handleSaveGroup}>수정 완료</button>
      </div>
    </div>
  );
};

export default GroupEdit;
