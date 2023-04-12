import { GitHubUser } from "./models/user.model";

// Below line is for Localstorage saving based on localstorage of browser 
// On history page it will persist on reload also

const localStorageData = JSON.parse(JSON.stringify(localStorage.getItem('history')))
export let allSearchedUser: GitHubUser[] = localStorageData ? JSON.parse(localStorageData) : []

// In below comment line On history page will blank on reload 

// export let allSearchedUser: GitHubUser[] =  []
