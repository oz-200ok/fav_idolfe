// ✅ context/GroupContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchGroupList } from '@/utils/group';

export interface GroupItem {
    id: number;
    name: string;
    image: string;
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
      const data = await fetchGroupList();
      const normalized = data.map((g: any) => ({
        id: g.id,
        name: g.group_name,       // ✅ 필드명 맞추기
        image: g.group_image,     // ✅ 필드명 맞추기
      }));
      setGroups(normalized);
    } catch (err) {
      console.error('그룹 목록 불러오기 실패:', err);
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
  if (!context) throw new Error('GroupContext must be used within GroupProvider');
  return context;
};