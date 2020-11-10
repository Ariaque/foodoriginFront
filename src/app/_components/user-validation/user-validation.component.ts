import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../_services/user.service';
import {User} from '../../_classes/user';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-user-validation',
  templateUrl: './user-validation.component.html',
  styleUrls: ['./user-validation.component.css']
})
export class UserValidationComponent implements OnInit, AfterViewInit {

  usersSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['id', 'username', 'password', 'roles'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService) {}

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.userService.findAll().subscribe(data => {
      this.usersSource = new MatTableDataSource<User>(data);
      console.log(this.usersSource);
      this.usersSource.paginator = this.paginator;
      this.usersSource.sort = this.sort;

    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usersSource.filter = filterValue.trim().toLowerCase();

    if (this.usersSource.paginator) {
      this.usersSource.paginator.firstPage();
    }
  }

}
