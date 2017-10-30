import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { UserService } from '../../providers/user.service';

import { User } from '../../pages/user/user.model'

@Component({
  selector: 'edit-telephone',
  templateUrl: 'edit-telephone.html'
})
export class EditTelephoneComponent {
  user: User;

  constructor(
    public viewCtrl: ViewController,
    public userService: UserService,
  ) {
  }

  ngOnInit() {
    this.userService.getUser()
      .then(_user => this.user =_user);
  }

  updateTelephone(newTelephone: string) {
    this.userService.updateTelephone(newTelephone);
  }

  updateOtherTelephone(newTelephone: string) {
    this.userService.updateOtherTelephone(newTelephone);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
