import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { AppRoutingPath, RoutingPath } from 'src/app/models/routing.models';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { SugarReadingDialogComponent } from '../dialogs/sugar-reading-dialog/sugar-reading-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  menuItems = [
    {
      name: 'HOME.MEALS',
      action: () => this.router.navigate(['/',RoutingPath.APP,AppRoutingPath.MEALS])
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
              private dialog: MatDialog,
              private snackBar: SnackbarService) { }

  ngOnInit(): void {
  }

  openScackbar(): void {
    const dialogRef = this.dialog?.open(
      SugarReadingDialogComponent,
      {
       data: null,
       width: '90%',
       height: '50%'
      }
    );
    dialogRef.afterClosed().pipe(first())
    .subscribe((reply: {success: boolean, message: string}) => {
      if (!reply) return;
      if (reply?.success) {
        this.snackBar?.success(reply?.message);
      } else {
        this.snackBar?.error(reply?.message);
      }
    })
  }

}
