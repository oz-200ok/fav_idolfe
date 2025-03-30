import { T_use_Modal } from '../Schedule/type';

export default function PushButton(props: T_use_Modal) {
  return (
    <div className="div_cancelDone">
      <button
        className="button_cancel"
        onClick={() => {
          if (!props.setModal) return;
          props.setModal(false);
          document.body.classList.remove('body_modalOverlay');
        }}
      >
        취소
      </button>
      <button className="button_done">등록하기</button>
    </div>
  );
}
