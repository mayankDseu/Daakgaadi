import { Component, OnInit, Input } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: "app-card-table",
  templateUrl: "./card-table.component.html",
})
export class CardTableComponent implements OnInit {
  pageSize = 5;
  currentPage = 1;
  totalItems: number;
  totalPages: number;
  paginatedInvoices: any[] = [];

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.updatePaginatedData();
  }

  updatePaginatedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedInvoices = this.invoices.slice(startIndex, endIndex);
  }

  @Input() color: string = 'dark';
  
  collapseShow = "hidden";
  

  invoices: any[] = [];
  invoice: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchEstimates();
  }

  toggleCollapseShow(classes) {
    this.collapseShow = classes;
  }
  fetchEstimates(): void {
    this.http.get<any[]>('https://logistwork.onrender.com/api/invoices').subscribe(
      (data) => {
        this.invoices = data;
        this.totalItems = this.invoices.length;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.currentPage = 1;
        this.updatePaginatedData();
        
      },
      (error) => {
        alert('Error in Getting the Data');
        console.error('Error fetching invoices:', error);
      }
    );
  }



}
