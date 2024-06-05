
import React from 'react';
import { fetchPublications } from '../../src/api/fetchPublications';

describe('Testing en fetchPublications', () => {
    it('debe obtener una lista de publications', async() => {
        const publicationsList = await fetchPublications(1);
        expect(publicationsList.length).not.toBe(0);
        
    });
    
});