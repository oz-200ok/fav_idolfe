import { Dispatch, SetStateAction } from 'react';
import { T_group } from '../../pages/SearchPage/type';

// 그룹 리스트 추가
export function ListMexPlus(group: T_group[], length: number): T_group[] {
  console.log('그룹 추가 실행 됨');
  return group.slice(length, length + 8);
}

// 그룹 더보기
type T_GroupLength = {
  group: T_group[];
  groupList: T_group[] | undefined;
  setGroupList: Dispatch<SetStateAction<T_group[] | undefined>>;
};
export function GroupPlusButton({
  group,
  groupList,
  setGroupList,
}: T_GroupLength) {
  return (
    <>
      {groupList && group.length > groupList?.length && (
        <button
          className="button_groupPlus"
          onClick={() => {
            setGroupList([
              ...groupList,
              ...ListMexPlus(group, groupList.length),
            ]);
          }}
        >
          더보기
        </button>
      )}
    </>
  );
}
