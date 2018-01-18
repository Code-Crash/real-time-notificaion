/* tslint:disable */
import { Injectable } from '@angular/core';
import { Profile } from '../../models/Profile';
import { Notification } from '../../models/Notification';
import { Email } from '../../models/Email';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Profile: Profile,
    Notification: Notification,
    Email: Email,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
