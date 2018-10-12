import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { UserPage } from '../pages/user/user';
import { TabsNavigationPage } from '../pages/tabs-navigation/tabs-navigation';
import { UserService } from '../providers/user.service';
import { AuthService } from '../providers/auth.service';

@Component({
  templateUrl: 'app.html',
  providers: [UserService]
})
export class MyApp {
  @ViewChild('homeNav') nav: NavController
  pagesMenu: Array<{title: string, component: any, icon: string}>;

  constructor(
      public platform: Platform,
      private authService: AuthService,
  ) {
    this.initializeApp();
    this.pagesMenu = [
      { title: 'Meus Dados', component: UserPage , icon: 'person' }
    ];
  }

  ngOnInit() {
    this.authService.getUID()
      .then(userLogin => {
        if(userLogin)
          this.nav.push(TabsNavigationPage);
        else
          this.nav.push(HomePage);
      })
   }

   initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  logOut() {
    this.authService.logOut().then(() => {
      // this.nav.setRoot(HomePage);
      // this.nav.push(HomePage)
    });
  }

  goToOtherPage(page: {title: string, component: any, icon: string}): void {
    this.nav.push(page.component);
  }
}
