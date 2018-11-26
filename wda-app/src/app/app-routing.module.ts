import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'editCategories', loadChildren: './categories/categories.module#CategoriesPageModule' },
  { path: 'textos', loadChildren: './textos/textos.module#TextosPageModule' },
  { path: 'editTexts', loadChildren: './edit-texts/edit-texts.module#EditTextsPageModule' },
  { path: 'show/:id', loadChildren: './muestra/muestra.module#MuestraPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
