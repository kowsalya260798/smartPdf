let inactivityTimer: NodeJS.Timeout;
let expiryTimer: NodeJS.Timeout;
let remainingTime: number = 0;

const sessionActivityService = {
  startInactivityTimer: (callback: () => void, timeout = 100 * 1000): void => {
    inactivityTimer = setTimeout(() => {
      callback();
    }, timeout);
  },

  resetInactivityTimer: (): void => {
    clearTimeout(inactivityTimer);
  },

  startExpiryTimer: (callback: () => void, timeout = 30 * 1000 ): void => {
    remainingTime = timeout;
    expiryTimer = setTimeout(() => {
      callback();
    }, timeout);
  },

  resetExpiryTimer: (): void => {
    clearTimeout(expiryTimer);
    remainingTime = 0;
  },
  getRemainingTime: (): number => {
    return remainingTime;
  },
};

export default sessionActivityService;