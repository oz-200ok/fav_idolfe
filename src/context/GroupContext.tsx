import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { fetchGroupList } from '@/utils/group';
import UserInstance from '@/utils/UserInstance';

export interface GroupItem {
  id: number;
  name: string;
  image: string;
  agency?: string;
  sns?: string;
}

export interface AgencyType {
  id: number;
  name: string;
  contact?: string;
  image?: string;
}

interface GroupContextType {
  groups: GroupItem[];
  agencies: AgencyType[];
  fetchGroups: () => Promise<void>;
  fetchAgencies: () => Promise<void>;
  removeGroup: (id: number) => void;
}

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export const GroupProvider = ({ children }: { children: ReactNode }) => {
  const [groups, setGroups] = useState<GroupItem[]>([]);
  const [agencies, setAgencies] = useState<AgencyType[]>([]);

  const fetchGroups = async () => {
    try {
      const data = await fetchGroupList();
      const normalized = data.map((g: any) => ({
        id: g.id,
        name: g.name, 
        image: g.image, 
        agency: g.agency_name,
        sns: g.sns,
      }));
      setGroups(normalized);
    } catch (err) {
      console.error('❌ 그룹 목록 불러오기 실패:', err);
    }
  };

  const fetchAgencies = async () => {
    try {
      const res = await UserInstance.get('idol/agencies/');
      setAgencies(res.data);
    } catch (err) {
      console.error('❌ 소속사 목록 불러오기 실패:', err);
    }
  };

  const removeGroup = (id: number) => {
    setGroups((prev) => prev.filter((group) => group.id !== id));
  };

  useEffect(() => {
    fetchGroups();
    fetchAgencies();
  }, []);

  return (
    <GroupContext.Provider
      value={{ groups, agencies, fetchGroups, fetchAgencies, removeGroup }}
    >
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
