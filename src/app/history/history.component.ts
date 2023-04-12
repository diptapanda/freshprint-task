import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GitHubUser } from '../store/models/user.model';
import { GitHubUserSelecter } from '../store/reducers/user.reducer';
import { clearHistory } from '../store/actions/user.actions';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  allSearchedUser: GitHubUser[] = []

  constructor(private store: Store) {

  }

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory = () => {
    this.store.select(GitHubUserSelecter).subscribe((state) => this.allSearchedUser = state)
  }

  clearHistory = () => {
    this.store.dispatch(clearHistory());
    localStorage.clear();
  }

}
