export const passwordValidation = {
  minLength: {
    value: 8,
    message: '비밀번호는 최소 8자 이상이어야 합니다',
  },
  validate: (value: string): string | true => {
    if (value === '') return true;

    const conditions = [
      {
        condition: /(.)\1{2,}/.test(value),
        message: '반복되는 문자는 사용할 수 없습니다',
      },
      {
        condition: !/[A-Z]/.test(value),
        message: '대문자를 최소 1개 포함해야 합니다',
      },
      {
        condition: !/[a-z]/.test(value),
        message: '소문자를 최소 1개 포함해야 합니다',
      },
      {
        condition: !/[0-9]/.test(value),
        message: '숫자를 최소 1개 포함해야 합니다',
      },
      {
        condition: !/[@$!%*#?&]/.test(value),
        message: '특수문자를 최소 1개 포함해야 합니다',
      },
    ];

    for (const { condition, message } of conditions) {
      if (condition) return message;
    }
    return true;
  },
};

export const phoneValidation = {
  pattern: {
    value: /^[0-9]{10,11}$/,
    message: '전화번호는 10~11자리 숫자만 가능합니다',
  },
};

export const usernameValidation = {
  minLength: {
    value: 2,
    message: '닉네임은 2자 이상이어야 해요',
  },
  maxLength: {
    value: 10,
    message: '닉네임은 10자 이하로 해주세요',
  },
};
