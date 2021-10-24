import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(private TitleService:Title) {
    TitleService.setTitle("Hire Freelancer or Find Freelance Jobs Online | Freelancing site")
   }

  ngOnInit(): void {
  }

}
