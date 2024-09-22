import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIEndPoint } from '../../constants/constant';
import { ValidateUser, ApiResponse, BaseModel_3, BaseModel_1 } from '../../models/classes/BaseModel';
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
  GetUserProfile( GetUserProfileData: BaseModel_3,): Observable<any> {
    // debugger
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
notification_count( notification_countData: BaseModel_3,): Observable<any> {
      // debugger
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
GetContactListStatus( GetContactListStatusData: BaseModel_1): Observable<any> {
  // debugger
  GetContactListStatusData.UserId  = sessionStorage.getItem('Userid')?.toString();
  // Create checksum using ChecksumService
  const input = this.checksumService.makeChecksumString(
    'GetContactListStatus', 
    this.checksumService.checksumKey,
    GetContactListStatusData.UserId || 'NA'

  );
  GetContactListStatusData.Checksum = this.checksumService.convertStringToSHA512Hash(input);

  // Make the POST request
  return this.http.post<ApiResponse<ValidateUser>>(APIEndPoint.Dashboard.GetContactListStatus, GetContactListStatusData, { headers });
}

}
