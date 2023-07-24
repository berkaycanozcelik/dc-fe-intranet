import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-management-page',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './management-page.component.html',
  styleUrls: ['./management-page.component.scss'],
})
export class ManagementPageComponent implements OnInit {
  users: User[] = [];

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
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;

      this.dataSource.data = this.users;
      this.dataSource.sort = this.sort;
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

  onEdit(userId: number) {}

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
