import React from 'react';

const {render} = require('@testing-library/react-native');
const {CTextCenter} = require('../../src/components/CTextCenter');
// import renderer from 'react-test-renderer';

describe('testing en <CTextCenter />', () => {
    it('debe hacer match con el snapshot', () => {
        const container = render(<CTextCenter title='title' />)
        expect(container).toMatchSnapshot()
    });
});
