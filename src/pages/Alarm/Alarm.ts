//notification 및 웹소켓을 관리하는 파일

const wsUrl = 'wss://echo.websocket.org'; //테스트 웹소켓 주소
let ws; //웹소켓 객체

//웹소켓 연결 함수
const connect = () => {
  ws = new WebSocket(wsUrl);

  ws.onopen = () => console.log('✅ 웹소켓 연결 성공');

  ws.onerror = (error) => console.log('⚠️웹소켓 오류:', error);

  ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    console.log('📩받은 메시지:', data);
    showNoti(data.message);
  };
  ws.onclose = () => {
    console.log('웹소켓 연결 종료, 3초후 재연결');
    setTimeout(connect, 3000); //3초후 재연결
  };
};

//웹푸시 알림요청

const requestNotiPermission = () => {
  if (Notification.permission !== 'granted') {
    Notification.requestPermission().then((p) => {
      if (p === 'granted') console.log('✅ 알림 허용');
      else console.log('❌ 알림 거부');
    });
  }
};

const showNoti = (msg: string) => {
  if (Notification.permission === 'granted') {
    new Notification('🔔새로운 알림', { body: msg });
  }
};

requestNotiPermission();
connect();

export { ws };
