import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import {NotasService, Nota} from '../../services/notas.service';

@Component({
    selector: 'app-cadastro',
    templateUrl: './cadastro.page.html',
    styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage {

    model = new Nota();

    constructor(public navCtrl: NavController, private notasService: NotasService) {
    }

    goBack() {
        this.navCtrl.back();
    }

    save() {
        this.notasService.insert(this.model);
        this.navCtrl.pop();
    }

}
