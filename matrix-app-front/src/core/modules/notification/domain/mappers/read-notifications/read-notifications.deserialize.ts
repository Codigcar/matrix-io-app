import { deserialize } from "src/core/helpers/transform";
import { 
  ReadNotificationsDto,
  ReadNotificationsScheme
} from "../../../dtos/read-notifications/read-notifications.dto";
import { IReadNotifications } from "../../../dtos/read-notifications/read-notifications";

const dtoToReadNotifications = (dto: ReadNotificationsDto): IReadNotifications =>
  deserialize(dto, {
    outputSchema: ReadNotificationsScheme,
    serializationLogic: (validatedDto) => {
      return {
        id: validatedDto?.data.updateNotification.id || '',
        title: validatedDto?.data.updateNotification.title || '',
        description: validatedDto?.data.updateNotification.description || '',
        isRead: validatedDto?.data.updateNotification.isRead || false,
        createdAt: validatedDto?.data.updateNotification.createdAt || '',
        user: validatedDto?.data.updateNotification.user || '',
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

export default dtoToReadNotifications;