import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, throwError } from 'rxjs';
import { ChecksumService } from '../checksum/checksum.service';
import { BaseModel_2 } from '../../models/classes/BaseModel';
import { ValidateUser, ValidateUserMpin } from '../../models/interfaces/validateUser';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationapiService {

  private baseUrl = 'https://proapitest3.redmilbusinessmall.com/api'; // Replace with your actual API base URL

  // private validatedMobile: string | null = null;
  // Mobile:String = "";
  Userid:string='NA'

  // //Mpin datampin 
  // AppId:string ="NA";
  // Version:string="8.0.2";
  // DeviceInfo:string ="NA";
  // checksum:string="NA";
  // IpAddress:string="NA";
  // MacAddress:string="NA";
  // Mpin:string = "NA"

  constructor(private http: HttpClient, private checksumService: ChecksumService) {}



  // Function to call the API with checksum and MPIN
  validateUser( Data: ValidateUser,): Observable<any> {
    debugger
    const endpoint = '/User/ValidateUser';
    const apiUrl = this.baseUrl + endpoint;

     // Ensure mobile is properly formatted as a string
    // Mobile = Mobile.toString().toLowerCase(); // This ensures mobile is treated as a string
    // Create checksum using ChecksumService
    const input = this.checksumService.makeChecksumString(
      'User/ValidateUser', 
      this.checksumService.checksumKey,
      this.Userid, 
      Data.Mobile,
      Data.AppId, 
      Data.Version, 
      Data.DeviceInfo, 
      Data.checksum, 
      Data.IpAddress, 
      Data.MacAddress, 
    );
    Data.checksum = this.checksumService.convertStringToSHA512Hash(input);
    
   

    // Set headers (adjust content-type based on your API)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Make the POST request
    return this.http.post(apiUrl, Data, { headers });
  }


  // Function to call the API with checksum and MPIN
  validateUserMPIN( DataMpin: ValidateUserMpin,): Observable<any> {
    debugger
    const endpoint = '/Mpin';
    const apiUrl = this.baseUrl + endpoint;


     // Ensure mobile is properly formatted as a string
    // Mobile = Mobile.toString().toLowerCase(); // This ensures mobile is treated as a string
    // Create checksum using ChecksumService
    const input = this.checksumService.makeChecksumString('Mpin', 
      this.checksumService.checksumKey,
      this.Userid, 
      DataMpin.AppId, 
      DataMpin.Version, 
      DataMpin.DeviceInfo, 
      DataMpin.checksum, 
      DataMpin.IpAddress, 
      DataMpin.Mpin, 
      DataMpin.MacAddress, 
     );
    DataMpin.checksum = this.checksumService.convertStringToSHA512Hash(input);
    
   

    // Set headers (adjust content-type based on your API)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Make the POST request
    return this.http.post(apiUrl, DataMpin, { headers });
  }


}