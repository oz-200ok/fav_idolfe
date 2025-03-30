export interface GroupFormData {
    name: string;
    agency: number; // 숫자 값
    sns: string;
    color: string;
    imageFile?: File | null;
  }