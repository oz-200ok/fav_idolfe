import './scheduleAdd.scss';

export default function TextInput({ text }: {text:string}) {
  let inputClassName: string;
  if (text === '제목') inputClassName = 'title';
  else inputClassName = 'schedule';

  return (
    <div>
      <label htmlFor={`${inputClassName}`}>{text}</label>
      <br />
      <input
        id={`${inputClassName}`}
        className={`input_${inputClassName}`}
        type="text"
        placeholder={`${text}을 입력해주세요`}
      />
    </div>
  );
}
