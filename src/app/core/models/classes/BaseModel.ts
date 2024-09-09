export class BaseModel_1 {
  Id?: string;
  UserId?: string;
  Checksum?: string;
  Token?: string;  // Optional field
  Wallet?: boolean;
  UserLogintoken?: string;  // Optional field
  UserLoginIDfortoken?: string;  // Optional field
  Redmilweb?:string = 'Web'; //checking api comsumer

  constructor(
    Id?:string,
    UserId?: string,
    Checksum?: string,
    Wallet?: boolean,
    Token ?: string,
    UserLogintoken?: string,
    UserLoginIDfortoken ?: string,
    Redmilweb?:string
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
    Userid?: string;
    checksum?: string;
    Token?: string;  // Optional field
    Wallet?: boolean;
    UserLogintoken?: string;  // Optional field
    UserLoginIDfortoken?: string;  // Optional field
    Redmilweb?:string = 'Web'; //apichecking comsumer
    constructor(
      Id?:string,
      Userid?: string,
      checksum?: string,
      Wallet?: boolean,
      Token ?: string,
      UserLogintoken?: string,
      UserLoginIDfortoken ?: string,
      Redmilweb?:string
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







  