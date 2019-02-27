import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {DatePipe} from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class DbService {

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
        const key = this.datepipe.transform(new Date(), 'ddMMyyyyHHmmss');
        return this.save(key, nota);
    }

    public update(key: string, nota: Nota) {
        return this.save(key, nota);
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
            const nota = new Lista();
            nota.key = key;
            nota.nota = value;
            notas.push(nota);
        }).then(() => {
            return Promise.resolve(notas);
        }).catch((error) => {
            return Promise.reject(error);
        });
    }
}

export class Nota {
    title: string;
    description: string;
}

export class Lista {
    key: string;
    nota: Nota;
}
