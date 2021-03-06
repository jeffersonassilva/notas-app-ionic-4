import {Component, OnDestroy, OnInit} from '@angular/core';
import {DbService} from '../../services/db.service';
import {LoadingController} from '@ionic/angular';
import {ToastComponent} from '../../components/toast/toast.component';
import {Router} from '@angular/router';
import {Lista} from '../../interfaces/lista';
import {AnimateService} from '../../services/animate.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
    private notas: Lista[];

    constructor(
        private db: DbService,
        private animateCss: AnimateService,
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
                setTimeout(() => {
                    this.animateCss.execute('.item', 'pulse');
                }, 500);
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

    excluirNota(item: Lista, event: any) {
        event.target.parentElement.classList.add('fadeOut');
        setTimeout(() => {
            this.db.remove(item.key)
                .then(() => {
                    const index = this.notas.indexOf(item);
                    this.notas.splice(index, 1);
                });
        }, 1000);
    }

    doRefresh(event) {
        this.carregarLista();
        setTimeout(() => {
            event.target.complete();
        }, 1000);
    }

    // animateCSS(element, animationName, callback) {
    //     const node = document.querySelector(element);
    //     node.classList.remove('fadeIn');
    //     node.classList.add(animationName);
    //
    //     function handleAnimationEnd() {
    //         node.classList.remove(animationName);
    //         node.removeEventListener('animationend', handleAnimationEnd);
    //
    //         if (typeof callback === 'function') {
    //             callback();
    //         }
    //     }
    //
    //     node.addEventListener('animationend', handleAnimationEnd);
    // }
}
