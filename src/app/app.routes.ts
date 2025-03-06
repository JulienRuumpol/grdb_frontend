import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NyiComponent } from './pages/nyi/nyi.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { authGuard } from './shared/guards/auth.guard';
import { GameDetailComponent } from './pages/game-detail/game-detail.component';

export const routes: Routes = [
    {
        path: 'login', component: LoginPageComponent
    },
    {
        path: 'userRole', component: NyiComponent, canActivate: [authGuard]
    },
    {
        path: 'home', component: HomePageComponent, canActivate: [authGuard]
    },
    {
        path: 'logout', component: NyiComponent
    },
    {
        path: 'account', component: NyiComponent, canActivate: [authGuard]
    },
    {
        path: 'game/:id', component: GameDetailComponent
    }
];
