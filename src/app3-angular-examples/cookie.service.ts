import { Injectable } from '@angular/core';

@Injectable()
export class CookieService {

    constructor() { }

    /*
    document.cookie = 'visits=3; path=/;';
    document.cookie = 'last-visit=Mon, 15 Oct 2012 19:36:00 GMT; expires=Wed, 31 Oct 2012 11:00:00 GMT;';
    */

    /**
     * @name createSingleCookie : Create single cookie item
     * @param name Name or Key of the cookie to identify it by
     * @param value Value of the key
     * @param expires Date and Time when cookie should expire
     * @param path Tell the browser what path the cookie belongs to. By default, the cookie belongs to the current page.
     * @param domain
     */
    public createSingleCookie(name, value, expires, path = '/', domain = '') {
        let cookie = name + '=' + JSON.stringify(value) + ';';

        if (expires) {
            // If it's a date
            if (expires instanceof Date) {
                // If it isn't a valid date
                if (isNaN(expires.getTime())) {
                    expires = new Date();
                }
            } else {
                expires = new Date(new Date().getTime() + this._window().parseInt(expires) * 1000 * 60 * 60 * 24);
            }

            cookie += 'expires=' + expires.toGMTString() + ';';
        }

        if (path) {
            cookie += 'path=' + path + ';';
        }
        if (domain) {
            cookie += 'domain=' + domain + ';';
        }

        document.cookie = cookie;
    }

    /**
     * @name createMultipleCookies Create multiple cookies by passing JSON object
     * @param cookieDataObj Takes JSON object with Key value pair
     */
    public createMultipleCookies(cookieDataObj) {
        Object.keys(cookieDataObj).map((cookieName) => {
            // console.log(cookie, ' : ', cookieDataObj[cookie]);
            this.createSingleCookie(cookieName, cookieDataObj[cookieName], new Date(new Date().getTime() + 10000));
        });
    }

    /**
     * @name getCookie get value of single cookie
     * @param cookieName
     */
    public getCookie(cookieName) {
        const name = cookieName + '=';
        const ca = document.cookie.split(';');

        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return JSON.parse(c.substring(name.length, c.length));
            }
        }
        return '';
    }

    public checkCookie(cookieName) {
        const name = this.getCookie(cookieName);
        console.log(cookieName);
        if (name !== '') {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @name deleteSingleCookie Remove cookie by name
     * @param cookieName Name or Key of the cookie
     */
    public deleteSingleCookie(cookieName) {
        this.createSingleCookie(cookieName, '', -1);
    }

    /**
     * @name deleteMultipleCookies : Remove multiple cookies by name
     * @param cookieDataObj Provide key, value pair as JSON Object
     */
    public deleteMultipleCookies(cookieDataObj) {
        Object.keys(cookieDataObj).map((cookieName) => {
            this.createSingleCookie(cookieName, '', -1);
        });
    }

    public _window(): any {
        // return the native window obj
        return window;
    }
}
