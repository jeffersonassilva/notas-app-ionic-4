import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import {DbService, Nota} from '../../services/db.service';

@Component({
    selector: 'app-cadastro',
    templateUrl: './cadastro.page.html',
    styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage {

    private key;
    private model = new Nota();

    constructor(public navCtrl: NavController, private db: DbService) {
        if (this.navCtrl.params && this.navCtrl.params.key) {
            this.key = this.navCtrl.params.key;
            this.model = this.navCtrl.params.nota;
        } else {
            this.model = new Nota();
        }
    }

    goBack() {
        this.navCtrl.back();
    }

    save() {
        this.saveNota()
            .finally(() => {
                this.navCtrl.pop().finally();
            });
    }

    private saveNota() {
        if (this.key) {
            return this.db.update(this.key, this.model);
        } else {
            return this.db.insert(this.model);
        }
    }

    ionViewDidLeave() {
        this.navCtrl.params = null;
    }

}
