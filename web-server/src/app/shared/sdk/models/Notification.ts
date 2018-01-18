/* tslint:disable */
import {
  Profile
} from '../index';

declare var Object: any;
export interface NotificationInterface {
  "text": string;
  "isRead": boolean;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  "id"?: number;
  "createdById"?: number;
  createdBy?: Profile;
}

export class Notification implements NotificationInterface {
  "text": string;
  "isRead": boolean;
  "createdAt": Date;
  "updatedAt": Date;
  "id": number;
  "createdById": number;
  createdBy: Profile;
  constructor(data?: NotificationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Notification`.
   */
  public static getModelName() {
    return "Notification";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Notification for dynamic purposes.
  **/
  public static factory(data: NotificationInterface): Notification{
    return new Notification(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Notification',
      plural: 'Notifications',
      path: 'Notifications',
      idName: 'id',
      properties: {
        "text": {
          name: 'text',
          type: 'string'
        },
        "isRead": {
          name: 'isRead',
          type: 'boolean',
          default: false
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date',
          default: new Date(0)
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date',
          default: new Date(0)
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "createdById": {
          name: 'createdById',
          type: 'number'
        },
      },
      relations: {
        createdBy: {
          name: 'createdBy',
          type: 'Profile',
          model: 'Profile',
          relationType: 'belongsTo',
                  keyFrom: 'createdById',
          keyTo: 'id'
        },
      }
    }
  }
}
