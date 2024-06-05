import { serialize } from 'src/core/helpers/transform';
import IVerifyUserAttributeRequest from '../../../../dtos/verify-user-attribute/verify-user-attribute.interface';
import { VerifyUserAttributeRequestDto } from '../../../../dtos/verify-user-attribute/verify-user-attribute.dto';

const verifyCurrentUserAttributeRequestToDto = (
  entity: IVerifyUserAttributeRequest,
): VerifyUserAttributeRequestDto =>
  serialize(entity, {
    serializationLogic: (validatedEntity) => ({
      attribute: validatedEntity.attribute,
      code: validatedEntity.code,
    }),
    defaultOutput: {} as VerifyUserAttributeRequestDto,
  });

export default verifyCurrentUserAttributeRequestToDto;
