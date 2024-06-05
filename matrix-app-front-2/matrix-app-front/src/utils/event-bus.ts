enum EventBusKeys {
  'PUSH_RECEIVING' = 'PUSH_RECEIVING'
}

function getIdGenerator() {
  let lastId = 0;

  return function getNextUniqueId() {
    lastId += 1;
    return lastId;
  };
}

const subscriptions: Partial<{
  [key in EventBusKeys]: {
    [key: string]: (params: any) => void
  };
}> = {};

const getNextUniqueId = getIdGenerator();

function subscribe<T>(eventType: EventBusKeys, callback: (params: T) => void) {
  const id = getNextUniqueId();

  if (!subscriptions[eventType]) { subscriptions[eventType] = {}; }
  subscriptions[eventType]![id] = callback;

  return {
    unsubscribe: () => {
      delete subscriptions[eventType]![id];
      if (Object.keys(subscriptions[eventType]!).length === 0) delete subscriptions[eventType];
    },
  };
}

async function subscribeOnce<T>(eventType: EventBusKeys, timeout: number) {
  return new Promise<T>((resolve, reject) => {
    const { unsubscribe } = subscribe(eventType, (params) => resolve(params as T));
    setTimeout(() => {
      unsubscribe();
      reject(new Error('TIMEOUT_ERROR'));
    }, timeout);
  });
}

function publish(eventType: EventBusKeys, arg: any) {
  if (!subscriptions[eventType]) { return; }
  Object.keys(subscriptions[eventType]!).forEach((key) => subscriptions[eventType]![key](arg));
}

export {
  publish, subscribe, subscribeOnce, EventBusKeys,
};
