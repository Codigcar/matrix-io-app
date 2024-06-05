import { API, graphqlOperation } from 'aws-amplify';
import { markRead } from '../../graphql/schema';

export const useDetailNotifications = () => {
  const onMarkRead = (id:number) => API.graphql(graphqlOperation(markRead(id)));

  return {
    onMarkRead,
  };
};

export default useDetailNotifications;
