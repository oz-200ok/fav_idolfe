//그룹 멤버타입
export interface MemberType {
  id: number;
  name: string;
  image: string;
  imageFile: File | null;
}

export interface GroupFormData {
  name: string;
  agency: number; // 숫자 값
  sns: string;
  color: string;
  imageFile?: File | null;
}

export interface GroupFormState {
  groupName: string;
  agencyId: number;
  snsLink: string;
  groupImage: {
    url: string | null;
    file: File | null;
  };
  memberName: string;
  memberImage: {
    url: string | null;
    file: File | null;
  };
  members: MemberType[];
}
