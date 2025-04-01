import UserInstance from './UserInstance';
import { GroupFormData } from '@/types/groupFormData';

// 그룹 생성
export const saveGroup = async (groupData: GroupFormData) => {
  const formData = new FormData();

  formData.append('name', groupData.name);
  formData.append('agency', String(groupData.agency));
  formData.append('sns', groupData.sns);
  formData.append('color', groupData.color || '#C88DDD');

  if (groupData.imageFile) {
    formData.append('image_file', groupData.imageFile);
  }

  try {
    const response = await UserInstance.post('/idol/groups/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (err) {
    console.error('❌ 그룹 생성 실패:', err);
    throw err;
  }
};

// 그룹 조회
// export const getGroup = async (groupId: number) => {
//   const response = await UserInstance.get(`/idol/groups/${groupId}/`);
//   const { data } = response;
//   return {
//     ...data,
//     instagram: data.sns_links ? data.sns_links.instagram : '',
//     members: data.members || [],
//   };
// };
export const getGroup = async (groupId: number) => {
  const response = await UserInstance.get(`/idol/groups/${groupId}/`);
  const data = response.data;

  return {
    group_name: data.name,
    agency_id: data.agency,
    group_image: data.image,
    instagram: data.sns, // 또는 data.sns_links?.instagram
    members: (data.idol_names || []).map((idol: any, idx: number) => ({
      id: idx,
      name: idol.name,
      image: idol.image,
      imageFile: null,
    })),
  };
};

// 그룹 수정
export const updateGroup = async (groupId: number, formData: FormData) => {
  const response = await UserInstance.put(
    `/idol/groups/${groupId}/`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};

// 그룹 삭제
export const deleteGroup = async (groupId: number) => {
  const response = await UserInstance.delete(`/idol/groups/${groupId}/`);
  return response.data;
};

// 그룹 목록 조회
export const fetchGroupList = async () => {
  const response = await UserInstance.get('/idol/groups/');
  if (!response.status.toString().startsWith('2'))
    throw new Error('그룹 목록 불러오기 실패');
  return response.data;
};

// 일정 추가 (그룹 ID 기반)
export const addGroupSchedule = async (groupId: number) => {
  const response = await UserInstance.post('/admin/schedule', {
    group_id: groupId,
    title: '일괄 일정',
    description: '자동 추가된 일정입니다',
    location: '서울',
    start_time: '2025-03-15T14:00:00+09:00',
    end_time: '2025-03-15T16:00:00+09:00',
    participating_members: [],
  });
  return response.data;
};

// 일정 다운로드
export const downloadGroupSchedule = async (groupId: number) => {
  const response = await UserInstance.get(
    `/admin/group/${groupId}/schedules/download`,
    {
      responseType: 'blob',
    },
  );

  const url = window.URL.createObjectURL(response.data);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `schedule_group_${groupId}.json`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};
