import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { GamificationPage } from '../gamification/gamification';
import { QuestionsPage } from '../questions/questions';

@Component({
  selector: 'page-tabs-navigation',
  templateUrl: 'tabs-navigation.html'
})
export class TabsNavigationPage {

  gamificationPage:any = GamificationPage;
  questionPage: any = QuestionsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}


}
