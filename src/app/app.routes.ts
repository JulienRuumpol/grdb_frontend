import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NyiComponent } from './pages/nyi/nyi.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login', component: LoginPageComponent
    },
    {
        path: 'userRole', component: NyiComponent,
    },
    {
        path: 'home', component: HomePageComponent, canActivate: [authGuard]
    },
    {
        path: 'logout', component: NyiComponent
    },
    {
        path: 'account', component: NyiComponent
    }

];
