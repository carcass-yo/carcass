import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {ErrorResponse, RestService} from './lib/RestService';

export class User {
  _id: string;
  username: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone?: string;
  birthday?: Date;
  isAdmin?: boolean;
}

@Injectable()
export class UserService extends RestService {
  user: User | null = null;
  getCurrentPromise: Promise<User> = null;

  constructor(private http: Http) {
    super();
    this.getCurrentPromise = this.getCurrent()
      .then((user: User) => {
        this.getCurrentPromise = null;
        return user;
      })
      .catch(() => {
        this.getCurrentPromise = null;
        return null;
      });
  }

  public getCurrent(): Promise<User | any> {
    return this.http.get<User>('/api/v1/User', {withCredentials: true})
      .toPromise()
      .then((res: User) => {
        this.user = res;
        return this.user;
      })
      .catch((err: ErrorResponse) => {
        if (err.error.code === 'NOT_AUTH') return null;
        throw err;
      })
      .catch(this.handleError);
  }

  public signIn(data: {username: string; password: string; rememberMe?: boolean}): Promise<User | any> {
    return this.http.post<User>('/api/v1/User/signin', data, {withCredentials: true})
      .toPromise()
      .then((res: User) => {
        this.user = res;
        return this.user;
      })
      .catch(this.handleError);
  }

  public signOut(): Promise<User | any> {
    return this.http.get<any>('/api/v1/User/signout', {withCredentials: true})
      .toPromise()
      .then(() => {
        this.user = null;
        return this.user;
      })
      .catch(this.handleError);
  }

  public signUp(
    data: {
      email: string;
      password: string;
      name: {first: string; last: string};
      username: string;
    }
  ): Promise<User | any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    let options = {withCredentials: true, headers: headers};
    return this.http.post<User>('/api/v1/User', data, options)
      .toPromise()
      .then((res: User) => {
        this.user = res;
        return this.user;
      })
      .catch(this.handleError);
  }

  public update(data: User): Promise<User | any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    let options = {withCredentials: true, headers: headers};
    return this.http.patch<User>(`/api/v1/User/${data._id}`, data, options)
      .toPromise()
      .then((res: User) => {
        this.user = res;
        return this.user;
      })
      .catch(this.handleError);
  }

  public resetPasswordRequest(data: {username: string}): Promise<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    let options = {withCredentials: true, headers: headers};
    return this.http.post<any>('/api/v1/User/resetPasswordRequest', data, options)
      .toPromise()
      .catch(this.handleError);
  }

  public resetPassword(data: {_id: string, password: string}): Promise<User | any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    let options = {withCredentials: true, headers: headers};
    return this.http.post<User>('/api/v1/User/resetPassword', data, options)
      .toPromise()
      .then((res: Response) => {
        this.user = res;
        return this.user;
      })
      .catch(this.handleError);
  }
}
