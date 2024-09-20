// src/app/constants/api-endpoints.ts

import { environment } from "../../../environments/environment";

export const APIEndPoint = {
 Auth: {
    User_ValidateUser: `${environment.baseUrl}/User/ValidateUser`,
    Mpin: `${environment.baseUrl}/Mpin`,
    SendAnotherDeviceLoginOtp: `${environment.baseUrl}/SendAnotherDeviceLoginOtp`,
    ValidateOTPAnotherDeviceLogin: `${environment.baseUrl}/ValidateOTPAnotherDeviceLogin`,
  },

  Rechargesapi:{
    MyPayStoreGetCircle: `${environment.baseUrl}/MyPayStoreGetCircle`,
    GetOperaterList:`${environment.baseUrl}/GetOperaterList`,
    GetCircleList:`${environment.baseUrl}/GetCircleList`,
    MyPayStoreBrowsPlan:`${environment.baseUrl}/MyPayStoreBrowsPlans`,
  }
};