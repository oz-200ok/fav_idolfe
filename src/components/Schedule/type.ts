import { Dispatch, SetStateAction } from 'react';

export type T_ScheduleType = '월' | '주' | '연' | '일정';

type T_SetUseState<T> = Dispatch<SetStateAction<T>>;

// useState 관련
type T_useState_date_s = Date;
type T_useState_setDate_s = any; //Date값의 변수와 Value 함수를 받는 값
// type T_useState_setDate_s = ((value:Value, event?:React.MouseEvent<HTMLButtonElement>) => void)

type T_useState_modal_s = boolean;
type T_useState_setModal_s = T_SetUseState<T_useState_modal_s>;

type T_useState_scheduleType_s = T_ScheduleType;
type T_useState_SetScheduleType_s = T_SetUseState<T_useState_scheduleType_s>;

type T_useState_dropDownView_s = boolean;
type T_useState_setDropDownView_s = T_SetUseState<T_useState_dropDownView_s>;

export type T_use_Date = {
  date?: T_useState_date_s;
  setDate?: T_useState_setDate_s;
};

export type T_use_Modal = {
  modal?: T_useState_modal_s;
  setModal?: T_useState_setModal_s;
};

export type T_use_ScheduleType = {
  scheduleType?: T_useState_scheduleType_s;
  setScheduleType?: T_useState_SetScheduleType_s;
};

export type T_use_DropDown = {
  dropDownView?: T_useState_dropDownView_s;
  setDropDownView?: T_useState_setDropDownView_s;
};
