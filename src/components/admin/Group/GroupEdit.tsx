import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GroupForm from './GroupForm';
import { GroupFormState } from '@/types/groupFormData';
import { getGroup, updateGroup, deleteGroup } from '@/utils/group';

const GroupEdit = () => {
  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId: string }>();

  const [groupData, setGroupData] = useState<GroupFormState>({
    groupName: '',
    agencyId: Number(),
    snsLink: '',
    groupImage: { url: null, file: null },
    memberName: '',
    memberImage: { url: null, file: null },
    members: [],
  });

  useEffect(() => {
    const fetchGroup = async () => {
      if (!groupId) return;
      try {
        const data = await getGroup(Number(groupId));
        console.log('멤버 데이터 확인 👉', data.members);
        setGroupData({
          groupName: data.group_name,
          agencyId: Number(data.agency_id),
          snsLink: data.instagram || '',
          groupImage: { url: data.group_image, file: null },
          memberName: '',
          memberImage: { url: null, file: null },
          members: data.members ?? [],
        });
        console.log(data.members);
      } catch (error) {
        console.error('그룹 불러오기 실패:', error);
      }
    };
    fetchGroup();
  }, [groupId]);

  const handleChange = (field: keyof GroupFormState, value: any) => {
    setGroupData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleChange('groupImage', { url: URL.createObjectURL(file), file });
    }
  };

  const handleMemberImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleChange('memberImage', { url: URL.createObjectURL(file), file });
    }
  };

  const handleAddMember = () => {
    if (!groupData.memberName || !groupData.memberImage.url) return;
    const newMember = {
      id: Date.now(),
      name: groupData.memberName,
      image: groupData.memberImage.url,
      imageFile: groupData.memberImage.file,
    };
    handleChange('members', [...groupData.members, newMember]);
    handleChange('memberName', '');
    handleChange('memberImage', { url: null, file: null });
  };

  const handleRemoveMember = (id: number) => {
    handleChange(
      'members',
      groupData.members.filter((m) => m.id !== id),
    );
  };

  const handleUpdate = async () => {
    if (!groupId) return;
    try {
      const formData = new FormData();
      formData.append('name', groupData.groupName);
      formData.append('agency', String(groupData.agencyId));
      formData.append('sns', groupData.snsLink);
      formData.append('color', '#C88DDD');
      if (groupData.groupImage.file) {
        formData.append('image_file', groupData.groupImage.file);
      }
      formData.append('member_count', String(groupData.members.length));
      groupData.members.forEach((member, idx) => {
        formData.append(`member_name_${idx + 1}`, member.name);
        if (member.imageFile) {
          formData.append(`member_image_${idx + 1}`, member.imageFile);
        }
      });

      await updateGroup(Number(groupId), formData);
      alert('수정 완료');
      navigate('/group_management_page'); // ✅ 페이지 이동
    } catch (err) {
      console.error('❌ 수정 실패:', err);
      alert('수정 실패');
    }
  };

  const handleDelete = async () => {
    if (!groupId) return;
    const ok = confirm('정말 삭제하시겠습니까?');
    if (!ok) return;
    try {
      await deleteGroup(Number(groupId));
      alert('삭제 완료');
      navigate('/group_management_page');
    } catch (err) {
      console.error('❌ 삭제 실패:', err);
      alert('삭제 실패');
    }
  };

  return (
    <>
      <GroupForm
        groupData={groupData}
        onChange={handleChange}
        onImageUpload={handleImageUpload}
        onMemberImageUpload={handleMemberImageUpload}
        onAddMember={handleAddMember}
        onRemoveMember={handleRemoveMember}
      />
      <div className="group_edit_actions">
        <button className="delete" onClick={handleDelete}>
          삭제
        </button>
        <button className="save" onClick={handleUpdate}>
          수정 완료
        </button>
      </div>
    </>
  );
};

export default GroupEdit;
