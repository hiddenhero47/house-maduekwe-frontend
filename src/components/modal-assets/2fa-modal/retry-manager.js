let retryFn = null;

export const setTwoFaRetry = (fn) => {
  retryFn = fn;
};

export const executeTwoFaRetry = async (otp) => {
  if (!retryFn) return;
  const result = await retryFn(otp);
  retryFn = null;
  return result;
};

export const clearTwoFaRetry = () => {
  retryFn = null;
};
