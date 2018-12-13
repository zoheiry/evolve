export const getCookie = (cookieName) => {
  const cookie = document.cookie.match(`(^|;)\\s*${cookieName}\\s*=\\s*([^;]+)`);
  return cookie ? cookie.pop() : '';
};

export default getCookie;
