import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {DatePipe} from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class NotasService {

    constructor(public storage: Storage, public datepipe: DatePipe) {
    }

    public insert(note: Note) {
        const key = this.datepipe.transform(new Date(), 'ddMMyyyyHHmmss');
        return this.save(key, note);
    }

    public save(key: string, note: Note) {
        this.storage.set(key, note);
    }
}

export class Note {
    title: string;
    description: string;
}
