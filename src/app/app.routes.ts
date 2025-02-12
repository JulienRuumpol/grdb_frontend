import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NyiComponent } from './pages/nyi/nyi.component';

export const routes: Routes = [
    {
        path: 'login', component: LoginPageComponent
    },
    {
        path: 'userRole', component: NyiComponent,
    },
    {
        path: 'home', component: NyiComponent
    },
    {
        path: 'logout', component: NyiComponent
    },
    {
        path: 'account', component: NyiComponent
    }

];
