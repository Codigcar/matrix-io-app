var RNFS = require('react-native-fs');

const validateIfPathExists = async (path: string) => {
  const directoryExists = await RNFS.exists(path);
  if (!directoryExists) {
    await RNFS.mkdir(path);
  }
} 

export const downloadFromUrl = async (url: String, name: String, needEncryptionFromAppDome: boolean = false, headers = {}) : Promise<string> =>  {
  const pathBase = RNFS.DocumentDirectoryPath

  let path = pathBase

  if(!needEncryptionFromAppDome) {
    const pathCustom = `${pathBase}/withoutAppDomeEncryption`
    await validateIfPathExists(pathCustom)
    path = pathCustom
  }
  
  const localFile = `${path}/${name}`

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
