import { useState } from 'react';
// useEffect, api 불러오면 위에 넣기!
import './Alarm.scss';
import aespa from '@assets/aespa-logo.png'; //api 불러오면 삭제
import bts from '@assets/bts-logo.png'; //api 불러오면 삭제
import ive from '@assets/ive-logo.png'; //api 불러오면 삭제
// import axios from 'axios';

const Alarm = () => {

  //임시 데이터(api불러오면 삭제)
  const [idols, setIdols] = useState([
    {
      id: 1,
      name: '에스파',
      member: '카리나,윈터,지젤,닝닝',
      agency: 'sm',
      image: aespa,
      isSubscribed: true,
      isAlarmOn: true, //알림상태
    },
    {
      id: 2,
      name: 'BTS',
      member: 'RM, 진, 슈가, 제이홉, 지민, 뷔, 정국',
      agency: '하이브',
      image: bts,
      isSubscribed: true,
      isAlarmOn: true, //알림상태
    },
    {
      id: 3,
      name: '아이브',
      member: '안유진, 가을, 레이, 장원영, 리즈, 이서',
      agency: '스타쉽',
      image: ive,
      isSubscribed: true, //구독안한 아이돌 화면에 안보이게
      isAlarmOn: true, //알림상태
    },
    {
      id: 4,
      name: '아이브',
      member: '안유진, 가을, 레이, 장원영, 리즈, 이서',
      agency: '스타쉽',
      image: ive,
      isSubscribed: false, //구독안한 아이돌 화면에 안보이게
      isAlarmOn: true, //알림상태
    },
  ]);

  // api 불러오면 살리기
  // const [idols, setIdols] = useState([]);
  //api에서 데이터 불러오기
  // useEffect(() => {
  //   axios
  //     .get('http://api.com/실제 주소')
  //     .then((response) => {
  //       setIdols(response.data);
  //     })
  //     .catch(() => alert('데이터를 불러오지 못했습니다. 다시 시도해주세요.'));
  // }, []);

  //알람버튼 클릭 상태변경
  const handleToggle = (idolId: number) => {
    setIdols((prev) =>
      prev.map((idol) =>
        idol.id === idolId ? { ...idol, isAlarmOn: !idol.isAlarmOn } : idol,
      ),
    );
  };
  return (
    <div className="sub_page">
      <h1 className="sub_title">알림 설정 페이지</h1>
      <div className="idol_card_container">
        {idols
          .filter((idol) => idol.isSubscribed) //구독한 아이돌만 보기
          .map((idol) => (
            <div key={idol.id} className="idol_card">
              {/* 로고 */}
              <img src={idol.image} alt={idol.name} className="idol_img" />
              {/* 아이돌정보 */}
              <div className="idol_info">
                <h2 className="idol_name">{idol.name}</h2>
                <p className="idol_mem">{idol.member}</p>
                <p className="idol_agency">소속사: {idol.agency}</p>
              </div>
              {/* 알림버튼 */}
              <label className="switch">
                <input
                  type="checkbox"
                  checked={idol.isAlarmOn}
                  onChange={() => handleToggle(idol.id)} //버튼클릭 상태변경
                />
                {/* 버튼디자인 슬라이더 */}
                <span className="slider"></span>
              </label>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Alarm;
