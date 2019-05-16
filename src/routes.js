import About from './About.vue';
import HowTo from './Instructions.vue';
import Contact from './Contact.vue';
import Login from './Login.vue';
import ViewProfile from './ViewProfile.vue';
import NotFound from './404.vue';

export const routes = [
	{ path: '', components: {
        default: About
    	}
    },
    {
        path: '/user/profile',
        name: 'viewProfile',
        component: ViewProfile,
        meta: {
        	isAuthRequired: true
        }
    },
    { path: '/about', component: About },
    { path: '/howto', component: HowTo },
    { path: '/contact', component: Contact },
    { path: '/login', component: Login },
	{ path: '*', component: NotFound }
];