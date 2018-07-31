import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataSharingService {
    private commentsArray = [];

    private comments = new Subject();
    private posts = new Subject();

    // If you will add type Observable then it will updated data in all the components (Application wide)
    getComments(): Observable<any> {
        return this.comments.asObservable();
    }

    getSingleComment() {
        return this.comments[0];
    }

    setComments(comments) {
        this.comments.next(comments);
    }

    addNewComment(comment) {
        this.comments.next(comment);
    }

}
