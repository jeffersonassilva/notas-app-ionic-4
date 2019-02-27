import {Component, OnDestroy, OnInit} from '@angular/core';
import {DbService, Lista} from '../../services/db.service';
import {LoadingController} from '@ionic/angular';
import {ToastComponent} from '../../components/toast/toast.component';
import {Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage {
    private notas: Lista[];
    private loading: any;

    constructor(
        private db: DbService,
        private loadCtrl: LoadingController,
        private toast: ToastComponent,
        private router: Router,
    ) {
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
        this.router.navigate(['/cadastro']);
    }

    editarNota(item: Lista) {
        this.router.navigate(['/cadastro', item.key]);
    }

    excluirNota(item: Lista) {
        this.db.remove(item.key)
            .then(() => {
                const index = this.notas.indexOf(item);
                this.notas.splice(index, 1);
                this.toast.alert('Nota excluída com sucesso!').finally();
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
