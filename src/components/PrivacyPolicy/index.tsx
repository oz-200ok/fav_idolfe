import './Privacypolicy.scss'; // SCSS 파일을 임포트

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <div className="privacy-title">
        <h1>개인정보 처리방침</h1>
        <p>
          본 개인정보 처리방침은 이용자의 개인정보를 보호하기 위해
          작성되었습니다.
        </p>
      </div>

      <div className="privacy-content">
        <div className="section-title">1. 총칙</div>
        <p className="section-description">
          본 개인정보 처리방침은 [서비스명] (이하 "서비스")가 이용자의
          개인정보를 수집, 이용, 보호하는 방법을 설명합니다.
        </p>

        <div className="section-title">
          2. 수집하는 개인정보 항목 및 수집 방법
        </div>
        <ul className="policy-list">
          <li>
            <p>필수 정보: 이름, 이메일 주소, 연락처, 아이디 등</p>
          </li>
          <li>
            <p>선택 정보: 프로필 사진, 주소, 생년월일 등</p>
          </li>
          <li>
            <p>
              서비스 이용 과정에서 자동으로 수집되는 정보: IP 주소, 쿠키, 접속
              기록, 기기 정보 등
            </p>
          </li>
        </ul>

        <div className="section-title">3. 개인정보의 이용 목적</div>
        <ul className="policy-list">
          <li>
            <p>서비스 제공 및 운영</p>
          </li>
          <li>
            <p>이용자 식별 및 본인 확인</p>
          </li>
          <li>
            <p>고객 상담 및 문의 응대</p>
          </li>
          <li>
            <p>서비스 개선 및 맞춤형 서비스 제공</p>
          </li>
          <li>
            <p>법적 의무 이행</p>
          </li>
        </ul>

        <div className="section-title">4. 개인정보의 보유 및 이용 기간</div>
        <p className="section-description">
          이용자의 개인정보는 서비스 제공 기간 동안 보관되며, 서비스 탈퇴 시
          또는 목적이 달성된 후에는 관련 법령에 따라 일정 기간 보관 후
          파기됩니다.
        </p>

        <div className="section-title">5. 개인정보의 제3자 제공</div>
        <p className="section-description">
          당사는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 단,
          법령에 의해 요구되는 경우에는 예외로 합니다.
        </p>

        <div className="section-title">10. 개인정보 보호책임자 및 문의처</div>
        <div className="contact-info">
          <p className="contact-item">개인정보 보호책임자: [담당자명]</p>
          <p className="contact-item">이메일: [이메일 주소]</p>
          <p className="contact-item">전화번호: [연락처]</p>
        </div>

        <div className="section-title">11. 개인정보 처리방침 변경</div>
        <p className="section-description">
          본 개인정보 처리방침은 법령 및 서비스 정책 변경에 따라 개정될 수
          있으며, 변경 사항은 공지사항을 통해 사전 안내됩니다.
        </p>

        <p className="section-description">
          <strong>최종 개정일: [YYYY-MM-DD]</strong>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
