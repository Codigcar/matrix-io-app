import React from 'react';
import { render } from 'src/matrix-ui-components/utils/test-utils';
import { CardCodeInputProps } from 'src/screens/RequestCard/shared/types/components';
import CardCodeInput from '../../componentes/CardCodeInput';

const defaultProps: CardCodeInputProps = {
  codeLength: 3,
  value: '',
  handlerChange: () => {},
  inputRef: null,
  autoFocus: false,
  placeholder: '',
  handlerKeyPress: () => {},
};

const renderComponent = (props: CardCodeInputProps) => render(<CardCodeInput {...props} />);

describe('CardCodeInput Component', () => {
  it('should render correctly', () => {
    const component = renderComponent(defaultProps);
    expect(component).toBeTruthy();
  });

  it('should render with 4 code length', () => {
    const component = renderComponent({ ...defaultProps, codeLength: 4 });
    expect(component).toBeTruthy();
  });
});
