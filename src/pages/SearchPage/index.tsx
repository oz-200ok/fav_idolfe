import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import UserInstance from '@/utils/UserInstance';
import { apiConfig } from '@/utils/apiConfig';
import searchIcon from '../../assets/search.png';
import './SearchPage.scss';
import { IdolGroup } from './type';
import { getGroup } from '@/utils/group';

const SearchPage = () => {
  // 현재 페이지의 URL에서 검색어를 가져옴
  const location = useLocation();
  const searchQuery = location.state?.query || '';

  // 검색 결과와 추천 아이돌을 저장할 상태 변수
  const [searchResults, setSearchResults] = useState<IdolGroup[]>([]);
  const [recommendedIdols, setRecommendedIdols] = useState<IdolGroup[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  // 검색어가 변경될 때마다 검색 요청 실행
  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults(searchQuery);
    }
  }, [searchQuery]);

  // 아이돌 그룹을 검색하는 함수
  const fetchSearchResults = async (query: string) => {
    try {
      // API 요청을 통해 검색어에 해당하는 그룹 리스트를 가져옴
      const response = await axios.get(
        `http://127.0.0.1:8000/admin/Idols/`,
        apiConfig
      );

          // 응답 데이터를 필터링하여 검색어가 포함된 결과만 남김
          const filteredResults = response.data.filter((group: any) =>
            group.name.includes(query) // 그룹 이름에 검색어가 포함된 데이터만 필터링
        );

      // 검색 결과가 없을 경우 에러 메시지 출력
      if (filteredResults.data.length === 0) {
        setErrorMessage('검색 결과가 없습니다. 다시 검색해주세요.');
        setSearchResults([]);
        setRecommendedIdols([]);
      } else {
        setErrorMessage('');

        // 검색 결과를 상태에 저장하고, 각 그룹에 구독 여부 속성을 추가
        const idolGroups = filteredResults.data.map((group: any) => ({
          ...group,
          isSubscribed: false,
        }));
        setSearchResults(idolGroups);

        // 각 그룹의 소속사를 기준으로 추천 아이돌을 가져옴
        idolGroups.forEach((group: IdolGroup) => {
          fetchRecommendedIdols(group);
        });
      }
    } catch (error) {
      console.error('검색 오류:', error);
      setErrorMessage('검색 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  // 추천 아이돌을 가져오는 함수
  const fetchRecommendedIdols = async (group: IdolGroup) => {
    try {
      // 해당 그룹의 상세 정보를 가져옴 (소속사 정보 포함)
      const groupData = await getGroup(
        group.id,
        localStorage.getItem('access_token') || '',
      );
      if (!groupData) return;

      const agency = groupData.agency;

      // 같은 소속사의 다른 그룹을 추천 아이돌로 가져옴
      const response = await axios.get(`/idol/groups/`, apiConfig);
      const recommendedFilteredResult = response.data.filter(
        (g: any) => g.agency === agency && g.id !== group.id,
      );

      // 기존 추천 아이돌 목록에 새로운 추천 아이돌을 추가
      setRecommendedIdols((prev) => [...prev, ...recommendedFilteredResult]);
    } catch (error) {
      console.error('추천 아이돌 가져오기 오류:', error);
    }
  };

  // 그룹 구독 기능 (버튼 클릭 시 실행)
  const handleSubscribe = async (groupId: number) => {
    try {
      // 구독 요청을 서버에 보냄
      await UserInstance.post(`/service/subscriptions/`, { groupId });

      // 구독 상태를 변경하여 UI 업데이트
      setSearchResults((prevResults) =>
        prevResults.map((group) =>
          group.id === groupId ? { ...group, isSubscribed: true } : group,
        ),
      );
    } catch (error) {
      console.error('구독 오류:', error);
    }
  };

  // 검색 결과와 추천 아이돌을 합쳐서 표시할 데이터 생성
  const combinedResults = [...searchResults, ...recommendedIdols].slice(0, 14);
  const displayResults =
    combinedResults.length % 2 === 0
      ? combinedResults.slice(0, 8)
      : combinedResults.slice(0, 7);

  return (
    <div className="search_page">
      <div>
        <h1 className="search_title">
          <img src={searchIcon} alt="search" className="search_Icon" />"
          {searchQuery}" 검색결과
        </h1>
        <p className="search_text">검색결과 총 {searchResults.length} 건</p>
      </div>

      {errorMessage ? (
        <h1 className="error_message">{errorMessage}</h1>
      ) : (
        <div className="search_result">
          {displayResults.map((group) => (
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
      )}
    </div>
  );
};

export default SearchPage;
