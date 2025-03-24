import { useState } from 'react';
import LabeledInput from './GroupEditInput'; // 컴포넌트 import 수정
import './GroupEdit.scss';
import { MemberType, InputFieldType } from './GroupEdit.ts';

const GroupEdit = () => {
  const [groupName, setGroupName] = useState('');
  const [agency, setAgency] = useState('');
  const [snsLink, setSnsLink] = useState('');
  const [groupImage, setGroupImage] = useState<string | null>(null);
  const [_groupImageFile, setGroupImageFile] = useState<File | null>(null);// 나중에 _제거

  const [memberName, setMemberName] = useState('');
  const [memberImage, setMemberImage] = useState<string | null>(null);
  const [memberImageFile, setMemberImageFile] = useState<File | null>(null);
  const [members, setMembers] = useState<MemberType[]>([]);

  // 그룹 이미지 업로드
  const handleGroupImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      setGroupImage(URL.createObjectURL(file));
      setGroupImageFile(file);
    }
  };

  // 멤버 이미지 업로드
  const handleMemberImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      setMemberImage(URL.createObjectURL(file));
      setMemberImageFile(file);
    }
  };

  // 멤버 추가
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

  // 멤버 삭제
  const handleRemoveMember = (id: number) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  };

  // 공통 input 필드 배열
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
      {/* 왼쪽 - 그룹 이미지 및 기본 정보 */}
      <div className="group_edit_left">
        <div className="group_edit_image">
          <label htmlFor="groupImageUpload">
            {!groupImage && <div className="group_edit_placeholder">이미지 추가</div>}
            {groupImage && <img src={groupImage} alt="Group" />}
          </label>
          <input type="file" id="groupImageUpload" onChange={handleGroupImageUpload} />
        </div>

        {/* 공통 input 필드 렌더링 */}
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

      {/* 오른쪽 - 멤버 추가 및 목록 */}
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
              <button className="member_remove" onClick={() => handleRemoveMember(member.id)}>
                -
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="group_edit_actions">
        <button className="delete">그룹 삭제</button>
        <button className="save">수정 완료</button>
      </div>
    </div>
  );
};

export default GroupEdit;
