import { BaseModel_2 } from "../BaseModel";

// export class Recharges extends BaseModel_2{
//     MobileNo:string;
    
//     constructor(
//         MobileNo:string =''
//     ){
//         super();
//       this.MobileNo = MobileNo
      
//     }
// } 


export class Recharges extends BaseModel_2 {
    MobileNo?: string ;
    ServiceId:string;
    AppVersion:string;
    Circle:string;
    OpId:string;
  
    constructor(
      MobileNo: string ="",
      ServiceId:string="",
      AppVersion:string = "788",
      Circle:string="",
      OpId:string =""
    ) {
      super(); // Call the constructor of the base class
      this.MobileNo = MobileNo;
      this.ServiceId = ServiceId;
      this.AppVersion = AppVersion;
      this.Circle = Circle;
      this.OpId = OpId;
    }
  }
  
