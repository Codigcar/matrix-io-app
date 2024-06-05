import React from 'react';
import { CRenderItem } from '../../src/components/CRenderItem';

const { render , screen} = require('@testing-library/react-native')

describe('testing en <CRenderItem />', () => {
    const item = {
        id: 1,
        title:'title',
        body:'body',
        userId:1
    }
    it('debe hacer match con el snapshot', () => {
        const component = render(<CRenderItem {...item} />)
        expect(component).toMatchSnapshot()
    });

    it('debe renderizar los textos', () => {

        const {getByText} = render(<CRenderItem {...item} />)
        
        expect(getByText(item.title)).toBeTruthy();
        expect(getByText(item.body)).toBeTruthy();
        expect(getByText(`User: ${item.userId}`)).toBeTruthy();
    });
});