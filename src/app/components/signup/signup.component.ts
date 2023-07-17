import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, AlertController, IonInput } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoginComponent } from '../login/login.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent  implements OnInit {

  passwordForm!: FormGroup;
  showPassword = false;
  confirmShowPassword = false;
  passwordMatch = false; // Added variable for password match check
  inputModel = '';
  
  signupForm: FormGroup = new FormGroup({
    // uid: new FormControl(''), //Added for firestore
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    mobileNum: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  })

  constructor(
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    public angularFireAuth: AngularFireAuth,
    public alertController: AlertController,
    private authService: AuthService,
    public router: Router
  ) { 
    this.passwordForm = this.formBuilder.group({
      password: ['']
    })
  }

  // View Password
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  toggleconfirmPasswordVisibility() {
    this.confirmShowPassword = !this.confirmShowPassword;
  }

  signup() {
    // Check if passwords match
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;
    this.passwordMatch = password === confirmPassword;

    // Check if passwords match before signing up
    if (!this.passwordMatch) {
      // Handle password mismatch error
      console.log('Passwords do not match');
    }else {
      this.letSignup();
    }
  }

  //combine firstname and lastname for displayname
  firstNameAndlastName() {
    const displayName = this.signupForm.get('firstName')?.value + ' ' + this.signupForm.get('lastName')?.value;
    // console.log(displayName);
    return displayName.trim(); // Removes any leading or trailing spaces.
  }

  // dismiss the signup modal
  dismissSignupModal(){
    this.modalCtrl.dismiss().then(() => {
      // Open the signup modal
      this.openLoginModal();
    })
  }

  // login modal
  async openLoginModal() {
    const modal = await this.modalCtrl.create({
      component: LoginComponent,
      cssClass: 'modaldesign'
    });
    return await modal.present();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  // collect email and password using get method
  // get email() {
  //   return this.signupForm.get('email');
  // }

  // get password() {
  //   return this.signupForm.get('password');
  // }

  // async signup() {
  //   try {
  //     const email = this.email?.value;  //check if the value is null
  //     const password = this.password?.value; //check if the value is null
  //     if (email && password) {
  //       const signup = await this.angularFireAuth.createUserWithEmailAndPassword(email,password);
  //       console.log(signup);

  //      this.alertController.create ({
  //         header: 'Success',
  //         message: 'Your signup is successful!',
  //         cssClass: 'alertError',
  //         buttons: [{text: 'OK', handler: () => {console.log('OK');}}]
          
  //       }).then(response => response.present());
  //     } else {
  //         this.alertController.create ({
  //           header: 'Failed',
  //           message: 'Your signup failed!',
  //           cssClass: 'alertError',
  //           buttons: [{text: 'OK', handler: () => {console.log('OK');}}]
  //         }).then(response => response.present());
  //     }
  //   } 
  //   catch (error) {
  //     console.dir(error);

  //     this.alertController.create ({
  //       header: 'Failed',
  //       message: 'Your signup failed!',
  //       cssClass: 'alertError',
  //       buttons: [{text: 'OK', handler: () => {console.log('OK');}}]
  //     }).then(response => response.present());
  //   }

  //   this.signupForm.reset();
  // }

  letSignup() {
    const userData = Object.assign(this.signupForm.value, {
      email: this.signupForm.value.email,
      displayName: this.firstNameAndlastName(),
      firstName: this.signupForm.value.firstName, // Call the function to get the display name
      lastName: this.signupForm.value.lastName, // Call the function to get the display name
      phoneNumber: this.signupForm.value.mobileNum
    });

    this.authService.signupWithEmailAndPassword(userData).then((res: any) =>  {
      console.log(res);
      this.modalCtrl.dismiss().then(() => {
        this.openLoginModal();
      });
      
    }).catch((error: any) => {
      console.log(error);
    })
  }

  // only numbers for mobilenumber
  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;

  onInput(ev: any) {
    const value = ev.target!.value;

    // Removes non numeric characters
    const filteredValue = value.replace(/[^0-9]/g, '');

    /**
     * Update both the state variable and
     * the component to keep them in sync.
     */
    this.ionInputEl.value = this.inputModel = filteredValue;
  }

  
  

  ngOnInit() {}

}
