import { Component, OnInit, Input } from '@angular/core';
import { EmailService } from 'src/app/controller/service/email.service';
import { Email } from 'src/app/controller/entity/email.model';
import { AlertService } from 'src/app/controller/service/alert.service';
import { UserService } from 'src/app/controller/service/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/controller/entity/user.model';
declare var $:any;
@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {

  files: FileList;
  user = new User();
  @Input() fournis_email:string;

  constructor(private mailService: EmailService,
    private userService: UserService
    , private router: Router
    , private alertService: AlertService) { }

  ngOnInit(): void {
    $(".custom-file-input").on("change", function() {
      var fileName = $(this).val().split("\\").pop();
      $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });
    this.getUser();
  }

  setFiles(files: FileList) {
    this.files = files;
  }
  sendMail() {
    console.log(this.files);
    this.mail.emailTo=this.fournis_email;
    this.mailService.postMethod(this.files, this.user.email, this.user.email_password).subscribe(
      data => {
        console.log(data);
        if(data==1){
          this.alertService.setSuccessAlert("Email Send");
        }else if(data==0){
          this.alertService.setDangerAlert("Send Fail");
        }
      }, error => {
        this.alertService.setDangerAlert("Email Error: Check Your Email Password");
      }
    )

  }

  getUser() {
    this.userService.getUserByName(localStorage.getItem("user_name")).subscribe(
      data => {
        console.log(data);
        this.user = data;
      }, error => {
        console.log(error);
      }
    )
  }

  get mail(): Email {
    return this.mailService.mail;
  }
}
