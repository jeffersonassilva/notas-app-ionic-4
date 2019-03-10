import {Component, OnDestroy, OnInit} from '@angular/core';
import {DbService} from '../../services/db.service';
import {LoadingController} from '@ionic/angular';
import {ToastComponent} from '../../components/toast/toast.component';
import {Router} from '@angular/router';
import {Lista} from '../../interfaces/lista';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
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

    ngOnInit() {
        this.carregarLista();
        this.db.emissorService.subscribe((item) => {
            if (item.type === 'insert') {
                this.notas.unshift(item);
            } else if (item.type === 'update') {
                this.carregarLista();
            }
        });
    }

    ngOnDestroy() {
        this.db.emissorService.unsubscribe();
    }

    carregarLista() {
        this.db.getAll()
            .then((result) => {
                this.notas = result;
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

    pullDown() {
        this.presentLoading()
            .then(() => {
                this.carregarLista();
            })
            .finally(() => {
                this.loadCtrl.dismiss();
            });
    }

    private async presentLoading() {
        this.loading = await this.loadCtrl.create({
            message: 'Carregando',
            duration: 1000
        });
        return this.loading.present();
    }
}
