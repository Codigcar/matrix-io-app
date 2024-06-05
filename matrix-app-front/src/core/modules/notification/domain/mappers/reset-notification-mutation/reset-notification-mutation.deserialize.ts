import { deserialize } from "src/core/helpers/transform";
import { 
  ResetNotificationMutationDto,
  ResetNotificationMutationScheme
} from "../../../dtos/reset-notification-mutation/reset-notification-mutation.dto";
import { IResetNotificationMutation } from "../../../dtos/reset-notification-mutation/reset-notification-mutation";

const dtoToResetNotificationMutation = (dto: ResetNotificationMutationDto): IResetNotificationMutation =>
  deserialize(dto, {
    outputSchema: ResetNotificationMutationScheme,
    serializationLogic: (validatedDto) => {
        return {
          time: validatedDto?.data.resetNewNotificationsCounter.time || '',
          user: validatedDto?.data.resetNewNotificationsCounter.user || '',
          value: validatedDto?.data.resetNewNotificationsCounter.value || 0
        };
    },
    defaultOutput:{
      time: '',
      user: '',
      value: 0
    }
  });

  export default dtoToResetNotificationMutation;
