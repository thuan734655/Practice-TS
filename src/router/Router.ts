type RouteComponent = new () => {
    render(): Promise<HTMLElement> | HTMLElement;
};

interface Route {
    path: string;
    component: RouteComponent;
}

export class Router {
    private routes: Route[];
    private container: HTMLElement;
    private routesMap: Map<string, () => void>;
    private defaultRoute: () => void;

    constructor(routes: Route[]) {
        this.routes = routes;
        this.routesMap = new Map();
        this.defaultRoute = () => {
            console.log('404: Route not found');
        };

        const appContainer = document.getElementById('app');
        if (!appContainer) throw new Error('App container not found');
        this.container = appContainer;

        window.addEventListener('popstate', () => this.handleRoute());
        this.handleRoute();

        routes.forEach(route => {
            this.routesMap.set(route.path, () => {
                const component = new route.component();
                try {
                    this.container.innerHTML = '<div class="loading">Loading...</div>';
                    const content = Promise.resolve(component.render());
                    this.container.innerHTML = '';
                    this.container.appendChild(content);
                } catch (error) {
                    console.error('Error rendering route:', error);
                    this.container.innerHTML = '<div class="error">Error loading content</div>';
                }
            });
        });
    }

    navigate(path: string): void {
        window.history.pushState({}, '', path);
        this.handleRoute();
    }

    private handleRoute(): void {
        const path = window.location.pathname;
        const callback = this.routesMap.get(path) || this.defaultRoute;
        callback();
    }
}
