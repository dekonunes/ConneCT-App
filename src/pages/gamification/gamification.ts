import { Component, OnInit  } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Gamification } from './gamification.model';
import { UserService } from '../../providers/user.service';
import { User } from '../user/user.model';

@Component({
  selector: 'page-gamification',
  templateUrl: 'gamification.html'
})
export class GamificationPage implements OnInit {

  ranking: Gamification;
  ribbonsCareers: Gamification[] = [];
  ribbonsTopScore: Gamification[] = [];
  positionRanking: number;
  daysCurrent: number = 0;
  heightTrophys: number = 40;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              private userService: UserService) {
  }

  ngOnInit() {
    this.getGamificatios();
  }

  onLoad(img) {
    this.heightTrophys += img.height;
  }

  getGamificatios(): Promise<any> {
    return new Promise(resolve =>{
      this.userService.getUser().then((DQ:User) => {
        this.ranking = DQ.gamification[0];
        for (let i = 0; i <= 5; i++)
          this.ribbonsCareers[i] = DQ.gamification[i+1];

        for (let i = 0; i <= 1; i++)
          this.ribbonsTopScore[i] = DQ.gamification[i+7];

        this.daysCurrent = DQ.gamification[9]['quantity'];
      });
      this.userService.getPositionRanking().then((position: number) => this.positionRanking = position);
      resolve();
    });
  }

  doRefresh(refresher) {
    this.getGamificatios().then(() => refresher.complete());
  }

  alertDescription(title:string, description?: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: description,
      buttons: [
        'Fechar'
      ]
    });
    alert.present();
  }

  getStyleImgTrophy() {
    return {
      '-webkit-clip-path': `inset(0px ${100-(this.daysCurrent/365*100)}% 0px 0px)`,
      'clip-path': `inset(0px ${100-(this.daysCurrent/365*100)}% 0px 0px)`,
      'float': 'right'}
  }

  getStyleImgRanking() {
    return {
      '-webkit-clip-path': `inset(${100-this.positionRanking}% 0px 0px 0px)`,
      'clip-path': `inset(${100-this.positionRanking}% 0px 0px 0px)`,
      'float': 'right'}
  }
}
