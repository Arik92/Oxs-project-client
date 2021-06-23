import { Component, OnInit } from '@angular/core';
import { DataService, Tenant } from '../data.service';

@Component({
  selector: 'app-tenant-list',
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.css']
})

export class TenantListComponent implements OnInit {
  tenantList: Tenant[] = [];
  displayList: Tenant[] = [];

  filterOptions: string[] = ['All', 'Debt', 'Debt-Free', 'By name']; // custom - by name
  allFlag: boolean = true;
  debtFlag: boolean = false;
  debtFreeFlag: boolean = false;
  searchFlag: boolean = false;
  searchQuery: string = '';

  constructor(private dataService: DataService) {
    this.dataService.fetchAllTenants();
   }

  ngOnInit() {
    this.dataService.tenantSubscription.subscribe(newList => {
      this.tenantList = newList;
      this.updateDisplay();
    });
  }

  updateDisplay() {
    if (this.allFlag) {// pending
      this.displayList = this.tenantList;
    } else if (this.debtFlag) {// completed
      this.displayList = this.tenantList.filter(tenant => tenant.debt > 0);
    } else if (this.debtFreeFlag) {// new
      this.displayList = this.tenantList.filter(tenant => tenant.debt === 0);
    } else if (this.searchFlag) {
      this.displayList = this.tenantList.filter(tenant => tenant.name.localeCompare(this.searchQuery) === 0);
    }
  }


  changeFilter(mode: string) {
    switch (mode) {
      case this.filterOptions[0]: // all
      this.allFlag = true;
      this.debtFlag = false;
      this.debtFreeFlag = false;
      this.searchFlag = false;
        break;
      case this.filterOptions[1]: // have debt
      this.allFlag = false;
      this.debtFlag = true;
      this.debtFreeFlag = false;
      this.searchFlag = false;
        break;
      case this.filterOptions[2]: // do not have debt
      this.allFlag = false;
      this.debtFlag = false;
      this.debtFreeFlag = true;
      this.searchFlag = false;
        break;
      case this.filterOptions[3]: // by name
      this.allFlag = false;
      this.debtFlag = false;
      this.debtFreeFlag = false;
      this.searchFlag = true;
        break;
      default: break;
    }
    this.updateDisplay();
  }

}
