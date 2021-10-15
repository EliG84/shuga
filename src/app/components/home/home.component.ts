import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AppRoutingPath, MealsRoutingPath, RoutingPath } from 'src/app/models/routing.models';
import { dialogHeights, eDialogComponentType } from 'src/app/shared/general-consts';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  menuItems = [
    {
      name: 'HOME.ADD_MEALS',
      action: () => this.router.navigate(['/',RoutingPath.APP,AppRoutingPath.MEALS])
    },
    {
      name: 'HOME.MEALS',
      action: () => this.router.navigate(['/',RoutingPath.APP,AppRoutingPath.MEALS,MealsRoutingPath.DETAILED])
    },
    {
      name: 'HOME.ADD_MORGINING_READING',
      action: () => this.openScackbar()
    },
    {
      name: 'HOME.MORNING_READINGS',
      action: () => this.router.navigate(['/',RoutingPath.APP,AppRoutingPath.MORNING_READINGS])
    },
    {
      name: 'HOME.ALL_READINGS',
      action: () => this.router.navigate(['/',RoutingPath.APP,AppRoutingPath.ALL_READINGS])
    },
    {
      name: 'HOME.GRAPHS',
      action: () => this.router.navigate(['/',RoutingPath.APP,AppRoutingPath.GRAPHS])
    },
    {
      name: 'HOME.LOG_OUT',
      action: () => this.authService.logout()
    },
  ]

  constructor(private router: Router,
              private authService: AuthService,
              private dialogService: DialogService) { }

  ngOnInit(): void {
  }

  openScackbar(): void {
    this.dialogService.openDialog({
      data: null,
      componentType: eDialogComponentType.SUGAR_READING,
      header: 'DIALOGS.MESSAGES.ADD_READING',
      height: dialogHeights.FULL_PERCENT
    });
  }

}
