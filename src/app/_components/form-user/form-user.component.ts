import {Component, OnInit} from '@angular/core';
import {LabelService} from '../../_services/label.service';
import {CertificationService} from '../../_services/certification.service';
import {Certification} from '../../_classes/certification';
import {Label} from '../../_classes/label';
import {InfosTransformateurService} from '../../_services/infos-transformateur.service';
import {InfosTransformateur} from '../../_classes/infosTransformateur';
import {Transformateur} from '../../_classes/transformateur';
import {TransformateurService} from '../../_services/transformateur.service';

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

  constructor(private labelService: LabelService, private certifService: CertificationService, private infosTService: InfosTransformateurService, private transformateurService: TransformateurService) {
  }

  ngOnInit(): void {
    this.labelService.findAll().subscribe((result) => {
      this.labels = result;
    });
    this.certifService.findAll().subscribe((result) => {
      this.certificats = result;
    });
    this.transformateurService.findById(1).subscribe(res => {
      this.transformateur = res;
    });
  }
  saveInfos(): void {
    this.infos = new InfosTransformateur(this.transformateur, this.description, this.nbEmployes, this.lienSite, this.lienInsta, this.lienTwitter, this.lienFacebook, false, this.selectedLabels, this.selectedCertificats);
    this.infosTService.saveInfosTransformateur(this.infos).subscribe(
      res => {
        console.log('Infos sauvegardées');
      }
    );
  }

}
