import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChecksumService } from '../checksum/checksum.service';
import { ApiResponse, ValidateOTPAnotherDeviceLoginClass, ValidateUser, ValidateUserMpin } from '../../models/classes/BaseModel';
import { APIEndPoint } from '../../constants/constant';


  // Set headers (adjust content-type based on your API)
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });


@Injectable({
  providedIn: 'root'
})
export class AuthenticationapiService {
  Userid:string='NA'

  constructor(private http: HttpClient, private checksumService: ChecksumService) {}

  // Function to call the API with checksum and UserMobile
  validateUser( Data: ValidateUser,): Observable<any> {
    // debugger
    // Create checksum using ChecksumService
    const input = this.checksumService.makeChecksumString(
      'User/ValidateUser', 
      this.checksumService.checksumKey,
      this.Userid, 
      Data.Mobile,

    );
    Data.checksum = this.checksumService.convertStringToSHA512Hash(input);

    // Make the POST request
    return this.http.post<ApiResponse<ValidateUser>>(APIEndPoint.Auth.User_ValidateUser, Data, { headers });
  }


  // Function to call the API with checksum and MPIN
  validateUserMPIN( DataMpin: ValidateUserMpin,): Observable<any> {
    // Create checksum using ChecksumService
    const input = this.checksumService.makeChecksumString('Mpin', 
      this.checksumService.checksumKey,
      this.Userid, 
      DataMpin.Mobile,
      DataMpin.Mpin, 
      DataMpin.IpAddress, 
      DataMpin.MacAddress, 
      DataMpin.Version
     );
    DataMpin.checksum = this.checksumService.convertStringToSHA512Hash(input);
    // Make the POST request
    return this.http.post(APIEndPoint.Auth.Mpin, DataMpin, { headers });
  }


   // Function to call the API with checksum and userSendOTP
   UserSendOTP( DataOTP: ValidateUser): Observable<any> {
    debugger

    // Create checksum using ChecksumService
    const input = this.checksumService.makeChecksumString('SendAnotherDeviceLoginOtp', 
      this.checksumService.checksumKey,
      this.Userid, 
      DataOTP.Mobile,
     );
     DataOTP.checksum = this.checksumService.convertStringToSHA512Hash(input);

    // Make the POST request
    return this.http.post(APIEndPoint.Auth.SendAnotherDeviceLoginOtp, DataOTP, { headers });
  }


  // Function to call the API with checksum and ValidateOTPAnotherDeviceLogin
  ValidateOTPAnotherDeviceLogin(ValidateOTP:ValidateOTPAnotherDeviceLoginClass): Observable<any>{
    debugger

    // Create checksum using ChecksumService
    const input = this.checksumService.makeChecksumString('ValidateOTPAnotherDeviceLogin', 
      this.checksumService.checksumKey,
      this.Userid, 
      ValidateOTP.Mobile,
      ValidateOTP.Otp,
      ValidateOTP.AppId
     );
     ValidateOTP.checksum = this.checksumService.convertStringToSHA512Hash(input);

    // Make the POST request
    return this.http.post(APIEndPoint.Auth.ValidateOTPAnotherDeviceLogin, ValidateOTP, { headers });
  
}


}