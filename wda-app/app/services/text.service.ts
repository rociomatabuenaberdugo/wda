import { Injectable } from '@angular/core';
import { Text } from '../interfaces/text';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class TextService {

  text: Text[] = [];
  textCounter = 0;

  constructor(private storage: Storage) { }

  getTexts(): Promise<Text[]> {
    this.storage.get('textCounter').then(
      data => this.textCounter = data
    );
    return this.storage.get('text').then(
      data => {
        if (data) {
          this.text = data;
        }
        return data;
      }
    );
  }

  deleteText(id: number): Promise<Text[]> {
    this.text = this.text.filter(t => t.id !== id);
    return this.storage.set('text', this.text);
  }

  getTextById(id: number): Text {
    return this.text.find(t => t.id === id);
  }

  saveText(t): Promise<Text[]> {
    console.log('hola que tal andamos');
    console.log('t' + t);
    console.log('this.text' + this.text);
    this.text[this.text.findIndex(text => text.id === t.id)] = t;

    return this.storage.set('text', this.text);
  }

  newText(t): Promise<Text[]> {
    console.log('aqui entro');
    this.text.push(t);
    console.log('aqui sigo');
    this.textCounter++;
    console.log('sigo viviendo');
    return this.storage.set('text', this.text).then(
      () => this.storage.set('textCounter', this.textCounter)
    );
  }

}
