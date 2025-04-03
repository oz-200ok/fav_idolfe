export interface T_EditProfile {
  email: string;
  name: string;
  // ... 필요한 필드만 선언
}

export interface I_EditInfoValues {
  password: string;
  currentPassword: string;
  username: string;
  phone: string;
}

export interface I_UpdateProfileRequest {
  password?: string;
  current_password?: string;
  username?: string;
  phone?: string;
}
