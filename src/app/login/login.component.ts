import { Component, OnInit,ViewChild , ElementRef } from '@angular/core';
import { Service1Service } from './../service1.service';
import { ProduitsService } from './../services/produits/produits.service';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  jj:any;
  j:any;
  showInputField:any;
  responseData:any;
  message:any;
  nom:any;

  @ViewChild('emailInput') emailInputElement!: ElementRef<HTMLInputElement>;

  login = new FormGroup({
    'email' : new FormControl(null,Validators.required),
    'password': new FormControl(null,Validators.required)
  })

  ngAfterViewInit(): void {
    this.emailInputElement.nativeElement.focus();
  }


  
  constructor(public dialog: MatDialog,private service1Service:Service1Service,private produitsService:ProduitsService,private router: Router) {
    this.jj=this.service1Service.focus2
    console.log(this.jj)
    this.j=this.service1Service.focus1
    console.log(this.j)
    this.login = new FormGroup({
      'email' : new FormControl(this.j,Validators.required),
      'password': new FormControl(null,Validators.required)
    })

    this.service1Service.focus1=undefined
    console.log(this.service1Service.focus1)
    // this.isFocus=1
    this.service1Service.focus2=0;
    localStorage.clear();
    this.produitsService.p=0
  }
  hide = true;
  isFocus:any;
  
  ngOnInit(): void {
  }
  addUser() { 
    this.showInputField = true; 
  }

  loginFormData(){
    if(this.login.valid){
    this.service1Service.getLogin(this.login.value).subscribe(result=>{
      if(result!=null){
        this.responseData=result;
        this.service1Service.profilConnecte(this.responseData.user);
        if(this.responseData.sanctumToken!=null){
        localStorage.setItem('sanctumToken',this.responseData.sanctumToken);
        localStorage.setItem('nom',this.responseData.user.nom);
        localStorage.setItem('id',this.responseData.user.id);
        localStorage.setItem('prenom',this.responseData.user.prenom);
        localStorage.setItem('email',this.responseData.user.email);
        localStorage.setItem('profil',this.responseData.user.is_admin);
        localStorage.setItem('ville',this.responseData.user.ville);
        localStorage.setItem('telephone',this.responseData.user.telephone);
        localStorage.setItem('date',this.responseData.user.created_at);
        if(this.responseData.user.is_admin==0){
        this.service1Service.dialog1("Salut! "+this.responseData.user.prenom +" , Votre étes connectes.","ACHETER MAINTENANT","");
        this.openDialog();
        // this.router.navigate(['homeAdmin']);
        }else{
          this.router.navigate(['homeAdmin']);
        }
        
        }else{
          this.message=this.responseData.message;
        }
      }
    })
  }
  }
  openDialog() {
    this.dialog.open(DialogComponent);
  }

  loginUser(){
    this.router.navigateByUrl('')
  }
  

  

}
