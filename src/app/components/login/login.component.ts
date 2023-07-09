import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SignupComponent } from '../signup/signup.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent  implements OnInit {

  passwordForm!: FormGroup;
  showPassword = false;

  loginForm = this.formBuilder.group({
    email: [''],
    password: ['']
  });
  

  constructor (
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    public angularFireAuth: AngularFireAuth,
    public router: Router,
    
    // private formBuilder: FormBuilder
  ) { 
    this.passwordForm = this.formBuilder.group({
      password: ['']
    })
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  //collect email and password using get method
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  async login() {
    try {
      const email = this.email?.value;
      const password = this.password?.value;
      if (email && password) {
        const login = await this.angularFireAuth.signInWithEmailAndPassword(email, password);
        this.router.navigateByUrl('/menulogin/home');
      }
    } catch (error) {
      console.dir(error);
    }

    this.loginForm.reset();

    // this.alertController.create({
    //   header: 'Success',
    //   message: 'Your login is'
    // })
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: LoginComponent,
      cssClass: 'modaldesign' // Add your custom CSS class here
    });
    return await modal.present();
  }

  ngOnInit() {
    // this.loginForm = this.formBuilder.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required, Validators.minLength(6)]],
    // });
  }

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

  // Login with Google Button
  // logInWithGoogle() {
  //   this.authService.signInWithGoogle().then((res: any) => {
  //     console.log(res.user);
  //     this.router.navigateByUrl('/menulogin/home');
  //   }).catch((error: any) => {
  //     console.error(error);
  //   });
  // }

  // logInWithEmailAndPassword() {
  //   const userData;
  //   this.authService.signInWithEmailAndPassword().then((res: any) =>{
  //     this.router.navigateByUrl('/menulogin/home');
  //   }).catch((error: any) =>{
  //     console.error(error);
  //   });
  // }

}