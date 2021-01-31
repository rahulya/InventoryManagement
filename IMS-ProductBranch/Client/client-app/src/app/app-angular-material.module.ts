import { NgModule } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon'
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';



@NgModule({
  imports: [
    MatExpansionModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule,
   MatToolbarModule,
   MatSelectModule,
   MatSnackBarModule


  ],
  exports: [
    MatExpansionModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule,
    MatToolbarModule,
    MatSelectModule,
    MatSnackBarModule

  ]
})

export class AngularMaterialModule {}