import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {RestService} from './lib/RestService';
import {Company} from './company.service';

export class User {
  _id: string;
  username: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone?: string;
  city?: string;
  photo?: string;
  birthday?: Date;
  userStatus?: number;
  company?: Company;
  isAdmin?: boolean;
  isPartner?: boolean;
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

  public getCurrent(): Promise<User> {
    let options = new RequestOptions({withCredentials: true});
    return this.http.get('/api/v1/User', options)
      .toPromise()
      .then((res: Response) => {
        this.user = res.json();
        return this.user;
      })
      .catch(this.handleError)
      .catch((err: Error) => {
        if (err.name === 'not_auth') return null;
        throw err;
      });
  }

  public signIn(data: {username: string; password: string; rememberMe?: boolean}): Promise<void | User> {
    let options = new RequestOptions({withCredentials: true});
    return this.http.post('/api/v1/User/signin', data, options)
      .toPromise()
      .then((res: Response) => {
        this.user = res.json();
        return this.user;
      })
      .catch(this.handleError);
  }

  public signOut(): Promise<void | User | null> {
    let options = new RequestOptions({withCredentials: true});
    return this.http.get('/api/v1/User/signout', options)
      .toPromise()
      .then((res: Response) => {
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
  ): Promise<void | User> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({withCredentials: true, headers: headers});
    return this.http.post('/api/v1/User', data, options)
      .toPromise()
      .then((res: Response) => {
        this.user = res.json();
        return this.user;
      })
      .catch(this.handleError);
  }

  public update(data: User): Promise<any | User> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({withCredentials: true, headers: headers});
    return this.http.patch(`/api/v1/User/${data._id}`, data, options)
      .toPromise()
      .then((res: Response) => {
        this.user = res.json();
        return this.user;
      })
      .catch(this.handleError);
  }

  public uploadAvatar(data: FormData): Promise<any | User> {
    let options = new RequestOptions({withCredentials: true});
    return this.http.post('/api/v1/User/uploadAvatar', data, options)
      .toPromise()
      .then((res: Response) => {
        this.user = res.json();
        return this.user;
      })
      .catch(this.handleError);
  }

  public resetPasswordRequest(data: {username: string}): Promise<any> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({withCredentials: true, headers: headers});
    return this.http.post('/api/v1/User/resetPasswordRequest', data, options)
      .toPromise()
      .then((res: Response) => res.json())
      .catch(this.handleError);
  }

  public resetPassword(data: {_id: string, password: string}): Promise<any | User> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({withCredentials: true, headers: headers});
    return this.http.post('/api/v1/User/resetPassword', data, options)
      .toPromise()
      .then((res: Response) => {
        this.user = res.json();
        return this.user;
      })
      .catch(this.handleError);
  }
}
