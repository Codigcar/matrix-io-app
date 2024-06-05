import React from 'react';
import RadioButton from '../radio-button';

interface Props {
  options: string[];
  indexSelected?: number;
  onSelect: (index:number) => void;
}
const RadioButtonGroup = ({ options, indexSelected, onSelect }: Props) => {
  return (
    <>
      {options.map((item, index) => (
        <RadioButton key={index}
          value={item}
          isSelected={indexSelected === index}
          isSelectedBold={false}
          isDivided={false}
          numberOfLines={0}
          select={()=> onSelect(index)}
          index={index} />
      ))}
    </>
  )
};
export default RadioButtonGroup;