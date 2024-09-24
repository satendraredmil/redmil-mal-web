import { Component, Inject, OnInit } from '@angular/core';
import { MateriallistModule } from '../../materiallist/materiallist.module';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../../core/services/dashboard/dashboard.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-wallets-pup',
  standalone: true,
  imports: [MateriallistModule, CommonModule],
  templateUrl: './wallets-pup.component.html',
  styleUrl: './wallets-pup.component.scss'
})
export class WalletsPupComponent implements OnInit{

  transactionAmount: number = 0; // Transaction amount will be dynamic
  cashWalletBalance: number = 1500; // Dynamic balance for cash wallet
  advanceWalletBalance: number = 100; // Dynamic balance for advance wallet
  selectedWallet: string = ''; // To track which wallet is selected

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: { amount: number },
    private balance_api:DashboardService,
    public dialogRef: MatDialogRef<WalletsPupComponent>
  ){
    this.transactionAmount = data.amount;
  }

  ngOnInit(): void {
    this.Getbalancewallets();
  }

  Getbalancewallets(){
    this.balance_api.Getbalance().subscribe((res)=>{
      if(res){
        this.cashWalletBalance = Number(res.Data[0].MainBal) || 0;
        this.advanceWalletBalance = Number(res.Data[0].AdBal) || 0;
      }
    }, (error)=>{
      console.error('Error fetching wallet balances:', error);
    })
  }



  // Method to handle wallet selection
  selectWallet(walletType: string) {
    this.selectedWallet = walletType;

   }


  // Method to make payment based on the selected wallet
  makePayment() {
    if (this.selectedWallet === 'cash-wallet') {
      if (this.cashWalletBalance >= this.transactionAmount) {
        // Deduct from Cash Wallet
        this.cashWalletBalance -= this.transactionAmount;
        this.dialogRef.close(this.selectedWallet);
      } else {
        alert('Insufficient balance in Cash Wallet');
      }
    } else if (this.selectedWallet === 'advance-wallet') {
      if (this.advanceWalletBalance >= this.transactionAmount) {
        // Deduct from Advance Wallet
        this.advanceWalletBalance -= this.transactionAmount;
        alert('Payment successful from Advance Wallet');
        this.dialogRef.close(this.selectedWallet)
      } else {
        alert('Insufficient balance in Advance Wallet');
      }
    } else {
      alert('Please select a wallet to proceed');
    }
  }
}