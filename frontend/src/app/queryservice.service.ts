import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QueryserviceService {
  
  constructor(private http: HttpClient) { }

  public getInstitutes() : Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/institutes/`);
  }

  public getInstitute(id: number) : Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/institutes/${id}`);
  }

  public getInstituteMembers(id: number) : Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/institute-members/${id}`);
  }

  public getInstitutePubs(id: number) : Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/institute-pubs/${id}`);
  }

  public getInstituteCitations(id: number) : Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/institute-citations/${id}`);
  }

  public getAuthor(id: number) : Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/author/${id}`);
  }

  public getAuthorTop5Pubs(id: number) : Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/authors-top5pubs/${id}`);
  }

  public getAuthors() : Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/authors/`);
  }

  public getAuthorPubs(id: number) : Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/author-pubs/${id}`);
  }

  public getAuthorCitations(id: number) : Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/author-citations/${id}`);
  }

  public getAuthorPubsPerTopic(id: number) : Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/author-pubs-per-topic/${id}`);
  }

  public getAuthorColabs(id: number) : Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/author-colab/${id}`);
  }

  public getArticles() : Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/articles`);
  }

  public getArticle(id: number) : Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/articles/${id}`);
  }

  public getArticleCitations(id: number) : Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/article-citations/${id}`);
  }

  public getArticlesCitedBy(id: number) : Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/article-cited-by/${id}`);
  }

  public getArticlesCitedFrom(id: number) : Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/article-cited-from/${id}`);
  }


  public getVenues() : Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/venues/`);
  }

  public getVenue(id: number) : Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/venues/${id}`);
  }

  public getVenueCitations(id: number) : Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/venue-citations/${id}`);
  }

  public getVenuePubs(id: number) : Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/venue-pubs/${id}`);
  }

  public getTopics() : Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/topics/`);
  }

  public getTopic(id: number) : Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/topics/${id}`);
  }

  public getTopicPubs(id: number) : Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/topic-pubs/${id}`);
  }

  public getTopicCitations(id: number) : Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/topic-citations/${id}`);
  }

  public getVenueByType(id: number) : Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/venues/selected-types/${id}`);
  }

  public getInstituteByCountry(id: number) : Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/institutes/selected-countries/${id}`);
  }

  public getArticleByTopic(id: number) : Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/articles/selected-topics/${id}`);
  }

  public getArticleCitationGraph(id: number, d: number) : Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/article/citation-graph/${id}-${d}`);
  }

  public getAuthorNewInfo(from: number, to: number, topics: Array<String>) {
    var data = {
      from: from,
      to: to,
      topics: topics
    };
    this.http.post<any>('http://127.0.0.1:8000/new-authors-info/', data).subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        console.log(error);
      }
    });
  }
}
