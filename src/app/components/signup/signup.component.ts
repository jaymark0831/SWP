import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent  implements OnInit {

  signupForm = this.formBuilder.group({
    email: [''],
    password: ['']
  })

  constructor(
    // private modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    public angularFireAuth: AngularFireAuth,
    public alertController: AlertController
  ) { }

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

  // async presentModal() {
  //   const modal = await this.modalCtrl.create({
  //     component: SignupComponent,
  //     cssClass: 'modaldesign' // Add your custom CSS class here
  //   });
  //   return await modal.present();
  // }

  // cancel() {
  //   return this.modalCtrl.dismiss(null, 'cancel');
  // }

}
