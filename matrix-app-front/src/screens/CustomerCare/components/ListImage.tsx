import { FabImageActive, FabImageDefault, FabImageSecondary, FabImageDefaultEmpty, FabImageSecondaryEmpty } from './FabImage';
import { Box } from 'matrix-ui-components';
import RNFS from 'react-native-fs';
import { ListImagePropsType } from '../shared/types/types';
import { android } from 'src/utils/constants';

const ListImage = ({data, onPress, position}:ListImagePropsType) => {

  const arrayShowFab = getShowFab(position);

  const Images = arrayShowFab.map((value)=> {
    if(data){
      if(value === -2 || value === data.length + 1){
        return (
          <FabImageDefaultEmpty key={value} />
        );
      }
      if(value === -1 || value === data.length){
        return (
          <FabImageSecondaryEmpty key={value} />
        );
      }
      const prePath = android? 'file://' : ''
      const filePath = prePath + RNFS.DocumentDirectoryPath + 
        '/' + data[value].path + '.png';
      if(value === position){
        return (
          <FabImageActive key={value} 
            uri={filePath} 
            onPress={() => onPress(value)} />
        );  
      }
      if((value+1) === position || (value-1) === position){
        return (
          <FabImageSecondary key={value} 
            uri={filePath} 
            onPress={() => onPress(value)} />
        );  
      }
      return (
        <FabImageDefault key={value} 
          uri={filePath} 
          onPress={() => onPress(value)} />
      )
    }
  })

  return (
    <Box position={'absolute'} alignSelf={'flex-end'}
      alignItems={'center'} style={{paddingRight: 10}}>
      {Images}
    </Box>
  )
}

export default ListImage;

const getShowFab = (position: number) => {
  let arrayShowFab: number[] = []
  arrayShowFab.push(position-2)
  arrayShowFab.push(position-1)
  arrayShowFab.push(position)
  arrayShowFab.push(position+1)
  arrayShowFab.push(position+2)
  return arrayShowFab;
}