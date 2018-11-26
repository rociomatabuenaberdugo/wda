import { Component, OnInit } from '@angular/core';
import { Category } from '../interfaces/category';
import { CategoryService } from '../services/category.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  category: Category[] = [];

  ngOnInit() { }

  constructor(private alertController: AlertController,
    private categoryService: CategoryService,
    private navController: NavController) {
    this.categoryService.getCategories().then(
      data => {
        if (data) {
          this.category = data;
        }
      }
    );
  }

  ionViewWillEnter() { }

  async deleteDialog(name: String, id: number) {
    const alert = await this.alertController.create({
      header: 'Eliminar categoría',
      message: '¿Estás seguro de que deseas <i>borrar</i> la categoría <strong> ' + name + '</strong>?',
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
            this.categoryService.deleteCategory(id).then(
              () => this.categoryService.getCategories().then(
                (data) => this.category = data
              )
            );
          }
        }
      ]
    });

    await alert.present();
  }

  /* showCategory(title: String) {
     this.navController.navigateForward('/filter/' + title);
   } */

}
