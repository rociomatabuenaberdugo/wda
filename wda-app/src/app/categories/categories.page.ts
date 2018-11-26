import { Component, OnInit } from '@angular/core';
import { Category } from '../interfaces/category';
import { CategoryService } from '../services/category.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  category: Category;
  edit = false;

  constructor(private categoryService: CategoryService, private navController: NavController,
    private activatedRoute: ActivatedRoute, public alertController: AlertController) {
    this.category = {
      id: this.categoryService.categoryCounter,
      name: '',
      type: ''
    };
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.edit = true;
      this.category = this.categoryService.getCategoryById(+id);
    }
  }

  // Función que guarda la nueva categoría que se crea.

  saveCategory(c: Category) {
    if (this.edit) {
      this.categoryService.saveCategory(this.category).then(
        () => this.navController.goBack(true),
        (error) => console.error('Error al guardar: ' + error)
      );
    } else {
      this.categoryService.newCategory(this.category).then(
        () => this.navController.goBack(true),
        (error) => console.error('Error al guardar: ' + error)
      );
    }
  }

  // Función que verifica que al crear una categoría, ambos campos tengan
  // valores antes de guardarlos, para así no guardar ninguna categoría
  // vacía o incompleta.

  verify(a: Category) {
    if (a.name) {
      if (a.type) {
          this.saveCategory(a);
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
      message: 'Se ha encontrado un campo imprescindible vacío. Por favor, rellene todos los campos.',
      buttons: ['OK']
    });
    await alert.present();
  }
}
