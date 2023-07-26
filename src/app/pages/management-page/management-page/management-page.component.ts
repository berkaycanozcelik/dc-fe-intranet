import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DialogComponent } from 'src/app/components/shared/dialog/dialog.component';
import { AddUserDialogComponent } from 'src/app/components/management/add-user-dialog/add-user-dialog.component';

@Component({
  selector: 'app-management-page',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
  ],
  templateUrl: './management-page.component.html',
  styleUrls: ['./management-page.component.scss'],
})
export class ManagementPageComponent implements OnInit {
  onView(arg0: any) {
    throw new Error('Method not implemented.');
  }
  users: User[] = [];
  authUserRole: string = '';

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'role',
    'actions',
  ];
  dataSource = new MatTableDataSource<User>(this.users);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(
    private userService: UserService,
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const data = sessionStorage.getItem('data');

    if (data) {
      let user = JSON.parse(data);
      this.authUserRole = user.role;
    }

    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;

      this.dataSource.data = this.users;
      this.dataSource.sort = this.sort;
    });
  }
  openUserDialog() {
    const addUserDialog = this.dialog.open(AddUserDialogComponent, {
      hasBackdrop: true,
      disableClose: true,
      height: '1136px',
      width: '500px',
    });

    addUserDialog.afterClosed().subscribe(() => {
      this.fetchUsers();
    });
  }

  editUserDialog(user: any) {
    const addUserDialog = this.dialog.open(AddUserDialogComponent, {
      data: user,
      hasBackdrop: true,
      disableClose: true,
      height: '1136px',
      width: '500px',
    });

    addUserDialog.afterClosed().subscribe(() => {
      this.fetchUsers();
    });
  }

  openDialog(user: User): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onDelete(result);
      }
    });
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  onDelete(userId: number) {
    this.userService.deleteUser(userId).subscribe(
      (res) => {
        this.fetchUsers();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onEdit(userId: number) {
    this.userService.getUserById(userId).subscribe(
      (res) => {
        const user = {
          id: res.id,
          firstName: res.firstName,
          lastName: res.lastName,
          email: res.email,
          password: res.password,
          role: res.role,
          address: res.userDetail?.address,
          phoneNumber: res.userDetail?.phoneNumber,
          birthday: res.userDetail?.birthday,
          title: res.userDetail?.title,
          manager: res.userDetail?.manager,
          team: res.userDetail?.team,
        };
        this.editUserDialog(user);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  fetchUsers() {
    this.userService.getAllUsers().subscribe(
      (users) => {
        this.users = users; // Assuming your service returns an array of users

        this.dataSource.data = this.users;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
