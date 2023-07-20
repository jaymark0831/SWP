import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { SignupComponent } from '../signup/signup.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent  implements OnInit {

  passwordForm!: FormGroup;
  showPassword = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })
  
  constructor (
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService
  ) { 
    this.passwordForm = this.formBuilder.group({
      password: ['']
    })
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: LoginComponent,
      cssClass: 'modaldesign' // Add your custom CSS class here
    });
    return await modal.present();
  }

  ngOnInit() { }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  // Dismiss the loginmodal
  dismissLoginModal(){
    this.modalCtrl.dismiss().then(() => {
      // Open the signup modal
      this.openSignupModal();
    })
  }

  // signup modal
  async openSignupModal() {
    const modal = await this.modalCtrl.create({
      component: SignupComponent,
      cssClass: 'signupmodaldesign'
    });
    return await modal.present();
  }

  //Login with Google Button
  logInWithGoogle() {
    this.authService.signInWithGoogle().then((res: any) => {
      console.log(res.user);
      this.modalCtrl.dismiss();
      this.router.navigateByUrl('/menulogin/home');
    }).catch((error: any) => {
      console.error(error);
    });
  }

  // Login with Email and Password
  login() {
    console.log(this.loginForm.value);
    const userData = Object.assign(this.loginForm.value, { email: this.loginForm.value.email });
  
    // Check if the email is banned from login
    if (!this.isBannedEmail(userData.email)) {
      this.authService.signInWithEmailAndPassword(userData)
        .then((res: any) => {
          console.log(res.user);
          this.modalCtrl.dismiss();
          this.authService.setUserData(res.user); // Store user data in the authservice
          this.router.navigateByUrl('/menulogin/home');
          this.alertController.create({
            header: 'Success',
            message: 'Welcome!',
            cssClass: 'alertSuccess',
            buttons: [
              {
                text: 'OK', 
                handler: () => {
                  console.log('OK');
                }
              }
            ]
          }).then(response => response.present());
        })
        .catch((error: any) => {
          console.error(error);
          this.alertController.create({
            header: 'Login Failed',
            message: error.message,
            cssClass: 'alertError',
            buttons: [
              {
                text: 'OK', 
                handler: () => {
                  console.log('OK');
                }
              }
            ]
          }).then(response => response.present());
        });
    } else {
      console.log('Account is banned from login');
      // Display an error message
      this.alertController.create({
        header: 'Login Failed',
        message: 'Account is banned from login!',
        cssClass: 'alertError',
        buttons: [
          {
            text: 'OK', 
            handler: () => {
              console.log('OK');
            }
          }
        ]
      }).then(response => response.present());

    }
  }
  
  isBannedEmail(email: string): boolean {
    // Check if the email is banned from login
    const bannedEmail = 'admin@email.com';
    return email === bannedEmail;
  }
  

}