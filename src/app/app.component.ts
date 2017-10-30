import { Component, ViewChild } from '@angular/core';
import { Platform} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { UserPage } from '../pages/user/user';
import { UserService } from '../providers/user.service';
import { AuthService } from '../providers/auth.service';


@Component({
  templateUrl: 'app.html',
  providers: [UserService]
})
export class MyApp {
  @ViewChild('homeNav') navCtrl

  rootPage = HomePage;
  pagesMenu: Array<{title: string, component: any, icon: string}>;


  constructor(
      public platform: Platform,
      private af: AuthService
  ) {
    this.initializeApp();

    this.pagesMenu = [
      { title: 'Meus Dados', component: UserPage , icon: 'person' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  logOut(): void {
    new Promise (() => this.navCtrl.setRoot(HomePage))
      .then(() => this.af.logOut())
  }

  goToOtherPage(page: {title: string, component: any, icon: string}): void {
    this.navCtrl.push(page.component);
  }
}
