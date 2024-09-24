import { Component, Inject, Optional } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

import { MateriallistModule } from '../../materiallist/materiallist.module';
import { CommonModule } from '@angular/common';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';



@Component({
  selector: 'app-rechargepup',
  standalone: true,
  imports: [MateriallistModule, CommonModule, LottieComponent],
  templateUrl: './rechargepup.component.html',
  styleUrl: './rechargepup.component.scss',
})
export class RechargepupComponent {

  options!: AnimationOptions;
  
  constructor(
    @Optional()  public dialogRef: MatDialogRef<RechargepupComponent>,  // Inject the MatDialogRef
    @Optional()  @Inject(MAT_DIALOG_DATA) public data: {
      title: string,
      status: string, 
      MobileNo: string,
      amount: string,
      TxnID: string,
      Date: string,
      Time: string,
      message: string,
      animationPath: string,
      additionalInfo: string,
    }
  ) {}

  ngOnInit(): void {
    this.options = {
     path:this.data.animationPath  // Use the passed animation path 
    };
  }

  animationCreated(animationItem: AnimationItem): void {
    //console.log("Animation created:", animationItem);
  }

   // Method to close the dialog
   closeDialog(): void {
    this.dialogRef.close();
  }

}
