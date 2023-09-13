import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})
export class ComplaintComponent implements OnInit {
  pageSize = 5;
  currentPage = 1;
  totalItems: number;
  totalPages: number;
  paginatedContact: any[] = [];

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.updatePaginatedData();
  }

  updatePaginatedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedContact = this.contacts.slice(startIndex, endIndex);
  }

  @Input() color: string = 'dark';
  contacts: any[] = [];
  contact: any;
  collapseShow = "hidden";

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchEstimates();
  }

  toggleCollapseShow(classes) {
    this.collapseShow = classes;
  }

  fetchEstimates(): void {
    this.http.get<any[]>('https://logistwork.onrender.com/api/comp').subscribe(
      (data) => {
        this.contacts = data;
        this.totalItems = this.contacts.length;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.currentPage = 1;
        this.updatePaginatedData();
        this.contacts.forEach((contact) => {
        //  this.estimateStatuses[estimate._id] = estimate.status;
        });
      },
      (error) => {
        alert('Error in Getting the Data');
        console.error('Error fetching invoices:', error);
      }
    );
  }
}
