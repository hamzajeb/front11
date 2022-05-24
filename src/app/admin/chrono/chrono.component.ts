import { Component, OnInit } from '@angular/core';
import { SousCategoriesService } from '../../services/sousCategories/sous-categories.service';
import { Service1Service } from './../../service1.service';
import { ProduitsService } from './../../services/produits/produits.service';
import { ToastrService } from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { DialogueAjouterChronoComponent } from './../dialogue-ajouter-chrono/dialogue-ajouter-chrono.component';
interface listeProduits {
  nom:string;
  quantite:number;
  prix:number;
  image1:File;
  detail:string;
  sous_categorie_id:any;
}

let ELEMENT_DATA: listeProduits[] = [
];
@Component({
  selector: 'app-chrono',
  templateUrl: './chrono.component.html',
  styleUrls: ['./chrono.component.css']
})
export class ChronoComponent implements OnInit {
  produits :any[]=[];
  produitChrono:any[]=[];
  displayedColumns: string[] = ['nom', 'quantite', 'prix', 'image1','detail','sous_categorie','Action'];
  imageDirectorypath:any='http://127.0.0.1:8000/'
  dataSource:any
  data:any
  constructor(private toastr:ToastrService,public dialog: MatDialog,private sousCategoriesService:SousCategoriesService,private produitsService:ProduitsService) { 
    this.afficherProduits()
  }
   
  ngOnInit(): void {
  }
  j:any
  afficherProduits(){
      this.j=0
      this.produits=[]
      this.produitsService.listeProduit().subscribe((pr: any) => {
        this.produits= pr;
        this.produitChrono=[]
        for(let i=0;i<this.produits.length;i++){
            if(this.produits[i].quantite < 5 && this.produits[i].is_promo==0){
              this.produitChrono[this.j]=this.produits[i]
              this.j=this.j+1
            }

      
          }
          console.log(this.produitChrono);
          ELEMENT_DATA = this.produitChrono;
          this.dataSource = new MatTableDataSource(ELEMENT_DATA);
          console.log(ELEMENT_DATA)
      });

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ajouterPromo(pr:any){
    let dialogRef3=this.dialog.open( DialogueAjouterChronoComponent, {
      data: {produit: pr},
    });
    dialogRef3.afterClosed().subscribe(() => { this.afficherProduits(); } );
  }
}
