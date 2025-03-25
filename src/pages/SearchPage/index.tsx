import { useParams } from 'react-router-dom';
import './Searchpage.scss';
import { useEffect, useState } from 'react';
import { T_group } from './type';
import { GroupPlusButton, ListMexPlus } from '../../components/SearchGroupPlus';
import { group, recommendGroup } from '../../components/SearchGroupPlus/data';
import { BoxList } from '../../components/SearchBoxList/boxList';

export default function SearchPage() {
  // Search API 호출은 나중에 연결해주기
  // 추천 리스트도 API 호출 후 기능 구현

  // 현 페이지는 리스트를 백엔드에서 조회 후 값을 받아오는 형식 기반으로 구성되어 있습니다
  // 따로 검색 로직이 없다는 뜻 (표시 위주)
  const [groupList, setGroupList] = useState<T_group[]>();

  useEffect(() => {
    setGroupList(ListMexPlus(group, 0));
  }, []);

  const params = useParams();
  const 검색어 = params.keyword;

  return (
    <div className="div_container">
      <div className="Search_title">
        <p className="p_inputSearch">{`"${검색어}"`}검색결과</p>
        <p className="p_SearchListCount">(검색결과 총 {group.length}건)</p>
      </div>

      <div className="div_boxlist">
        {groupList?.map((list, index) => {
          return <BoxList group={list} key={index} />;
        })}
      </div>
      <GroupPlusButton
        group={group}
        groupList={groupList}
        setGroupList={setGroupList}
      />
      <hr />

      <div className="div_boxlist">
        {recommendGroup.map((list, index) => {
          return <BoxList group={list} key={index} />;
        })}
      </div>
    </div>
  );
}
