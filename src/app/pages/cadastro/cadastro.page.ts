import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import {DbService, Nota} from '../../services/db.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-cadastro',
    templateUrl: './cadastro.page.html',
    styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage {

    private key;
    private model = new Nota();

    constructor(public navCtrl: NavController, private db: DbService, private router: ActivatedRoute) {
        this.key = this.router.snapshot.paramMap.get('key');
        if (this.key) {
            this.db.get(this.key)
                .then((value) => {
                    this.model = value;
                });
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
}
