import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', loadChildren: './pages/home/home.module#HomePageModule'},
    {path: 'cadastro', loadChildren: './pages/cadastro/cadastro.module#CadastroPageModule'},
    {path: 'cadastro/:key', loadChildren: './pages/cadastro/cadastro.module#CadastroPageModule'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
