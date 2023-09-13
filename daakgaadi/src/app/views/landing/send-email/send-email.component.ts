import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
})
export class SendEmailComponent {
  email: {
    to: string;
    subject: string;
    text: string;
    attachment: File | null;
  } = {
    to: '',
    subject: '',
    text: '',
    attachment: null,
  };

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.email.attachment = event.target.files[0];
  }

  sendEmail() {
    const formData = new FormData();
    formData.append('to', this.email.to);
    formData.append('subject', this.email.subject);
    formData.append('text', this.email.text);
    if (this.email.attachment) {
      formData.append('attachment', this.email.attachment);
    }

    this.http.post('https://logistwork.onrender.com/api/send-email', formData).subscribe(
      (response) => {
        console.log(response);
        alert('Email sent successfully!');
      },
      (error) => {
        console.error(error);
        alert('Error sending email.');
      }
    );
  }
}
