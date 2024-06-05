import { serialize } from 'src/core/helpers/transform';
import { ShareOptionsDto } from 'src/core/modules/share/dtos/share-options/share-options.dto';
import IShareOptionsRequest from 'src/core/modules/share/dtos/share-options/share-options-request.interface';

const shareOptionsRequestToDto = (entity: IShareOptionsRequest): ShareOptionsDto =>
  serialize(entity, {
    serializationLogic: (validatedEntity) => ({
      title: validatedEntity.title,
      message: validatedEntity.message,
      subject: validatedEntity.subject,
      url: validatedEntity.url,
      urls: validatedEntity.urls,
      type: validatedEntity.type,
      email: validatedEntity.email,
      recipient: validatedEntity.recipient,
      failOnCancel: validatedEntity.failOnCancel,
      showAppsToView: validatedEntity.showAppsToView,
      filename: validatedEntity.filename,
      filenames: validatedEntity.filenames,
      saveToFiles: validatedEntity.saveToFiles,
      isNewTask: validatedEntity.isNewTask,
    }),
    defaultOutput: {} as ShareOptionsDto,
  });

export default shareOptionsRequestToDto;
