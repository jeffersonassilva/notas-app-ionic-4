import {Component, OnDestroy, OnInit} from '@angular/core';
import {DbService} from '../../services/db.service';
import {ToastComponent} from '../../components/toast/toast.component';
import {ActivatedRoute, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {Nota} from '../../interfaces/nota';

@Component({
    selector: 'app-cadastro',
    templateUrl: './cadastro.page.html',
    styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit, OnDestroy {

    private key;
    private model: Nota;
    private sub: Subscription;

    constructor(
        private db: DbService,
        private toast: ToastComponent,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.model = <Nota>{};
    }

    ngOnInit() {
        this.sub = this.route.params
            .pipe(
                filter(item => item.key),
                map(item => item.key)
            )
            .subscribe(key => {
                this.key = key;
                this.updateItem();
            });
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    updateItem() {
        this.db.get(this.key)
            .then((value) => {
                this.model = value;
            });
    }

    goBack() {
        this.router.navigate(['/home']);
    }

    save() {
        this.saveNota()
            .then(() => {
                this.router.navigate(['/home']).finally();
            })
            .catch((error) => {
                this.toast.alert(error, 'danger', 3000).finally();
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
