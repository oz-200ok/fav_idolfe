import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import UserInstance from '@/utils/UserInstance';
import { apiConfig } from '@/utils/apiConfig';
import searchIcon from '../../assets/search.png';
import './SearchPage.scss';
import { IdolGroup } from './type';

const SearchPage = () => {
  //현재 페이지 상태 (location.state)에서 검색어 가져오기
  const location = useLocation();
  //검색어가 없을 경우 빈 문자열 처리
  const searchQuery = location.state?.query || '';

  //검색결과 데이터를 저장할 상태
  const [searchResults, setSearchResults] = useState([]);
  const [recommendedIdols, setRecommendedIdols] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults(searchQuery);
    }
  }, [searchQuery]); //검색어가 변경될때마다 검색 실행

  //api요청함수
  const fetchSearchResults = async (query: string) => {
    try {
      const response = await axios.get(
        `/idol/groups/?name=${query}`,
        apiConfig,
      );

      if (response.data.length === 0) {
        setErrorMessage('검색결과가 없습니다. 다시 검색해주세요.');
        setSearchResults([]);
        setRecommendedIdols([]);
      } else {
        setErrorMessage('');
        const idolGroups = response.data.map((group: any) => ({
          ...group,
          isSubscribed: false,
        }));
        setSearchResults(idolGroups);
        fetchRecommendedIdols(idolGroups);
      }
    } catch (error) {
      console.error('검색 오류:', error);
      setErrorMessage('검색 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  //같은 네임을 가진 그룹의 id를 추출하고 그룹정보 가져오기
  const fetchRecommendedIdols = async (searchResults: IdolGroup[]) => {
    if (searchResults.length > 0) {
      const groupIds = searchResults.map((group) => group.id);
      try {
        const response = await axios.get(`/idol/groups/`, apiConfig);
        const filteredResults = response.data.filter((group: any) =>
          groupIds.includes(group.id),
        );
        setSearchResults(filteredResults);

        // 추천 아이돌: 같은 소속사의 그룹 중 검색 결과에 없는 그룹만 선택
        const agency = searchResults[0].agency;
        const recommended = response.data.filter(
          (group: any) =>
            group.agency === agency && !groupIds.includes(group.id),
        );
        setRecommendedIdols(recommended);
      } catch (error) {
        console.error('추천 아이돌 가져오기 오류:', error);
        setErrorMessage('추천 아이돌이 없습니다. 다시 시도해주세요!');
      }
    }
  };

  return (
    <div className="search_page">
      <div>
        <h1 className="search_title">
          <img src={searchIcon} alt="search" className="search_Icon" />"
          {searchQuery}" 검색결과
        </h1>
        <p className="search_text">검색결과 총 {searchResults.length} 건</p>
      </div>
      {/* 검색결과 */}
      {errorMessage ? (
        <h1 className="error_message">{errorMessage}</h1>
      ) : (
        <div className="search_result">
          {searchResults.map((group) => (
            <div key={group.name} className="group_card">
              <img src={group.image} alt={group.name} className="group_img" />
              <div className="group_info">
                <h1 className="group_name">{group.name}</h1>
                <p className="group_mem">{group.idol}</p>
                <p className="group_agency">{group.agencys}</p>
                <p className="group_sns">{group.sns}</p>
                <div>
                  <button className="sub_button">구독하기</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* 추천아이돌 */}
      {recommendedIdols.length > 0 && (
        <div className="recommende_grops">
          <h1>추천 아이돌</h1>
          <div className="recommended_container">
            {recommendedIdols.map((group) => (
              <div key={group.name} className="group_card">
                <img src={group.image} alt={group.name} className="group_img" />
                <div className="group_info">
                  <h1 className="group_name">{group.name}</h1>
                  <p className="group_mem">{group.idol}</p>
                  <p className="group_agency">{group.agencys}</p>
                  <p className="group_sns">{group.sns}</p>
                  <div>
                    <button className="sub_button">구독하기</button>
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
