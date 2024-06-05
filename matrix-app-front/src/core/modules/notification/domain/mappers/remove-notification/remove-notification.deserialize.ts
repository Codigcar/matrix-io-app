import { deserialize } from "src/core/helpers/transform";
import { 
  RemoveNotificationsDto,
  RemoveNotificationsScheme
} from "../../../dtos/remove-notification/remove-notification.dto";
import { IRemoveNotifications } from "../../../dtos/remove-notification/remove-notification";

const dtoToRemoveNotifications = (dto: RemoveNotificationsDto): IRemoveNotifications =>
  deserialize(dto, {
    outputSchema: RemoveNotificationsScheme,
    serializationLogic: (validatedDto) => {
        return {
          id: validatedDto?.data.deleteNotification.id || '',
          title: validatedDto?.data.deleteNotification.title || '',
          description: validatedDto?.data.deleteNotification.description || '',
          isRead: validatedDto?.data.deleteNotification.isRead || false,
          createdAt: validatedDto?.data.deleteNotification.createdAt || '',
          user: validatedDto?.data.deleteNotification.user || '',
      };
    },
    defaultOutput: {
      id: "",
      title:"",
      description: "",
      isRead: false,
      createdAt: "",
      user: "",
    },
  });

export default dtoToRemoveNotifications;