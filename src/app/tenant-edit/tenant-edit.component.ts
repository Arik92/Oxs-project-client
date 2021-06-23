import { query } from '@angular/animations';
import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { DataService } from '../data.service';
@Component({
  selector: 'app-tenant-edit',
  templateUrl: './tenant-edit.component.html',
  styleUrls: ['./tenant-edit.component.css']
})
export class TenantEditComponent implements OnInit {
  tenant: any;

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) {    
   }

  ngOnInit(): void {  
    this.dataService.tenantSubscription.subscribe(tenants => {
      if (tenants.length > 0) {
        const queryId: string = this.route.snapshot.queryParams['selectedTenant'];
      this.tenant = this.dataService.findTenantById(queryId);
      }
    })
    
  }

  updateTenant() {
    this.dataService.updateTenant(this.tenant);
      this.router.navigate(['../tenant-list'], {relativeTo: this.route});

  }

}
