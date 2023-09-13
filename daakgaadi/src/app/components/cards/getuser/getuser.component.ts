import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
interface Estimate {
  isconfirm: any;
  _id: string;
  status: string;
  statustwo: string;
  previousStatus: string;
  currentStatus?: string;
  currentStatustwo?: string;
  currentStatusthree?: string;
}
interface ApiResponse {
  status: string;
  // Add other properties if needed
}

@Component({
  selector: 'app-getuser',
  templateUrl: './getuser.component.html',
  styleUrls: ['./getuser.component.css'],
})
export class GetuserComponent implements OnInit {

 /*  buttonColor: string = 'default';
  buttonColortwo: string = 'default';
  buttonColorthree: string = 'default'; */
  initialButtonColorThree: string = 'default';

  buttonColor = ''; // Stores background color for "Goods in warehouse" button
  buttonColortwo = ''; // Stores background color for "Reached Hub" button
  buttonColorthree = ''; 

  previousSelectedEstimateId: string | null = null;
  public selectedEstimateIdthree: string | null = null;
  public selectedEstimateIdtwo: string | null = null;
  public selectedEstimateIdone: string | null = null;

  
  // Change 'any' to the type of your 'invoices' array.
  estimates: Estimate[] = []; // Initialize the estimate object
  buttonClicked: boolean = false;
  estimateStatuses: { [key: string]: string } = {};
  pageSize = 5;
  currentPage = 1;


  totalItems: number;
  status: string;
  statustwo:String;
  totalPages: number;
  paginatedEstimates: any[] = [];
  showPopup = false;
  popupData: any;
  searchTerm: string = '';
  isGoodsInWarehouse = false; 
  // Change 'any' to the type of your 'invoices' array.

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.updatePaginatedData();
  }
  updatePaginatedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedEstimates = this.filteredEstimates.slice(startIndex, endIndex);
  }
/* 
  updatePaginatedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedEstimate = this.estimates.slice(startIndex, endIndex);
  } */
  @Input() color: string = 'dark';
  
  constructor(private http: HttpClient, private router: Router) {
    this.setupButton('hello-btn', this.updateStatus);
    this.setupButton('hello-btnn', this.updateStatustwo);
    this.setupButton('hello-btnnn', this.updateStatusthree);
    this.selectedEstimateIdone = localStorage.getItem('selectedEstimateIdone') || '';

    // Get all the elements with class name "hello-btn" and convert to an array
    const helloBtns = Array.from(
      document.getElementsByClassName('hello-btn') as HTMLCollectionOf<HTMLButtonElement>
    );

    // Loop through each button, set initial color, and add click event listener
    for (const btn of helloBtns) {
      // Set the initial color of the button when the page loads
      this.setButtonColor(btn);

      // Remove any existing click event listeners from the button
      btn.removeEventListener('click', this.handleButtonClickHub);

      // Add click event listener to each button
      btn.addEventListener('click', (ev: MouseEvent) => this.handleButtonClickHub(ev));
    }

} setupButton(className: string, clickHandler: (estimateId: string) => void): void {
  const buttons = Array.from(
    document.getElementsByClassName(className) as HTMLCollectionOf<HTMLButtonElement>
  );

  for (const btn of buttons) {
    this.setButtonColor(btn);
    btn.removeEventListener('click', this.handleButtonClick);
    btn.addEventListener('click', (ev: MouseEvent) => this.handleButtonClick(ev));
    btn.addEventListener('click', () => clickHandler(btn.dataset.estimateStatus));
  }
}


setButtonColor(btn: HTMLButtonElement): void {
  const status = btn.dataset.estimateStatus;
  const storedColor = localStorage.getItem(`buttonColor_${status}`);
  if (storedColor && storedColor === 'green') {
    btn.style.backgroundColor = 'green';
    btn.innerText = status;
  } else {
    btn.style.backgroundColor = 'gray';
    btn.innerText = 'Click Me';
  }
}

handleButtonClick(ev: MouseEvent): void {
  const btn = ev.target as HTMLButtonElement;
  const status = btn.dataset.estimateStatus;
  if (btn.style.backgroundColor === 'gray') {
    btn.innerText = status;
    btn.style.backgroundColor = 'green';
    localStorage.setItem(`buttonColor_${status}`, 'green');
  } else {
    btn.innerText = 'Click Me';
    btn.style.backgroundColor = 'gray';
    localStorage.setItem(`buttonColor_${status}`, 'gray');
  }
}

  private readonly backendApiUrl = 'https://logistwork.onrender.com/api'; 
  ngOnInit(): void { 
 
    this.buttonColor = localStorage.getItem('buttonColor') || '';
    this.buttonColortwo = localStorage.getItem('buttonColortwo') || '';
    this.buttonColorthree = localStorage.getItem('buttonColorthree') || '';

 
 
 
 
 
    /*   


    this.buttonColor = sessionStorage.getItem('buttonColor') || 'default';
  this.buttonColortwo = sessionStorage.getItem('buttonColortwo') || 'default';
  this.buttonColorthree = sessionStorage.getItem('buttonColorthree') || 'default';
 / */// Store the initial button color for 'fas fas' button
 this.initialButtonColorThree = this.buttonColorthree;

    this.selectedEstimateIdone = localStorage.getItem('selectedEstimateIdone');
    const storedId = localStorage.getItem('selectedEstimateIdone');
    if (storedId) {
      this.selectedEstimateIdone = storedId;
    }
    const storedEstimateId = localStorage.getItem('selectedEstimateIdone');
  if (storedEstimateId) {
    this.selectedEstimateIdone = storedEstimateId;
  }
  const selectedEstimateIdtwo = localStorage.getItem('selectedEstimateIdtwo');
  if (selectedEstimateIdtwo) {
    this.selectedEstimateIdtwo = selectedEstimateIdtwo;
  }
  const storedEstimateIdthree = localStorage.getItem('selectedEstimateIdthree');
  if (storedEstimateIdthree) {
    this.selectedEstimateIdthree = storedEstimateIdthree;
  }
    this.totalItems = this.estimates.length;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);

    // Set currentPage to 1 to ensure the first page of data is displayed by default
    this.currentPage = 1;
    this.updatePaginatedData();// Fetch all invoices from the backend API
   
    this.fetchEstimates();
  }
 btn = document.getElementById('btn') as HTMLInputElement;  
 
 

getButtonColor(status: string): string {
  if (status === 'Goods in warehouse' ) {
    return 'green';
  } else if (status === 'Received goods') {
    return 'red';
  } else {
    // Set other colors based on other status values if needed
    // e.g., return 'yellow' for 'In progress' status
    //       return 'blue' for 'Shipped' status
    return 'default';
  }
}
getButtonColortwo(statustwo: string): string {
  if (statustwo === ' reached hub') {
    return 'green';
  } else if (statustwo === 'Received goods') {
    return 'red';
  } else {
    // Set other colors based on other status values if needed
    // e.g., return 'yellow' for 'In progress' status
    //       return 'blue' for 'Shipped' status
    return 'default';
  }
}

isSelectedEstimate(estimateId: string): boolean {
  // Retrieve the selectedEstimateId for this row from local storage
  const selectedEstimateId = localStorage.getItem(`selectedEstimateIdthree_${estimateId}`);

  // Compare the current estimateId with the selectedEstimateId
  return estimateId === selectedEstimateId;
}

updateStatus(invoiceId: string) {
  const newStatus = 'Goods in warehouse';

  this.http
    .put(`https://logistwork.onrender.com/api/estimatesone/${invoiceId}/status`, { status: newStatus })
    .subscribe(
      (response) => {
        alert('Status Updated Successfully');
        console.log('Invoice status updated:', response);
        this.selectedEstimateIdone = invoiceId;

        const updatedEstimate = this.estimates.find((estimate) => estimate._id === invoiceId);
        if (updatedEstimate) {
          updatedEstimate.currentStatus = newStatus;
        }

        // Set the button color based on the new status
        if (newStatus === 'Goods in warehouse') {
          this.buttonColor = 'green';
        } else if (newStatus === 'Received goods') {
          this.buttonColor = 'red';
        } else {
          this.buttonColor = 'default';
        }
        this.estimate.status = 'Goods in warehouse';

        // Once the status is updated, set the buttonColor to 'green' and save it to localStorage
        this.buttonColor = 'green';
        localStorage.setItem('buttonColor', this.buttonColor);
    
        // Reset the color for other buttons
        this.buttonColortwo = '';
        this.buttonColorthree = '';
        localStorage.setItem('buttonColortwo', this.buttonColortwo);
        localStorage.setItem('buttonColorthree', this.buttonColorthree);
    

        this.fetchEstimates();
        // Refresh data after updating the status
      },
      (error) => {
        alert('Error in Updating Status');
        console.error('Error updating invoice status:', error);
        // Perform actions to handle the error, such as displaying an error message to the user
      }
    );
}


updateStatustwo(invoiceId: string) {
  const newStatustwo = 'reached hub';

  this.http
    .put(`https://logistwork.onrender.com/api/estimatestwo/${invoiceId}/status`, { statustwo: newStatustwo })
    .subscribe(
      (response) => {
        alert('Status Updated Successfully');
        console.log('Invoice status updated:', response);
        const updatedEstimatetwo = this.estimates.find((estimate) => estimate._id === invoiceId);
        if (updatedEstimatetwo) {
          updatedEstimatetwo.currentStatustwo = newStatustwo;
        }

      /*   // Set the button color based on the new status
        if (newStatustwo === 'reached hub') {
          this.buttonColortwo = 'blue';
        } else {
          this.buttonColortwo = 'default';
        }
       *//*   this.estimate.status = 'reached hub';

        // Once the status is updated, set the buttonColor to 'green'
        this.buttonColor = 'green'; */

        // Store the button color in sessionStorage
        /* essionStorage.setItem('buttonColortwo', this.buttonColortwo); */

        // Also set buttonColor when updating buttonColortwoa
        this.estimate.status = 'reached hub';

        // Once the status is updated, set the buttonColortwo to 'green' and save it to localStorage
        this.buttonColortwo = 'green';
        localStorage.setItem('buttonColortwo', this.buttonColortwo);
    
        this.buttonColor = this.buttonColor;
        localStorage.setItem('buttonColor', this.buttonColor);
        this.buttonColorthree = 'green';
        localStorage.setItem('buttonColorthree', this.buttonColorthree);
    
        this.fetchEstimates();
        // Refresh data after updating the status
      },
      (error) => {
        alert('Error in Updating Status');
        console.error('Error updating invoice status:', error);
        // Perform actions to handle the error, such as displaying an error message to the user
      }
    );
}


// ... Other code ...


updateStatusthree(invoiceId: string) {
  const newStatusthree = ' out for delivery';
  console.log('invoiceId:', invoiceId);
  this.http
    .put<any>(`https://logistwork.onrender.com/api/estimatesthree/${invoiceId}/status`, { status: newStatusthree })
    .subscribe(
      (response) => {
        alert('Status Updated Successfully');
        console.log('Invoice status updated:', response);
        this.estimate.status = 'out for delivery';

        // Once the status is updated, set the buttonColorthree to 'green' and save it to localStorage
        this.buttonColorthree = 'green';
        localStorage.setItem('buttonColorthree', this.buttonColorthree);
    
        // Reset the color for other buttons
        // Store the selectedEstimateIdthree for this row in local storage
        localStorage.setItem(`selectedEstimateIdthree_${invoiceId}`, invoiceId);

        // Fetch the estimates to refresh the data after updating the status
        this.fetchEstimates();

        // Set the button color based on the new status
        if (newStatusthree === ' out for delivery') {
          this.buttonColor= 'green';
          this.buttonColorthree = 'green';
        } else {
          this.buttonColorthree = 'default';
        }

        // Store the button color in sessionStorage
        sessionStorage.setItem('buttonColorthree', this.buttonColorthree);

        // Set 'fas fas' button color to the initial color
        this.buttonColor = this.initialButtonColorThree;
      },
      (error) => {
        alert('Error in Updating Status');
        console.error('Error updating invoice status:', error);
        // Perform actions to handle the error, such as displaying an error message to the user
      }
    );
}
// ... Other code ...

// ... Other code ...


fetchEstimates(): void {
  this.http.get<Estimate[]>('https://logistwork.onrender.com/api/estim').subscribe(
    (data) => {
      this.estimates = data.map((estimate) => ({
        ...estimate,
        currentStatus: estimate.status,
        currentStatustwo: estimate.status,
        currentStatusthree: estimate.status,
      }));
      this.totalItems = this.estimates.length;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      this.currentPage = 1;
      this.updatePaginatedData();
    },
    (error) => {
      alert('Error in Getting the Data');
      console.error('Error fetching estimates:', error);
    }
  );
}
get filteredEstimates() {
  if (!this.searchTerm.trim()) {
    return this.estimates; // Return all estimates if the search term is empty
  } else {
    return this.estimates.filter((estimate) =>
      estimate.isconfirm.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
 

updateStatusnew(invoiceId: string): void {
  // Call the new endpoint to send the email
  this.http.post(`https://logistwork.onrender.com/api/sendEmail/${invoiceId}`, {}).subscribe(
    (response: any) => {
      alert(response.message);
    },
    (error) => {
      alert('Failed to send email.');
      console.error('Error sending email:', error);
    }
  );
}    // New variables to handle the popup
   

showPopupDetails(estimate: any): void {
  // Set the popupData with the clicked estimate data
  this.popupData = estimate;

  // Show the popup
  this.showPopup = true;
}

closePopup(): void {
  // Close the popup
  this.showPopup = false;
}

changeColor() {
  const button = document.getElementById('myButton');
  if (button?.classList.contains('green')) {
    button.classList.remove('green');
  } else {
    button?.classList.add('green');
  }
}


    // Function to check if a button has been clicked before and set the color accordingly
   
    handleButtonClickHub(ev: MouseEvent): void {
      const btn = ev.target as HTMLButtonElement;
      const status = btn.dataset.estimateStatus;
      // Toggle the state of the button and update the color accordingly
      if (btn.style.backgroundColor === 'gray') {
        btn.innerText = 'text';
        btn.style.backgroundColor = 'green';
        localStorage.setItem(`buttonColor_${status}`, 'green');
      } else {
        btn.innerText = 'Click Me';
        btn.style.backgroundColor = 'gray';
        localStorage.setItem(`buttonColor_${status}`, 'gray');
      }
    }
    handleButtonClickWarehouse(ev: MouseEvent): void {
      const btn = ev.target as HTMLButtonElement;
      const status = btn.dataset.estimateStatus;
      // Toggle the state of the button and update the color accordingly
      if (btn.style.backgroundColor === 'green') {
        btn.innerText = 'Goods in warehouse';
        btn.style.backgroundColor = 'green';
        localStorage.setItem(`buttonColor_${status}`, 'green');
      } else {
        btn.innerText = 'Goods in warehouse';
        btn.style.backgroundColor = 'green';
        localStorage.setItem(`buttonColor_${status}`, 'green');
      }
    }

    estimate = {
      _id: 'your_estimate_id',
      status: 'Goods in warehouse', // Initial status
      currentStatus: '',
      currentStatusthree: ''
    };



    
}

