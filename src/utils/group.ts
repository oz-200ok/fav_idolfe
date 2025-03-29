import axios from './UserInstance';

// 그룹 생성
export const saveGroup = async (formData: FormData, token: string) => {
  const res = await fetch('http://127.0.0.1:8000/ilog/idol/groups/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error('그룹 저장 실패');
  return await res.json();
};

// 그룹 조회
export const getGroup = async (groupId: number, token: string) => {
  const response = await axios.get(`/ilog/admin/group/${groupId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 그룹 수정
export const updateGroup = async (groupId: number, formData: FormData, token: string) => {
  const response = await axios.put(`/ilog/admin/group/${groupId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 그룹 삭제
export const deleteGroup = async (groupId: number, token: string) => {
  const response = await axios.delete(`/ilog/admin/group/${groupId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 그룹 목록 조회
export async function fetchGroupList(token: string) {
  const res = await fetch('http://127.0.0.1:8000/ilog/idol/groups/', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('그룹 목록 불러오기 실패');
  return await res.json();
}

// 일정 추가 (그룹 ID 기반)
export const addGroupSchedule = async (groupId: number, token: string) => {
  const response = await axios.post(
    '/ilog/admin/schedule',
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
    }
  );
  return response.data;
};

// 일정 다운로드
export const downloadGroupSchedule = async (groupId: number, token: string) => {
  const response = await axios.get(`/ilog/admin/group/${groupId}/schedules/download`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: 'blob',
  });

  const url = window.URL.createObjectURL(response.data);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `schedule_group_${groupId}.json`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};
