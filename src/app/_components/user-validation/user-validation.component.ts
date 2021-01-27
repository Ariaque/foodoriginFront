import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../_services/user.service';
import {User} from '../../_classes/user';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {delete_account_confirmation} from '../../../global';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../_services/token-storage.service';

/**
 * Component that represents the "Gestion des comptes" page
 */
@Component({
  selector: 'app-user-validation',
  templateUrl: './user-validation.component.html',
  styleUrls: ['./user-validation.component.css']
})
export class UserValidationComponent implements OnInit {

  usersSource: MatTableDataSource<User>;
  dialogRef: MatDialogRef<UserValidationComponent, string>;
  displayedColumns: string[] = ['username', 'transformateur.raison_sociale', 'typeTransformateur.libelle', 'status', 'isEnabled', 'delete'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private userService: UserService, private changeDetectorRefs: ChangeDetectorRef, private dialog: MatDialog, router: Router, tokenService: TokenStorageService) {
    if (tokenService.getToken() === null) {
      router.navigate(['/accueil']);
    }
  }

  ngOnInit(): void {
    this.refreshDataSource();
  }

  /**
   * Defines the behavior of the filter in the account table
   * @param event
   */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usersSource.filter = filterValue.trim().toLowerCase();
    if (this.usersSource.paginator) {
      this.usersSource.paginator.firstPage();
    }
  }

  /**
   * Activates the account concerned by the action
   * @param user
   * @param activation
   */
  activateUser(user: User, activation: boolean): void {
    const newUser = new User(user.getId, user.getUsername, user.getPassword, user.getRole, user.getTransformateur, activation, user.getTypeTransformateur, user.getNumeroTelephone);
    this.userService
      .userActivation(newUser)
      .subscribe(data => this.refreshDataSource());
  }

  /**
   * Deletes the account concerned by the action
   * @param user
   */
  deleteUser(user: User): void {
    const dialogRef = this.dialog.open (ConfirmationDialogComponent, {
      width: '350px',
      data: delete_account_confirmation + user.getUsername +  '?'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.userService.deleteUser(user).subscribe(
          data => this.refreshDataSource()
        );
      }
    });
  }

  /**
   * Initializes account information in the table
   */
  private refreshDataSource(): void {
    this.userService.findUsers().subscribe(data => {
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
      // allows the sorting to work on : nested property such as 'transformateur.raison_sociale', button "Activer"/"Désactiver"
      this.usersSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'transformateur.raison_sociale':
            return item.getTransformateur.raison_sociale;
          case 'user.isEnabled':
            return item.getIsEnabled;
          default:
            return item[property];
        }
      };
      this.changeDetectorRefs.detectChanges();
    });
  }
}
