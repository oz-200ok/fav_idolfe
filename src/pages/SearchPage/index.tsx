import { useParams } from 'react-router-dom';
import './style.scss';
import { BoxList } from './boxList';

export default function SearchPage() {
  // Search API 호출은 나중에 연결해주기

  const params = useParams();
  const 검색어 = params.keyword;

  /**api에 담아올 임시 데이터 */
  const group = [
    {
      group_id: 3,
      agency_name: 'SM',
      group_name: '에스파',
      sns_links: {
        instagram: '에스파의 인스타그램 링크',
      },
      group_color: 'black',
      group_image: '에스파 이미지 링크',
      member_count: 4,
      members: ['윈터', '카리나', '닝닝', '지젤'],
    },
    {
      group_id: 1,
      agency_name: 'SM',
      group_name: '소녀시대',
      sns_links: {
        instagram: '소녀시대의 인스타그램 링크',
      },
      group_color: 'pink',
      group_image: '소녀시대 이미지 링크',
      member_count: 8,
      members: [
        '수영',
        '써니',
        '서현',
        '윤아',
        '태연',
        '효연',
        '티파니',
        '유리',
      ],
    },
    {
      group_id: 4,
      agency_name: 'STARSHIP',
      group_name: '다이브',
      sns_links: {
        instagram: '다이브의 인스타그램 링크',
      },
      group_color: 'blue',
      group_image: '다이브 이미지 링크',
      member_count: 6,
      members: ['안유진', '가을', '레이', '장원영', '리즈', '이서'],
    },
  ];

  /**api에 담아올 임시 데이터 */
  const recommendGroup = [
    // {
    //   group_id: 1,
    //   agency_name: 'SM',
    //   group_name: '소녀시대',
    //   sns_links: {
    //     instagram: '소녀시대의 인스타그램 링크',
    //   },
    //   group_color: 'pink',
    //   group_image: '소녀시대 이미지 링크',
    //   member_count: 8,
    //   members: ['수영', '써니', '서현', '윤아', '태연', '효연', '티파니', '유리'],
    // },
    {
      group_id: 2,
      agency_name: 'SM',
      group_name: '엑소',
      sns_links: {
        instagram: '엑소의 인스타그램 링크',
      },
      group_color: 'black',
      group_image: '엑소 이미지 링크',
      member_count: 8,
      members: ['시우민', '백현', '수호', '카이', '첸', '디오', '찬열', '세훈'],
    },
    {
      group_id: 5,
      agency_name: 'SM',
      group_name: '슈퍼주니어',
      sns_links: {
        instagram: '슈퍼주니어의 인스타그램 링크',
      },
      group_color: 'blue',
      group_image: '슈퍼주니어 이미지 링크',
      member_count: 8,
      members: ['신동', '예성', '시원', '규현', '이특', '려욱', '동해', '은혁'],
    },
    {
      group_id: 6,
      agency_name: 'SM',
      group_name: '레드벨벳',
      sns_links: {
        instagram: '레드벨벳의 인스타그램 링크',
      },
      group_color: 'red',
      group_image: '레드벨벳 이미지 링크',
      member_count: 5,
      members: ['웬디', '예리', '아이린', '슬기', '조이'],
    },
  ];

  return (
    <div className="div_container">
      <p className="p_inputSearch">{`"${검색어}"`}검색결과</p>
      <p className="p_SearchListCount">(검색결과 총 {group.length}건)</p>
      <hr />
      <BoxList group={group} />
      <hr />
      <BoxList group={recommendGroup} />
    </div>
  );
}
