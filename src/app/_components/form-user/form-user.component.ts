import {Component, Input, OnInit} from '@angular/core';
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
import {UrlVideo} from '../../_classes/url-video';
import {FermePartenaire} from '../../_classes/ferme-partenaire';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TypeDenree} from '../../_classes/type-denree';
import {OrigineDenree} from '../../_classes/origine-denree';
import {DenreeService} from '../../_services/denree.service';
import {DenreeAnimale} from '../../_classes/denree-animale';
import {
  error_while_saving_img,
  error_while_saving_info,
  incorrect_img_format,
  info_saved,
  regex_siret,
  regex_website,
  regex_white_space
} from '../../../global';

/**
 * Component that represents the "Espace Entreprise" page
 */
@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  certifications: Certification[];
  labels: Label[];
  typeDenree: TypeDenree [] = [];
  origineDenree: OrigineDenree[] = [];
  typeDenreeNom: string [] = [];
  typeOrigineNom: string [] = [];
  typeDenreeEspece = [[]];
  typeDenreeAnimal = [[]];
  typeOrigineRegion = [[]];
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
  denreeInit: DenreeAnimale[] = [];
  denreeSelected: DenreeAnimale[] = [];
  step: any = 1;
  @Input()
  formGroupGeneralInfo: FormGroup;
  globalForm: FormGroup;
  form: any = {};
  formGroupSocialLinks: FormGroup;
  formGroupPictures: FormGroup;
  row: FormGroup;

  /**
   * Do service imports and initializes forms group
   * @param labelService
   * @param certifService
   * @param infosTService
   * @param transformateurService
   * @param tokenService
   * @param userService
   * @param formBuilder
   * @param router
   * @param denreeService
   */
  constructor(private labelService: LabelService, private certifService: CertificationService,
              private infosTService: InfosTransformateurService, private transformateurService: TransformateurService,
              private tokenService: TokenStorageService, private userService: UserService, private formBuilder: FormBuilder,
              private router: Router, private denreeService: DenreeService) {
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

  /**
   * Get value in "Site internet" field
   */
  get siteW(): AbstractControl {
    return this.formGroupGeneralInfo.get('siteW');
  }

  /**
   * Get value in "Lien Facebook" field
   */
  get lienF(): AbstractControl {
    return this.formGroupSocialLinks.get('lienF');
  }

  /**
   * Get value in "Lien Twitter" field
   */
  get lienT(): AbstractControl {
    return this.formGroupSocialLinks.get('lienT');
  }

  /**
   * Get value in "Lien Instagram" field
   */
  get lienI(): AbstractControl {
    return this.formGroupSocialLinks.get('lienI');
  }

  /**
   * Get value in "Titre de la vidéo" field
   */
  get titre(): AbstractControl {
    return this.formGroupGeneralInfo.get('titre');
  }

  /**
   * Get value in "Siret du groupe" field
   */
  get numSiret(): FormGroup {
    const temp = this.formGroupGeneralInfo.controls.siret as FormGroup;
    return temp;
  }

  ngOnInit(): void {
    this.globalForm = this.formBuilder.group({});
    const reg = regex_website;
    const whiteSpace = regex_white_space;
    this.formGroupGeneralInfo = this.formBuilder.group({
      siteW: [null, [Validators.pattern(reg)]],
      siret: [null, [Validators.required, Validators.pattern(regex_siret)]],
    });
    this.formGroupGeneralInfo.controls['siret'].disable();
    this.formGroupSocialLinks = this.formBuilder.group({
      lienF: [null, [Validators.pattern(reg)]],
      lienT: [null, [Validators.pattern(reg)]],
      lienI: [null, [Validators.pattern(reg)]],
    });
    this.formGroupPictures = this.formBuilder.group({});
    this.row = this.formBuilder.group({});
    this.nbEmployes = '1';

    // Initializes label's list
    this.labelService.findAll().subscribe((result) => {
      this.labels = result;
    });
    // Initializes certification's list
    this.certifService.findAll().subscribe((result) => {
      this.certifications = result;
    });
    // Initializes list in "Denree Animale utilisées"
    this.denreeService.findAllOrgineDenree().subscribe((result) => {
      this.origineDenree = result.map(origine => Object.assign(new OrigineDenree(), origine));
    });
    this.denreeService.findAllTypeDenree().subscribe((result) => {
      this.typeDenree = result.map(type => Object.assign(new TypeDenree(), type));
    });
    this.denreeService.findAllTypeDenreeNom().subscribe((result) => {
      this.typeDenreeNom = result;
    });
    this.denreeService.findAllPaysOrigine().subscribe((result) => {
      this.typeOrigineNom = result;
    });
    // Recover user information user's data if he has already entered it
    this.userService.findTransformateurByUser(this.tokenService.getUser().username).subscribe((res: any) => {
      this.transformateur = res;
      this.infosTService.findById(this.transformateur.id).subscribe((info: InfosTransformateur) => {
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
          // Recover user's labels
          for (let i = 0; i < info.labels.length; i++) {
            const index = this.labels.findIndex(obj => obj.libelle === info.labels[i].libelle);
            listL.push(this.labels[index]);
          }
          this.listLabel.setValue(listL);

          // Recover user's certification
          const listC: Certification[] = [];
          for (let i = 0; i < info.certifications.length; i++) {
            const index = this.certifications.findIndex(obj => obj.libelle === info.certifications[i].libelle);
            listC.push(this.certifications[index]);
          }
          this.listCertif.setValue(listC);

          // Recover user's video urls
          this.urlVideosInit = info.urls.map(url => Object.assign(new UrlVideo(), url));

          this.urlVideosInit.forEach(url => {
            this.urls().push(this.formBuilder.group({
              libelle: [url.getLibelle(), [Validators.required, Validators.pattern(reg)]],
              titre: [url.getTitre(), [Validators.required, Validators.pattern(whiteSpace)]]
            }));
          });

          // Recover user's partnership farm
          this.fermesPInit = info.fermesP.map(ferme => Object.assign(new FermePartenaire(), ferme));
          this.fermesPInit.forEach(ferme => {
            this.fermes().push(this.formBuilder.group({
              nom: [ferme.getNom(), [Validators.required, Validators.pattern(whiteSpace)]],
              presentation: ferme.getDescription(),
              url: [ferme.getUrl(), Validators.pattern(reg)]
            }));
          });

          // Recover user's food product
          this.denreeInit = info.denrees.map(denree => Object.assign(new DenreeAnimale(), denree));
          for (let i = 0; i < this.denreeInit.length; i++) {
            const denree = this.denreeInit[i];

            const typeD = Object.assign(new TypeDenree(), denree.getTypeDenree());
            const origineD = Object.assign(new OrigineDenree(), denree.getOrigineDenree());
            this.denreeService.findEspeceByNom(typeD.getNom()).subscribe(espece => {
              this.typeDenreeEspece[i] = espece;
            });
            this.denreeService.findAnimalByEspece(typeD.getEspece()).subscribe(animal => {
              this.typeDenreeAnimal[i] = animal;
            });
            this.denreeService.findRegionByPays(origineD.getPays()).subscribe(pays => {
              this.typeOrigineRegion[i] = pays;
            });
            this.denrees().push(this.formBuilder.group(
              {
                nom: [typeD.getNom(), Validators.required],
                espece: [typeD.getEspece(), Validators.required],
                animal: [typeD.getAnimal(), Validators.required],
                pays: origineD.getPays(),
                region: origineD.getRegion(),
                infosT: denree.getInfosTypeDenree(),
                infosO: denree.getInfosOrigineDenree()
              }));
          }
        }
        // Recover user's link images
        this.infosTService.getImageTransformateur(this.transformateur.id).subscribe(image => {
          image.map(link => {
            this.imagesLink.push('http://foodorigin.projetetudiant.fr/images/' + this.transformateur.id + '/' + link);
          });
        });
      });
    });
  }

  /**
   * Saves information entered by the user
   */
  saveInfos(): void {
    this.createFermeList(this.fermeForm.value.fermes);
    this.createUrlList(this.urlVideoForm.value.urls);
    this.createDenreeList(this.denreeForm.value.denrees);
    this.infos = new InfosTransformateur(this.transformateur, this.description, this.nbEmployes, this.lienSite,
      this.lienFacebook, this.lienTwitter, this.lienInsta, this.appartientGroupe, this.siretGroupe, this.listLabel.value,
      this.listCertif.value, this.urlVideos, this.fermesP, this.denreeSelected);

    if (this.step === 6 && this.denreeForm.valid) {
      window.scroll(0, 0);
      this.step = 1;
      this.infosTService.saveInfosTransformateur(this.idInfo, this.infos).subscribe(
        res => {
          this.step = 6;
          Swal.fire({title: info_saved});
          this.router.navigate(['/accueil']);
        },
        err => {
          this.step = 6;
          Swal.fire(error_while_saving_info);
        });
    } else {
      this.validateAllFieldsDynamicForm(this.denrees());
    }
  }

  /**
   * Checks if food product information are already present in the database
   * @param type
   * @param origine
   * @param infosT
   * @param infosO
   */
  isAddDenree(type, origine, infosT, infosO): boolean {
    let ret = false;
    for (let i = 0; i < this.denreeInit.length; i++) {
      const denree = this.denreeInit[i];
      const typeD = Object.assign(new TypeDenree(), denree.getTypeDenree());
      const origineD = Object.assign(new OrigineDenree(), denree.getOrigineDenree());
      if (this.equalityType(type, typeD) && this.equalityOrigine(origine, origineD) && infosT === denree.getInfosTypeDenree() && infosO === denree.getInfosOrigineDenree()) {
        this.denreeSelected.push(denree);
        ret = true;
      }
    }
    return ret;
  }

  /**
   * Checks if two 'TypeDenree' object are equals
   * @param type1
   * @param type2
   */
  equalityType(type1: TypeDenree, type2: TypeDenree): boolean {
    let ret = false;
    if (type1 != null) {
      if (type1.getId() === type2.getId() && type1.getEspece() === type2.getEspece() && type1.getNom() === type2.getNom() && type1.getAnimal() === type2.getAnimal()) {
        ret = true;
      }
    }
    return ret;
  }

  /**
   * Checks if two 'OrigineDenree' object are equals
   * @param origine1
   * @param origine2
   */
  equalityOrigine(origine1: OrigineDenree, origine2: OrigineDenree): boolean {
    let ret = false;
    if (origine1 != null) {
      if (origine1.getId() === origine2.getId() && origine1.getPays() === origine2.getPays() && origine1.getRegion() === origine2.getRegion()) {
        ret = true;
      }
    }
    return ret;
  }

  /**
   * Creates the list of food product entered
   * @param denreeList
   */
  createDenreeList(denreeList): void {
    for (let i = 0; i < denreeList.length; i++) {
      const denree = denreeList[i];
      const typeDenree = this.findTypeDenree(denree.nom, denree.espece, denree.animal);
      const origineDenree = this.findOrigineDenree(denree.pays, denree.region);
      if (denree.nom != null && !this.isAddDenree(typeDenree, origineDenree, denree.infosT, denree.infosO)) {
        const denreeA = new DenreeAnimale(null, typeDenree, origineDenree, denree.infosT, denree.infosO);
        this.denreeSelected.push(denreeA);
      }
    }
  }

  /**
   * Finds in the database's line which corresponds to food product type entered information
   * @param type
   * @param espece
   * @param animal
   */
  findTypeDenree(type, espece, animal): TypeDenree {
    let ret = null;
    for (let i = 0; i < this.typeDenree.length; i++) {
      const typeD = this.typeDenree[i];
      if (typeD.getNom() === type && typeD.getEspece() === espece && typeD.getAnimal() === animal) {
        ret = typeD;
      }
    }
    return ret;
  }

  /**
   * Finds in the database's line which corresponds to food product origin entered information
   * @param pays
   * @param region
   */
  findOrigineDenree(pays, region): OrigineDenree {
    let ret = null;
    for (let i = 0; i < this.origineDenree.length; i++) {
      const origineD = this.origineDenree[i];
      if (origineD.getPays() === pays && origineD.getRegion() === region) {
        ret = origineD;
      }
    }
    return ret;
  }

  /**
   * Creates the list of partner farm entered
   * @param fermeList
   */
  createFermeList(fermeList): void {
    for (let i = 0; i < fermeList.length; i++) {
      const ferme = fermeList[i];
      if (ferme.nom !== null && !this.isAddFerme(ferme.nom, ferme.presentation, ferme.url)) {
        const newF = new FermePartenaire(null, ferme.nom, ferme.presentation, ferme.url);
        this.fermesP.push(newF);
      }
    }
  }

  /**
   * Checks if partnership farm information are already present in the database
   * @param nom
   * @param presentation
   * @param url
   */
  isAddFerme(nom, presentation, url): boolean {
    let ret = false;
    for (let i = 0; i < this.fermesPInit.length; i++) {
      if (this.fermesPInit[i].getNom() === nom && this.fermesPInit[i].getDescription() === presentation && this.fermesPInit[i].getUrl() === url) {
        this.fermesP.push(this.fermesPInit[i]);
        ret = true;
      }
    }
    return ret;
  }

  /**
   * Creates the list of video url entered
   * @param urlList
   */
  createUrlList(urlList): void {
    for (let i = 0; i < urlList.length; i++) {
      if (urlList[i].libelle != null && urlList[i].libelle !== '' && !this.isAddUrl(urlList[i].libelle, urlList[i].titre)) {
        const newUrlV = new UrlVideo(null, urlList[i].libelle, urlList[i].titre);
        this.urlVideos.push(newUrlV);
      }
    }
  }

  /**
   * Checks if url video information are already present in the database
   * @param libelle
   * @param titre
   */
  isAddUrl(libelle, titre): boolean {
    let ret = false;
    for (let i = 0; i < this.urlVideosInit.length; i++) {
      if (this.urlVideosInit[i].getLibelle() === libelle && this.urlVideosInit[i].getTitre() === titre) {
        this.urlVideos.push(this.urlVideosInit[i]);
        ret = true;
      }
    }
    return ret;
  }

  /**
   * Checks if the entered caracter is a digit in "Nombre d'employés" field
   * @param ev
   */
  validate(ev: KeyboardEvent): void {
    const digits: Array<string> = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const saisie = ev.key;
    if (digits.indexOf(saisie) === -1) {
      ev.preventDefault();
    }
  }

  /**
   * Returns entered video urls
   */
  urls(): FormArray {
    return this.urlVideoForm.get('urls') as FormArray;
  }

  /**
   * Defines fields in the "Gestion des médias (videos)" form
   */
  newUrl(): FormGroup {
    return this.formBuilder.group({
      libelle: [null, [Validators.required, Validators.pattern(regex_website)]],
      titre: [null, [Validators.required, Validators.pattern(regex_white_space)]]
    });
  }

  /**
   * Adds a new line in the "Gestion des médias (videos)" form
   */
  addUrl(): void {
    this.urls().push(this.newUrl());
  }
  /**
   * Removes the i line in the "Gestion des médias (videos)" form
   * @param i
   */
  removeUrl(i: number): void {
    this.urls().removeAt(i);
  }

  /**
   * Returns entered partnership farm
   */
  fermes(): FormArray {
    return this.fermeForm.get('fermes') as FormArray;
  }

  /**
   * Defines fields in the "Fermes/agriculteurs partenaires" form
   */
  newFerme(): FormGroup {
    return this.formBuilder.group({
      nom: [null, [Validators.required, Validators.pattern(regex_white_space)]],
      presentation: '',
      url: [null, [Validators.pattern(regex_website)]],
    });
  }

  /**
   * Adds a new line in the "Fermes/agriculteurs partenaires" form
   */
  addFerme(): void {
    this.fermes().push(this.newFerme());
  }

  /**
   * Removes the i line in the "Fermes/agriculteurs partenaires" form
   * @param i
   */
  removeFerme(i: number): void {
    this.fermes().removeAt(i);
  }

  /**
   * Returns entered food product form
   */
  denrees(): FormArray {
    return this.denreeForm.get('denrees') as FormArray;
  }

  /**
   * Defines fields in the "Denrées animales utilisées" form
   */
  newDenree(): FormGroup {
    return this.formBuilder.group({
      nom: [null, Validators.required],
      espece: [{value: null, disabled: true}, Validators.required],
      animal: [{value: null, disabled: true}, Validators.required],
      pays: [null, Validators.required],
      region: [{value: null, disabled: true}, Validators.required],
      infosT: '',
      infosO: ''
    });
  }

  /**
   * Adds a new line in the "Denrées animales utilisées" form
   */
  addDenree(): void {
    const newDenree = this.newDenree();
    newDenree.controls.espece.disable();
    this.denrees().push(this.newDenree());
  }

  /**
   * Removes the i line in the "Denrées animales utilisées" form
   * @param i
   */
  removeDenree(i: number): void {
    this.denrees().removeAt(i);
  }

  /**
   * Detects selected files and checks if it is an image
   * @param event
   */
  onFileChanged(event): void {
    const files = event.target.files;
    let isImage = true;

    for (let i = 0; i < files.length; i++) {
      if (files.item(i).type.match('image.*')) {
        this.selectedFile = files;
      } else {
        isImage = false;
        Swal.fire(incorrect_img_format);
        this.selectedFile = undefined;
        break;
      }
    }
  }

  /**
   * Saves the selected file in the FTP server
   */
  onUpload(): void {
    const selectedFileCopy = this.selectedFile;
    if (selectedFileCopy !== undefined) {
      for (let i = 0; i < selectedFileCopy.length; i++) {
        const uploadData = new FormData();
        uploadData.append('myFile', selectedFileCopy[i], selectedFileCopy[i].name);
        this.infosTService.addImageTransformateur(uploadData, this.transformateur.id).subscribe(
          res => {
            const fileName = 'http://foodorigin.projetetudiant.fr/images/' + this.transformateur.id + '/' + selectedFileCopy[i].name;
            if (this.imagesLink.indexOf(fileName) === -1) {
              this.imagesLink.push('http://foodorigin.projetetudiant.fr/images/' + this.transformateur.id + '/' + selectedFileCopy[i].name);
            }
            this.selectedFile = undefined;
          },
          err => {
            Swal.fire(error_while_saving_img);
          }
        );
      }
    }
  }

  /**
   * Deletes a choosen image
   * @param fileName
   */
  deleteImage(fileName): void {
    this.infosTService.deleteImageTransformateur(fileName, this.transformateur.id).subscribe(
      res => {
        const index = this.imagesLink.indexOf(fileName);
        this.imagesLink.splice(index, 1);
      },
      err => {
        Swal.fire(error_while_saving_info);
      });
  }

  /**
   * Checks if entered information correspond are valid
   */
  submit(): void {
    if (this.step === 1) {
      if (this.formGroupGeneralInfo.valid) {
        this.step = this.step + 1;
        window.scroll(0, 0);
      } else {
        this.validateAllFields(this.formGroupGeneralInfo);
      }
    } else if (this.step === 2) {
      if (this.formGroupSocialLinks.valid) {
        this.step = this.step + 1;
        window.scroll(0, 0);
      } else {
        this.validateAllFields(this.formGroupSocialLinks);
      }
    } else if (this.step === 3) {
      if (this.formGroupPictures.valid) {
        this.step = this.step + 1;
        window.scroll(0, 0);
      } else {
        this.validateAllFields(this.formGroupPictures);
      }
    } else if (this.step === 4) {
      if (this.urlVideoForm.valid) {
        this.step = this.step + 1;
        window.scroll(0, 0);
      } else {
        this.validateAllFieldsDynamicForm(this.urls());
      }
    } else if (this.step === 5) {
      if (this.fermeForm.valid) {
        this.step = this.step + 1;
        window.scroll(0, 0);
      } else {
        this.validateAllFieldsDynamicForm(this.fermes());
      }
    } else {
      if (this.denreeForm.valid) {
        this.step = this.step + 1;
        window.scroll(0, 0);
      } else {
        this.validateAllFieldsDynamicForm(this.denrees());
      }
    }
  }

  /**
   * Decreases the step of the form if the user clicks on "Précédent" button
   */
  previous(): void {
    this.step = this.step - 1;
  }

  /**
   * Fills "Espece" list in function of entered name
   * @param i
   */
  fillEspece(i): void {
    const formArray = this.denrees();
    const formGroup = formArray.at(i) as FormGroup;
    const item = formGroup.controls.espece;
    item.enable();
    this.denreeService.findEspeceByNom(this.denreeForm.value.denrees[i].nom).subscribe(res => {
      this.typeDenreeEspece[i] = res.sort();
      this.typeDenreeAnimal[i] = [];
    });
  }

  /**
   * Fills "Animal" list in function of entered espece
   * @param i
   */
  fillAnimal(i): void {
    const formArray = this.denrees();
    const formGroup = formArray.at(i) as FormGroup;
    const item = formGroup.controls.animal;
    item.enable();
    this.denreeService.findAnimalByEspece(this.denreeForm.value.denrees[i].espece).subscribe(res => {
      this.typeDenreeAnimal[i] = res.sort();
    });
  }

  /**
   * Fills "Region" list in function of entered country
   * @param i
   */
  fillRegion(i): void {
    const formArray = this.denrees();
    const formGroup = formArray.at(i) as FormGroup;
    const item = formGroup.controls.region;
    item.enable();
    this.denreeService.findRegionByPays(this.denreeForm.value.denrees[i].pays).subscribe(res => {
      this.typeOrigineRegion[i] = res.sort();
    });
  }

  /**
   * Checks if all fields in a form follow the validation rules
   * @param formGroup
   */
  validateAllFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }

  /**
   * Checks if all fields in a dynamic form are validated
   * @param formArray
   */
  validateAllFieldsDynamicForm(formArray: FormArray): void {
    for (const c of formArray.controls) {
      this.validateAllFields(c as FormGroup);
    }
  }

  /**
   * Disables siret field if "Appartient groupe" is not checked
   */
  check(): void {
    if (!this.appartientGroupe) {
      this.formGroupGeneralInfo.controls['siret'].disable();
    } else {
      this.formGroupGeneralInfo.controls['siret'].enable();
    }
  }
}
