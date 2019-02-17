import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-cadastro',
    templateUrl: './cadastro.page.html',
    styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

    model = {title: '', description: ''};

    constructor(public navCtrl: NavController) {
    }

    goBack() {
        this.navCtrl.pop();
    }

    save() {
        this.navCtrl.pop();
    }

}
