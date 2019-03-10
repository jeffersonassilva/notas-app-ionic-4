import {EventEmitter, Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {DatePipe} from '@angular/common';
import {Nota} from '../interfaces/nota';
import {Lista} from '../interfaces/lista';

@Injectable({
    providedIn: 'root'
})
export class DbService {

    emissorService = new EventEmitter();

    constructor(public storage: Storage, public datepipe: DatePipe) {
    }

    public get(key: string) {
        return this.storage.get(key)
            .then((value) => {
                return Promise.resolve(value);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    public insert(nota: Nota) {
        const key = this.datepipe.transform(new Date(), 'yyyyMMddHHmmss');
        return this.save(key, nota).finally(() => {
            const item = {key, nota, 'type': 'insert'};
            this.emissorService.emit(item);
        });
    }

    public update(key: string, nota: Nota) {
        return this.save(key, nota).finally(() => {
            const item = {key, nota, 'type': 'update'};
            this.emissorService.emit(item);
        });
    }

    public save(key: string, nota: Nota) {
        if (nota.title === undefined || nota.description === undefined) {
            return Promise.reject('Favor preencher os campos!');
        }
        return this.storage.set(key, nota)
            .then(() => {
                return Promise.resolve();
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }

    public remove(key: string) {
        return this.storage.remove(key);
    }

    public getAll() {
        const notas: Lista[] = [];
        return this.storage.forEach((value: Nota, key: string, iterationNumber: Number) => {
            const item = <Lista>{};
            item.key = key;
            item.nota = value;
            notas.push(item);
        }).then(() => {
            notas.reverse();
            return Promise.resolve(notas);
        }).catch((error) => {
            return Promise.reject(error);
        });
    }
}
