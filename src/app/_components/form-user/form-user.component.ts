import {Component, OnInit} from '@angular/core';
import {LabelService} from '../../_services/label.service';
import {CertificationService} from '../../_services/certification.service';
import {Certification} from '../../_classes/certification';
import {Label} from '../../_classes/label';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  certificat: Certification[];
  label: Label[];
  selectedLabel: Label;
  selectedCertificat: Certification;

  constructor(private postData: LabelService, private api: CertificationService) {
  }

  ngOnInit(): void {
    this.postData.findAll().subscribe((result) => {
      console.warn(result);
      this.label = result;
    });
    this.api.findAll().subscribe((result) => {
      console.warn(result);
      this.certificat = result;
    });
  }

}
