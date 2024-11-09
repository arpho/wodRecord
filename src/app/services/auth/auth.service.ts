import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { firstValueFrom } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; // Import the authentication module
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private http: HttpClient) {
    console.log("environt", environment);
  }
  async googleLogin(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    await this.sendTokenToBackend(credential.user as firebase.User); // Ensure type is correctly cast
  }
  async logout(): Promise<void> {
    await this.afAuth.signOut();
  }
  private async sendTokenToBackend(user: firebase.User | null) {
    if (user) {
      const idToken = await user.getIdToken();
      await firstValueFrom(this.http.post(`${environment.backendUrl}/api/auth/login`, { idToken }));
    }
  }
  getUser(): Observable<firebase.User | null> {
    console.log("getting user");
    return this.afAuth.authState;
  }
  isUserLogged(){
    return new Promise( (resolve, reject) => {
      this.getUser().subscribe( (user) => {
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
}