import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { TextService } from '../services/text.service';
import { Text } from '../interfaces/text';

@Component({
  selector: 'app-textos',
  templateUrl: './textos.page.html',
  styleUrls: ['./textos.page.scss'],
})
export class TextosPage implements OnInit {

  text: Text[] = [];

  ngOnInit() { }

  constructor(private alertController: AlertController,
    private textService: TextService,
    private navController: NavController) {
      this.textService.getTexts().then(
        data => {
          if (data) {
            this.text = data;
          }
        }
      );
    }

  ionViewWillEnter() { }

  async deleteDialog(name: String, id: number) {
    const alert = await this.alertController.create({
      header: 'Eliminar texto',
      message: '¿Estás seguro de que deseas <i>borrar</i> el texto <strong> ' + name + '</strong>?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelando...');
          }
        }, {
          text: 'Eliminar',
          handler: () => {
            this.textService.deleteText(id).then(
              () => this.textService.getTexts().then(
                (data) => this.text = data
              )
            );
          }
        }
      ]
    });

    await alert.present();
  }

  mostrar(id: number) {
    this.navController.navigateForward('/show/' + id);
  }
}
