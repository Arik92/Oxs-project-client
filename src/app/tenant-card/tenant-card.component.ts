import { Component, OnInit, Input } from '@angular/core';
import { DataService, Tenant } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tenant-card',
  templateUrl: './tenant-card.component.html',
  styleUrls: ['./tenant-card.component.css']
})
export class TenantCardComponent implements OnInit {
  @Input() tenant: Tenant | undefined;

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  editTenant() {   
    if (this.tenant) {
      this.router.navigate(['../tenant-edit'], { queryParams:{ selectedTenant: this.tenant._id }, relativeTo: this.route });
    }
  }

  deleteTenant() {
    if (this.tenant){
      this.dataService.deleteTenant(this.tenant._id);
    }
  }

}
