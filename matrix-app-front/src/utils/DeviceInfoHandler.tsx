import { getUniqueId, getAndroidId } from 'react-native-device-info';
import { Platform } from 'react-native';

const getUID = async (): Promise<string> => {
    if (Platform.OS !== 'ios') {
        getAndroidId()
            .then((uniqueId) => uniqueId)
            .catch((error) => {
                // console.log('error getting uid', error);
            });
    }
    const UUID = await getUniqueId();
    return UUID;
};

export default getUID;
