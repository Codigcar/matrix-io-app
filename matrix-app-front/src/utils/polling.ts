async function waitResponsePolling<T>(
  timeout: number,
  intervalBetweenRequests: number,
  request: () => Promise<T>,
  conditionCallback: (p: T) => boolean,
) {
  return new Promise<T>((resolve, reject) => {
    let timeoutId: NodeJS.Timeout;
    let stopTimer: boolean = false;

    const verifyRequest = async () => {
      try {
        const response = await request();
        const condition = conditionCallback(response);
        if (condition) {
          resolve(response);
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
          return condition;
        }
        return setTimeout(async () => {
          if (stopTimer) return;
          await verifyRequest();
        }, intervalBetweenRequests);
      } catch (error) {
        return setTimeout(async () => {
          if (stopTimer) return;
          await verifyRequest();
        }, intervalBetweenRequests);
      }
    };
    verifyRequest();

    timeoutId = setTimeout(() => {
      stopTimer = true;
      reject(new Error('TIMEOUT_ERROR'));
    }, timeout);
  });
}

export async function pollCondition<T>(
  promiseCall:() => Promise<T>,
  conditionCallback: (p: T) => boolean,
  interval:number,
  timeout:number,
) {
  const startTime = Date.now();
  return new Promise<T>((resolve, reject) => {
    const checkCondition = async () => {
      try {
        const response = await promiseCall();
        const condition = conditionCallback(response);
        if (condition) {
          resolve(response);
        } else if (Date.now() - startTime < timeout) {
          setTimeout(checkCondition, interval);
        } else {
          reject(response);
        }
      } catch (error) {
        if (Date.now() - startTime < timeout) {
          setTimeout(checkCondition, interval);
        } else {
          reject(error);
        }
      }
    };
    checkCondition();
  });
}

export default waitResponsePolling;
