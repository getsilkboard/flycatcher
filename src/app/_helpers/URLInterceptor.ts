import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable()
export class URLInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const baseUrl = 'https://staging-parcel-api.shoppre.com/api'

    const overrides: any = {}
    if (request.url.startsWith('/')) {
      overrides.url = `${baseUrl}${request.url}`
    }

    // add authorization header with jwt token if available
    const token = localStorage.getItem('token')
    if (token) {
      overrides.setHeaders = {
        Authorization: `Bearer ${token}`
      }
    }

    return next.handle(request.clone(overrides))
  }
}
