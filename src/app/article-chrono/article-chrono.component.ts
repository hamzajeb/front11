import { Component, OnInit } from '@angular/core';
import { ProduitsService } from './../services/produits/produits.service';
import { Promo } from './../models/promo.model';
@Component({
  selector: 'app-article-chrono',
  templateUrl: './article-chrono.component.html',
  styleUrls: ['./article-chrono.component.css']
})
export class ArticleChronoComponent implements OnInit {
  listeProduitsPromo: any[] = []
  Produits: any[] = []
  test:any
  rating=0;
  ratingArr:boolean[]=[];
  imageDirectorypath:any='http://127.0.0.1:8000/';
  promo=new Promo();
  constructor(private produitsService:ProduitsService) { 
    this.listeProduitsCr()
    this.ratingArr=Array(5).fill(false);
    this.test=true
  }

  ngOnInit(): void {
  }
  j:any
  listeProduitsCr(){
    this.produitsService.listeProduit().subscribe((res:any)=>{
      this.j=0
      this.Produits=res
      console.log(this.Produits)
      this.listeProduitsPromo=[]
      for(let i=0;i<this.Produits.length;i++){
        if(this.Produits[i].is_promo==1){
          this.listeProduitsPromo[this.j]=this.Produits[i]
          this.j=this.j+1
        }
      }
      console.log( this.listeProduitsPromo)
      this.x=setInterval(()=>{
        // let array = [1,2,3];   for pour implementer tous les articles de chrono
        // for (let i = 0; i < array.length; i++) {
        //   console.log(array[i]);
        // }
    
        
        for(let i=0;i<this.listeProduitsPromo.length;i++){
    
        this.tab=document.getElementById(this.listeProduitsPromo[i].id);
        var futureDate:any = new Date(this.listeProduitsPromo[i].date_chrono).getTime();//date que vous voulez (fin de promo), getTime() en ms,Thu Apr 07 2022 19:00:00 GMT+0200
        var today:any = new Date().getTime(); //date a ce moment, Thu Apr 07 2022 17:50:06 GMT+0200
        var distance = futureDate-today;//distance en ms
        this.listeProduitsPromo[i].days=Math.floor(distance/(1000*60*60*24));// /1000 pass en secondes, *60 pass en minutes , *60 pass en hours,*24 pass en days
        this.listeProduitsPromo[i].hours=Math.floor((distance%(1000*60*60*24))/(1000*60*60));
        this.listeProduitsPromo[i].min=Math.floor((distance%(1000*60*60))/(1000*60));
        this.listeProduitsPromo[i].sec=Math.floor((distance%(1000*60))/(1000));
        // console.log(this.days);
        if(distance<0){
          clearInterval(this.x);
          this.tab.style.display="None";
          // this.listeProduitsPromo.splice(i);
          this.promo.is_promo=0;
          this.promo.date_chrono=0;
          this.promo.nouveauPrix=0;
          this.promo.pourcentage=0;
          this.produitsService.ajouterPromo(this.listeProduitsPromo[i].id,this.promo).subscribe((res:any)=>{
            console.log(res);
            console.log(i);
            // this.listeProduitsPromo.splice(i,1);
    
            this.listeProduitsCr()
            // location.reload();
            console.log(this.listeProduitsPromo)
            this.produitsService.y()
          })
    
    
          
    
          //suppression d'element dans la BDD
          // this.newPrice=0;
    
        }
      }
    
      },500);
    });

  }

  changImage(event:any,x:any){
    x.chrono_hour= event.target.src
    // this.url=event.target.src
    this.test=false
  }


  returnStar(i:number,x:any){
    i=i+x
    if(this.rating>=i+1){
      return 'star';
    }else{
      return 'star_border';//icon rate empty
    }
  }

  onClick(i:number,x:any){
    i=i+x
    this.rating=i+1;
  }

  days:number=0;
  hours:number=0 ;
  minutes:number=0 ;
  secs:number=0 ;
  tab:any
  x:any
}

