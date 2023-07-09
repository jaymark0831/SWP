import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent  implements OnInit {

  passwordForm!: FormGroup;
  showPassword = false;

  signupForm = this.formBuilder.group({
    email: [''],
    password: ['']
  })

  constructor(
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    public angularFireAuth: AngularFireAuth,
    public alertController: AlertController
  ) { 
    this.passwordForm = this.formBuilder.group({
      password: ['']
    })
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
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
      cssClass: 'modaldesign' // Add your custom CSS class here
    });
    return await modal.present();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  // collect email and password using get method
  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  async signup() {
    try {
      const email = this.email?.value;  //check if the value is null
      const password = this.password?.value; //check if the value is null
      if (email && password) {
        const signup = await this.angularFireAuth.createUserWithEmailAndPassword(email,password);
        console.log(signup);

       this.alertController.create ({
          header: 'Success',
          message: 'Your signup is successful!',
          cssClass: 'alertError',
          buttons: [{text: 'OK', handler: () => {console.log('OK');}}]
          
        }).then(response => response.present());
      } else {
          this.alertController.create ({
            header: 'Failed',
            message: 'Your signup failed!',
            cssClass: 'alertError',
            buttons: [{text: 'OK', handler: () => {console.log('OK');}}]
          }).then(response => response.present());
      }
    } 
    catch (error) {
      console.dir(error);

      this.alertController.create ({
        header: 'Failed',
        message: 'Your signup failed!',
        cssClass: 'alertError',
        buttons: [{text: 'OK', handler: () => {console.log('OK');}}]
      }).then(response => response.present());
    }

    this.signupForm.reset();
  }

  ngOnInit() {}

}
