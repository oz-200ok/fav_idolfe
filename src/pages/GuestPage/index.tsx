import { useNavigate } from "react-router-dom";
import "./GuestPage.scss";
import logo from "@assets/outline-logo.png";
import slogan from "@assets/slogan.png";
import Footer from "@components/common/Footer";

const GuestPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login_page");
  };

  return (
    
    <div className="splash_screen">
      {/* ✅ 로고 이미지 */}
      <div className="guest_logo-container">
        <img src={logo} alt="ILOG 로고" className="guest_logo" />
      </div>

      {/* ✅ 슬로건 이미지 (import 방식) */}
      <div
        className="slogan_image"
        style={{
          WebkitMaskImage: `url(${slogan})`,
          maskImage: `url(${slogan})`,
        }}
      />

      <button className="login_button" onClick={handleLoginClick}>
        로그인
      </button>

      <Footer />
    </div>
  );
};

export default GuestPage;
