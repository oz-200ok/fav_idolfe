import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { fetchGroupList } from '@/utils/group';

const AGENCY_MAP: { [key: number]: string } = {
  5: 'SM',
  6: 'JYP',
  7: 'HYBE',
};

export interface GroupItem {
  id: number;
  name: string;
  image: string;
  members: string[];
  agency: string;
  sns: string;
}

interface GroupContextType {
  groups: GroupItem[];
  fetchGroups: () => Promise<void>;
  removeGroup: (id: number) => void;
}

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export const GroupProvider = ({ children }: { children: ReactNode }) => {
  const [groups, setGroups] = useState<GroupItem[]>([]);

  const fetchGroups = async () => {
    try {
      const res = await fetchGroupList();
      console.log('📦 서버 응답:', res);

      const normalized = res.map((g: any) => ({
        id: g.id,
        name: g.name, // ← g.group_name 이 아니라 g.name 이어야 할 수도 있음
        image: g.image,
        agency: g.agency_name || AGENCY_MAP[Number(g.agency)] || '알 수 없음',
        sns: g.sns,
      }));

      setGroups(normalized);
    } catch (err) {
      console.error('❌ 그룹 목록 불러오기 실패:', err);
    }
  };
  const removeGroup = (id: number) => {
    setGroups((prev) => prev.filter((group) => group.id !== id));
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <GroupContext.Provider value={{ groups, fetchGroups, removeGroup }}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroupContext = () => {
  const context = useContext(GroupContext);
  if (!context)
    throw new Error('GroupContext must be used within GroupProvider');
  return context;
};
