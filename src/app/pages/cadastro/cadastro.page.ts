import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import {DbService, Nota} from '../../services/db.service';

@Component({
    selector: 'app-cadastro',
    templateUrl: './cadastro.page.html',
    styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage {

    model = new Nota();

    constructor(public navCtrl: NavController, private db: DbService) {
    }

    goBack() {
        this.navCtrl.back();
    }

    save() {
        this.db.insert(this.model)
            .then(() => {
                this.navCtrl.pop();
            });
    }

}
