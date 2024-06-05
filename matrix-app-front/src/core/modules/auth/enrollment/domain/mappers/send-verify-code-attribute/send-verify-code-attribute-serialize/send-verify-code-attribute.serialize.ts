import { serialize } from 'src/core/helpers/transform';
import { ISendVerifyCodeAttributeRequest } from '../../../../dtos/send-verify-code-attribute/send-verify-code-attribute-request.interface';
import { SendVerifyCodeAttributeRequestDto } from '../../../../dtos/send-verify-code-attribute/send-verify-code-attribute-request.dto';

const sendVerifyCodeAttributeRequestToDto = (
  entity: ISendVerifyCodeAttributeRequest,
): SendVerifyCodeAttributeRequestDto =>
  serialize(entity, {
    serializationLogic: (validatedEntity) => ({
      attribute: validatedEntity.attribute,
    }),
    defaultOutput: {} as SendVerifyCodeAttributeRequestDto,
  });

export default sendVerifyCodeAttributeRequestToDto;
