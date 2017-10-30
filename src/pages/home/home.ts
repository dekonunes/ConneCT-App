import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';

import { AlertController, NavController, MenuController, ToastController, Loading, LoadingController } from 'ionic-angular';
import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
import { AuthService } from '../../providers/auth.service';
import { UserCredentials } from '../../shared/interfaces';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  loginFirebaseAccountForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;

  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    private loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public authService: AuthService,
    public fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.loginFirebaseAccountForm = this.fb.group({
        'email': ['', Validators.compose([Validators.required])],
        'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this.email = this.loginFirebaseAccountForm.controls['email'];
    this.password = this.loginFirebaseAccountForm.controls['password'];
  }


  ionViewDidEnter() {
    this.menuCtrl.enable(false);
    this.menuCtrl.swipeEnable(false);
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
    this.menuCtrl.swipeEnable(true);
  }

  sigIn(signInForm: any) {
    let loading: Loading = this.showLoading();
    this.authService.signinWithEmail(signInForm)
      .then(result => {
        loading.dismiss();
        this.navCtrl.setRoot(TabsNavigationPage);
      }).catch(error => {
        loading.dismiss();
        this.showError(error);
        console.log(error);
    });
  }

  private showError(error:Error) {
    let alert = this.alertCtrl.create({
      title: 'Problema ao logar',
      subTitle: 'E-mail ou senha incorreto',
      buttons: ['Voltar']
    });
    alert.present();
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: "Por favor aguarde... Entrando"
    });
    loading.present();
    return loading;
  }

}
