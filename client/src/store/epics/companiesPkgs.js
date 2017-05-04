import { Observable } from 'rxjs/Observable'
import * as ActionTypes from '../actionTypes'

const headers = {
  Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1OTBhN2Q3MDI2NmFlNDMxNzAxZjMwNTEiLCJzdWIiOiJwYWlib29uMTU3MjFAZ21haWwuY29tIiwicm9sZSI6ImNvbXBhbnkiLCJpYXQiOjE0OTM4NTk2OTcwMzh9._MXuNn0K1f-MWGgYo_90rSpdnf0dhwVAWUdS0uu797U',
}

export const getCompaniesPkgs = action$ =>
  action$.ofType(ActionTypes.GET_COMPANIES_PKGS).switchMap(() =>
    Observable.ajax
      .get('http://localhost:4000/companies/pkgs', headers)
      .map(res => res.response)
      .map(pkgs => ({
        type: ActionTypes.GET_COMPANIES_PKGS_SUCCESS,
        payload: pkgs,
      }))
  )
