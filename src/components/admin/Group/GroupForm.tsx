import { useGroupContext } from '@/context/GroupContext';
import LabeledInput from './LabeledInput';
import { GroupFormState } from '@/types/groupFormData';
import { AgencyType } from '@/types/agencyType';
import './GroupEdit.scss';

interface Props {
  groupData: GroupFormState;
  onChange: (field: keyof GroupFormState, value: any) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMemberImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddMember: () => void;
  onRemoveMember: (id: number) => void;
  agencies: AgencyType[];
}

const GroupForm = ({
  groupData,
  onChange,
  onImageUpload,
  onMemberImageUpload,
  onAddMember,
  onRemoveMember,
}: Props) => {
  const { agencies } = useGroupContext();

  return (
    <div className="group_edit">
      <div className="group_edit_left">
        <div className="group_edit_image">
          <label htmlFor="groupImageUpload">
            {!groupData.groupImage.url && (
              <div className="group_edit_placeholder">이미지 추가</div>
            )}
            {groupData.groupImage.url && (
              <img src={groupData.groupImage.url} alt="Group" />
            )}
          </label>
          <input type="file" id="groupImageUpload" onChange={onImageUpload} />
        </div>

        <LabeledInput
          label="그룹명"
          value={groupData.groupName}
          onChange={(e) => onChange('groupName', e.target.value)}
          placeholder="그룹명을 입력해주세요"
        />

        <div className="agency_select">
          <label>소속사</label>
          <select
            value={groupData.agencyId}
            onChange={(e) => onChange('agencyId', Number(e.target.value))}
          >
            <option value="">소속사를 선택해주세요</option>
            {agencies.map((agency) => (
              <option key={agency.id} value={agency.id}>
                {agency.name}
              </option>
            ))}
          </select>
        </div>

        <LabeledInput
          label="인스타그램"
          value={groupData.snsLink}
          onChange={(e) => onChange('snsLink', e.target.value)}
          placeholder="인스타그램 주소를 입력해주세요"
        />
      </div>

      <div className="group_edit_right">
        <h3>멤버 추가</h3>
        <div className="member_add">
          <div className="member_add_image">
            <label htmlFor="memberImageUpload">
              {!groupData.memberImage.url && (
                <div className="member_add_placeholder">+</div>
              )}
              {groupData.memberImage.url && (
                <img src={groupData.memberImage.url} alt="Member" />
              )}
            </label>
            <input
              type="file"
              id="memberImageUpload"
              onChange={onMemberImageUpload}
            />
          </div>
          <div className="member_info_add">
            <input
              type="text"
              placeholder="멤버 이름"
              value={groupData.memberName}
              onChange={(e) => onChange('memberName', e.target.value)}
            />
            <button onClick={onAddMember} className="add_button">
              +
            </button>
          </div>
        </div>

        <h3 className="add_member_title">추가된 멤버</h3>
        <div className="member_list">
          {groupData.members.map((member) => (
            <div key={member.id} className="member">
              <img src={member.image} alt={member.name} />
              <span className="member_name">{member.name}</span>
              <button
                className="member_remove"
                onClick={() => onRemoveMember(member.id)}
              >
                -
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupForm;
