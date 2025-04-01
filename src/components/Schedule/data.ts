import { T_GroupScheduleAdd } from '@/types/typeAPI';

export const data: T_GroupScheduleAdd[] = [
  {
    group_id: 1,
    title: '팬 미팅',
    description: '첫 번째 팬미팅',
    location: '올림픽 홀',
    start_time: '2025-03-15T 14:00:00+09:00',
    end_time: '2025-03-15T 16:00:00+09:00',
    participating_members: [
      {
        member_id: 1,
        name: 'First Member',
      },
      {
        member_id: 2,
        name: 'Second Member',
      },
      {
        member_id: 3,
        name: 'Second Member',
      },
    ],
  },
  {
    group_id: 2,
    title: '콘서트',
    description: '서울 콘서트',
    location: '서울 어딘가의 콘서트',
    start_time: '2025-03-15T 12:00:00+09:00',
    end_time: '2025-03-15T 20:00:00+09:00',
    participating_members: [
      {
        member_id: 1,
        name: '카리나',
      },
      {
        member_id: 2,
        name: '윈터',
      },
      {
        member_id: 3,
        name: '닝닝',
      },
    ],
  },
  {
    group_id: 3,
    title: '광고',
    description: '치킨 광고',
    location: '호식이두마리 본사',
    start_time: '2025-03-15T 14:00:00+09:00',
    end_time: '2025-03-15T 16:00:00+09:00',
    participating_members: [
      {
        member_id: 1,
        name: '카리나',
      },
    ],
  },
];

// 사용자가 구독한 그룹의 일정목록 조회
export const respone = {
  message: '구독한 그룹의 일정을 성공적으로 조회했습니다.',
  data: {
    total_groups: 3,
    groups: [
      {
        그룹: {
          group: {
            name: 'aespa',
            agency: 'SM Entertainment',
          },
          members: [
            {
              name: 'Karina',
              image_url: 'http://example.com/karina_pic.png',
              description: 'Leader, Main Dancer, Lead Rapper, Visual',
            },
          ],
        },
        일정: { 일정: '정보' },
      },
    ],
  },
};

// 관리중인 그룹 일정 조회 (관리자 전용 기능) get
export const respones = {
  group_id: 1,
  title: '팬 미팅',
  description: '첫 번째 팬미팅',
  location: '올림픽 홀',
  start_time: '2025-03-15T 14:00:00+09:00',
  end_time: '2025-03-15T 16:00:00+09:00',
  participating_members: [
    {
      name: 'First Member',
    },
    {
      name: 'Second Member',
    },
    {
      name: 'Second Member',
    },
  ],
};

// 사용자가 구독한 그룹을 검색
export const daser = {
  data: [
    {
      id: 2,
      group_id: 1,
      group_name: '에스파',
      notification: true,
    },
    {
      id: 5,
      group_id: 2,
      group_name: '레드벨벳',
      notification: true,
    },
  ],
};

// 사용자가 특정 일정을 상세조회 (스케줄 아이디 입력)
export const respnes일정 = {
  data: {
    schedule_id: 1, // 조회할 스케줄 아이디
    schedules: [{ 일정: '정보' }],
  },
};

// 특정 일정의 상세 정보 조회
export const eraera = {
  group_id: 1,
  schedule_id: 1,
};

// 특정 그룹의 멤버 조회 (그룹 아이디 입력)
export const irjlke = {
  data: {
    group: {
      name: 'aespa',
      agency: 'SM Entertainment',
    },
    members: [
      {
        name: 'Karina',
        image_url: 'http://example.com/karina_pic.png',
        description: 'Leader, Main Dancer, Lead Rapper, Visual',
      },
      {
        name: 'Winter',
        image_url: 'http://example.com/winter_pic.png',
        description: 'Lead Vocalist, Lead Dancer, Visual',
      },
      {
        name: 'Giselle',
        image_url: 'http://example.com/giselle_pic.png',
        description: 'Main Rapper, Sub Vocalist',
      },
      {
        name: 'Ningning',
        image_url: 'http://example.com/ningning_pic.png',
        description: 'Main Vocalist, Maknae',
      },
    ],
  },
};
