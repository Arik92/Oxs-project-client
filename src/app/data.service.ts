import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Tenant {
    _id: string,
    name: string,
    phone_number: number,
    address: string,
    debt: number
};

@Injectable({
  providedIn: 'root'
})


export class DataService {
  tenantSubscription: BehaviorSubject<Tenant[]> = new BehaviorSubject<Tenant[]>([]);
  tenantList: Tenant[] = [];
  currentUser: string = '';
  JWTtoken: string = '';
  rejectedLoginMsg: string = 'Unauthorized';
  baseUrl: string = 'http://localhost:3000';

  constructor() {
    this.checkJwt();   
  }

  findIndexById(id: string): number {
    let tenantIndex = -1;
    for (let i = 0;i < this.tenantList.length;i++) {
      if (this.tenantList[i]._id.localeCompare(id) === 0) {
        tenantIndex = i;
      }
    }
    return tenantIndex;
  }

  findTenantById(id: string): Tenant | undefined {    
   
    let requestedTenant;
    for (let i = 0;i < this.tenantList.length;i++) {
      if (this.tenantList[i]._id.localeCompare(id) === 0) {
        requestedTenant = this.tenantList[i];
      }
    }
    return requestedTenant;
  }

  findTenantAndDeleteByIndex(tenantId: string) {    
    let tenantIndex = this.findIndexById(tenantId);

    if (tenantIndex !==-1) {
      this.tenantList.splice(tenantIndex, 1);
      this.tenantSubscription.next(this.tenantList);
    }
  }

  checkJwt() {
    const storedToken = localStorage.getItem('oxs_user_session_token');
    if (storedToken) {
      this.JWTtoken = storedToken;
      if (this.tenantList.length === 0) {
        this.fetchAllTenants();
      }
    }
  }

  isJWTSession(): boolean {
    return this.JWTtoken.localeCompare('') !== 0;
  }

  resetJwt() {
    localStorage.removeItem('oxs_user_session_token');
    this.JWTtoken = '';
    const logoutTime = new Date();
    console.log('NEW LOG OUT: established at '+ logoutTime.toLocaleString());//logout event timestamp
  }

  async login(name: string, pass: string) {
    let loginSuccess = await fetch(this.baseUrl + '/users/token',
    {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },   
      body: JSON.stringify({       
        username: name,
        password: pass
      })
    }).then(response => response.json()).then(json => {
      // login success. Store Jwt token and       
      return json;
      }, err => {
        return err;
      });
     
      if (loginSuccess.token) {
        localStorage.setItem('oxs_user_session_token', loginSuccess.token);//store token in localstorage
        this.checkJwt();
        const loginTime = new Date();
        console.log('NEW LOGIN: established at '+ loginTime.toLocaleString());//login event timestamp
        return true;
      } else {
        return false;
      }
  }

  fetchAllTenants() {
    fetch(this.baseUrl + '/tenants/all_tenants',
    {
      method: "get",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.JWTtoken
      }      
    }).then(response => response.json())
        .then(json => {
          this.tenantList = json;        
          this.tenantSubscription.next(this.tenantList);
        });
  }  

  addTenant(newtenant: any): void {
    fetch(this.baseUrl + '/tenants/add_tenant',
    {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.JWTtoken
      },   
      body: JSON.stringify(newtenant)
    }).then(response => response.json()).then(json => {
      
      }, err => {
        alert("Error adding new tenant: "+ err);
      });
    this.tenantList.push(newtenant);
    this.tenantSubscription.next(this.tenantList);
  }

  updateTenant(newTenantDetails: Tenant | undefined): void {
    if (!newTenantDetails) {
      return;
    }
    fetch(this.baseUrl + '/tenants/update_tenant',
    {
      method: "put",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.JWTtoken
      },   
      body: JSON.stringify(newTenantDetails)
    }).then(response => response.json()).then(json => {
      this.findTenantAndDeleteByIndex(newTenantDetails._id); // replace old tenant record
      this.tenantList.push(json);
      this.tenantSubscription.next(this.tenantList);
      }, err => {
        alert("Error updating tenant:"+ err);
      });   
  }

  deleteTenant(tenantIdToBeDeleted: string): void {
    fetch(this.baseUrl + '/tenants/delete_tenant',
    {
      method: "delete",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.JWTtoken
      },   
      body: JSON.stringify({
        id: tenantIdToBeDeleted
      })
    }).then(response => response.json()).then(json => {
      this.findTenantAndDeleteByIndex(tenantIdToBeDeleted);// delete old tenant record
      }, err => {
        alert("Error deleting tenant: "+ err);
      });   
  }


}
