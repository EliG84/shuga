import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MealsService } from 'src/app/shared/api-services/meals.service';
import { SugarReadingsService } from 'src/app/shared/api-services/sugar-readings.service';
import { IIngridient, IMealRequest, IMealResponse, ISugarReading } from 'src/app/shared/api.models';
import { eDialogStatus } from 'src/app/shared/general-consts';
import { IDialogPayload } from 'src/app/shared/shared.interfaces';

@Component({
  selector: 'app-create-meal-dialog',
  templateUrl: './create-meal-dialog.component.html',
  styleUrls: ['./create-meal-dialog.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateMealDialogComponent implements OnInit {

  ingridients: IIngridient[] = []
  date = new Date();
  mealTypeFormControl = new FormControl(null,Validators.required);
  mealTypes = [
    {
    name: 'MEALS.TYPES.BREAKFAST',
    type: 1
    },
    {
    name: 'MEALS.TYPES.LAUNCH',
    type: 2
    },
    {
    name: 'MEALS.TYPES.DINNER',
    type: 3
    },
    {
    name: 'MEALS.TYPES.INTERMEDIATE',
    type: 4
    }
  ]
  formData = new FormData();
  sugarReading: ISugarReading | undefined;
  sugarReadingTime = new Date();
  sugarReadingResult = 0;
  newIngridientForm = new FormGroup({
    name: new FormControl(null,Validators.required),
    quantity: new FormControl(null,[Validators.min(1),Validators.max(20),Validators.required])
  });
  newlySaveMeal: string | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: IDialogPayload<IMealResponse | null>,
              private dialogRef: MatDialogRef<CreateMealDialogComponent>,
              private mealService: MealsService,
              private sugarReadingService: SugarReadingsService) { }

  ngOnInit(): void {
    if (this.data.data) {
      this.ingridients = this.data.data.ingridients;
      this.date = new Date(this.data.data.date);
      this.mealTypeFormControl.patchValue(this.data.data.type);
      if (this.data.data.reading) {
        this.sugarReading = this.data.data.reading;
        this.sugarReadingTime = new Date(this.data.data.reading.time);
        this.sugarReadingResult = this.data.data.reading.result;
      }

    }
  }

  create(): void {
    const newMealRequest: IMealRequest = {
      dayId: this.data.dayId!,
      type: this.mealTypeFormControl.value,
      date: this.date,
      time: this.getTime(this.date),
      ingridients: [...this.ingridients],
    }
    this.mealService.createMeal(newMealRequest)
    .pipe(
      switchMap((meal) => {
        this.newlySaveMeal = meal._id;
        if (this.sugarReadingResult > 50) {
          const sugarReading: ISugarReading = {
            mealId: meal._id,
            date: this.sugarReadingTime,
            time: this.getTime(this.sugarReadingTime),
            result: this.sugarReadingResult,
            isMorningReading: false
          }
          return this.sugarReadingService.createReading(sugarReading);
        }
        return of(null);
      }),
      switchMap(() => {
        if (this.formData.has('mealImage')) {
          return this.mealService.uploadImage(this.formData,this.newlySaveMeal!);
        }
        return of(null);
      })
    ).subscribe(() => {
      this.dialogRef.close({status: eDialogStatus.CLOSE_OK, mealId: this.newlySaveMeal});
    })
  }

  update(): void {

  }

  addIngrideint(): void {
    this.ingridients.push({...this.newIngridientForm.getRawValue(), type: 1});
    this.newIngridientForm.reset();
  }

  removeIngridient(index: number): void {
    this.ingridients = this.ingridients.filter((_,i) => i !== index);
  }

  changeImage(inputFileElement: HTMLInputElement | any): void {
    if (!inputFileElement?.files?.length) {
      return;
    }
    this.formData = new FormData()
    for (const file of inputFileElement.files) {
      this.formData.append('mealImage', file, file.name);
    }
    inputFileElement.value = null;
  }

  getTime(date: Date): number {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return date?.setHours(hours!,minutes,0,0);
  }

  closeDialog(): void {
    this.dialogRef.close({source: undefined,
                          mealId: null,
                         status: eDialogStatus.DISMISS});
  }


}
