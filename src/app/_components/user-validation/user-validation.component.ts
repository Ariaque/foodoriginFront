import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
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
export class UserValidationComponent implements OnInit {

  usersSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['id', 'username', 'roles', 'transformateur.raison_sociale', 'typeTransformateur', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService, private changeDetectorRefs: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.refreshDataSource();
  }

  // allows the sorting to work on nested property such as 'transformateur.raison_sociale'
  getPropertyByPath(obj: User, pathString: string) {
    return pathString.split('.').reduce((o, i) => o[i], obj);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usersSource.filter = filterValue.trim().toLowerCase();
    if (this.usersSource.paginator) {
      this.usersSource.paginator.firstPage();
    }
  }

  activateUser(user: User, activation: boolean): void {
    const newUser = new User(user.getId, user.getUsername, user.getPassword, user.getRoles, user.getTransformateur, activation, user.getTypeTransformateur);
    this.userService
      .userActivation(newUser)
      .subscribe(data => this.refreshDataSource());
  }

  private refreshDataSource(): void {
    this.userService.findAll().subscribe(data => {
      this.usersSource = new MatTableDataSource<User>(data);
      // allows the filtering to work on nested property such as 'transformateur.raison_sociale'
      this.usersSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return key === 'transformateur' ? currentTerm + data.getTransformateur.raison_sociale : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };
      this.usersSource.paginator = this.paginator;
      this.usersSource.sort = this.sort;
      this.usersSource.sortingDataAccessor = (data, sortHeaderId: string) => {
        return this.getPropertyByPath(data, sortHeaderId);
      };
      this.changeDetectorRefs.detectChanges();
    });
  }
}
