import { Component, ElementRef, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';





@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  
})



export class LandingComponent  {

  fullname: string;
  email: string;
  message: string;

  constructor(private http: HttpClient) {}

  
  sendMessage(): void {

    const emailInput = document.getElementById('email') as HTMLInputElement;
    const fullnameInput = document.getElementById('fullname') as HTMLInputElement;
    const messageInput = document.getElementById('message') as HTMLInputElement;
    
      
    
    
        // Send the estimate data to the server to store in MongoDB
        const estimateData = {
          fullname:this.fullname,
          message:this.message,
  // Use value property to get the input value
  email: this.email,// Use value property to get the input value
       
        };
    
        this.http.post<any>('https://logistwork.onrender.com/api/contact', estimateData).subscribe(
          (response: any) => {
            alert("successfully Generated Estimate");
           
            
          // Log the generated estimateId to check its value
  
          // Prepare the email text
         
          },
          (error) => {
            alert("Error in Generating the Estimate")
            console.error('Error calculating estimate:', error);
          }
        );
      }
      
    }
