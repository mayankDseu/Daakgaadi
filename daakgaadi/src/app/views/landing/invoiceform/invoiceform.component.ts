import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 

import { InvoiceService } from './/..//..//..//invoice.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class Product {
  name: string;
  price: number;
  qty: number;
}
class Invoice {
  customerName: string;
  address: string;
  contactNo: number;
  email: string;

  products: Product[] = [];
  additionalDetails: string;

  constructor() {
    // Initially one empty product row we will show
    this.products.push(new Product());
  }
}

@Component({
  selector: 'app-invoiceform',
  templateUrl: './invoiceform.component.html',
})
export class InvoiceformComponent implements OnInit {
  constructor(private invoiceService: InvoiceService,private http: HttpClient,private router: Router) {}

  invoices: any[] = [];
  ngOnInit() {
    this.fetchInvoices();
  }

  fetchInvoices() {
    this.http.get<any[]>('https://logistwork.onrender.com/api/invoices').subscribe(
      (response) => {
        this.invoices = response;
      },
      (error) => {
        alert("Error in fetching the data")
        console.error('Error fetching invoices:', error);
      }
    );
  }
  invoice = new Invoice();

  submitForm() {
    this.http.post<any>('https://logistwork.onrender.com/api/invoices', this.invoice).subscribe(
      (response) => {
        alert("Invoice Cretated Successfullly")
        console.log('Invoice data saved to the database:', response);
        this.invoice = response; // Update the invoice object with the response, including the generated _id
      },
      (error) => {
        console.error('Error saving invoice data:', error);
        // Perform actions to handle the error, such as displaying an error message to the user
      }
    );
  }
  
  generatePDF(action = 'open') {
    let docDefinition = {
      content: [
        {
          text: 'Logist',
          fontSize: 16,
          alignment: 'center',
          color: '#047886',
        },
        {
          text: 'INVOICE',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'skyblue',
        },
        {
          text: 'Customer Details',
          style: 'sectionHeader',
        },
        {
          columns: [
            [
              {
                text: this.invoice.customerName,
                bold: true,
              },
              { text: this.invoice.address },
              { text: this.invoice.email },
              { text: this.invoice.contactNo },
            ],
            [
              {
                text: `Date: ${new Date().toLocaleString()}`,
                alignment: 'right',
              },
              {
                text: `Bill No : ${(Math.random() * 1000).toFixed(0)}`,
                alignment: 'right',
              },
            ],
          ],
        },
        {
          text: 'Order Details',
          style: 'sectionHeader',
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Product', 'Price', 'Quantity', 'Amount'],
              ...this.invoice.products.map((p) => [
                p.name,
                p.price,
                p.qty,
                (p.price * p.qty).toFixed(2),
              ]),
              [
                { text: 'Total Amount', colSpan: 3 },
                {},
                {},
                this.invoice.products
                  .reduce((sum, p) => sum + p.qty * p.price, 0)
                  .toFixed(2),
              ],
            ],
          },
        },
        {
          text: 'Additional Details',
          style: 'sectionHeader',
        },
        {
          text: this.invoice.additionalDetails,
          margin: [0, 0, 0, 15],
        },
        {
          columns: [
            [{ qr: `${this.invoice.customerName}`, fit: '50' }],
            [{ text: 'Signature', alignment: 'right', italics: true }],
          ],
        },
        {
          text: 'Terms and Conditions',
          style: 'sectionHeader',
        },
        {
          ul: [
            'Order can be return in max 10 days.',
            'Warrenty of the product will be subject to the manufacturer terms and conditions.',
            'This is system generated invoice.',
          ],
        },
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15],
        },
      },
    };

    if (action === 'download') {
      pdfMake.createPdf(docDefinition).download();
      this.router.navigate(['email']);
    } else if (action === 'print') {
      pdfMake.createPdf(docDefinition).print();
    } else {
      pdfMake.createPdf(docDefinition).open();
    }
    this.invoiceService.generatePDF();

  }

  addProduct() {
    this.invoice.products.push(new Product());
  }

  
  updateStatus(invoiceId: string) {
    this.http.put<any>(`https://logistwork.onrender.com/api/invoices/${invoiceId}/status`, {}).subscribe(
      (response) => {
        alert("Successfully Updated the Status")
        console.log('Invoice status updated:', response);
        // Update the status in the invoices array if needed
        // (e.g., by finding the invoice in the invoices array and updating its status property)
      },
      (error) => {
        console.error('Error updating invoice status:', error);
        // Perform actions to handle the error, such as displaying an error message to the user
      }
    );
  }
 

 

}
