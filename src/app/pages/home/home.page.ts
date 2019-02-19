import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Lista, NotasService} from '../../services/notas.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage {
    private notas: Lista[];

    constructor(public navCtrl: NavController, private notasService: NotasService) {
    }

    ionViewDidEnter() {
        this.notasService.getAll()
            .then((result) => {
                this.notas = result;
            });
    }

    adicionarNota() {
        this.navCtrl.navigateForward('/cadastro')
            .then(() => {});
    }

    excluirNota(item: Lista) {
        this.notasService.remove(item.key)
            .then(() => {
                const index = this.notas.indexOf(item);
                this.notas.splice(index, 1);
            });
    }
}
