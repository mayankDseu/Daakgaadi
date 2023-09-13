import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  {Emitter}  from 'src/app/emitters/emitter';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent  {
  message = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('https://logistwork.onrender.com/api/user', { withCredentials: true })
      .subscribe(
        (res: any) => {
          this.message = `Hi ${res.name}`;
         //Emitter.authEmitter.emit(true)
         
        },
        (err) => {
          this.message = 'You are not logged in';
         // Emitters.authEmitter.emit(false)
           
         
        }
      );
  }
  name: string;
  estimate: any; // Assuming your estimate object has any structure
  apiUrl = 'https://logistwork.onrender.com/api'; // Replace with the URL of your backend API

 

  register() {
    if (this.name) {
      this.http.get<any>(`${this.apiUrl}/estimates/${this.name}`).subscribe(
        (data) => {
          
          this.estimate = data;
        },
        (error) => {
          alert("Erorr in Fetching the Data")
          console.error('Error fetching estimate:', error);
          // Handle error, show error message, etc.
        }
      );
    }
  }
  closePopup() {
    this.estimate = null; // Clear the estimate data to close the pop-up
  }


  status: string;
  timestamp: string;

  



}