/* tslint:disable */

declare var Object: any;
export interface ProfileInterface {
  "email": string;
  "username": string;
  "emailVerified"?: boolean;
  "isActive"?: boolean;
  "avatar"?: string;
  "firstname": string;
  "lastname": string;
  "mobileVerified"?: boolean;
  "realm"?: string;
  "id"?: number;
  "password"?: string;
  accessTokens?: any[];
}

export class Profile implements ProfileInterface {
  "email": string;
  "username": string;
  "emailVerified": boolean;
  "isActive": boolean;
  "avatar": string;
  "firstname": string;
  "lastname": string;
  "mobileVerified": boolean;
  "realm": string;
  "id": number;
  "password": string;
  accessTokens: any[];
  constructor(data?: ProfileInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Profile`.
   */
  public static getModelName() {
    return "Profile";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Profile for dynamic purposes.
  **/
  public static factory(data: ProfileInterface): Profile{
    return new Profile(data);
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
      name: 'Profile',
      plural: 'Profiles',
      path: 'Profiles',
      idName: 'id',
      properties: {
        "email": {
          name: 'email',
          type: 'string'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean',
          default: false
        },
        "isActive": {
          name: 'isActive',
          type: 'boolean',
          default: false
        },
        "avatar": {
          name: 'avatar',
          type: 'string',
          default: '/media/avatars/user-default.png'
        },
        "firstname": {
          name: 'firstname',
          type: 'string',
          default: ''
        },
        "lastname": {
          name: 'lastname',
          type: 'string',
          default: ''
        },
        "mobileVerified": {
          name: 'mobileVerified',
          type: 'boolean',
          default: false
        },
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "password": {
          name: 'password',
          type: 'string'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
      }
    }
  }
}
