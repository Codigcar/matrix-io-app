import {IPublication} from '../interfaces/publish.interface';

export const fetchPublications = async (
  number: number = 1,
): Promise<IPublication[]> => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/1/posts`,
    );
    const result = (await response.json()) as IPublication[];
    return result;
  } catch (error) {
    console.error({error});
    return [];
  }
};
