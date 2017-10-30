import { Component, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { UserService } from '../../providers/user.service';

import { User } from './user.model'
import { EditTelephoneComponent } from '../../components/edit-telephone/edit-telephone'


@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage implements OnInit {
  user: User;

  constructor(private userService: UserService,
              private modalCtrl: ModalController) {}

  ngOnInit() {
    this.userService.getUser()
      .then(_user => this.user =_user);
  }

  openModal() {
    this.modalCtrl.create(EditTelephoneComponent).present();
  }
}
