export const checkNumberOfFilters = (values: any[]): number => {
  const numberOfFilters = values.length;

  switch (numberOfFilters) {
    case 1:
        return 1;
    case 2:
        return 2;
    case 3:
        return 3;
    default:
        return -1;
  }
};