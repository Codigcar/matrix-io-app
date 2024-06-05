import { Box } from 'matrix-ui-components';
import React from 'react';

export const Pagination = jest.fn(() => null);

export const Carousel = ({ renderItem, data }) => (
  <Box>
    {data.map((item, index) => renderItem({ item, index }))}
  </Box>
);
