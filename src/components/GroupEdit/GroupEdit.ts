//그룹 멤버타입
export interface MemberType {
    id: number;
    name: string;
    image: string;
    imageFile?: File | null;
  }

  //공통 인풋 필드 타입
  export interface InputFieldType {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
  }
  