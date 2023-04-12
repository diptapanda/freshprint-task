import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { GitHubApiService } from 'src/api';
import { addUser } from '../store/actions/user.actions';
import { GitHubUser } from '../store/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public title: string = 'Search Github User'

  githubForm!: FormGroup

  NotFountData: GitHubUser = {
    id: '',
    name: this.githubForm?.value?.searchQuery,
    login: this.githubForm?.value?.searchQuery,
    avatar_url: '',
    node_id: '',
    gravatar_id: '',
    url: '',
    html_url: '',
    followers_url: '',
    following_url: '',
    gists_url: '',
    starred_url: '',
    subscriptions_url: '',
    organizations_url: '',
    repos_url: '',
    received_events_url: '',
    site_admin: false,
    company: '',
    blog: '',
    location: '',
    email: '',
    hireable: '',
    bio: '',
    twitter_username: '',
    public_repos: 0,
    public_gists: 0,
    followers: 0,
    following: 0,
    created_at: '',
    updated_at: ''
  }

  public listSearchedData: any[] = []
  public isLoading: boolean = false

  constructor(
    private GitHubApiService: GitHubApiService,
    private fb: FormBuilder,
    private store: Store
  ) {
    this.initForm()
  }

  initForm = () => {
    this.githubForm = this.fb.group({
      searchQuery: ['', Validators.required],
    });
  }

  searchUserdetails = (form: FormGroup) => {
    if (!form.valid) {
      return window.alert('Username is required')
    }
    this.isLoading = true
    this.GitHubApiService.getProfileByUserName(this.githubForm.value.searchQuery).subscribe(
      {
        next: (res) => this.handleSuccessResponse(res),
        error: (err) => this.handleErrorResponse(err),
        complete: () => this.handleCompleteResponse()
      }
    )
  }

  handleSuccessResponse = (data: any) => {
    this.isLoading = false
    delete data.type
    this.handleData(data)
  }

  handleErrorResponse = (err: any) => {
    this.isLoading = false
    if (err.status === 404) {
      this.NotFountData.login = this.githubForm?.value?.searchQuery
      this.NotFountData.name = this.githubForm?.value?.searchQuery
      this.handleData(this.NotFountData)
    }
    this.githubForm.patchValue({ searchQuery: '' });
  }

  handleCompleteResponse = () => {
    this.githubForm.patchValue({ searchQuery: '' });
  }


  handleData = (data: GitHubUser) => {
    let serchHistory = []
    if (localStorage.getItem('history')) {
      serchHistory = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('history'))))
    }
    this.listSearchedData.push(data)
    serchHistory.push(data)
    this.store.dispatch(addUser(data))
    localStorage.setItem('history', JSON.stringify(serchHistory))
  }

}
