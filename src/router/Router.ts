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

    constructor(routes: Route[]) {
        this.routes = routes;
        const appContainer = document.getElementById('app');
        if (!appContainer) throw new Error('App container not found');
        this.container = appContainer;
        
        window.addEventListener('popstate', () => this.handleRoute());
        this.handleRoute();
    }

    navigate(path: string): void {
        window.history.pushState({}, '', path);
        this.handleRoute();
    }

    private async handleRoute(): Promise<void> {
        const path = window.location.pathname;
        const route = this.routes.find(r => r.path === path) || this.routes[0];
        const component = new route.component();
        
        try {
            this.container.innerHTML = '<div class="loading">Loading...</div>';
            const content = await Promise.resolve(component.render());
            this.container.innerHTML = '';
            this.container.appendChild(content);
        } catch (error) {
            console.error('Error rendering route:', error);
            this.container.innerHTML = '<div class="error">Error loading content</div>';
        }
    }
}
