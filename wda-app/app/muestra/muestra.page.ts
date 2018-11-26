import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { TextService } from '../services/text.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-muestra',
  templateUrl: './muestra.page.html',
  styleUrls: ['./muestra.page.scss'],
})
export class MuestraPage implements OnInit {

  private text: any;
  edit = false;

  constructor(private alertController: AlertController, private activatedRoute: ActivatedRoute,
    private textService: TextService,
    private navController: NavController) {
      this.text = {
        id: this.textService.text.length,
        title: '',
        body: '',
        belongs: '',
        additional_information: ''
      };
    }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.edit = true;
      this.text = this.textService.getTextById(+id);
    } else {
      this.text = {
        title: '',
        body: '',
        belongs: '',
        additional_information: ''
      };
    }
  }


  // Función que guarda el texto modificado.

  guardar(t: Text) {
    if (this.edit) {
      this.textService.saveText(this.text).then(
        () => this.navController.goBack(true),
        (error) => console.error('Error al guardar: ' + error)
      );
    } else {
      this.textService.newText(this.text).then(
        () => this.navController.goBack(true),
        (error) => console.error('Error al guardar: ' + error)
      );
    }
  }

  async borrar(title: String, id: number) {
    const alert = await this.alertController.create({
      header: 'Eliminar texto',
      message: '¿Estás seguro de que deseas <strong>borrar</strong> el texto <strong> ' + title + '</strong>?',
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
                (data) => this.text = data,
                () => this.navController.goBack(true)
              ),
            );
          }
        }
      ]
    });
    await alert.present();
  }

}
