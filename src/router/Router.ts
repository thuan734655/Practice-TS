type Route = {
    path: string;
    component: any;
};

export class Router {
    private routes: Route[] = [];
    private root: string = '/';
    private currentComponent: any = null;

    constructor(routes: Route[]) {
        this.routes = routes;
        this.initializeRouter();
    }

    private initializeRouter(): void {
        window.addEventListener('popstate', () => this.handleRoute());
        
        // Handle initial route
        this.handleRoute();

        // Handle clicks on anchor tags
        document.addEventListener('click', (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.matches('a')) {
                e.preventDefault();
                const href = target.getAttribute('href');
                if (href) {
                    this.navigate(href);
                }
            }
        });
    }

    private handleRoute(): void {
        const path = window.location.pathname || '/';
        const route = this.routes.find(route => route.path === path) || this.routes[0];
        
        if (route) {
            this.currentComponent = new route.component();
            this.updateActiveLink(path);
        }
    }

    private updateActiveLink(path: string): void {
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === path) {
                link.classList.add('active');
            }
        });
    }

    public navigate(path: string): void {
        window.history.pushState({}, '', path);
        this.handleRoute();
    }
}
