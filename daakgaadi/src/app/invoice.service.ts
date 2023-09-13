import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { BehaviorSubject } from 'rxjs';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private pdfDataSubject = new BehaviorSubject<string | null>(null);
  pdfData$ = this.pdfDataSubject.asObservable();

  constructor() {}

  generatePDF() {
    // ... Generate your PDF data as you did before ...
    const docDefinition = {
      // ... PDF content ...
    };

    pdfMake.createPdf(docDefinition).getBuffer((buffer: any) => {
      const pdfBlob = new Blob([buffer], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      this.pdfDataSubject.next(pdfUrl);
    });
  }
}
