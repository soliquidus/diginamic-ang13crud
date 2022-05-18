import {Injectable} from '@angular/core';
import {Login} from "../model/login";
import {BehaviorSubject, map, Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {UrlParts} from "../../../utils/urlParts";

const ANONYMOUS_USER = <Login>{
  isAnonymous: true,
  username: 'Anonymous User'
}

const loginUrl = environment.gateway + UrlParts.login

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  /**
   * Authentification management
   * @protected
   */
  protected authenticatedUser: BehaviorSubject<Login> = new BehaviorSubject<Login>(ANONYMOUS_USER);

  constructor(private http: HttpClient, private router: Router) {
  }


  public login(username: string, password: string): Observable<Login | null> {
    const params = new HttpParams().set('username', username).set('password', password);
    console.log('login');
    return this.http.get<Login[]>(loginUrl, {params}).pipe(map(userJson => {
      if (userJson.length === 1) {
        let newLogin = userJson[0];
        this.authenticatedUser.next(newLogin);
        this.router.navigate([''])
        return newLogin;
      } else {
        this.authenticatedUser.next(ANONYMOUS_USER);
        this.router.navigate(['login']);
        return null;
      }
    }));
  }

  public loginFilter(username: string, password: string): void {
    this.http.get<Login[]>(loginUrl).pipe(
      map(logins => logins.filter(
        login => {
          return login.username === username && login.password === password;
        }
      ))
    ).subscribe({
      next: logins => {
        if (logins.length === 1) {
          this.authenticatedUser.next(logins[0]);
          this.router.navigate([''])
        }
        else {
          this.authenticatedUser.next(ANONYMOUS_USER);
          this.router.navigate(['login'])
        }
      },
      error: err => console.log(`Error while getting data ${UrlParts.login}: ` + err)
    })
  }

  public logout(): void {
    console.log('logout access');
    this.authenticatedUser.next(ANONYMOUS_USER);
  }

  public getAuthenticatedUser(): Observable<Login>{
    return this.authenticatedUser;
  }

  canActivate(): boolean {
    let found = false;
    this.getAuthenticatedUser().subscribe(login => found = login.isAnonymous);
    return !found;
  }
}
