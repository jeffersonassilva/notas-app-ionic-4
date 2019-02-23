import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import {DbService, Lista} from '../../services/db.service';
import {LoadingController} from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage {
    private notas: Lista[];
    private loading: any;

    constructor(public navCtrl: NavController, private db: DbService, private loadCtrl: LoadingController) {
    }

    ionViewWillEnter() {
        this.notas = [];
    }

    ionViewDidEnter() {
        this.presentLoading()
            .then(() => {
                this.db.getAll()
                    .then((result) => {
                        this.notas = result;
                    })
                    .finally(() => {
                        this.loadCtrl.dismiss()
                            .catch((error) => {
                                console.log(error);
                            });
                    });
            });
    }

    adicionarNota() {
        this.navCtrl.navigateForward('/cadastro').finally();
    }

    editarNota(item: Lista) {
        this.navCtrl.navigateForward('/cadastro/' + item.key);
    }

    excluirNota(item: Lista) {
        this.db.remove(item.key)
            .then(() => {
                const index = this.notas.indexOf(item);
                this.notas.splice(index, 1);
            });
    }

    private async presentLoading() {
        this.loading = await this.loadCtrl.create({
            message: 'Carregando',
            duration: 2000
        });
        return this.loading.present();
    }
}
