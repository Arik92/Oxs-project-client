import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  mockName: string = 'Jack';
  mockPass: string = 'Sparrow';  
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {   
  }

  validateLoginInput(userName: string, passWord: string): string {
    const patt = new RegExp('[^a-zA-Z0-9]'); // any character that is not a letter or a number. can be modified
    let msg = 'valid';
    
    if (userName.localeCompare('') === 0) {
      msg = 'Please Enter A User Name';
    } else if (passWord.localeCompare('') === 0) {
      msg = 'Please Enter A Password';
    } else if (patt.test(userName) || (patt.test(passWord))) {
      msg = 'Please Enter English characters and numbers only!';
    }
    return msg;
  }

  async login(form: NgForm) {        
    const userName = form.value.userName;
    const pass = form.value.pass;
    const loginMsg = this.validateLoginInput(userName, pass);
    
    if (loginMsg.localeCompare('valid') === 0) { // input is valid
      const serverLogin:boolean = await this.dataService.login(userName, pass);
      if (serverLogin) {
        this.router.navigate(['dashboard/'+userName+'/tenant-list']);     
      } else {
        alert("One or more details might be incorrect");
      }
    } else {
      alert(loginMsg);
    }
  }

}
