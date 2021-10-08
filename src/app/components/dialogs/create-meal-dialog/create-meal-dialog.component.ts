import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MealsService } from 'src/app/shared/api-services/meals.service';
import { SugarReadingsService } from 'src/app/shared/api-services/sugar-readings.service';
import { IIngridient, IMealRequest, IMealResponse, ISugarReading } from 'src/app/shared/api.models';
import { eDialogStatus, eMealTypes } from 'src/app/shared/general-consts';
import { IDialogPayload, IDialogResponse } from 'src/app/shared/shared.interfaces';

@Component({
  selector: 'app-create-meal-dialog',
  templateUrl: './create-meal-dialog.component.html',
  styleUrls: ['./create-meal-dialog.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateMealDialogComponent implements OnInit {

  ingridients: IIngridient[] = []
  date = new Date();
  mealTypes = [
    {
      name: 'MEALS.TYPES.BREAKFAST',
      type: eMealTypes.BREAKFAST
    },
    {
      name: 'MEALS.TYPES.LAUNCH',
      type: eMealTypes.LAUNCH
    },
    {
      name: 'MEALS.TYPES.DINNER',
    type: eMealTypes.DINNER
  },
  {
    name: 'MEALS.TYPES.INTERMEDIATE',
    type: eMealTypes.INTERMEDIATE
  }
]
  mealTypeFormControl = new FormControl(this.mealTypes[0].type,Validators.required);
  formData = new FormData();
  newIngridientForm = new FormGroup({
    name: new FormControl(null,Validators.required),
    quantity: new FormControl(null,[Validators.min(1),Validators.max(20),Validators.required])
  });
  newMealId: string | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: IDialogPayload<IMealResponse | null>,
              private dialogRef: MatDialogRef<CreateMealDialogComponent>,
              private mealService: MealsService,
              private sugarReadingService: SugarReadingsService) { }

  ngOnInit(): void {
    if (this.data.data) {
      this.ingridients = this.data.data.ingridients;
      this.mealTypeFormControl.patchValue(this.data.data.type);
    }
    this.date = new Date(this.data!.date!);
  }

  save(): void {
    const newMealRequest: IMealRequest = {
      dayId: this.data.dayId!,
      type: this.mealTypeFormControl.value,
      date: this.date,
      time: this.getTime(this.date),
      ingridients: [...this.ingridients]
    }
    if (this.data.data) {
      this.update(newMealRequest);
    } else {
      this.create(newMealRequest);
    }
  }

  create(meal: IMealRequest): void {
  this.mealService.createMeal(meal)
    .pipe(
      switchMap((res) => {
        this.newMealId = res._id
        if (this.formData.has('mealImage')) {
          return this.mealService.uploadImage(this.formData,res._id);
        }
        return of(null);
      })
    ).subscribe(() => {
      this.dialogRef.close({status: eDialogStatus.CLOSE_OK, mealId: this.newMealId});
    })
  }

  update(meal: IMealRequest): void {
    this.mealService.updateMeal(meal,this.data.data?._id!)
    .pipe(
      switchMap((res) => {
        if (this.formData.has('mealImage')) {
          return this.mealService.uploadImage(this.formData, res._id)
        }
        return of(null)
      })
    ).subscribe(() => {
        this.dialogRef.close({
          source: this.data.source,
          mealId: this.data.data?._id,
          status: eDialogStatus.CLOSE_OK
        } as IDialogResponse)
    });
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
    if (this.data.data?._id && this.data?.data && !!this.data?.data?.image) {
      this.getBase64(this.formData).then((image) => {
        this.data.data!.image = image;
      });
    }
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

  getBase64(formData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(formData.get('mealImage'));
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      // formData.delete('mealImage');
    });
  }

}
