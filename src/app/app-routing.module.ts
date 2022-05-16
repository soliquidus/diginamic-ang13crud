import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from "./app.component";

const routes: Routes = [
  {path: "", loadChildren: () => import('./components/product/product.module')
      .then(m => m.ProductModule)},
  {path: "404", component:AppComponent},
  {path: "**", redirectTo:"/404"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
