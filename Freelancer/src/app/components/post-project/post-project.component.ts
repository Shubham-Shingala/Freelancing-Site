import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { IProject } from 'src/app/models/IProject';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClient, HttpEventType } from '@angular/common/http';
import {finalize} from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from 'src/app/services/auth.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-post-project',
  templateUrl: './post-project.component.html',
  styleUrls: ['./post-project.component.css']
})
export class PostProjectComponent implements OnInit {
  PostProjectForm!: FormGroup;
  FileToUpload!: any;
  fileName: string = "";
  uploadProgress!: number | null;
  uploadSub!: Subscription | null;
  baseUri:string="http://localhost:4000/api";
  uniqueFileName!:string;

  public panel1: boolean = false;
  public panel2: boolean = false;
  constructor(private title:Title,private authService:AuthService,private http:HttpClient,private router: Router, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.authService.loggedUser().subscribe(
      (res:any)=>{
        if(res.status=='ok' && res.data.Role=='freelancer'){
          this.router.navigateByUrl('/')
        }
        this.title.setTitle("Post a job - "+res.data.Email+" | freelancing site");
      }
    )

    this.PostProjectForm = new FormGroup({
      projectNameControl: new FormControl("", [Validators.required,Validators.minLength(10)]),
      descriptionControl: new FormControl("", [Validators.required,Validators.minLength(30)]),
      fileControl: new FormControl(),
      categoryControl: new FormControl("", Validators.required),
      MaxBudgetControl: new FormControl("", Validators.required),
      MinBudgetControl: new FormControl("", [Validators.required, Validators.min(600)]),
      DurationControl:new FormControl("",Validators.required)
    }, { validators: this.validateBudget })
  }
  validateBudget(control: AbstractControl): ValidationErrors | null {
    if (control && control.get("MinBudgetControl") && control.get("MaxBudgetControl")) {
      const minBudget = control.get("MinBudgetControl")?.value;
      const maxBudget = control.get("MaxBudgetControl")?.value;
      return (minBudget >= maxBudget) ? { budgetError: true } : { budgetError: false };
    }
    return null;
  }
  get duration(){
    return this.PostProjectForm.get('DurationControl');
  }
  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;

  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    
    if (file) {
      this.uniqueFileName=uuidv4()+"_"+file.name;
      const formData = new FormData();
      formData.append("file", file,this.uniqueFileName);
      const upload$ = this.http.post(`${this.baseUri}/projectUpload`, formData, {
        reportProgress: true,
        observe: 'events'
      }).pipe(finalize(()=>this.reset()))

      this.uploadSub = upload$.subscribe(event =>{
        if (event.type == HttpEventType.UploadProgress) {
          if(event.total)
          this.uploadProgress = Math.round(100 * (event.loaded /event.total));
        }else if (event.type === HttpEventType.Response) {
          this.fileName = file.name;
          this.reset();
        }
      },)
    }

  }
  

  cancelUpload() {
    this.uploadSub?.unsubscribe();
    this.reset();
  }
  get category() {
    return this.PostProjectForm.get("categoryControl");
  }
  get projectName() {
    return this.PostProjectForm.get("projectNameControl");
  }
  get description() {
    return this.PostProjectForm.get("descriptionControl");
  }
  get projectFile() {
    return this.PostProjectForm.get("fileControl");
  }
  get maxBudget() {
    return this.PostProjectForm.get('MaxBudgetControl');
  }
  get minBudget() {
    return this.PostProjectForm.get('MinBudgetControl');
  }
  onPanel1() {
    this.projectName?.markAsTouched();
    this.description?.markAsTouched();
    if (this.projectName?.invalid || this.description?.invalid)
      this.panel1 = false;
    else
      this.panel1 = true;
  }
  onPanel2() {
    this.category?.markAsTouched();
    if (this.category?.invalid)
      this.panel2 = false;
    else
      this.panel2 = true;
  }
  onSubmit() {

    this.PostProjectForm.markAllAsTouched();
    
    if (this.projectName?.valid && this.description?.valid && this.maxBudget?.valid
      && this.minBudget?.valid && this.category?.valid && this.projectFile?.valid && this.duration?.valid) {
        this.authService.loggedUser().subscribe(
          (res:any)=>{
            if(res.status=='ok'){
              let date=new Date();
              var project: IProject = {
                _id:uuidv4(),
                Name: this.projectName?.value,
                Description: this.description?.value,
                FilePath: this.uniqueFileName,
                Category: this.category?.value,
                MinBudget: this.minBudget?.value,
                MaxBudget: this.maxBudget?.value,
                _User:res.data._id,
                Duration:this.duration?.value,
                ProjectPostTime:date,
                Status:"pending",
                NumberOfBids:0
              }
              this.projectService.addProject(project).subscribe(
                (res) => {
                  this.router.navigateByUrl('/project');
                },
                (err) => {
                  console.log(err);
                }
              )
            }
          }
        )
      
    }
  }

}
