import { deserialize } from "src/core/helpers/transform";
import { 
  GetNotificationsDto,
  NotificationsDataScheme 
} from "../../../dtos/get-notifications/get-all-notifications.dto";
import { INotificationData } from "../../../dtos/get-notifications/get-all-notifications";

const dtoToGetNotifications = (dto: GetNotificationsDto): INotificationData =>
  deserialize(dto, {
    outputSchema: NotificationsDataScheme,
    serializationLogic: (validatedDto) => {
      if (validatedDto && validatedDto.data && validatedDto.data.listNotifications) {
        const nextToken = validatedDto.data.listNotifications.nextToken || null;
        return {
          data: {
            listNotifications: {
              nextToken,
              items: validatedDto.data.listNotifications.items.map((item: any) => ({
                id: item?.id || '',
                title: item?.title || '',
                description: item?.description || '',
                isRead: item?.isRead || false,
                createdAt: item?.createdAt || '',
                user: item?.user || '',
              })),
            },
          },
        };
      }
      return {
        data: {
          listNotifications: {
            nextToken: null,
            items: [],
          },
        },
      };
    },
    defaultOutput: { data: { listNotifications: { nextToken: null, items: [] } } },
  });

export default dtoToGetNotifications;