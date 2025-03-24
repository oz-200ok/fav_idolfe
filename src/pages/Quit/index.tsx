import './quit.scss';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { useNavigate } from 'react-router-dom';

const QuitPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="quit_suc_container">
        <div className="quit_suc_topview">
          <h1 className="quit_suc_title">회원 탈퇴</h1>
          <p className="quit_suc_text">회원 정보를 삭제합니다.</p>
        </div>
        <div className="quit_message">
          <h2 className="quit_suc">탈퇴가 완료되었습니다.</h2>
          <p className="quit_suc_message">
            회원님과 관련된 정보들을 성공적으로 삭제하였습니다. <br />
            함께 하지 못해 아쉬워요
          </p>
        </div>
        <button
          onClick={() => {
            navigate('/');
          }}
          className="home_btn"
        >
          홈으로
        </button>
      </div>
      <Footer />
    </>
  );
};
export default QuitPage;
