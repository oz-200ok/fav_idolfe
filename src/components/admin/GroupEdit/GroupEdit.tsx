import { useState } from 'react';
import './GroupEdit.scss';

// 그룹정보
const GroupEdit = () => {
  const [groupName, setGroupName] = useState('');
  const [agency, setAgency] = useState('');
  const [snsLink, setSnsLink] = useState('');
  const [groupImage, setGroupImage] = useState<string | null>(null);
  //요기부터는 멤버추가
  const [memberName, setMemberName] = useState('');
  const [memberImage, setMemberImage] = useState<string | null>(null);
  const [members, setMembers] = useState<
    { id: number; name: string; image: string }[]
  >([]);

  //그룹 이미지 업로드
  const handleGroupImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files[0]) {
      setGroupImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  //멤버 이미지 업로드
  const handleMemberImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files[0]) {
      setMemberImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  //멤버 추가하기
  const handleAddMember = () => {
    if (memberName.trim() === '' || !memberImage) return; //이름이 비었거나 이미지가 없으면 추가 불가
    setMembers([
      ...members,
      { id: Date.now(), name: memberName, image: memberImage },
    ]); // 상태를 업데이트
    setMemberName(''); // 입력필드를 초기화 해줌
    setMemberImage(null);
  };

  //멤버 삭제
  const handleRemoveMember = (id: number) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  return (
    <div className="group_edit">
      {/* 왼쪽 부분 -그룹 이미지, 이름, sns */}
      <div className="group_edit_left">
        <div className="group_edit_image">
          <label htmlFor="groupImageUpload">
            {/* 📌 이미지가 없을 경우 "이미지 추가" 글씨 표시 */}
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

        <label>그룹 이름</label>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />

        <label>소속</label>
        <input
          type="text"
          value={agency}
          onChange={(e) => setAgency(e.target.value)}
        />

        <label>SNS 링크</label>
        <input
          type="text"
          value={snsLink}
          onChange={(e) => setSnsLink(e.target.value)}
        />
      </div>

      <div className="group_edit_right">
        {/* 오른쪽 - 멤버 추가 : 멤버 사진, 이름, 삭제, 수정 */}
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

        <div className="divider"></div>

        <h3>추가된 멤버</h3>
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
        <button className="delete">그룹 삭제</button>
        <button className="save">수정 완료</button>
      </div>
    </div>
  );
};

export default GroupEdit;
