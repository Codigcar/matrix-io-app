import { deserialize } from "src/core/helpers/transform";
import { 
  NotificationCounterDto,
  NotificationCounterScheme
} from "../../../dtos/get-notification-counter/get-notifications-counter.dto";
import { INotificationCounter } from "../../../dtos/get-notification-counter/get-notifications-counter";

const dtoToNotificationCounter = (dto: NotificationCounterDto): INotificationCounter => {
  return deserialize(dto, {
    outputSchema: NotificationCounterScheme,
    serializationLogic: (validatedDto) => {
      if (validatedDto && validatedDto.data && validatedDto.data.getNewNotificationsCounter) {
        return {
          data: {
            getNewNotificationsCounter: validatedDto.data.getNewNotificationsCounter,
          },
        };
      }
      return {
        data: {
          getNewNotificationsCounter: 0,
        },
      };
    },
    defaultOutput: { data: { getNewNotificationsCounter: 0 } },
  });
};

export default dtoToNotificationCounter;