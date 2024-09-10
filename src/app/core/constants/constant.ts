// src/app/constants/api-endpoints.ts

import { environment } from "../../../environments/environment";

export const APIEndPoint = {
 Auth: {
    User_ValidateUser: `${environment.baseUrl}/User/ValidateUser`,
    Mpin: `${environment.baseUrl}/Mpin`,
    SendAnotherDeviceLoginOtp: `${environment.baseUrl}/SendAnotherDeviceLoginOtp`,
    ValidateOTPAnotherDeviceLogin: `${environment.baseUrl}/ValidateOTPAnotherDeviceLogin`,
  }
};