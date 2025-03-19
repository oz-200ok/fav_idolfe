import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code"); // ✅ 네이버가 보낸 인가 코드 가져오기

  useEffect(() => {
    if (code) {
      console.log("✅ 받은 인가 코드:", code);
      
      // ✅ 백엔드로 인가 코드 전송 → 액세스 토큰 요청
      axios.post("http://localhost:5000/auth/naver", { code })
        .then(response => {
          console.log("✅ 받은 액세스 토큰:", response.data.access_token);
          // 이후 로그인 상태 저장 & 리디렉트 가능
        })
        .catch(error => console.error("토큰 요청 실패:", error));
    }
  }, [code]);

  return <div>로그인 처리 중...</div>;
};

export default OAuthCallback;
