import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tenant-add',
  templateUrl: './tenant-add.component.html',
  styleUrls: ['./tenant-add.component.css']
})
export class TenantAddComponent implements OnInit {

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  validateDigits(phone: number, debt: number): string {
    let msg = 'valid';    

    if (typeof phone !== 'number' || typeof debt !== 'number')     {
      msg = 'Please Enter Numbers Only For Phone Number And Debt Amount!';
    }     
    return msg;
  }
  validateName(name: string): string {
    const patt = new RegExp('\W'); // any character that is not a letter
    let msg = 'valid';
    if (name.localeCompare('') === 0) {
      msg = 'Please Enter A Name';
    } else if (patt.test(name)) {
      msg = 'Please Enter English Characters Only For Tenant Name!';
    }
    return msg;
  }
  validateAdress(description: string): string {
    const patt = new RegExp('[^ a-zA-Z0-9]'); // any character that is not a letter, a number or a whitespace. can be modified
    let msg = 'valid';
    
    if (description.localeCompare('') === 0) {
      msg = 'Please Enter A Description';
    } else if (patt.test(description)) {
      msg = 'Please Enter English characters and numbers only!';
    }
    return msg;
  }

  addTenant(form: NgForm) {
    const name: string = form.value.name; // letters only
    const phone: number = parseFloat(form.value.phone); // digits
    const address: string = form.value.address; // both
    const debt: number = form.value.debt.localeCompare('') === 0 ? 0 : parseFloat(form.value.debt); // digits

    const nameMsg = this.validateName(name);
    const digitMsg = this.validateDigits(phone, debt);
    const addressMsg = this.validateAdress(address);
    if (nameMsg.localeCompare('valid') !== 0) {
      alert(nameMsg);
    } else if (addressMsg.localeCompare('valid') !== 0) {
      alert(addressMsg);
    } else if (digitMsg.localeCompare('valid') !== 0) {
      alert(digitMsg);
    } else {
      //passed validation
      const newTenant = {
            "name": name,
            "phoneNumber": phone,
            "address": address,
            "debt": debt
      }
      this.dataService.addTenant(newTenant);
      this.router.navigate(['../tenant-list'], {relativeTo: this.route});
    }
  }
}
