import { serialize } from 'src/core/helpers/transform';

const copyTextRequestToDto = (entity: string): string =>
  serialize(entity, {
    serializationLogic: (validatedEntity) => validatedEntity,
    defaultOutput: {} as string,
  });

export default copyTextRequestToDto;
