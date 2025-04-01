import './common.scss';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer_content">
        아이로그 - 당신의 최애 스케줄을 한 눈에!
      </div>
      <div className="footer_links">
        <p>전체 서비스 </p>
        <p>이용약관</p>
        <p
          onClick={() => {
            '/privacy_policy';
          }}
          className="highlight"
        >
          개인정보 처리방침
        </p>
        <p>검색</p>
      </div>
      <p className="footer_copyright">© 2025 200-0K. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
