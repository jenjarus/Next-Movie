export const getCookie = <T>(key: string): T | undefined => {
  try {
    const serializedState = document.cookie.match(new RegExp(key + "=([^;]+)"));
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState[1]);
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const setCookie = (key: string, value: any) => {
  const MAX_AGE: number = 86400; // 1 день

  try {
    document.cookie = `${key}=${JSON.stringify(value)}; max-age=${MAX_AGE}; path=/;`;
  } catch (err) {
    console.log(err);
  }
};
