import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NyiComponent } from './pages/nyi/nyi.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { authGuard } from './shared/guards/auth.guard';
import { GameDetailComponent } from './pages/game-detail/game-detail.component';
import { adminGuard } from './shared/guards/admin.guard';
import { UserRoleComponent } from './pages/user-role/user-role.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

export const routes: Routes = [
    {
        path: 'login', component: LoginPageComponent
    },
    {
        path: 'userRole', component: UserRoleComponent, canActivate: [authGuard, adminGuard]
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
        path: 'game/:id', component: GameDetailComponent, canActivate: [authGuard]
    },
    {
        path: 'changePassword', component: ChangePasswordComponent, canActivate: [authGuard]
    }
];
