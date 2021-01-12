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
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {UrlVideo} from '../../_classes/url-video';
import {FermePartenaire} from '../../_classes/ferme-partenaire';
import {DenreeAnimale} from '../../_classes/denree-animale';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  certifications: Certification[];
  labels: Label[];
  description: string;
  nbEmployes: string;
  lienFacebook: string;
  lienInsta: string;
  lienTwitter: string;
  lienSite: string;
  infos: InfosTransformateur;
  transformateur: Transformateur;
  appartientGroupe: boolean;
  siretGroupe = '';
  urlVideoForm: FormGroup;
  urlVideosInit: UrlVideo[] = [];
  urlVideos: UrlVideo[] = [];
  fermeForm: FormGroup;
  fermesP: FermePartenaire[] = [];
  fermesPInit: FermePartenaire[] = [];
  selectedFile: FileList;
  imagesLink: string[] = [];
  idInfo = 0;
  listCertif = new FormControl();
  listLabel = new FormControl();
  denreeForm: FormGroup;
  denreeAInit: DenreeAnimale[] = [];
  denreesA: DenreeAnimale[] = [];
  step: any = 1;

  constructor(private labelService: LabelService, private certifService: CertificationService,
              private infosTService: InfosTransformateurService, private transformateurService: TransformateurService,
              private tokenService: TokenStorageService, private userService: UserService, private formBuilder: FormBuilder) {
    this.fermeForm = this.formBuilder.group({
      fermes: this.formBuilder.array([])
    });
    this.urlVideoForm = this.formBuilder.group({
      urls: this.formBuilder.array([])
    });
    this.denreeForm = this.formBuilder.group({
      denrees: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    this.nbEmployes = '1';
    this.labelService.findAll().subscribe((result) => {
      this.labels = result;
    });
    this.certifService.findAll().subscribe((result) => {
      this.certifications = result;
    });
    this.userService.findUserByName(this.tokenService.getUser().username).subscribe((res: any) => {
      this.transformateur = res.transformateur;
      this.infosTService.findById(this.transformateur.id).subscribe((info: InfosTransformateur)  => {
        if (info != null) {
          this.idInfo = info.id;
          this.description = info.description;
          this.nbEmployes = info.nombre_employes;
          this.lienSite = info.url_site;
          this.appartientGroupe = info.appartient_groupe;
          this.siretGroupe = info.siret_groupe;
          this.lienInsta = info.url_instagram;
          this.lienFacebook = info.url_facebook;
          this.lienTwitter = info.url_twitter;
          const listL: Label[] = [];
          for (let i = 0; i < info.labels.length; i++) {
            const index = this.labels.findIndex(obj => obj.libelle === info.labels[i].libelle);
            listL.push(this.labels[index]);
          }
          this.listLabel.setValue(listL);

          const listC: Certification[] = [];
          for (let i = 0; i < info.certifications.length; i++) {
            const index = this.certifications.findIndex(obj => obj.libelle === info.certifications[i].libelle);
            listC.push(this.certifications[index]);
          }
          this.listCertif.setValue(listC);

          this.urlVideosInit = info.urls.map(url => Object.assign(new UrlVideo(), url));
          this.urlVideosInit.forEach(url => {
            this.urls().push(this.formBuilder.group({libelle: url.getLibelle()}));
          });
          this.fermesPInit = info.fermesP.map(ferme => Object.assign(new FermePartenaire(), ferme));
          this.fermesPInit.forEach(ferme => {
            this.fermes().push(this.formBuilder.group({nom: ferme.getNom(), presentation: ferme.getDescription()}));
          });
          this.denreeAInit = info.denreesA.map(denree => Object.assign(new DenreeAnimale(), denree));
          this.denreeAInit.forEach(denree => {
            this.denrees().push(this.formBuilder.group({nom: denree.getNom(), origine: denree.getOrigine()}));
          });
        }
        this.infosTService.getImageTransformateur(this.transformateur.id).subscribe(image => {
          image.map (link => {
            this.imagesLink.push('http://foodorigin.projetetudiant.fr/images/' + this.transformateur.id + '/' + link);
          });
        });
      });
    });
  }
  saveInfos(): void {
    this.createFermeList (this.fermeForm.value.fermes);
    this.createUrlList (this.urlVideoForm.value.urls);
    this.createDenreeList (this.denreeForm.value.denrees);
    this.infos = new InfosTransformateur(this.transformateur, this.description, this.nbEmployes, this.lienSite,
       this.lienFacebook, this.lienTwitter, this.lienInsta, this.appartientGroupe, this.siretGroupe, this.listLabel.value,
       this.listCertif.value, this.urlVideos, this.fermesP, this.denreesA);
       this.step = 1;
    this.infosTService.saveInfosTransformateur(this.idInfo, this.infos).subscribe(
      res => {
        alert ('Informations sauvegardées');
      },
      err => {
        alert ('Une erreur s\'est produite lors de l\'enregistrement des informations saisies' );
      }
    );
  }
  createFermeList(fermeList): void {
    for (let i = 0; i < fermeList.length; i++) {
      const ferme = fermeList[i];
      if (ferme.nom !== '' && !this.isAddFerme(ferme.nom, ferme.presentation)) {
        const newF = new FermePartenaire(null, ferme.nom, ferme.presentation);
        this.fermesP.push(newF);
      }
    }
  }
  isAddFerme(nom, presentation): boolean {
    let ret = false;
    for (let i = 0; i < this.fermesPInit.length; i++) {
      if (this.fermesPInit[i].getNom() === nom && this.fermesPInit[i].getDescription() === presentation) {
        this.fermesP.push(this.fermesPInit[i]);
        ret = true;
      }
    }
    return ret;
  }
  createDenreeList(denreeList): void {
    for (let i = 0; i < denreeList.length; i++) {
      const denree = denreeList[i];
      if (denree.nom !== '' && !this.isAddDenree(denree.nom, denree.origine)) {
        const newD = new DenreeAnimale(null, denree.nom, denree.origine);
        this.denreesA.push(newD);
      }
    }
  }
  isAddDenree(nom, origine): boolean {
    let ret = false;
    for (let i = 0; i < this.denreeAInit.length; i++) {
      if (this.denreeAInit[i].getNom() === nom && this.denreeAInit[i].getOrigine() === origine) {
        this.denreesA.push(this.denreeAInit[i]);
        ret = true;
      }
    }
    return ret;
  }
  createUrlList(urlList): void {
    for (let i = 0; i < urlList.length; i++) {
      if (urlList[i].libelle !== '' && !this.isAddUrl (urlList[i].libelle)) {
        const newUrlV = new UrlVideo(null, urlList[i].libelle);
        this.urlVideos.push(newUrlV);
      }
    }
  }
  isAddUrl(libelle): boolean {
    let ret = false;
    for (let i = 0; i < this.urlVideosInit.length; i++) {
      if (this.urlVideosInit[i].getLibelle() === libelle) {
        this.urlVideos.push(this.urlVideosInit[i]);
        ret = true;
      }
    }
    return ret;
  }
  validate(ev: KeyboardEvent): void {
    const digits: Array<string> = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const saisie = ev.key;
    if (digits.indexOf(saisie) === -1) {
      ev.preventDefault();
    }
  }
  urls(): FormArray {
    return this.urlVideoForm.get('urls') as FormArray;
  }
  newUrl(): FormGroup {
    return this.formBuilder.group({
      libelle: ''
    });
  }
  addUrl(): void {
    this.urls().push(this.newUrl());
  }
  removeUrl(i: number): void {
    this.urls().removeAt(i);
  }
  fermes(): FormArray {
    return this.fermeForm.get('fermes') as FormArray;
  }
  newFerme(): FormGroup {
   return this.formBuilder.group({
     nom: '',
     presentation: ''
   });
  }
  addFerme(): void {
    this.fermes().push(this.newFerme());
  }
  removeFerme(i: number): void {
    this.fermes().removeAt(i);
  }
  denrees(): FormArray {
    return this.denreeForm.get('denrees') as FormArray;
  }
  newDenree(): FormGroup {
    return this.formBuilder.group({
      nom: '',
      origine: ''
    });
  }
  addDenree(): void {
    this.denrees().push(this.newDenree());
  }
  removeDenree(i: number): void {
    this.denrees().removeAt(i);
  }
  onFileChanged(event): void {
    const files = event.target.files;
    let isImage = true;

    for (let i = 0; i < files.length; i++) {
      if (files.item(i).type.match('image.*')) {
        continue;
      } else {
        isImage = false;
        alert('Une image transmise a un format incorrect');
        break;
      }
    }
    if (isImage){
      this.selectedFile = files;
    }
    else {
      this.selectedFile = undefined;
    }
  }
  onUpload(): void{
    if (this.selectedFile !== undefined) {
      for (let i = 0; i < this.selectedFile.length; i++) {
        const uploadData = new FormData();
        uploadData.append('myFile', this.selectedFile[i], this.selectedFile[i].name);
        this.infosTService.addImageTransformateur(uploadData, this.transformateur.id).subscribe(
          res => {
            alert ('Image sauvegardée');
            this.imagesLink.push('http://foodorigin.projetetudiant.fr/images/' + this.transformateur.id + '/' + this.selectedFile[i].name);
          },
          err => {
            alert ('Une erreur s\'est produite lors de l\'enregistrement, la taille de l\'image ne doit pas dépasser 500KB');
          }
        );
      }
    }
  }
  deleteImage(fileName): void {
    this.infosTService.deleteImageTransformateur(fileName, this.transformateur.id).subscribe(
      res => {
        alert ('Image supprimée');
        const index = this.imagesLink.indexOf(fileName);
        this.imagesLink.splice(index, 1);
      },
        err => {
          alert ('Une erreur s\'est produite lors de l\'enregistrement des informations saisies' );
      });
  }
  submit(){
    this.step = this.step + 1;
    console.log(this.step);
  }
  previous(){
    this.step = this.step - 1;
    console.log(this.step);
  }
}
