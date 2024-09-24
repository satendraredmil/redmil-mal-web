
export interface ApiResponse<T>{
  Statuscode?:boolean;
  Message?:string;
  Data:T;
}

export class BaseModel_1 {
  Id?: string;
  UserId?: string;
  Checksum?: string;
  Token?: string;  // Optional field
  Wallet?: string;
  UserLogintoken?: string;  // Optional field
  UserLoginIDfortoken?: string;  // Optional field
  Redmilweb?:string = 'Web'; //checking api comsumer

  constructor(
    Id:string = "0",
    UserId: string ="0",
    Checksum: string ="NA",
    Wallet: string ='False',
    Token : string = "NA",
    UserLogintoken: string ="NA",
    UserLoginIDfortoken: string ="NA",
    Redmilweb:string="Web"
  ) {
    this.Id = Id;
    this.UserId = UserId;
    this.Checksum  = Checksum ;
    this.Wallet  = Wallet ;
    this.Token  = Token ;
    this.UserLogintoken  = UserLogintoken ;
    this.UserLoginIDfortoken  = UserLoginIDfortoken ;
    this.Redmilweb = Redmilweb;
  }
}



 export class BaseModel_2 {
    Id?: string;
    Userid?: string | null;
    checksum?: string;
    Token?: string;  // Optional field
    Wallet?: string;
    UserLogintoken?: string | null="";  // Optional field
    UserLoginIDfortoken?: string | null="";  // Optional field
    Redmilweb?:string = 'Web'; //apichecking comsumer
    constructor(
      Id:string ="0",
      Userid: string = "NA",
      checksum: string ="NA",
      Wallet: string = 'False',
      Token : string = "", 
      UserLogintoken: string ="",
      UserLoginIDfortoken : string = "",
      Redmilweb:string = "Web"
    ) {
      this.Id = Id;
      this.Userid = Userid;
      this.checksum  = checksum ;
      this.Wallet  = Wallet ;
      this.Token  = Token ;
      this.UserLogintoken  = UserLogintoken ;
      this.UserLoginIDfortoken  = UserLoginIDfortoken ;
      this.Redmilweb = Redmilweb
    }
}



export class BaseModel_3 {
  Id?: string;
  UserId?: string | null;
  checksum?: string;
  Token?: string;  // Optional field
  Wallet?: string;
  UserLogintoken?: string | null="";  // Optional field
  UserLoginIDfortoken?: string | null="";  // Optional field
  Redmilweb?:string = 'Web'; //apichecking comsumer
  constructor(
    Id:string ="0",
    UserId: string = "NA",
    checksum: string ="NA",
    Wallet: string = 'False',
    Token : string = "", 
    UserLogintoken: string ="",
    UserLoginIDfortoken : string = "",
    Redmilweb:string = "Web"
  ) {
    this.Id = Id;
    this.UserId = UserId;
    this.checksum  = checksum ;
    this.Wallet  = Wallet ;
    this.Token  = Token ;
    this.UserLogintoken  = UserLogintoken ;
    this.UserLoginIDfortoken  = UserLoginIDfortoken ;
    this.Redmilweb = Redmilweb
  }
}

export class ValidateUser extends BaseModel_2 { 
  Mobile:string

  constructor(
    Mobile:string
  ){
    super();
    this.Mobile = Mobile
    
  }
}



export class ValidateUserMpin extends BaseModel_2 { 
  Mpin:string;
  Mobile:string;
  AppId:string;
  Version:string;
  DeviceInfo:string;
  IpAddress:string;
  MacAddress:string;
  
  constructor(
  Mpin:string ="",
  Mobile:string="",
  AppId:string ="",
  Version:string="NA",
  DeviceInfo:string="NA",
  checksum:string="NA",
  IpAddress:string = "",
  MacAddress:string =""

  ){
    super();
    this.Mpin = Mpin,
    this.Mobile = Mobile,
    this.AppId = AppId,
    this.Version = Version,
    this.DeviceInfo = DeviceInfo,
    this.checksum = checksum,
    this.IpAddress = IpAddress,
    this.MacAddress = MacAddress

  }
}


export class ValidateOTPAnotherDeviceLoginClass extends BaseModel_2 { 
  Mobile:string;
  Otp:string;
  AppId:string;

  constructor(
    Mobile:string="",
    Otp:string="",
    AppId:string=""
  ){
    super();
    this.Mobile = Mobile
    this.Otp = Otp
    this.AppId = AppId
  }
}

export class GetContactListStatusService extends BaseModel_1{
   ServiceName: string;

   constructor(
    ServiceName:string="Dashboard"
   ){
    super();
     this.ServiceName = ServiceName;
   }


}





  