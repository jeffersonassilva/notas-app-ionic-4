import {Component, Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {

    constructor(public toastController: ToastController) {
    }

    async alert(msg: string, type: string = 'success', duration: number = 3000) {
        const toast = await this.toastController.create({
            message: msg,
            duration: duration,
            color: type
        });
        toast.present();
    }

}
