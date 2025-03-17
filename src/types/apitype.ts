import axios from "axios";

// POST 로그인 기능 API 타입 선언
type Loginstype = {
    'access_token': string;
    'refresh_token': string;
    'expires_in': number;
    'user': {
        'id': number;
        'email': string;
    }
}

export function hi () {
    const respone = axios.get<Loginstype>("링크")
    console.log(respone)
}