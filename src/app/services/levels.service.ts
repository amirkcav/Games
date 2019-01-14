import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class LevelsService {

  constructor(private http: Http) { }

  loadLevels() {
    return this.http.get('data/levels.json').toPromise().then((res) => {
      return res.json();
    });
  }

}
