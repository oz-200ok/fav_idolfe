// export 붙은 건 외부에서 사용할 타입
// 안 붙은 건, 여기 내에서만 사용할 타입

/**
 * 로그인 API 타입
 */
export type T_Login = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: {
    id: number;
    email: string;
  };
};

/**
 * 소셜 로그인 API 타입
 */
export type T_SocialLogin = { token: string };

/**
 * 회원가입 API 타입
 */
export type T_Register = {
  message: string;
  data: {
    user_id: number;
    email: string;
    is_verified: boolean;
    resend_available_in: number;
  };
};

/**
 * 이메일 인증 API 타입
 */
export type T_VerifyEmail = {
  message: string;
  data: {
    id: number;
    name: string;
    email: string;
    phone: null | string;
  };
};

/**
 * 이메일 찾기 API 타입
 */
export type T_FindEmail = {
  status: string;
  message: string;
  data: {
    email: string;
  };
};

/**
 * 비밀번호 찾기 API 타입
 */
export type T_FindPassword = {
  message: string;
};

/**
 * 비밀번호 재설정 API 타입
 */
export type T_ResetPassword = {
  message: string;
};

/**
 * 내 프로필 API 타입
 */
export type T_UserProfile = {
  data: {
    id: number;
    name: string;
    email: string;
    phone: null | string;
  };
};

/**
 * 프로필 정보 수정 API 타입
 */
export type T_UserProfileEdit = {
  message: string;
};

/**
 * 닉네임, 이메일, 전화번호
 * 중복 체크 API 타입
 */
export type T_CheckDuplicate = {
  message: string;
  data: {
    username: string;
    is_duplicate: boolean;
  };
};

/**
 * 회원탈퇴 API 타입
 */
export type T_Userdelete = {
  message: string;
};

/**
 * 관리자 기능
 */

/**
 * 그룹에 추가할 멤버 타입
 */
type T_GroupMemberAdd = {
  name: string;
  image: string; //실제 파일 데이터가 아니라 URL로 저장된다고 가정
};
// T_GroupMember -> T_GroupMemberAdd 로 변경 (사유:아래 비슷한 타입의 변수명 짓기 어려워서)

/**
 * 그룹 추가 API 타입
 */
export type T_GroupAddtype = {
  agency_name: string;
  group_name: string;
  sns_links: {
    instagram: string;
  };
  group_color: string;
  group_image: string;
  member_count: number;
  members: T_GroupMemberAdd[];
};

/**
 * 그룹 수정 API 타입
 */
export type T_GroupModify = {
  agency_name: string;
  group_name: string;
  sns_links: {
    instagram: string;
  };
  group_color: string;
  group_image: string;
  member_count: number;
  members: T_GroupMemberAdd[];
};

/**
 * 그룹 삭제 API 타입
 */
export type T_GroupDelete = {
  group_id: number;
  agency_name: string;
  group_name: string;
};

/**
 * 그룹 일정 확인 API 타입
 */
export type T_GroupScheduleCheck = {
  view_type: string;
  date: string;
};

/**
 * 추가된 멤버 타입
 */
type T_GroupMember = {
  member_id: number;
  name: string;
};

/**
 * 그룹 일정 추가 API 타입
 * @start_time: ISO 8601 형식의 날짜 문자열
 * @end_time: ISO 8601 형식의 날짜 문자열
 */
export type T_GroupScheduleAdd = {
  group_id: number;
  title: string;
  description: string;
  location: string;
  start_time: string;
  end_time: string;
  participating_members: T_GroupMember[];
};

/**
 * 그룹 일정 수정 API 타입
 */
export type T_GroupScheduleModify = {
  group_id: number;
  title: string;
  description: string;
  location: string;
  start_time: string;
  end_time: string;
  participating_members: T_GroupMember[];
};

/**
 * 그룹 일정 삭제 API 타입
 */
export type T_GroupScheduleDelete = {
  group_id: number;
  title: string;
  schedule_id: number;
};

/**
 * 특정 일정 상세 정보 조회 API 타입
 */
export type T_GroupSpecialSchedule = {
  group_id: number;
  schedule_id: number;
};

/**
 * 서비스 기능
 */

/**
 * 사용자 그룹 검색 API 타입
 */
export type T_UserGroupSearch = {
  keyword: string;
  page: number;
  size: number;
};

/**
 * 구독한 그룹 구독 또는 구독해제 API 타입
 */
export type T_UserGroupSub = {
  group_id: number;
  notification: boolean;
};

/**
 * 구독한 그룹 일정 목록 조회 API 타입
 */
export type T_UserGroupScheduleSearch = {
  status: string;
  message: string;
  data: {
    total_groups: number;
    // groups: string [ {그룹상세정보}, {일정정보}} ] // fix: 상세정보, 일정정보 가져오는 값을 알 수 없음.
  };
};

/**
 * 특정 일정 상세 조회 API 타입
 */
export type T_UserGroupSchedule = {
  data: {
    schedule_id: number;
    // schedules: [{일정정보}] // fix: 일정정보 가져오는 값을 알 수 없음.
  };
};
