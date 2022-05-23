import { Component, OnInit } from '@angular/core';
import { ProduitsService } from './../services/produits/produits.service';
import {FormGroup, FormControl,FormBuilder} from '@angular/forms' 
import { Utilisateur } from '../utilisateur.model';
import {DialogComponent} from '../dialog/dialog.component'
import { Router } from '@angular/router';
import { Service1Service } from './../service1.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  showDetails:any;
  message:any;
  login:any;
  hide = true;
  utilisateur=new Utilisateur();
  villes: string[] = [
    'Tanger',
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];
  constructor(private produitsService:ProduitsService,public dialog: MatDialog,private service1Service:Service1Service,private router: Router) { 
    this.showDetails=false;
    this.produitsService.p=0
  }

  ngOnInit(): void {
    this.login=new FormGroup({
      nom:new FormControl(''),
      prenom:new FormControl(''),
      sexe:new FormControl(''),
      telephone:new FormControl(''),
      ville:new FormControl(''),
      email:new FormControl(''),
      password:new FormControl(''),
      })
  }
  registerUtilisateur(){
    this.service1Service.register(this.utilisateur).subscribe(res=>{
      console.log(res);
      this.service1Service.dialog1("Féliciations! Votre compte a été créé avec succès.","CONNECTER MAINTENANT","login");
      this.router.navigate(['']);
      // this.login.reset();
      this.service1Service.focus(this.utilisateur.email);
      this.openDialog();
    })
  }
  onStrengthChanged(strength: number) {
    console.log('password strength = ', strength);
  }
  toggleChanges($event: MatSlideToggleChange) {
    this.showDetails = !this.showDetails;
  }
  openDialog() {
     this.dialog.open(DialogComponent);
  }

}



