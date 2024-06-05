var RNFS = require('react-native-fs');
export const downloadFromUrl = async (url: String, name: String, headers = {}) : Promise<string> =>  {
  const nameWithoutSpaces = name.replace(/\s+/g, "_");
  const localFile = `${RNFS.DocumentDirectoryPath}/${nameWithoutSpaces}`;
  const options = {
    fromUrl: url,
    toFile: localFile,
    headers: headers,
  };
  return new Promise((resolve, reject) => {
    RNFS.downloadFile(options)
      .promise.then(() => resolve(localFile) )
      .catch(error => {
        reject(error);
      });
  });
};
