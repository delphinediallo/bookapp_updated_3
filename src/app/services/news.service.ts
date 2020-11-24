import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class NewsService {

    constructor(private http: HttpClient) {}

    // uses http.get() to load data
    getNews() {
        return this.http.get('http://localhost:8000/news');
    }

    getNewsPost(postID: string) {
        return this.http.get('http://localhost:8000/news/edit/'
        + postID);
    }

    // uses http.post() to post data
    addNewsPost(postDate: string, postAuthor: string, postTitle: string, postContent: string) {
        this.http.post('http://localhost:8000/news/add', {postDate, postAuthor, postTitle, postContent})
        .subscribe((responseData) => {
            console.log(responseData);
        });
    }

    // update data
    updateNewsPost(postID: string, postDate: string, postAuthor: string, postTitle: string, postContent: string) {
        this.http.put('http://localhost:8000/news/edit/'
        + postID, {postDate, postAuthor, postTitle, postContent})
        .subscribe(() => {
            console.log('Updated: ' + postID);
        });
    }

    deleteNews(newsId: string) {
        this.http.delete('http://localhost:8000/news/' + newsId)
        .subscribe(() => {
            console.log('Deleted: ' + newsId);
        });
    }

}
