import './quit.scss';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { useNavigate } from 'react-router-dom';

const QuitPage = () => {
  const navigate = useNavigate();
  
  const goHome = () => {
    navigate('/');
  };
  return (
    <>
      <Header />
      <div className="quit_Suc_Page">
        <div className="quit_Suc_Container">
          <div>
            <h1 className="quit_Suc_Title">회원 탈퇴</h1>
            <p className="quit_Suc_Text">회원 정보를 삭제합니다.</p>
          </div>
          <div className="divider"></div>
          <div className="quit_Message">
            <h1 className="quit_Suc">탈퇴가 완료되었습니다.</h1>
            <p className="quit_Suc_Message">
              회원님과 관련된 정보들을 성공적으로 삭제하였습니다. <br />
              함께 하지 못해 아쉬워요 ;({' '}
            </p>
            <button onClick={goHome} className="home_Button">
              홈으로
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default QuitPage;
