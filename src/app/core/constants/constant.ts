// src/app/constants/api-endpoints.ts

import { environment } from "../../../environments/environment";

export const APIEndPoint = {
 Auth: {
    User_ValidateUser: `${environment.baseUrl}/User/ValidateUser`,
    Mpin: `${environment.baseUrl}/Mpin`,
    SendAnotherDeviceLoginOtp: `${environment.baseUrl}/SendAnotherDeviceLoginOtp`,
    ValidateOTPAnotherDeviceLogin: `${environment.baseUrl}/ValidateOTPAnotherDeviceLogin`,
  },

  Dashboard:{
    GetUserSubscriptionDetails: `${environment.baseUrl}/GetUserSubscriptionDetails`,
    GetUserProfile: `${environment.baseUrl}/GetUserProfile`,
    notification_count: `${environment.baseUrl}/notification/count`,
    GetContactListStatus: `${environment.baseUrl}/GetContactListStatus`,
    Getbalance:`${environment.baseUrl}/Getbalance`,
    notification_data:`${environment.baseUrl}/notification/data`,
    notification_update:`${environment.baseUrl}/notification/update`
  },

  Rechargesapi:{
    MyPayStoreGetCircle: `${environment.baseUrl}/MyPayStoreGetCircle`,
    GetOperaterList:`${environment.baseUrl}/GetOperaterList`,
    GetCircleList:`${environment.baseUrl}/GetCircleList`,
    MyPayStoreBrowsPlan:`${environment.baseUrl}/MyPayStoreBrowsPlans`,
    Recharge:`${environment.baseUrl}/Recharge`,
    transactions_recentTransaction:`${environment.baseUrl}/transactions/recentTransaction`
  },

};