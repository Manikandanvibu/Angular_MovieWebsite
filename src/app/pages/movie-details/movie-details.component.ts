import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  
  constructor(private service:MovieApiServiceService,private router : ActivatedRoute){}
  
  getMovieDetailResult:any
  getMovieVideoResult:any
  getMovieCastResult:any

  ngOnInit(): void {
    let getParamId = this.router.snapshot.paramMap.get('id') 
    // If you intend not to update your URL parameter within the same component you are accessing it, then you can use the snapshot.
    // console.log(getParamId);
    
    this.getMovie(getParamId)
    this.getVedio(getParamId)
    this.getMovieCast(getParamId)

  }
  getMovie(id:any){
    this.service.getMovieDetails(id).subscribe((result:any)=>{
      // console.log(result,"getmoviedetails#");
      this.getMovieDetailResult=result
      
    })
  }

  getVedio(id:any){
    this.service.getMovieVedio(id).subscribe((result:any)=>{
      // console.log(result,"getVedio#");
      result.results.forEach((element:any) => {
        if(element.type=="Trailer"){
          this.getMovieVideoResult=element.key       
        }
        
      });
    })
  }

  getMovieCast(id:any){
    this.service.getMovieCast(id).subscribe((result:any)=>{
      this.getMovieCastResult=result.cast;
    })
  }
}
