import { useState } from 'react';
import uploadIcon from '../../assets/upload.png';
import './Adminupload.scss';

function AdminUpload() {
  //이미지 미리보기 저장 기본값=없음
  const [preview, setPreview] = useState('');
  //모달창 상태
  const [isModalOpen, setIsModalOpen] = useState(false);

  //이미지 업로드 시 실행함수
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; //파일선택
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string); //파일 미리보기 스트링으로 저장
      };
      reader.readAsDataURL(file); //파일 url로 변환하여 읽음
    }
  };
  //이미지 등록버튼클릭
  // event: React.MouseEvent<HTMLButtonElement>
  const handleRegister = () => {
    if (preview) {
      setIsModalOpen(true); // 모달 창 열기
    }
  };

  return (
    <div className="admin_upload">
      <h1 className="title">관리자 인증</h1>
      <div className="divider"></div>
      <p className="guide">관리자 인증을 위한 이미지를 업로드 해주세요.</p>
      {/* 이미지 업로드입력 */}
      <label className="upload_area">
        {/* 이미지가 있으면 미리보기, 없으면 기본 ui */}
        {preview ? (
          <img src={preview} alt="미리보기" className="preview_image" />
        ) : (
          <>
            <img src={uploadIcon} alt="upload" className="upload_icon" />
            <p className="upload_text">이미지 업로드</p>{' '}
          </>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="image_input"
        />
      </label>

      {/* 이미지 등록버튼 */}
      <button onClick={handleRegister} className="register_button">
        이미지 등록
      </button>
      {/* 모달 */}
      {isModalOpen && (
        <div className="modal_overlay">
          <div className="modal">
            <h1 className="modal_title">이미지 등록이 완료되었습니다.</h1>
            <p className="modal_text">승인 후 이메일로 알림을 보내드립니다.</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="modal_button"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUpload;
