import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header-login',
  templateUrl: './header-login.component.html',
  styleUrls: ['./header-login.component.scss'],
})
export class HeaderLoginComponent  implements OnInit {

  @Input()
  title!: string;
  dropdown = false;
  dropdownbook = false;
  selectedCategory = '';
  selectedCatAcc = '';

  @ViewChild('accountbtn', { read: ElementRef })
  accountbtn!: ElementRef;
  @ViewChild('bookingbtn', { read: ElementRef })
  bookingbtn!: ElementRef;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.selectedCategory='';
    this.selectedCatAcc='';
  }

  hideDropdown(event: any) {
    const xTouch = (event.clientX).toFixed(2);
    const yTouch = (event.clientY).toFixed(2);

    const rect = this.accountbtn.nativeElement.getBoundingClientRect();
    const topBoundary = rect.top+2;
    const leftBoundary = rect.left+2;
    const rightBoundary = rect.right-2;

    if (xTouch < leftBoundary || xTouch > rightBoundary || yTouch < topBoundary) {
      this.dropdown = false;
    }
  }

  hidebookDropdown(event: any) {
    const xTouch = (event.clientX).toFixed(2);
    const yTouch = (event.clientY).toFixed(2);

    const rect = this.bookingbtn.nativeElement.getBoundingClientRect();
    const topBoundary = rect.top + 2;
    const leftBoundary = rect.left + 2;
    const rightBoundary = rect.right - 2;

    if (xTouch < leftBoundary || xTouch > rightBoundary || yTouch < topBoundary) {
      this.dropdownbook = false;
    }
  }
  
  // Button for dropdown active
  selectCategory(category: string) {
    this.selectedCategory = category;
    this.selectedCatAcc = '';
  }
  selectCatAcc(category: string) {
    this.selectedCatAcc = category;
    this.selectedCategory = '';
  }
  clearSelectedCategory(): void {
    this.selectedCategory = '';
    this.selectedCatAcc = ''; 
  }

  signOut() {
    this.authService.signOut();
  }
}
