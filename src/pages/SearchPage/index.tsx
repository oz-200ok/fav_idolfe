// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import './Searchpage.scss';

// //그룹데이터타입
// import { T_group } from './type';
// //GroupPlusButton 및 ListMexPlus: "더보기" 버튼 관련 컴포넌트/함수
// import { GroupPlusButton, ListMexPlus } from '../../components/SearchGroupPlus';
// //각 그룹을 카드형태로 렌더링하는 컴포넌트
// import { BoxList } from '../../components/SearchBoxList/boxList';
// //더미데이터 실제 api 연동시 삭제될 데이터
// import { group, recommendGroup } from '../../components/SearchGroupPlus/data';
// //검색로고
// import search_logo from '@assets/search.png';
// import axios from 'axios';

// export default function SearchPage() {
//   // Search API 호출은 나중에 연결해주기
//   // 추천 리스트도 API 호출 후 기능 구현
//   //url파라미터에서 키워드 검색어 가져옴
//   const { keyword } = useParams();

//   // 현 페이지는 리스트를 백엔드에서 조회 후 값을 받아오는 형식 기반으로 구성되어 있습니다
//   // 검색 결과(그룹 리스트) 상태입니다.
//   // 실제 API 연동 시 이 상태를 axios 호출 결과로 업데이트
//   const [groupList, setGroupList] = useState<T_group[]>();

//   //추천그룹(아이돌)리스트상태
//   const [recommendGroups, setRecommendGroups] = useState<T_group[]>([]);

//   //추천그룹중 화면에 표시할 상태(초기 8개, 더보기 클릭시 추가, 최대 14개
//   const [visibleCount, setVisibleCount] = useState(8);

//   useEffect(() => {

//     //실제 api 연동시 살리기
//     // async function fetchSearchResults(){
//     //   try {
//     //     const response =await axios.get('http://100.26.111.172/swagger/idol/groups/{id}/')
//     //     setGroupList(response.data)
//     //   }catch(error){
//     //     console.error('검색결과 불러오기 실패:',error)
//     //     setGroupList([])
//     //   }
//     // }
//     //   fetchSearchResults()

//       //더미데이터 api가져오면 삭제하기
//       // setGroupList(ListMexPlus(group, 0));
//     }, [keyword]);

//   //추천그룹데이터
//   useEffect(()=>{

//     //api가져오면 살리기
//     // async function fetchRecommendGroups(){
//     //   try {
//     //     const response = await axios.get('http://100.26.111.172/swagger/idol/groups/{id}/')
//     //     setRecommendGroups(response.data)
//     //   }catch (error){
//     //     console.error('추천그룹 불러오기 실패:',error)
//     //     setRecommendGroups([])
//     //   }
//     // }
//     //   fetchRecommendGroups()

//       //api불러오면 삭제 -임시데이터
//       // setRecommendGroups(recommendGroup)
//     },[keyword])

//     //더보기 버튼클릭시 추천그룹 추가로 로드

//     const handleMore = () => {
//       // 현재 보이는 추천그룹개수에 8개를 추가하고 최대 14개로 제한
//       setVisibleCount((prev) => Math.min(prev + 8, 14));
//     };

//   return (
//     <div className="div_container">
//       {/* 좌측상단 텍스트 */}
//       <div className="search_title">
//         <p className="p_input_search">
//           <img src={search_logo}></img>
//           {`"${keyword}"`}검색결과
//         </p>
//         <p className="p_search_list_count">(검색결과 총 {group.length}건)</p>
//       </div>

//       {/* 검색결과리스트 */}
//       <div className="div_boxlist">
//         {groupList?.map((list, index) => {
//           return <BoxList group={list} key={index} />;
//         })}
//       </div>
//       <GroupPlusButton
//         group={group}
//         groupList={groupList}
//         setGroupList={setGroupList}
//       />
//       <hr />

//       <div className="div_boxlist">
//         {recommendGroup.map((list, index) => {
//           return <BoxList group={list} key={index} />;
//         })}
//       </div>
//     </div>
//   );
// }
