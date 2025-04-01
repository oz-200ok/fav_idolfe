import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import UserInstance from '@/utils/UserInstance';
import { apiConfig } from '@/utils/apiConfig';
import searchIcon from '../../assets/search.png';
import instaImg from '@assets/instagram.png'; // 인스타그램 아이콘 추가
import './SearchPage.scss';
import { IdolGroup } from './type';
import toggleImg from '@assets/chevron-down.png';

// 로컬 스토리지 키(구독 상태 저장용)
const SUBSCRIPTION_KEY = 'user_subscriptions';

const SearchPage = () => {
  const location = useLocation();
  const searchQuery = location.state?.query || '';

  // 상태 관리 변수
  const [searchResults, setSearchResults] = useState<IdolGroup[]>([]);
  const [recommendedIdols, setRecommendedIdols] = useState<IdolGroup[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [visibleSearchCount, setVisibleSearchCount] = useState(4);
  const [visibleRecommendedCount, setVisibleRecommendedCount] = useState(4);

  // 검색어 변경 시 초기화
  useEffect(() => {
    if (searchQuery) {
      setVisibleSearchCount(4); // 더보기 상태 초기화
      setVisibleRecommendedCount(4);
      fetchSearchResults(searchQuery);
    }
  }, [searchQuery]);

  // 초기 구독 상태 가져오기
  const getInitialSubscriptionState = (groupId: number): boolean => {
    const subscriptions = JSON.parse(
      localStorage.getItem(SUBSCRIPTION_KEY) || '[]',
    );
    return subscriptions.includes(groupId);
  };

  // 검색 결과 조회
  const fetchSearchResults = async (query: string) => {
    try {
      const searchGroup = axios.create(apiConfig);
      const response = await searchGroup.get(`/idol/groups/?name=${query}`);

      // 결과 필터링 및 최대 10개 제한
      const filteredResults = response.data
        .filter((group: any) =>
          group.name.toLowerCase().includes(query.toLowerCase()),
        )
        .slice(0, 10);

      if (filteredResults.length === 0) {
        setErrorMessage('검색 결과가 없습니다. 다시 검색해주세요.');
        setSearchResults([]);
        setRecommendedIdols([]);
      } else {
        setErrorMessage('');

        // 구독 상태 포함한 검색 결과 생성
        const idolGroups = filteredResults.map((group: any) => ({
          ...group,
          isSubscribed: getInitialSubscriptionState(group.id), // ✨ 초기 구독 상태 적용
        }));
        setSearchResults(idolGroups);

        // 추천 데이터 초기화 후 새로 가져오기
        setRecommendedIdols([]);
        await Promise.all(
          idolGroups.map(async (group: IdolGroup) => {
            await fetchRecommendedIdols(group);
          }),
        );
      }
    } catch (error) {
      console.error('검색 오류:', error);
      setErrorMessage('검색 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  // 추천 아이돌 조회
  const fetchRecommendedIdols = async (group: IdolGroup) => {
    const agencyId = group.agency;
    try {
      const groupData = axios.create(apiConfig);
      const res = await groupData.get(`/idol/groups/?agency=${agencyId}`);

      if (!res.data) return;

      // 추천 결과 필터링 및 최대 10개 제한
      const recommendedFilteredResult = res.data
        .filter((g: any) => g.agency === agencyId && g.id !== group.id)
        .slice(0, 10)
        .map((g: any) => ({
          ...g,
          isSubscribed: getInitialSubscriptionState(g.id), // ✨ 초기 구독 상태 적용
        }));

      setRecommendedIdols((prevIdols) => {
        const newIdols = [...prevIdols, ...recommendedFilteredResult];
        // 중복 제거
        const uniqueIdols = Array.from(
          new Set(newIdols.map((idol) => idol.id)),
        ).map((id) => newIdols.find((idol) => idol.id === id));
        return uniqueIdols;
      });
    } catch (error) {
      console.error('추천 아이돌 가져오기 오류:', error);
    }
  };

  // 구독 상태 변경 핸들러
  const handleSubscribe = async (groupId: number, isSubscribed: boolean) => {
    try {
      // 1. API 요청
      if (isSubscribed) {
        await UserInstance.delete(`/service/subscriptions/${groupId}/`);
      } else {
        await UserInstance.post(`/service/subscriptions/`, {
          group_id: groupId,
        });
      }

      // 2. 로컬 스토리지 업데이트
      const subscriptions = JSON.parse(
        localStorage.getItem(SUBSCRIPTION_KEY) || '[]',
      );
      const newSubscriptions = isSubscribed
        ? subscriptions.filter((id: number) => id !== groupId)
        : [...subscriptions, groupId];
      localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(newSubscriptions));

      // 3. UI 상태 업데이트 (검색+추천 동시 반영)
      setSearchResults((prev) =>
        prev.map((group) =>
          group.id === groupId
            ? { ...group, isSubscribed: !isSubscribed }
            : group,
        ),
      );
      setRecommendedIdols((prev) =>
        prev.map((group) =>
          group.id === groupId
            ? { ...group, isSubscribed: !isSubscribed }
            : group,
        ),
      );
    } catch (error) {
      console.error('구독 오류:', error);
    }
  };

  // 더보기 핸들러
  const handleLoadMoreSearch = () => setVisibleSearchCount((prev) => prev + 4);
  const handleLoadMoreRecommended = () =>
    setVisibleRecommendedCount((prev) => prev + 4);

  return (
    <div className="search_page">
      {/* 검색 헤더 */}
      <div className="search_title">
        <img src={searchIcon} alt="search" className="search_Icon" />
        <p className="search_title_text">"{searchQuery}" 검색결과</p>
      </div>
      <div>
        <p className="search_text">검색결과 총 {searchResults.length} 건</p>
      </div>

      {/* 검색 결과 영역 */}
      {errorMessage ? (
        <h1 className="error_message">{errorMessage}</h1>
      ) : (
        <div className="search_result">
          {searchResults.slice(0, visibleSearchCount).map((group) => (
            <div key={group.id} className="group_card">
              <img src={group.image} alt={group.name} className="group_img" />
              <div className="group_info">
                <h1 className="group_name">{group.name}</h1>
                <p className="group_mem">
                  {Array.isArray(group.idol_names)
                    ? group.idol_names.join(', ')
                    : group.idol_names}
                </p>
                <p className="group_agency">{group.agency}</p>

                {/* 인스타그램 링크 (이미지로 변경) */}
                <a
                  href={group.sns} // SNS 필드를 실제 링크로 사용
                  className="group_sns"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={instaImg} alt="인스타그램" className="insta_icon" />
                </a>

                {/* 구독 버튼 */}
                <div>
                  <button
                    className={`sub_button ${group.isSubscribed ? 'subscribed' : ''}`}
                    onClick={() =>
                      handleSubscribe(group.id, group.isSubscribed)
                    }
                  >
                    {group.isSubscribed ? '구독 중' : '구독하기'}
                  </button>
                </div>
              </div>
            </div>
          ))}
          {searchResults.length > visibleSearchCount && (
            <button className="load_more_text" onClick={handleLoadMoreSearch}>
              더보기
              <img src={toggleImg} alt="더보기 토글" />
            </button>
          )}
        </div>
      )}

      {/* 추천 아이돌 영역 */}
      {recommendedIdols.length > 0 && (
        <div className="recommended_group">
          <p className="recommended_title">추천 아이돌</p>
          <div className="recommended_container">
            {recommendedIdols.slice(0, visibleRecommendedCount).map((group) => (
              <div key={group.id} className="group_card">
                <img src={group.image} alt={group.name} className="group_img" />
                <div className="group_info">
                  <h1 className="group_name">{group.name}</h1>
                  <p className="group_mem">
                    {Array.isArray(group.idol_names)
                      ? group.idol_names.join(', ')
                      : group.idol_names}
                  </p>
                  <p className="group_agency">{group.agency}</p>

                  {/* 인스타그램 링크 (이미지로 변경) */}
                  <a
                    href={group.sns}
                    className="group_sns"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={instaImg}
                      alt="인스타그램"
                      className="insta_icon"
                    />
                  </a>

                  {/* 구독 버튼 */}
                  <div>
                    <button
                      className={`sub_button ${group.isSubscribed ? 'subscribed' : ''}`}
                      onClick={() =>
                        handleSubscribe(group.id, group.isSubscribed)
                      }
                    >
                      {group.isSubscribed ? '구독 중' : '구독하기'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {recommendedIdols.length > visibleRecommendedCount && (
            <button
              className="load_more_text"
              onClick={handleLoadMoreRecommended}
            >
              더보기
              <img src={toggleImg} alt="더보기 토글" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
