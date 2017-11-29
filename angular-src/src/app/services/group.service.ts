import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GroupSchema } from './groupSchema';
import 'rxjs/add/operator/map';

@Injectable()
export class GroupService {
  user_id: String;

  constructor(
    private http: Http
  ) { }

  //List Groups
  getGroupsForUser(){
    this.loadUserId();
    const userId = this.user_id;
    return this.http.get('http://localhost:3000/groups/listgroups/'+userId)
      .map(res => res.json());
  }

  //Add Groups
  addGroups(newGroup){
    this.loadUserId();
    newGroup.user_id = this.user_id;
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/groups/addgroup', newGroup, {headers: headers})
      .map(res => res.json());
  }

  //Delete Transaction
  deleteGroup(id){
    if(confirm("Are you sure to delete "+id)){
      return this.http.delete('http://localhost:3000/groups/group/'+id)
        .map(res => res.json());
    }
  }

  //Load UserID
  loadUserId(){
    const userIdFromStorage = localStorage.getItem('user_id');
    this.user_id = userIdFromStorage;
    return this.user_id;
  }

}
