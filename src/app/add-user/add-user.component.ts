import { Component, OnInit ,Input,AfterViewInit,Output,EventEmitter} from '@angular/core';
import {FormsModule,FormGroup,FormControl} from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
checkadduserHtml=false;
formdata;
updateuserDiv=false;
adduserDiv=true;
checkadduserHtm;
@Input('adduser') adduser:any;
@Input('editthisuser') editthisuser:any;
@Input('updateDivshow') updateDivshow:any;
@Input('addDivshow') addDivshow:any;
@Output() valuechange=new EventEmitter();
@Output() newuser=new EventEmitter();
@Output() updateduser=new EventEmitter();
  constructor() { }
  ngOnInit() {
  this.formdata=new FormGroup({
  name:new FormControl(this.editthisuser.name),
  emailid: new FormControl(this.editthisuser.emailid),
  password:new FormControl(this.editthisuser.password),
  phone:new FormControl(this.editthisuser.phone),
  address:new FormControl(this.editthisuser.address)
    })
  }
ngAfterViewInit(){
  this.updateuserDiv=this.updateDivshow;
  this.adduserDiv=this.addDivshow;
}
backTotable(){
  this.checkadduserHtm=false;
  this.valuechange.emit(this.checkadduserHtm);
}

AddUserSubmit(data){
  data.status=false;
  this.newuser.emit(data);
}
;
updateUserSubmit(data){
  data.status=false;
  this.updateduser.emit(data);
}
} 
