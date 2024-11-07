import { Route, Router } from '@vaadin/router'; 
import './application-view';
// import { Commands, Context } from '@vaadin/router';

export const routes: Route[] = [
  {
    path: '/',
    component: 'application-view',
    children: [
      {
        path: '/',
        component: 'shopping-view',
        action: async () => {
          await import('./app/components/view/shopping-view')
        }
      },
    ]
  },
  {
    path: `(.*)`,
    component: 'not-found-view',
    action:async () => {
      await import('./app/components/view/do-not-view')
    }
  }
];

// Render the component within the outlet main with the specified ID
const outlet: HTMLElement = document.getElementById('outlet');
const router: Router = new Router(outlet);
router.setRoutes(routes);
