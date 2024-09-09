import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class ChecksumService {
  public checksumKey = '32977065309f4acaad68fdbc1f63db97';

  // Function to create the checksum string
  public makeChecksumString(...names: string[]): string {
    let result = '';

    if (names.length === 4 && names[3].trim() === '') {
      for (let i = 0; i < 3; i++) {
        result += '|' + names[i];
      }
    } else {
      for (let i = 0; i < names.length; i++) {
        result += '|' + names[i];
      }
    }

    if (result.trim().length > 1) {
      result = result.substring(1); // Remove the leading '|'
    }

    return result;
  }

  // Function to convert string to SHA-512 hash
  public convertStringToSHA512Hash(input: string): string {
    const hash = CryptoJS.SHA512(input);
    return hash.toString(CryptoJS.enc.Hex); // Convert to hex string
  }

  
}