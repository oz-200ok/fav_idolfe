import { T_GroupScheduleAdd } from '@/types/typeAPI';
import { Dispatch, SetStateAction } from 'react';

export type T_ScheduleType = '월' | '주' | '연' | '일정';

type T_SetUseState<T> = Dispatch<SetStateAction<T>>;

// useState 관련
type T_useState_date_s = Date;
type T_useState_setDate_s = T_SetUseState<T_useState_date_s>;

type T_useState_modal_s = boolean;
type T_useState_setModal_s = T_SetUseState<T_useState_modal_s>;

type T_useState_scheduleType_s = T_ScheduleType;
type T_useState_SetScheduleType_s = T_SetUseState<T_useState_scheduleType_s>;

type T_useState_dropDownView_s = boolean;
type T_useState_setDropDownView_s = T_SetUseState<T_useState_dropDownView_s>;

type T_useState_view_s = boolean;
type T_useState_setView_s = T_SetUseState<T_useState_view_s>;

export type T_useState_day_s = T_GroupScheduleAdd[];
type T_useState_setDay_s = T_SetUseState<T_useState_day_s>;

type T_useState_ClickSchedule_s = T_GroupScheduleAdd | null;
type T_useState_setClickSchedule_s = T_SetUseState<T_useState_ClickSchedule_s>;

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
  saveType?: T_useState_scheduleType_s;
  setSaveType?: T_useState_SetScheduleType_s;
};

export type T_use_DropDown = {
  dropDownView?: T_useState_dropDownView_s;
  setDropDownView?: T_useState_setDropDownView_s;
};

export type T_use_View = {
  view?: T_useState_view_s;
  setView?: T_useState_setView_s;
};

export type T_use_Day = {
  day?: T_useState_day_s;
  setDay?: T_useState_setDay_s;
};

export type T_use_clickSchedule = {
  clickSchedule?: T_useState_ClickSchedule_s;
  setClickSchedule?: T_useState_setClickSchedule_s;
};
