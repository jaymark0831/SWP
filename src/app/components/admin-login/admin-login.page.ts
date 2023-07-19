import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.page.html',
  styleUrls: ['./admin-login.page.scss'],
})
export class AdminLoginPage implements OnInit {

  passwordForm!: FormGroup;

  adminLoginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  constructor(private afAuth: AngularFireAuth, private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.passwordForm = this.formBuilder.group({
      password: ['']
    })
   }

  ngOnInit() {
  }

  login() {
    const allowedEmails = ['admin@email.com']; // Add the allowed email addresses here
  
    console.log(this.adminLoginForm.value);
    
    const userData = Object.assign(this.adminLoginForm.value, {
      email: this.adminLoginForm.value.email,
      password: this.adminLoginForm.value.password
    });
  
    this.authService.signInWithEmailAndPassword(userData)
      .then((res: any) => {
        const user = res.user;
        if (allowedEmails.includes(user.email)) {
          console.log(user);
          this.authService.setUserData(user); // Store user data in the AuthService
          this.router.navigateByUrl('/dashboard/admin-dashboard');
        } else {
          console.log('Access denied for user:', user.email);
          // Perform appropriate action when access is denied
        }
      })
      .catch((error: any) => {
        console.error(error);
      });
  }
  
  
  

  

}
