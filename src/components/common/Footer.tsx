import { useNavigate } from 'react-router-dom';
import './common.scss';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer__content">
        아이로그 - 당신의 최애 스케줄을 한 눈에!
      </div>
      <div className="footer__links">
        <p>전체 서비스</p>
        <p>이용약관</p>
        <p
          className="highlight"
          onClick={() => {
            navigate('/privacypolicy');
          }}
        >
          개인정보 처리방침
        </p>
        <p>검색</p>
      </div>
      <div className="footer__copyright">
        <p>© 2025 200-0K. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
