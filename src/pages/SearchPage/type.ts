export type T_group = {
    // api 명세서에 아직 없어서 임의로 만든 타입정의
    group_id: number;
    agency_name: string;
    group_name: string;
    sns_links: {
      instagram: string;
    };
    group_color: string;
    group_image: string;
    member_count: number;
    members: string[];
  };