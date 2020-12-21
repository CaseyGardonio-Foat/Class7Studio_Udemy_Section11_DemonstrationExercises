import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServersService } from '../servers.service';
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit: boolean = false;
  changesSaved: boolean = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    this.route.queryParams.subscribe(
      (queryParams: Params)=> {
        this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
      }
    );
    this.route.fragment.subscribe();
    const id = +this.route.snapshot.params['id'];
    const name = this.route.snapshot.params['name']; //added to fix runtime error
    const status = this.route.snapshot.params['status']; //added to fix runtime error
    this.server = this.serversService.getServer(id);
    //subscribe to route params to update the id if params change
    // this.route.params.subscribe(
    //   (params: Params)=>{
    //     this.server.id = params['id'];
    //     this.server.name = params['name'];
    //     this.server.status = params['status']
    //   }
    // )
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(!this.allowEdit) {
      return true;
    }
    if((this.serverName!==this.server.name || this.serverStatus!==this.server.status) && !this.changesSaved){
      return confirm("Do you want to discard the changes?")
    } else {
      return true
    }
  }

}
