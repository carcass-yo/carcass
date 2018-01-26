import {HttpErrorResponse} from '@angular/common/http';

export class ErrorResponse {
  error: {
    code: string;
    message: string;
  };
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

export class RestService {
  public handleError(err: ErrorResponse | HttpErrorResponse | Error) {
    let errMsg: string;
    let logErrMsg: string;

    if (err instanceof HttpErrorResponse) {
      const errObject: ErrorResponse = err.error;
      logErrMsg = `${err.status} - ${err.statusText || ''} ${errObject.error.message}`;
      errMsg = errObject.error.message;
    } else {
      logErrMsg = 'test';
      // logErrMsg = errMsg = err.message ? err.message : err.toString();
    }

    console.error(logErrMsg);

    throw errMsg;
  }
}
