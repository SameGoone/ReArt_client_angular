import { Routes } from '@angular/router';
import { DashboardComponent } from './features/posts/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { PostDetailsComponent } from './features/posts/post-details/post-details.component';
import { NotFoundComponent } from './features/errors/not-found/not-found.component';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(r => r.AUTH_ROUTES)
    },
    {
        path: 'posts',
        component: DashboardComponent,
        canActivate: [authGuard]
    },
    {
        path: 'posts/:id',
        component: PostDetailsComponent,
        canActivate: [authGuard]
    },

    { path: '', redirectTo: 'posts', pathMatch: 'full' },

    { path: '**', component: NotFoundComponent },
];
