import { Produit } from './../models/produit.model';
import { Favoris } from './../models/favoris.model';
import { Component, OnInit,ViewChild , ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SousCategoriesService } from '../services/sousCategories/sous-categories.service';
import { Service1Service } from './../service1.service';
import { ProduitsService } from './../services/produits/produits.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  listeFavories: any[] = []
  Produits: any[] = []
  id:any;
  test:any;
  sousCat: any
  x:any
  style1:any
  favoris=new Favoris()
  listeProduit: any[] = []
  imageDirectorypath:any='http://127.0.0.1:8000/'
  constructor(private router: Router,private produitsService:ProduitsService,private _Activatedroute:ActivatedRoute,private sousCategoriesService:SousCategoriesService ,private service1Service:Service1Service ) { 
    // this.url=this.imageDirectorypath+this.listeProduit;
    this.produitsService.p=0
  }

  ngOnInit(): void {
    // let id=this._Activatedroute.snapshot.paramMap.get("id");
    // this.id=id
    // //  console.log(parseInt(this.id))
    this._Activatedroute.queryParams.subscribe(queryParams => {
    // let id=this._Activatedroute.snapshot.paramMap.get("id");
    // this.id=id
    });
    this._Activatedroute.params.subscribe(routeParams => {
        let id=this._Activatedroute.snapshot.paramMap.get("id");
    this.id=id
    this.test=true
    this.afficherProduits(this.id)
    this.style1=true
    this.produits()
    });
    this.ratingArr=Array(5).fill(false);//initialiser
  }

  afficherProduits(id:any){
    this.sousCategoriesService.SousCategorieProduit(id).subscribe((souscategories: any) => {
      this.sousCat = souscategories;
      this.listeProduit=souscategories.produit;
      console.log(this.sousCat)
      console.log(this.listeProduit)
   });
  }

  rating=0;
  ratingArr:boolean[]=[];
  // url:any;




  changImage(event:any,x:any){
    x.chrono_hour= event.target.src
    // this.url=event.target.src
    this.test=false
  }


  returnStar(i:number){
    if(this.rating>=i+1){
      return 'star';
    }else{
      return 'star_border';//icon rate empty
    }
  }

  onClick(i:number){
    this.rating=i+1;
  }

g:any

  produits(){
    this.produitsService.listeProduit().subscribe((res:any)=>{

      this.Produits=res
      console.log(this.Produits)
    });
  }

  favorites(pr:any){
    // this.con(pr.id)
    for(let i=0;i<this.Produits.length;i++){
      if(this.Produits[i].id=pr.id){
        for(let j=0;j<this.Produits[i].favorites.length;j++){
          if(this.Produits[i].favorites[j].produit_id==this.Produits[i].id&&this.Produits[i].favorites[j].user_id==this.service1Service.getId()){
            return true
          }
        }
      }
    }

      return false;
  }

  notify=false;
  ajouterFavoris(pr:any){
     this.favoris.produit_id=pr.id;
     this.favoris.user_id=this.service1Service.getId();
    this.x=pr.chrono_sec
    if(this.x==0){
      pr.chrono_sec=1
      console.log(pr.chrono_sec)
      pr.chrono_min='red';
      this.notify=true;
      setTimeout(()=>{
        this.notify=false;
      },1000);//appelant la fonction (this.notify=false) une fois la minuterie terminée.(0.3s)
      //back
      this.produitsService.ajouterFavoris(this.favoris).subscribe(res=>{
        console.log(res);
       });
       this.produitsService.x(1)
    }else{
      this.produitsService.supprimerFavoris(pr.id,this.service1Service.getId()).subscribe(res=>{
        console.log(res);
       });
      pr.chrono_min='';
      pr.chrono_sec=0
      console.log(pr.chrono_sec)
      this.produitsService.x(0)
    }
  }

  dejaFavoris(pr:any){
    this.style1=false
    this.favoris.produit_id=pr.id;
    this.favoris.user_id=this.service1Service.getId();
   this.x=pr.chrono_sec
   if(this.x==1){
     pr.chrono_sec=0
     console.log(pr.chrono_sec)
     this.notify=true;
     pr.chrono_min='red';
     setTimeout(()=>{
       this.notify=false;
     },1000);//appelant la fonction (this.notify=false) une fois la minuterie terminée.(0.3s)
     //back
     this.produitsService.ajouterFavoris(this.favoris).subscribe(res=>{
       console.log(res);
      });
      this.produitsService.x(1)
   }else{
     this.produitsService.supprimerFavoris(pr.id,this.service1Service.getId()).subscribe(res=>{
       console.log(res);
      });
     pr.chrono_min='';
     pr.chrono_sec=1
     console.log(pr.chrono_sec)
     this.produitsService.x(0)
   }
  }

  non_auth(){
    return this.service1Service.isLoggedin()
  }
  redirect(){
    this.router.navigate(['login']);
  }
}
