import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AssociateScreenComponent } from './associate-screen/associate-screen.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { routes } from './app.routing';
import {MatButtonModule} from '@angular/material/button';
import { RequestCreateComponent } from './request-create/request-create.component';
import { ImmigrationViewComponent } from './associate-screen/immigration-view/immigration-view.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';    
import { MatTableModule } from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatRadioModule} from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { ImmigrationService } from './service/immigration.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CdkDetailRowDirective } from './_directives/cdk-detail-row.directives';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AddDocumentComponent } from './add-document/add-document.component';
import { FileDragNDropDirective } from './_directives/file-drag-n-drop.directive';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { HeaderComponent } from './header/header.component';
import { FileUploadModule } from 'ng2-file-upload';
import { FileService } from './service/file.service';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { UploadDialogComponent } from './associate-screen/upload-dialog/upload-dialog.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthenticationService } from './service/auth.service';
import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { AuthGuard } from './_guards/auth.guard';
import { AlertComponent } from './_directives';
import { AlertService } from './service/alert.service';
import { ChatInboxComponent } from './chat-inbox/chat-inbox.component';



@NgModule({
  declarations: [
    AppComponent,
    AssociateScreenComponent,
    LoginComponent,
    RequestCreateComponent,
    ImmigrationViewComponent,
    CdkDetailRowDirective,
    AddDocumentComponent,
    FileDragNDropDirective,
    HeaderComponent,
    UploadDialogComponent,
    AlertComponent,
    ChatInboxComponent
  ],
  imports: [
    RouterModule.forRoot(routes, {useHash: false}),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,  
    HttpClientModule, 
    NgxSpinnerModule,
    MatStepperModule,
    MatAutocompleteModule, 
    MatNativeDateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatRadioModule,
    MatSelectModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatCardModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatTooltipModule,
    MatListModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    FileUploadModule

  ],
  providers: [
    AuthGuard,
    ImmigrationService,
    FileService,
    AuthenticationService,
    AlertService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
