import { Component, OnInit } from '@angular/core';
import { Text } from '../interfaces/text';
import { TextService } from '../services/text.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../interfaces/category';

@Component({
  selector: 'app-edit-texts',
  templateUrl: './edit-texts.page.html',
  styleUrls: ['./edit-texts.page.scss'],
})
export class EditTextsPage implements OnInit {

  text: Text;
  edit = false;
  categoryname = [];
  category: Category[] = [];
  name: String;
  fla = 0;

  constructor(private textService: TextService, private navController: NavController,
    private activatedRoute: ActivatedRoute, public alertController: AlertController) {
    this.text = {
      id: this.textService.textCounter,
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
    }
  }

  // Función que guarda el nuevo texto que se crea.

  saveText(t: Text) {
    if (this.edit) {
      console.log('aqui cuando ya existe');
      this.textService.saveText(this.text).then(
        () => this.navController.goBack(true),
        (error) => console.error('Error al guardar: ' + error)
      );
    } else {
      console.log('aqui para crear uno nuevo');
      this.textService.newText(this.text).then(
        () => this.navController.goBack(true),
        (error) => console.error('Error al guardar: ' + error)
      );
    }
  }

  // Función que verifica que al crear un texto, todos los campos tengan
  // valores antes de guardarlos, para así no guardar ningún texto
  // vacío o incompleto.

  verifytxt(b: Text) {
    for (let i = 0; i < this.category.length; i++) {
      this.categoryname.push(this.category[i].name);
  }
    if (b.title) {
      if (b.body) {
        if (b.belongs) {
           /*for ( let i = 0; i <= this.categoryname.length; i++) {
             this.name = this.categoryname[i];
             if (b.belongs === this.name) {*/
              this.saveText(b);
              console.log('aqui guardo');
              // this.fla++;
            /* }
           }
           if (this.fla = 0) {
            this.wrongAlert();
           }*/
        } else {
          this.emptyAlert();
        }
      } else {
        this.emptyAlert();
      }
    } else {
      this.emptyAlert();
    }
  }


  // Alert que salta cuando se detecta que un campo está vacío.
  async emptyAlert() {
    const alert = await this.alertController.create({
      header: 'Campo vacío',
      message: 'Se ha encontrado un campo imprescindible vacío. Por favor, rellene todos los campos obligatorios.',
      buttons: ['OK']
    });
    await alert.present();
  }

   async wrongAlert() {
    const alert = await this.alertController.create({
      header: 'Categoría incorrecta',
      message: 'El texto pertenece a una categoría que no existe.',
      buttons: ['OK']
    });
    await alert.present();
  }
}
