import { Dispatch, SetStateAction } from "react";

export type T_MemberImg = {
  member?: string;
  type?: 'add' | 'list';
  memberAdded?: Set<string>;
  setMemberAdded?: Dispatch<SetStateAction<Set<string>>>;
};