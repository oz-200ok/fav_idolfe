import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import UserInstance from '@/utils/UserInstance';
import { apiConfig } from '@/utils/apiConfig';
import searchIcon from '../../assets/search.png';
import './SearchPage.scss';
import { IdolGroup } from './type';
import toggleImg from '@assets/chevron-down.png';
import GroupCard from './GroupCard';

const SUBSCRIPTION_KEY = 'user_subscriptions'; // 로컬 스토리지 키

const SearchPage = () => {
  const location = useLocation();
  const searchQuery = location.state?.query || '';

  const [searchResults, setSearchResults] = useState<IdolGroup[]>([]);
  const [recommendedIdols, setRecommendedIdols] = useState<IdolGroup[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [visibleCount, setVisibleCount] = useState({
    search: 4,
    recommended: 4,
  });

  // 검색어 변경 시 초기화
  useEffect(() => {
    if (searchQuery) {
      setVisibleCount({ search: 4, recommended: 4 });
      fetchSearchResults(searchQuery);
    }
  }, [searchQuery]);

  // 초기 구독 상태 가져오기
  const getInitialSubscriptionState = (groupId: number) => {
    const subscriptions = JSON.parse(
      localStorage.getItem(SUBSCRIPTION_KEY) || '[]',
    );
    return subscriptions.includes(groupId);
  };

  // 검색 결과 조회
  const fetchSearchResults = async (query: string) => {
    try {
      const response = await axios.get(
        `/idol/groups/?name=${query}`,
        apiConfig,
      );

      const groupName = response.data.data;

      // 필터링 후 최대 10개 제한
      const filteredResults = groupName
        .filter((group: any) =>
          group.name.toLowerCase().includes(query.toLowerCase()),
        )
        .slice(0, 10)
        .map((group: any) => ({
          ...group,
          isSubscribed: getInitialSubscriptionState(group.id),
        }));

      if (filteredResults.length === 0) {
        setErrorMessage('검색 결과가 없습니다. 다시 검색해주세요.');
        setSearchResults([]);
        setRecommendedIdols([]);
      } else {
        setErrorMessage('');
        setSearchResults(filteredResults);
        fetchRecommendedIdols(filteredResults);
      }
    } catch (error) {
      console.error('검색 오류:', error);
      setErrorMessage('검색 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  // 추천 아이돌 조회 (같은 소속사만)
  const fetchRecommendedIdols = async (idolGroups: IdolGroup[]) => {
    try {
      const agencyId = idolGroups[0]?.agency; // 첫 번째 그룹의 소속사 ID
      if (!agencyId) return;

      const response = await axios.get(
        `/idol/groups/?agency=${agencyId}`,
        apiConfig,
      );

      const recommendedGroups = response.data.data;

      const recommendedFilteredResult = recommendedGroups
        .filter(
          (g: any) =>
            g.agency === agencyId &&
            !idolGroups.some((group) => group.id === g.id),
        ) // 같은 소속사 + 검색 결과 제외
        .slice(0, 10)
        .map((g: any) => ({
          ...g,
          isSubscribed: getInitialSubscriptionState(g.id),
        }));

      setRecommendedIdols(recommendedFilteredResult);
    } catch (error) {
      console.error('추천 아이돌 가져오기 오류:', error);
      console.log(error);
    }
  };

  // 구독 상태 변경
  const handleSubscribe = async (groupId: number, isSubscribed: boolean) => {
    try {
      if (isSubscribed) {
        await UserInstance.delete(`/service/subscriptions/${groupId}/`);
      } else {
        await UserInstance.post(`/service/subscriptions/`, {
          group_id: groupId,
        });
      }

      const subscriptions = JSON.parse(
        localStorage.getItem(SUBSCRIPTION_KEY) || '[]',
      );
      const newSubscriptions = isSubscribed
        ? subscriptions.filter((id: number) => id !== groupId)
        : [...subscriptions, groupId];
      localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(newSubscriptions));

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

  return (
    <div className="search_page">
      {/* 검색 헤더 */}
      <div className="search_title">
        <img src={searchIcon} alt="search" className="search_Icon" />
        <p className="search_title_text">"{searchQuery}" 검색결과</p>
      </div>
      <p className="search_text">검색결과 총 {searchResults.length} 건</p>

      {/* 검색 결과 */}
      {errorMessage ? (
        <h1 className="error_message">{errorMessage}</h1>
      ) : (
        <>
          <div className="search_result">
            {searchResults.slice(0, visibleCount.search).map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                onSubscribe={handleSubscribe}
              />
            ))}
          </div>
          {searchResults.length > visibleCount.search && (
            <LoadMoreButton
              onClick={() =>
                setVisibleCount((prev) => ({
                  ...prev,
                  search: prev.search + 4,
                }))
              }
            />
          )}
        </>
      )}

      {/* 추천 아이돌 */}
      {recommendedIdols.length > 0 && (
        <>
          <p className="recommended_title">추천 아이돌</p>
          <div className="recommended_container">
            {recommendedIdols
              .slice(0, visibleCount.recommended)
              .map((group) => (
                <GroupCard
                  key={group.id}
                  group={group}
                  onSubscribe={handleSubscribe}
                />
              ))}
          </div>
          {recommendedIdols.length > visibleCount.recommended && (
            <LoadMoreButton
              onClick={() =>
                setVisibleCount((prev) => ({
                  ...prev,
                  recommended: prev.recommended + 4,
                }))
              }
            />
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;

// --------------------------
// 🔹 **컴포넌트 분리**
// --------------------------

// 더보기 버튼 컴포넌트
const LoadMoreButton = ({ onClick }: { onClick: () => void }) => (
  <button className="load_more_text" onClick={onClick}>
    더보기
    <img src={toggleImg} alt="더보기 토글" />
  </button>
);
