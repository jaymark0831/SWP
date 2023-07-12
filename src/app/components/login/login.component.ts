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

  // loginForm = this.formBuilder.group({
  //   email: [''],
  //   password: ['']
  // });

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })
  
  constructor (
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    public angularFireAuth: AngularFireAuth,
    public router: Router,
    private alertController: AlertController,
    public authService: AuthService
  ) { 
    this.passwordForm = this.formBuilder.group({
      password: ['']
    })
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  //collect email and password using get method
  // get email() {
  //   return this.loginForm.get('email');
  // }
  // get password() {
  //   return this.loginForm.get('password');
  // }

  // async login() {
  //   try {
  //     const email = this.email?.value;
  //     const password = this.password?.value;
  //     if (email && password) {
  //       const login = await this.angularFireAuth.signInWithEmailAndPassword(email, password);
  //       console.log(login);
  //       this.router.navigateByUrl('/menulogin/home');

  //       this.modalCtrl.dismiss();

  //       this.alertController.create({
  //         header: 'Success',
  //         message: 'Welcome!',
  //         cssClass: 'alertError',
  //         buttons: [
  //           {
  //             text: 'OK', 
  //             handler: () => {
  //               console.log('OK');
  //             }
  //           }
  //         ]
  //       }).then(response => response.present());
  //     } else {
  //       this.alertController.create ({
  //         header: 'Failed',
  //         message: 'Login failed!',
  //         cssClass: 'alertError',
  //         buttons: [
  //           {
  //             text: 'OK', 
  //             handler: () => {
  //               console.log('Login Failed');
  //             }
  //           }
  //         ]
  //       }).then(response => response.present());
  //     }
  //   } catch (error) {
  //     console.dir(error);

  //     this.alertController.create ({
  //       header: 'Failed',
  //       message: 'Login failed!',
  //       cssClass: 'alertError',
  //       buttons: [
  //         {
  //           text: 'OK', 
  //           handler: () => {
  //             console.log('Login Failed');
  //           }
  //         }
  //       ]
  //     }).then(response => response.present());
  //   }
  //   this.loginForm.reset();
  // }

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



  // dismissModal() {
  //   this.modalCtrl.dismiss();
  // }

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
    const userData = Object.assign(this.loginForm.value, {email: this.loginForm.value.email});
    
    this.authService.signInWithEmailAndPassword(userData).then((res: any) =>{
      console.log(res.user);
      this.modalCtrl.dismiss();
      this.router.navigateByUrl('/menulogin/home');
    }).catch((error: any) =>{
      console.error(error);
    });
  }

}