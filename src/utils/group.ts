import axios from 'axios';
import { apiConfig } from './apiConfig';
import { GroupFormData } from '@/types/group';

const axiosInstance = axios.create({
  baseURL: apiConfig.baseURL,
});

// 그룹 생성
export const saveGroup = async (groupData: any, accessToken: string) => {
  const formData = new FormData();

  formData.append('name', groupData.name);
  formData.append('agency', String(groupData.agency)); // 정수 → 문자열로 변환
  formData.append('sns', groupData.sns);
  formData.append('color', groupData.color || '#C88DDD');

  if (groupData.imageFile) {
    formData.append('image_file', groupData.imageFile);
  }

  try {
    const response = await axiosInstance.post('/idol/groups/', formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (err) {
    console.error('❌ API 오류:', err);
    throw err;
  }
};

// 그룹 조회
export const getGroup = async (groupId: number, token: string) => {
  const response = await axiosInstance.get(`/idol/groups/${groupId}`, {
    // ✅ 경로 수정
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 그룹 수정
export const updateGroup = async (
  groupId: number,
  formData: FormData,
  token: string,
) => {
  const response = await axiosInstance.put(
    `/idol/groups/${groupId}`,
    formData,
    {
      // ✅ 경로 수정
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

// 그룹 삭제
export const deleteGroup = async (groupId: number, token: string) => {
  const response = await axiosInstance.delete(`/idol/groups/${groupId}`, {
    // ✅ 경로 수정
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 그룹 목록 조회
export async function fetchGroupList(token: string) {
  const response = await axiosInstance.get('/idol/groups/', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.status.toString().startsWith('2'))
    throw new Error('그룹 목록 불러오기 실패');
  return response.data;
}

// 일정 추가 (그룹 ID 기반)
export const addGroupSchedule = async (groupId: number, token: string) => {
  const response = await axiosInstance.post(
    '/admin/schedule',
    {
      group_id: groupId,
      title: '일괄 일정',
      description: '자동 추가된 일정입니다',
      location: '서울',
      start_time: '2025-03-15T14:00:00+09:00',
      end_time: '2025-03-15T16:00:00+09:00',
      participating_members: [],
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

// 일정 다운로드
export const downloadGroupSchedule = async (groupId: number, token: string) => {
  const response = await axiosInstance.get(
    `/admin/group/${groupId}/schedules/download`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
