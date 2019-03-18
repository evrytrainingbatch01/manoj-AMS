import { Component, OnInit, ViewChild ,AfterViewInit} from '@angular/core';
import { UserListService } from '../user-list.service';
import { AddUserComponent } from '../add-user/add-user.component';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userList;
  numOfrecords=0;
  newuserObj;
  adduser=false;
  editthisuser;
  selectedindex;
  updateDivshow=false;
  addDivshow=false;
  updateduserObj;
  Entrydate;
  EntryUserIndex;
  Entrytime;
  Exitdate;
  ExitUserIndex;
  duration;
  Exittime;
  constructor(private userlistservice:UserListService) { }
  ngOnInit() {
    this.userList = this.userlistservice.getAlluserList();
    this.numOfrecords=this.userList.length;
  }
  ngAfterViewInit(){
    this.numOfrecords=this.userList.length;
  }

  //-----new user added to the present list----
  onChangeuser(data){
    this.newuserObj =data;
    this.adduser=this.newuserObj.status;
    this.userList.push(this.newuserObj);

  }
  addUser(){
this.adduser=true;
this.updateDivshow=false;
this.addDivshow=true;

  }
// ----edit and uodate the present user----
  EditUser(index){
    this.selectedindex=index;
    this.editthisuser=this.userList[index];
    this.adduser=true;
    this.updateDivshow=true;
    this.addDivshow=false;
  }
  Onupdateduser(data){
    this.updateduserObj =data;
    this.adduser=this.updateduserObj.status;
    let k=this.selectedindex;
    for(let i=0;i<this.userList.length;i++){
      if(i==k){
        this.userList[i]=this.updateduserObj;
        this.updateduserObj={};
      }
    }
  }
  //---- delete the present user from list----
  deleteUser(index){
this.userList.splice(index,1);
  }
  //--- back button -----
  backtomain(boolValue){
    this.adduser=boolValue;
  }
// --- Calculate the the user Entry time and Exit time also the total hour 
  EntryTimeFun(index){
    this.EntryUserIndex=index;
    this.Entrydate=new Date();
    this.Entrytime=new Date().toLocaleTimeString();
   this.userList[this.EntryUserIndex].entrytime=this.Entrydate;
   this.userList[this.EntryUserIndex].entrytimeForDisplay=this.Entrytime;
  }
  ExitTimeFun(index){
this.ExitUserIndex=index;
this.Exitdate=new Date();
this.Exittime=new Date().toLocaleTimeString();
this.userList[this.ExitUserIndex].exittime=this.Exitdate;
this.userList[this.ExitUserIndex].exittimeForDisplay=this.Exittime;

if(this.EntryUserIndex==this.ExitUserIndex){
  var date2_ms = this.userList[this.ExitUserIndex].exittime.getTime();
      var date1_ms = this.userList[this.EntryUserIndex].entrytime.getTime();

    
      // Calculate the difference in milliseconds
      var difference_ms = date2_ms - date1_ms;
      //take out milliseconds
      difference_ms = difference_ms/1000;
      var seconds = Math.floor(difference_ms % 60);
      difference_ms = difference_ms/60; 
      var minutes = Math.floor(difference_ms % 60);
      difference_ms = difference_ms/60; 
      var hours = Math.floor(difference_ms % 24);  
      var days = Math.floor(difference_ms/24);
      //alert(days + ' days, ' + hours + ' hours, ' + minutes + ' minutes, and ' + seconds + ' seconds')
      this.duration= hours + ':' + minutes + ':' + seconds + '';
      this.userList[index].duration=this.duration;
}
  }


}
