import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  category: Category[] = [];
  categoryCounter = 0;

  constructor(private storage: Storage) { }

  getCategories(): Promise<Category[]> {
    this.storage.get('categoryCounter').then(
      data => this.categoryCounter = data
    );
    return this.storage.get('category').then(
      data => {
        if (data) {
          this.category = data;
        }
        return data;
      }
    );
  }

  deleteCategory(id: number): Promise<Category[]> {
    this.category = this.category.filter(c => c.id !== id);
    return this.storage.set('category', this.category);
  }

  getCategoryById(id: number): Category {
    return this.category.find(c => c.id === id);
  }

  saveCategory(c): Promise<Category[]> {
    console.log('c' + c);
    console.log('this.category' + this.category);
    this.category[this.category.findIndex(category => category.id === c.id)] = c;

    return this.storage.set('category', this.category);
  }

  newCategory(c): Promise<Category[]> {
    this.category.push(c);
    this.categoryCounter++;
    return this.storage.set('category', this.category).then(
      () => this.storage.set('categoryCounter', this.categoryCounter)
    );
  }

}
