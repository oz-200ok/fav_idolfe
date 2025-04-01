export const passwordStrength = (password: string): string => {
  if (!password) return '';

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[@$!%*#?&]/.test(password);
  const isLong = password.length >= 12;
  const isMedium = password.length >= 8;
  const hasThreeSpecials = (password.match(/[@$!%*#?&]/g) || []).length >= 3;
  const isSequential = /(.)\1{2,}/.test(password);

  if (isSequential) {
    return '약함(반복 문자 포함 - 강도를 더 높여주세요)';
  } else if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
    return '약함(필수 조건 부족 - 대문자, 소문자, 숫자, 특수문자를 포함해주세요)';
  } else if (hasThreeSpecials && isLong) {
    return '강함 - 사용하기에 안전한 비밀번호 입니다';
  } else if (isMedium && hasSpecialChar && hasUpperCase) {
    return '보통 - 사용한 특수문자 외에 다른 특수 문자를 두 개 더 사용하세요';
  }

  return '';
};

export const strengthClass = (strength: string): string => {
  if (strength?.includes('강함')) return 'strong';
  if (strength?.includes('보통')) return 'medium';
  if (strength?.includes('약함')) return 'weak';
  return '';
};
