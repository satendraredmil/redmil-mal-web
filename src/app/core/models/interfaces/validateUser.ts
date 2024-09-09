import { BaseModel_2 } from "../classes/BaseModel";

export interface ValidateUser extends BaseModel_2{
  Mobile:string,
  AppId:string,
  Version:string,
  DeviceInfo:string,
  checksum:string,
  IpAddress:string,
  MacAddress:string,
}

export interface ValidateUserMpin extends BaseModel_2{
  
  AppId:string,
  Version:string,
  DeviceInfo:string,
  checksum:string,
  IpAddress:string,
  Mpin:string,
  MacAddress:string,
  Mobile?:string
}



