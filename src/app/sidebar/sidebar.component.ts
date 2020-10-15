import { Component, OnInit } from '@angular/core';
import { TokensService } from '../core/tokens.service';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/home', title: 'Home',  icon: 'pe-7s-graph', class: '' },
  { path: '/home/languages', title: 'Idiomas',  icon:'fa fa-language', class: '' },
  { path: '/home/competencies', title: 'Competencias',  icon:'fa fa-check-square-o', class: '' },
  { path: '/home/jobs', title: 'Puestos',  icon:'fa fa-briefcase', class: '' },
  { path: '/home/candidates', title: 'Candidatos',  icon:'fa fa-users', class: '' },
  { path: '/home/employees', title: 'Empleados',  icon:'fa fa-id-card', class: '' },
  { path: '/home/employees/report', title: 'Reportes',  icon:'fa fa-print', class: '' },
  // { path: '/home/profile/add', title: 'Nuevo Candidato',  icon:'pe-7s-note2', class: '' },
];

export const ROUTES_CLIENT: RouteInfo[] = [
  { path: '/home/profile/add', title: 'Nuevo Candidato',  icon:'pe-7s-note2', class: '' },
];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private tokensService: TokensService) { }

  ngOnInit(): void {
    console.log(this.isAdmin());

    if(this.isAdmin() == true) {
      this.menuItems = ROUTES.filter(menuItem => menuItem);
    } else {
      this.menuItems = ROUTES_CLIENT.filter(menuItem => menuItem);
    }
  }

  isMobileMenu(): boolean {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  isAdmin(): boolean {
    return this.tokensService.isAdmin();
  }
}
