import { Component, Input, OnInit, Inject } from '@angular/core';
import {UserService} from '../../_services/user.service';
import {Transformateur} from '../../_classes/transformateur';
import {TokenStorageService} from '../../_services/token-storage.service';
import {TypeTransformateur} from '../../_classes/type-transformateur';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ResetPasswordService} from '../../_services/reset-password.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {bad_old_password, error_while_saving_info, info_saved, new_pass_changed, new_pass_is_old_pass} from '../../../global';
import { GroupTransformateurService } from 'src/app/_services/group-transformateur.service';
import { GroupTransformateur } from 'src/app/_classes/group-transformateur';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Label } from 'src/app/_classes/label';
import { GroupTransformateurComponent } from 'src/app/group-transformateur/group-transformateur.component';
import { OneToOne } from 'src/app/_classes/one-to-one';
import { TransformateurService } from 'src/app/_services/transformateur.service';

/**
 * Component that represents the success page
 */

@Component({
  selector: 'app-profile',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  @Input()
  form: any = {};
  user: any;
  data: any;
  username: string;
  roleUser: string;
  transformateur: Transformateur;
  typeTransformateur: string;
  groupeTransformateur = null;
  allGroupTransformateur:GroupTransformateur[] = [];
  newGroupT = new FormControl();
  newPassword: string;
  password: string;
  numTel: string;
  myForm: FormGroup;
  id: number;

  constructor(private _fb: FormBuilder, private userService: UserService, private tokenStorage: TokenStorageService, private resetPasswordService: ResetPasswordService,private router: Router, private groupTransformateurService:GroupTransformateurService, public dialog:MatDialog, private transformateurService:TransformateurService) { }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser();
    this.username = this.user.username;
    this.typeTransformateur = this.user.getTypeTransformateur;
    // Retrieves the information of the logged-in user
    this.userService.findTransformateurByUser(this.tokenStorage.getUser().username).subscribe((res: Transformateur) => {
      this.transformateur = res;
    });
    this.userService.findUserInfosByName(this.tokenStorage.getUser().username).subscribe((res: any) => {
      this.id = res.id;
      this.roleUser = res.role;
      this.numTel = res.phoneNumber;
      this.typeTransformateur = res.typeTransformateur;
    });

    //Retrieves all existant group transformateurs
    this.groupTransformateurService.findAll().subscribe(
      (result) =>{
        this.allGroupTransformateur = result;
    },
    (error) =>{
        this.allGroupTransformateur = [];
    }
    )

    //Retrieves the logged-in user transformateur group
    this.groupTransformateurService.findByTransformateur(this.tokenStorage.getUser().id).subscribe((res:GroupTransformateur) =>{
      this.groupeTransformateur = res;
    },
    (error) =>{
        this.groupeTransformateur = null;
    })
    console.log(this.groupeTransformateur)
    // Creates the form group
    this.myForm = this._fb.group({
      password: [null, Validators.required],
      newPassword: [null, Validators.required]
    });
  }

  /**
   * Get value in "Ancien mot de passe" field
   */
  get oldPsd(): AbstractControl {
    return this.myForm.get('password');
  }
  /**
   * Get value in "Nouveau mot de passe" field
   */
  get newPsd(): AbstractControl {
    return this.myForm.get('newPassword');
  }
  /**
   * Method called at the click on the "Changer votre mot de passe" button: checks the validation rules and saves the new password
   */
  onSubmit(): void {
    if (this.myForm.valid) {
      if (this.newPassword !== this.password) {
        this.resetPasswordService.resetPassword(this.username, this.password, this.newPassword).subscribe(
          success => {
            if (success){
              Swal.fire(new_pass_changed);
            }},
          err => {
            if (err){
              Swal.fire(bad_old_password);
            }}
        );
      }
      else {
        Swal.fire(new_pass_is_old_pass);
      }
    }
    else {
      this.validateAllFields(this.myForm);
    }
  }

  /**
   * Checks if all fields in a form follow the validation rules
   * @param formGroup
   */
  validateAllFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(GroupTransformateurComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  /**
   * Set a transformateur group
   */
  setTransformateurGroup(): void{
    if(this.newGroupT.value == null){
       Swal.fire("Pas d'informations transmises");
       return;
    }

    let obj = new OneToOne(this.tokenStorage.getUser().id, this.newGroupT.value.id)
    console.log(obj)
    //console.log(this.allGroupTransformateur)
    console.log(this.newGroupT.value)
    this.transformateurService.addGroup(obj).subscribe((success) =>{
      Swal.fire(info_saved);
      this.groupeTransformateur = this.newGroupT.value;
    },
    (error) =>{
      Swal.fire(error_while_saving_info);
    })

  }



}

