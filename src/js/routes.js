
import AboutPage from '../pages/about.jsx';
import Accountpage from '../pages/account.jsx';
import CatLogPage from '../pages/Cat-alog.jsx';
import FormPage from '../pages/form.jsx';
import HomePage from '../pages/home.jsx';
import MainPage from '../pages/main.jsx'
import ProductPage from '../pages/product.jsx';
import SettingsPage from '../pages/settings.jsx';
import SignupPage from '../pages/signup.jsx';
import DynamicRoutePage from '../pages/dynamic-route.jsx';
import RequestAndLoad from '../pages/request-and-load.jsx';
import FavPage from '../pages/favPage.jsx';

var routes = [
  {
    path: '/',
    component: CatLogPage,
  },
  {
    path: '/fav/',
    component: FavPage,
  },
  {
    path: '/login/',
    component: MainPage,
  },
  {
    path: '/account/',
    component: Accountpage,
  },
  {
    path: '/form/',
    component: FormPage,
  },
  {
    path: '/catalog/',
    component: CatLogPage,
  },
  {
    path: '/product/:id/',
    component: ProductPage,
  },
  {
    path: '/settings/',
    component: SettingsPage,
  },

  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  
  {
    path: '/request-and-load/user/:userId/',
    async: function ({ router, to, resolve }) {
      // App instance
      var app = router.app;

      // Show Preloader
      app.progressbar.show();

      // User ID from request
      var userId = to.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Mohammad',
          lastName: 'Yousaf',
          about: 'Yo, I am the creator of this app, this app is made using React, Framework7 and Supabase.',
          links: [
            {
              icon: 'logo_instagram',
              title: 'Instagram'  ,
              url: 'https://www.instagram.com/uceph.em/',
            },
            {
              icon: 'logo_twitter',
              title: 'BlueSky',
              url: 'https://bsky.app/profile/uceph-em.bsky.social',
            },
            {
              icon: 'logo_github',
              title: 'Github',
              url: 'https://github.com/fyiimysf',
            },
          ]
        };
        // Hide Preloader
        app.progressbar.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            props: {
              user: user,
            }
          }
        );
      }, 500);
    },
  },
  {
    path: '(.*)',
    component: ''
  },
];

export default routes;
