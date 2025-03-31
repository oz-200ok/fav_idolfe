import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Axios는 HTTP 요청을 쉽게 할 수 있도록 도와주는 라이브러리
import UserInstance from '@/utils/UserInstance'; // UserInstance는 인증이 필요한 요청을 보내는 유틸리티 인스턴스
import { apiConfig } from '@/utils/apiConfig'; // API 요청에 필요한 설정을 담고 있는 파일
import searchIcon from '../../assets/search.png';
import './SearchPage.scss';
import { IdolGroup } from './type'; // IdolGroup 타입을 불러와서 검색 결과 타입을 정의
import { getGroup } from '@/utils/group'; // 그룹 데이터를 가져오는 유틸리티 함수
import { array } from 'zod';

const SearchPage = () => {
  // 현재 페이지의 URL에서 검색어를 가져옴
  const location = useLocation();
  const searchQuery = location.state?.query || ''; // URL의 상태에서 검색어를 가져옴. 없으면 빈 문자열.

  // 검색 결과와 추천 아이돌을 저장할 상태 변수
  const [searchResults, setSearchResults] = useState<IdolGroup[]>([]); // 검색된 아이돌 그룹 저장
  const [recommendedIdols, setRecommendedIdols] = useState<IdolGroup[]>([]); // 추천된 아이돌 그룹 저장
  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태
  const [visibleCount, setVisibleCount] = useState(8); // 더보기 버튼을 위한 상태

  // 페이지가 처음 로드되거나, 검색어가 변경될 때마다 호출되는 useEffect
  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults(searchQuery); // 검색어가 있을 경우 검색 결과를 가져옴
    }
  }, [searchQuery]); // 검색어가 변경될 때마다 다시 실행

  // 아이돌 그룹을 검색하는 함수
  const fetchSearchResults = async (query: string) => {
    try {
      // 검색어로 필터링된 그룹 리스트를 가져오는 API 요청
      const searchGroup = axios.create(apiConfig);
      const response = await searchGroup.get(`/idol/groups/?name=${query}`);

      // 응답 데이터를 필터링하여 검색어가 포함된 그룹만 남김
      const filteredResults = response.data.filter(
        (group: any) => group.name.toLowerCase().includes(query.toLowerCase()), // 그룹 이름에 검색어가 포함되었는지 체크
      );

      // 검색 결과가 없을 경우 에러 메시지 출력
      if (filteredResults.length === 0) {
        setErrorMessage('검색 결과가 없습니다. 다시 검색해주세요.');
        setSearchResults([]);
        setRecommendedIdols([]);
      } else {
        setErrorMessage(''); // 에러 메시지 초기화

        // 검색 결과를 상태에 저장하고, 각 그룹에 구독 여부 속성을 추가
        const idolGroups = filteredResults.map((group: any) => ({
          ...group,
          isSubscribed: false, // 초기 구독 여부는 false로 설정
        }));
        setSearchResults(idolGroups);

        // 추천 아이돌을 가져오기 위한 비동기 처리 (각 그룹마다)
        // 각 그룹에 대해 추천 아이돌을 가져오기
        await Promise.all(
          idolGroups.map(async (group: IdolGroup) => {
            await fetchRecommendedIdols(group); // 그룹에 대한 추천 아이돌 가져오기
          }),
        );
      }
    } catch (error) {
      console.error('검색 오류:', error);
      setErrorMessage('검색 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  // 추천 아이돌을 가져오는 함수
  const fetchRecommendedIdols = async (group: IdolGroup) => {
    const agencyId = group.agency; // 해당 그룹의 소속사를 추출

    try {
      // console.log('에이전시아이디:', agencyId);
      const groupData = axios.create(apiConfig);
      const res = await groupData.get(`/idol/groups/?agency=${agencyId}`);

      // console.log('그룹정보:', res);

      if (!res.data) return; // 그룹 데이터가 없으면 반환

      // 같은 소속사의 다른 그룹을 추천 아이돌로 가져옴
      const recommendedFilteredResult = res.data.filter(
        (g: any) => g.agency === agencyId && g.id !== group.id, // 같은 소속사이면서 해당 그룹 제외
      );

      // 중복 제거 후 상태 업데이트 (추천 아이돌 목록에서 중복 아이돌 제거)

      setRecommendedIdols((prevIdols) => {
        const newIdols = [...prevIdols, ...recommendedFilteredResult];
        const uniqueIdols = Array.from(
          new Set(newIdols.map((idol) => idol.id)),
        ).map((id) => newIdols.find((idol) => idol.id === id));

        return uniqueIdols;
      });
    } catch (error) {
      console.error('추천 아이돌 가져오기 오류:', error);
    }
  };

  // 그룹 구독 기능 (버튼 클릭 시 실행)
  const handleSubscribe = async (groupId: number) => {
    try {
      // 구독 요청을 서버에 보냄
      await UserInstance.post(`/service/subscriptions/`, { group_id:groupId });

      // 구독 상태를 변경하여 UI 업데이트
      setSearchResults((prevResults) =>
        prevResults.map(
          (group) =>
            group.id === groupId ? { ...group, isSubscribed: true } : group, // 구독 상태 변경
        ),
      );
    } catch (error) {
      console.error('구독 오류:', error);
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prevCount) =>
      Math.min(prevCount + 8, searchResults.length),
    );
  };
  return (
    <div className="search_page">
      <div className="search_title">
        <img src={searchIcon} alt="search" className="search_Icon" />
        <p className="search_title_text">"{searchQuery}" 검색결과</p>
      </div>
      <div>
        <p className="search_text">검색결과 총 {searchResults.length} 건</p>
      </div>
      {/* 검색결과 출력 */}
      {errorMessage ? (
        // 에러 메시지 출력
        <h1 className="error_message">{errorMessage}</h1>
      ) : (
        <div className="search_result">
          {searchResults.slice(0, visibleCount).map((group) => (
            <div key={group.id} className="group_card">
              <img src={group.image} alt={group.name} className="group_img" />
              <div className="group_info">
                <h1 className="group_name">{group.name}</h1>
                <p className="group_mem">
                  {Array.isArray(group.idol)
                    ? group.idol.join(', ')
                    : group.idol}
                </p>
                <p className="group_agency">{group.agency}</p>
                <a className="group_sns">{group.sns}</a>
                <div>
                  <button
                    className={`sub_button ${group.isSubscribed ? 'subscribed' : ''}`}
                    onClick={() => handleSubscribe(group.id)}
                  >
                    {group.isSubscribed ? '구독 중' : '구독하기'}
                  </button>
                </div>
              </div>
            </div>
          ))}
          {/* 더보기버튼 */}
          {visibleCount < searchResults.length && (
            <button className="load_more_button" onClick={handleLoadMore}>
              더보기
            </button>
          )}
        </div>
      )}
      {recommendedIdols.length > 0 && (
        <div className="recommended_group">
          <p className="recommended_title">추천 아이돌</p>

          <div className="recommended_container">
            {recommendedIdols.map((group) => (
              <div key={group.id} className="group_card">
                <img src={group.image} alt={group.name} className="group_img" />

                <div className="group_info">
                  <h1 className="group_name">{group.name}</h1>
                  <p className="group_mem">
                    {Array.isArray(group.idol)
                      ? group.idol.join(', ')
                      : group.idol}
                  </p>
                  <p className="group_agency">{group.agency}</p>
                  <a className="group_sns">{group.sns}</a>

                  <div>
                    <button
                      className={`sub_button ${group.isSubscribed ? 'subscribed' : ''}`}
                      onClick={() => handleSubscribe(group.id)}
                    >
                      {group.isSubscribed ? '구독 중' : '구독하기'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
