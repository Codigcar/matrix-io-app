/* eslint-disable no-console */
interface SerializationOptions<T, U> {
  serializationLogic: (validatedInput: T) => U;
  outputSchema?: any;
  defaultOutput?: U;
}

export const serialize = <T, U>(input: T, options: SerializationOptions<T, U>): U => {
  try {
    return options.serializationLogic(input);
  } catch (serializationError) {
    console.error('Serialization errors:', serializationError);
    return options.defaultOutput!;
  }
};

export const deserialize = <T, U>(input: T, options: SerializationOptions<T, U>): U => {
  if (!options.outputSchema) {
    throw new Error('An output schematic has not been provided.');
  }

  try {
    const validatedInput = options.outputSchema.validateSync(input);
    return options.serializationLogic(validatedInput);
  } catch (serializationError) {
    console.error('Serialization errors:', serializationError);
    return options.defaultOutput!;
  }
};
