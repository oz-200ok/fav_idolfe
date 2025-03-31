import { useNavigate } from 'react-router-dom';
import './EmailRedirect.scss';
import Footer from '@components/common/Footer';
import Header from '@/components/common/Header';

const EmailRedirect = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login_page');
  };

  return (
    <>
      <Header />
      <div className="container">
        <h1 className="join_suc_title">🎉 회원가입이 완료되었습니다!☺️</h1>
        <p className="join_suc_text">이메일 인증이 완료 되었습니다!</p>
        <p className="join_suc_text">ILOG의 회원이 되어주셔서 감사합니다</p>
        <button className="login_btn" onClick={handleLoginClick}>
          로그인 하러 가기
        </button>
      </div>
      <Footer />
    </>
  );
};

export default EmailRedirect;
