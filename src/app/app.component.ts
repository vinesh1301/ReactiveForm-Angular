import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Book } from './BookDetails';
import { DataService } from './data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  bookDetails: Book[] = [];
  myData: any = [];
  title = 'TaskForm';
  currentIndex = -1;
  cities = ["Kolkata", "Bangalore", "Hyderbad"];
  name = new FormControl('');
  updateName() {
    this.name.setValue('Mahi');
  }
  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    eMail: ['', Validators.email],
    custom: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
  });

  onSubmit() {
    console.log(this.profileForm.value);
    if (this.currentIndex == -1) {
      this.myData.push(this.profileForm.value);
      localStorage.setItem('userDetails', JSON.stringify(this.myData));
    }
    else {
      this.myData[this.currentIndex] = this.profileForm.value;
      this.currentIndex = -1;

    }

    console.log(this.myData);
    this.profileForm.reset();

  }

  editMe(obj: any, i: number) {
    console.log(obj);
    this.profileForm.patchValue(obj);
    this.currentIndex = i;
  }

  deleteMe(i: number) {
    alert("You want to delete ?");
    const index = this.myData.indexOf(i);
    this.myData.splice(index, 1);
  }
  constructor(private fb: FormBuilder, private data: DataService) {

    this.data.getBookDetails().subscribe(data => this.bookDetails = data)
    console.log(this.bookDetails);
  }
}
