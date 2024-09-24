import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import {
  trigger,
  style,
  transition,
  animate,
  keyframes
} from '@angular/animations';
import { MateriallistModule } from '../../materiallist/materiallist.module';
import { CommonModule } from '@angular/common';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';


@Component({
  selector: 'app-dialog-box',
  standalone: true,
  imports: [MateriallistModule, CommonModule, LottieComponent],
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.scss',
  animations: [
    // Fade-in and zoom animation for dialog container
    trigger('dialogAnimation', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'scale(0.8)'
        }),
        animate(
          '300ms ease-out',
          style({
            opacity: 1,
            transform: 'scale(1)'
          })
        ),
      ]),
      transition(':leave', [
        animate(
          '200ms ease-in',
          style({
            opacity: 0,
            transform: 'scale(0.8)'
          })
        ),
      ]),
    ]),

    // Slide-down animation for the image
    trigger('imageAnimation', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(-30px)'
        }),
        animate(
          '400ms ease-out',
          style({
            opacity: 1,
            transform: 'translateY(0)'
          })
        ),
      ]),
    ]),

    // Fade-in for content
    trigger('contentAnimation', [
      transition(':enter', [
        style({
          opacity: 0,
        }),
        animate(
          '500ms 200ms ease-in',
          style({
            opacity: 1,
          })
        ),
      ]),
    ]),
  ],
})
export class DialogBoxComponent { 

  options!: AnimationOptions;
  
  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 
      title: string,
      status: string, 
      message: string,  
      animationPath: string; 
      additionalInfo: string, 
      list: string[],
      
    }
  ) {}

  ngOnInit(): void {
    this.options = {
      path: this.data.animationPath // Use the passed animation path
    };
  }

  animationCreated(animationItem: AnimationItem): void {
    // console.log("Animation created:", animationItem);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

 
 

}