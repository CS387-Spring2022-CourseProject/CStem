import { Component, OnInit } from '@angular/core';
import { QueryserviceService } from '../queryservice.service';
import { Subscription } from 'rxjs';
import { Sort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Institute } from '../institute';

@Component({
  selector: 'app-institutes',
  templateUrl: './institutes.component.html',
  styleUrls: ['./institutes.component.scss'],
})
export class InstitutesComponent implements OnInit {
  displayedColumns = ["name", "country", "n_members", "n_pubs", "n_citations"];
  subscription = new Subscription();
  institutes: Array<Institute> = [];
  topicFilter = new FormControl();
  topicList: string[] = ['all'];
  chosenTopics = [];
  @ViewChild('paginator') paginator: MatPaginator | any;
  dataSource: MatTableDataSource<Institute>;


  constructor(private router: Router, private qs : QueryserviceService) { 
    this.dataSource = new MatTableDataSource(this.institutes);
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.updateInstitutesInfo();
    this.updateTopicsInfo();
  }

  updateInstitutesInfo() : void {
    this.subscription.add(
      this.qs.getInstitutes().subscribe(res => {
        this.institutes = [];
        res.forEach((row: any) => {
          this.institutes.push({
            id: row['id'],
            name: row['name'],
            country: row['country'],
            n_members: row['n_members'],
            n_pubs: row['n_pubs'],
            n_citations: row['n_citations'] 
          });
        });
        this.dataSource.data = this.institutes;
        this.dataSource.paginator = this.paginator;
      })
    );
  }

  updateTopicsInfo() : void {
    this.subscription.add(
      this.qs.getTopics().subscribe(res => {
        this.topicList = ['All'];
        res.forEach((element: any) => {
          this.topicList.push(element.name);
        });
      })
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sortData(sort: Sort) {
    const data = this.institutes.slice();
    if (!sort.active || sort.direction === '') {
      this.institutes = data;
      this.dataSource.data = this.institutes;
      this.dataSource.paginator = this.paginator;
      return;
    }

    this.institutes = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'n_members':
          return compare(a.n_members, b.n_members, isAsc);
        case 'n_pubs':
          return compare(a.n_pubs, b.n_pubs, isAsc);
        case 'n_citations':
          return compare(a.n_citations, b.n_citations, isAsc);
        case 'country':
          return compare(a.country, b.country, isAsc);
        default:
          return 0;
      }
    });
    this.dataSource.data = this.institutes;
    this.dataSource.paginator = this.paginator;
  }

  chooseTopics(event: MatSelectChange) {
    var value = event.value;
    var all = false;
    if (value[0] == 'all') {
      all = true;
    }
  }

  capitalize(input: string) {  
    var words = input.split(' ');  
    var CapitalizedWords: Array<string> = [];  
    words.forEach((element: string) => {  
        CapitalizedWords.push(element[0].toUpperCase() + element.slice(1, element.length));  
    });  
    return CapitalizedWords.join(' ');  
  } 

  openRow(row: any) {
    let route = '/institute/' + row.id;
    this.router.navigate([route]);
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
