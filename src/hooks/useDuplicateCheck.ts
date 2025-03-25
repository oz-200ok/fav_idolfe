import axios from 'axios';
import { useState } from 'react';

export const useDuplicateCheck = () => {
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [checkMsg, setCheckMsg] = useState('');

  type Type = 'email' | 'username' | 'phone';

  const DuplicateCheck = async (type: Type, value: string) => {
    try {
      const response = await axios.get('/account/check-duplicate/', {
        params: { type: 'email', value: email },
      });
      console.log('✅ API 응답 결과:', response.data);
    } catch (error) {
      console.log('찾을 수 없는 데이터 입니다');
    }
  };

  return { DuplicateCheck, checkMsg, isAvailable };
};
