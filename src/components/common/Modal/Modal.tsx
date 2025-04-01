import './Modal.scss'; 

interface ModalProps {
  isOpen: boolean; // 모달 열림 여부
  title: string; // 모달 제목
  text: string; // 모달 내용
  onClose: () => void; // 닫기 핸들러
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, text, onClose }) => {
  if (!isOpen) return null; // 모달이 열리지 않았으면 렌더링하지 않음

  return (
    <div className="modal_overlay">
      <div className="modal">
        <h1 className="modal_title">{title}</h1>
        <p className="modal_text">{text}</p>
        <button onClick={onClose} className="modal_button">
          확인
        </button>
      </div>
    </div>
  );
};

export default Modal;
