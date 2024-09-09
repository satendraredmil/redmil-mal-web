// src/app/constants/api-endpoints.ts

import { environment } from "../../../environments/environment";

export const APIEndPoint = {
  AUTH: {
    Register: `${environment.baseUrl}/users/register`,
    Login: `${environment.baseUrl}/users/login`,
    GetCurrentUser: `${environment.baseUrl}/users/current-user`,
    UpdateAccount: `${environment.baseUrl}/users/update-account`,
    ChangePassword: `${environment.baseUrl}/users/change-password`,
    ResetPassword: `${environment.baseUrl}/users/reset-password`,
    RefreshToken: `${environment.baseUrl}/users/refresh-token`,
    Logout: `${environment.baseUrl}/users/logout`,
  }
};