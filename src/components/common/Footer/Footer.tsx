import './Footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        아이로그 - 당신의 최애 스케줄을 한 눈에!
      </div>
      <div className="footer__links">
        <a href="/service">전체 서비스</a>
        <a href="/terms">이용약관</a>
        <a href="/privacy" className="highlight">
          개인정보 처리방침
        </a>
        <a href="/search">검색</a>
      </div>
      <div className="footer__copyright">
        <p>© 2025 200-0K. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
