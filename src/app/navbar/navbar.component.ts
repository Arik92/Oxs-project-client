import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() displayName: string | undefined;

  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
  }

  logout() {
    this.dataService.resetJwt();
    this.router.navigate(['/login'], {relativeTo: this.route});
  }

}
