import { useRef } from 'react';
import './common.scss';

const Footer: React.FC = () => {
  const popupRef = useRef<Window | null>(null);

  const handlrSendMail = () => {
    if (popupRef.current && !popupRef.current.closed) {
      popupRef.current.focus();

      const alreadyHasContent =
        popupRef.current.document.getElementById('auth-popup');
      if (alreadyHasContent) return;

      console.log('백업');
    }
    const width = 600;
    const height = 250;

    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      '',
      '메일 안내',
      `width=${width}, height=${height}, left=${left}, top=${top}, resizable=no`,
    );

    if (popup) {
      popup.document.write(
        `
          <html>
            <body style="font-family: sans-serif; padding: 20px;">
              <div id="auth-popup">
                <h3 style="background-color: #f0f0f0; padding: 10px; border-radius: 5px;">관리자 인증 요청</h3>
                <p>관리자 인증 요청을 위해 아래 버튼을 클릭해</p>
                <p><strong>이메일로 회사 소속을 입증할 수 있는 사진</strong>을 보내주세요.</p>
                <a 
                  href="mailto:32wound@naver.com?subject=관리자 인증 요청" 
                  target="_blank" 
                  style="display:inline-block; margin-top: 10px; padding: 10px 20px; background-color: #6a5096; color: white; text-decoration: none; border-radius: 5px;">
                  메일 보내기
                </a>
              </div>
            </body>
          </html>
        `,
      );
      popupRef.current = popup;
    }
  };

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
        <p onClick={handlrSendMail}>관리자 인증하기</p>
      </div>
      <p className="footer_copyright">© 2025 200-0K. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
