import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import {DbService, Lista} from '../../services/db.service';
import {LoadingController} from '@ionic/angular';
import {ToastComponent} from '../../components/toast/toast.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage {
    private notas: Lista[];
    private loading: any;

    constructor(
        public navCtrl: NavController,
        private db: DbService,
        private loadCtrl: LoadingController,
        private toastComponent: ToastComponent
    ) {
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
        this.navCtrl.params = item;
        this.navCtrl.navigateForward('/cadastro').finally();
    }

    excluirNota(item: Lista) {
        this.db.remove(item.key)
            .then(() => {
                const index = this.notas.indexOf(item);
                this.notas.splice(index, 1);
                this.toastComponent.alert('Nota excluída com sucesso!').finally();
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
