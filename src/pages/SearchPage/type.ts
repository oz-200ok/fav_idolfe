export interface IdolGroup {
  id: number;
  name: string;
  image: string;
  idol_name: string[]; // 아이돌 이름 배열
  agency: string;
  sns: string;
  isSubscribed: boolean; // 구독 여부
}
