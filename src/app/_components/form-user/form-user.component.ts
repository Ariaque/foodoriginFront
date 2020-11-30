import {Component, OnInit} from '@angular/core';
import {LabelService} from '../../_services/label.service';
import {CertificationService} from '../../_services/certification.service';
import {Certification} from '../../_classes/certification';
import {Label} from '../../_classes/label';
import {InfosTransformateurService} from '../../_services/infos-transformateur.service';
import {InfosTransformateur} from '../../_classes/infosTransformateur';
import {Transformateur} from '../../_classes/transformateur';
import {TransformateurService} from '../../_services/transformateur.service';
import {TokenStorageService} from '../../_services/token-storage.service';
import {UserService} from '../../_services/user.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  certificats: Certification[];
  labels: Label[];
  selectedLabels: Label[];
  selectedCertificats: Certification[];
  description: string;
  nbEmployes: string;
  lienFacebook: string;
  lienInsta: string;
  lienTwitter: string;
  lienSite: string;
  infos: InfosTransformateur;
  transformateur: Transformateur;
  appartientGroupe: boolean;

  constructor(private labelService: LabelService, private certifService: CertificationService,
              private infosTService: InfosTransformateurService, private transformateurService: TransformateurService,
              private tokenService: TokenStorageService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.labelService.findAll().subscribe((result) => {
      this.labels = result;
    });
    this.certifService.findAll().subscribe((result) => {
      this.certificats = result;
    });
    this.userService.findUserByName(this.tokenService.getUser().username).subscribe((res: any) => {
      this.transformateur = res.transformateur;
    });
}
  saveInfos(): void {
    this.infos = new InfosTransformateur(this.transformateur, this.description, this.nbEmployes, this.lienSite,
      this.lienInsta, this.lienTwitter, this.lienFacebook, this.appartientGroupe, this.selectedLabels, this.selectedCertificats);
    this.infosTService.saveInfosTransformateur(this.infos).subscribe(
      res => {
        alert ('Informations sauvegardées');
      },
      err => {
        console.log('Une erreur s\'est produite lors de l\'enregistrement des informations saisies' );
      }
    );
  }
  validate(ev: KeyboardEvent): void {
    const digits: Array<string> = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const saisie = ev.key;
    if (digits.indexOf(saisie) === -1) {
      ev.preventDefault();
    }
  }
}
