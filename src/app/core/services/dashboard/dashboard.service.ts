import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIEndPoint } from '../../constants/constant';
import { ValidateUser, ApiResponse, BaseModel_3, BaseModel_1, BaseModel_2, GetContactListStatusService } from '../../models/classes/BaseModel';
import { ChecksumService } from '../checksum/checksum.service';


  // Set headers (adjust content-type based on your API)
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient, private checksumService: ChecksumService) {}
  
  // Function to call the API with checksum and UserMobile
  GetUserSubscriptionDetails(): Observable<any> {
    const GetUserSubscriptionDetailsData = new BaseModel_3();
    GetUserSubscriptionDetailsData.UserLogintoken=sessionStorage.getItem('UserLogintoken')?.toString();
    GetUserSubscriptionDetailsData.UserLoginIDfortoken=sessionStorage.getItem('UserLoginIDfortoken')?.toString();
    GetUserSubscriptionDetailsData.UserId  = sessionStorage.getItem('Userid')?.toString();
    // Create checksum using ChecksumService
    const input = this.checksumService.makeChecksumString(
      'GetUserSubscriptionDetails', 
      this.checksumService.checksumKey,
      GetUserSubscriptionDetailsData.UserId || 'NA'

    );
    GetUserSubscriptionDetailsData.checksum = this.checksumService.convertStringToSHA512Hash(input);

    // Make the POST request
    return this.http.post<ApiResponse<ValidateUser>>(APIEndPoint.Dashboard.GetUserSubscriptionDetails, GetUserSubscriptionDetailsData, { headers });
  }

   
  // Function to call the API with checksum and UserMobile
  GetUserProfile(): Observable<any> {
    const GetUserProfileData: BaseModel_3 = new BaseModel_3();
    GetUserProfileData.UserLogintoken = sessionStorage.getItem('UserLogintoken')?.toString();
    GetUserProfileData.UserLoginIDfortoken = sessionStorage.getItem('UserLoginIDfortoken')?.toString();
    GetUserProfileData.UserId  = sessionStorage.getItem('Userid')?.toString();
    // Create checksum using ChecksumService
    const input = this.checksumService.makeChecksumString(
      'GetUserProfile', 
      this.checksumService.checksumKey,
      GetUserProfileData.UserId || 'NA'

    );
    GetUserProfileData.checksum = this.checksumService.convertStringToSHA512Hash(input);

    // Make the POST request
    return this.http.post<ApiResponse<ValidateUser>>(APIEndPoint.Dashboard.GetUserProfile, GetUserProfileData, { headers });
  }

    // Function to call the API with checksum and UserMobile
notification_count(): Observable<any> {
  const notification_countData: BaseModel_3 = new BaseModel_3();
   notification_countData.UserLogintoken = sessionStorage.getItem('UserLogintoken')?.toString();
   notification_countData.UserLoginIDfortoken = sessionStorage.getItem('UserLoginIDfortoken')?.toString();
  notification_countData.UserId  = sessionStorage.getItem('Userid')?.toString();
      // Create checksum using ChecksumService
      const input = this.checksumService.makeChecksumString(
        'GetUserProfile', 
        this.checksumService.checksumKey,
        notification_countData.UserId || 'NA'
  
      );
      notification_countData.checksum = this.checksumService.convertStringToSHA512Hash(input);
  
      // Make the POST request
      return this.http.post<ApiResponse<ValidateUser>>(APIEndPoint.Dashboard.notification_count, notification_countData, { headers });
    }

       // Function to call the API with checksum and UserMobile
GetContactListStatus(): Observable<any> {
  const GetContactListStatusData: GetContactListStatusService = new GetContactListStatusService();
  GetContactListStatusData.UserId  = sessionStorage.getItem('Userid')?.toString();
  GetContactListStatusData.UserLogintoken = sessionStorage.getItem('UserLogintoken')?.toString();
  GetContactListStatusData.UserLoginIDfortoken = sessionStorage.getItem('UserLoginIDfortoken')?.toString();
  GetContactListStatusData.ServiceName
  // Create checksum using ChecksumService
  const input = this.checksumService.makeChecksumString(
    'GetContactListStatus', 
    this.checksumService.checksumKey,
    GetContactListStatusData.UserId || 'NA',
    
  );
  GetContactListStatusData.Checksum = this.checksumService.convertStringToSHA512Hash(input);

  // Make the POST request
  return this.http.post<ApiResponse<ValidateUser>>(APIEndPoint.Dashboard.GetContactListStatus, GetContactListStatusData, { headers });
}


Getbalance(): Observable<any> {
  // debugger
  const GetbalanceData: BaseModel_2 = new BaseModel_2();
  GetbalanceData.Userid  = sessionStorage.getItem('Userid')?.toString();
  GetbalanceData.UserLogintoken = sessionStorage.getItem('UserLogintoken')?.toString();
  GetbalanceData.UserLoginIDfortoken = sessionStorage.getItem('UserLoginIDfortoken')?.toString();
  // Create checksum using ChecksumService
  const input = this.checksumService.makeChecksumString(
    'Getbalance', 
    this.checksumService.checksumKey,
    GetbalanceData.Userid || 'NA'

  );
  GetbalanceData.checksum = this.checksumService.convertStringToSHA512Hash(input);

  // Make the POST request
  return this.http.post<ApiResponse<ValidateUser>>(APIEndPoint.Dashboard.Getbalance, GetbalanceData, { headers });
}

notification_data(): Observable<any> {
  const notification_dataData: BaseModel_3 = new BaseModel_3();
  notification_dataData.UserId  = sessionStorage.getItem('Userid')?.toString();
  notification_dataData.UserLogintoken = sessionStorage.getItem('UserLogintoken')?.toString();
  notification_dataData.UserLoginIDfortoken = sessionStorage.getItem('UserLoginIDfortoken')?.toString();
  // Create checksum using ChecksumService
  const input = this.checksumService.makeChecksumString(
    'getnotification', 
    this.checksumService.checksumKey,
    notification_dataData.UserId || 'NA'
  );
  notification_dataData.checksum = this.checksumService.convertStringToSHA512Hash(input);

  // Make the POST request
  return this.http.post<ApiResponse<ValidateUser>>(APIEndPoint.Dashboard.notification_data, notification_dataData, { headers });
}

notification_update(): Observable<any> {
  const notification_updateData: BaseModel_3 = new BaseModel_3();
  notification_updateData.UserId  = sessionStorage.getItem('Userid')?.toString();
  notification_updateData.UserLogintoken = sessionStorage.getItem('UserLogintoken')?.toString();
  notification_updateData.UserLoginIDfortoken = sessionStorage.getItem('UserLoginIDfortoken')?.toString();
  // Create checksum using ChecksumService
  const input = this.checksumService.makeChecksumString(
    'updatenotification', 
    this.checksumService.checksumKey,
    notification_updateData.UserId || 'NA'
  );
  notification_updateData.checksum = this.checksumService.convertStringToSHA512Hash(input);

  // Make the POST request
  return this.http.post<ApiResponse<ValidateUser>>(APIEndPoint.Dashboard.notification_update, notification_updateData, { headers });
}

}
