import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reest',
  templateUrl: './reest.component.html',
  styleUrls: ['./reest.component.css']
})
export class ReestComponent implements OnInit {
  
  email: string;
  contact: string;  length: number;
  breadth: number;
  height: number;
  multiplier: number;
  actualweight:number;
  estimateResult: number;
  pickupLocation: string = '';
  dropLocation: string = '';
  selectedCity: string = '';
  isContainer2Hidden: boolean = true;
  isDropdownOpen: boolean = false;
  estimateId: string = ''; 
  generatedEstimateId: string;
  showResult = false;
  estimateStatuses: { [key: string]: string } = {};
  pageSize = 5;
  currentPage = 1;
  totalItems: number;
  totalPages: number;
  paginatedEstimates: any[] = [];
  showPopup = false;
  popupData: any;
  searchTerm: string = '';
  selectedFilter: string = 'all';
  showUpdateForm = false; // Flag to show/hide the update form
  selectedEstimate: any; // Variable to store the selected estimate for updating

  // Function to handle the "Update" button click and open the update form
  openUpdateForm(estimate: any) {
    this.selectedEstimate = { ...estimate }; // Create a copy of the selected estimate to avoid modifying the original data
  
    // Set the form fields with the data of the selected estimate
    this.email = this.selectedEstimate.email;
    this.contact = this.selectedEstimate.contact;
    this.length = this.selectedEstimate.length;
    this.breadth = this.selectedEstimate.breadth;
    this.height = this.selectedEstimate.height;
    this.multiplier = this.selectedEstimate.multiplier;
    this.actualweight=this.selectedEstimate.actualweight;
  
    // Show the update form
    this.showUpdateForm = true;
  }
  
  // Function to handle the "Cancel" button click and close the update form
  cancelUpdateForm() {
    this.showUpdateForm = false;
  }
  updatePaginatedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedEstimates = this.filteredEstimates.slice(startIndex, endIndex);
  }

  @Input() color: string = 'dark';
  estimates: any[] = [];
  estimate: any; // Initialize the estimate object

  constructor(private http: HttpClient, private router: Router) {}
  private readonly backendApiUrl = 'https://logistwork.onrender.com/api';

  ngOnInit(): void {
    this.fetchEstimates();
  }
  fetchEstimates(): void {
    this.http.get<any[]>('https://logistwork.onrender.com/api/estim').subscribe(
      (data) => {
        this.estimates = data;
        this.totalItems = this.estimates.length;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.currentPage = 1;
        this.updatePaginatedData();
        this.estimates.forEach((estimate) => {
          this.estimateStatuses[estimate._id] = estimate.status;
        });
      },
      (error) => {
        alert('Error in Getting the Data');
        console.error('Error fetching invoices:', error);
      }
    );
  }
  get filteredEstimates() {
    if (!this.searchTerm.trim() && this.selectedFilter === 'all') {
      return this.estimates; // Return all estimates if the search term and filter are empty
    } else {
      return this.estimates.filter((estimate) => {
        const isConfirmMatch =
          this.selectedFilter === 'all' || estimate.isconfirm.toString() === this.selectedFilter;
        const searchTermMatch =
          this.searchTerm.trim() === '' ||
          estimate.isconfirm.toLowerCase().includes(this.searchTerm.toLowerCase());

        return isConfirmMatch && searchTermMatch;
      });
    }
  }

  // Modify the onSearchChange() method to update the selectedFilter value
  onSearchChange() {
    this.currentPage = 1;
    this.updatePaginatedData();
  }

 

 

  
  calculateEstimated(): void {

    const emailInput = document.getElementById('email') as HTMLInputElement;
    const contactInput = document.getElementById('contact') as HTMLInputElement;
      const lengthInput = document.getElementById('length') as HTMLInputElement;
      const breadthInput = document.getElementById('breadth') as HTMLInputElement;
      const heightInput = document.getElementById('height') as HTMLInputElement;
      const multiplierInput = document.getElementById('multiplier') as HTMLSelectElement;
      const ActualInput = document.getElementById('actual') as HTMLSelectElement;

      const lengthValue = lengthInput.valueAsNumber;
      const breadthValue = breadthInput.valueAsNumber;
      const heightValue = heightInput.valueAsNumber;
      const multiplierValue = Number(multiplierInput.value);
      const ActualValue = Number(ActualInput.value);
     
      
    
      if (this.isValidInput(lengthValue, breadthValue, heightValue)) {
        const volume = (lengthValue * breadthValue * heightValue) / 1728;
        const weight = Math.max(volume, ActualValue);
        const finalWeight = weight * multiplierValue;
    
        this.estimateResult = isNaN(finalWeight) ? 0 : finalWeight;
    
        // Send the estimate data to the server to store in MongoDB
        const estimateData = {
  // Use value property to get the input value
          email: emailInput.value, // Use value property to get the input value
          contact: contactInput.value, 
          length: lengthValue,
          breadth: breadthValue,
          height: heightValue,
          multiplier: multiplierValue,
          estimateResult: this.estimateResult,
          actualweight:ActualValue,

        };
    
        this.http.post('https://logistwork.onrender.com/api/todos', estimateData).subscribe(
          (response) => {
            console.log('Estimate data saved successfully:', response);
          },
          (error) => {
            console.error('Error saving estimate data:', error);
          }
        );
      } else {
        this.estimateResult = NaN;
      }
    }
    
    calculateMeasuredWeight(): number {
      // Logic to calculate the measured weight
      // Implement your own logic or use a predefined formula
      // For example, you can prompt the user to enter the measured weight or calculate it based on other factors
      return 0; // Replace with your actual calculated weight
    }
  
    isValidInput(length: number, breadth: number, height: number): boolean {
      return (
        typeof length === 'number' &&
        typeof breadth === 'number' &&
        typeof height === 'number' &&
        !isNaN(length) &&
        !isNaN(breadth) &&
        !isNaN(height)
      );
      // Add your validation logic here if needed
      return true;
    }
      submitUpdateForm() {
      // Calculate the estimated result before submitting the form
      const volume = (this.selectedEstimate.length * this.selectedEstimate.breadth * this.selectedEstimate.height) / 1728;
      const weight = Math.max(volume, this.selectedEstimate.actualweight);
      const finalWeight = weight * this.selectedEstimate.multiplier;
      this.selectedEstimate.estimateResult = isNaN(finalWeight) ? 0 : finalWeight;
    
      // Send the updated estimate data to the server to update in MongoDB
      this.http.put<any>(`${this.backendApiUrl}/estimates/${this.selectedEstimate._id}`, this.selectedEstimate).subscribe(
        (updatedEstimate) => {
          // The estimate has been updated successfully
          console.log('Estimate updated:', updatedEstimate);
    
          // Optionally, you can update the local estimates data in the component.
          // This step depends on how you handle the data in your application.
    
          // Close the update form after successful update
          this.showUpdateForm = false;
        },
        (error) => {
          console.error('Error updating estimate:', error);
        }
      );
    }
    
    
}



