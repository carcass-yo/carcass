import {Response} from '@angular/http';

export class RestService {
  public handleError(error: Response | any) {
    let errMsg: string;
    let logErrMsg: string;

    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.message || body.detail || body.error || JSON.stringify(body);
      logErrMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      errMsg = err;
    } else {
      logErrMsg = errMsg = error.message ? error.message : error.toString();
    }

    console.error(logErrMsg);

    throw errMsg;
  }
}

export class ApiQueryParams {
  sort?: any;
  skip?: any;
  limit?: any;
  query?: any;
  populate?: any;
  select?: any;
  distinct?: any;
}
