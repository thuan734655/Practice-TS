import { NavChild } from './NavChild';

interface NavItem {
  text: string;
  href: string;
}

export default class Header {
  private readonly listNav: NavItem[] = [
    { text: 'Movies', href: '/movies' },
    { text: 'TV Shows', href: '/tvshows' },
    { text: 'Add', href: '/add' },
  ];

  private readonly listNavIcon: NavItem[] = [
    {
      text: `<figure><img src="/resources/assets/icons/ic-arrow-right.svg" alt="logout"/><figcaption>Logout</figcaption></figure>`,
      href: '/login',
    },
  ];

  public render(): string {
    const navChild = new NavChild();
    
    return `
      <header id="rootApp">
        <div class="header--logo">
          <figure>
            <img class="logo" src="/resources/assets/icons/ic-logo.svg" alt="logo">
          </figure>
        </div>
        <div class="header--nav">
          <ul>${navChild.render(this.listNav)}</ul>
          <ul>${navChild.render(this.listNavIcon)}</ul>
        </div>
      </header>
    `;
  }
}
