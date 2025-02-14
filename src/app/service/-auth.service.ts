import { Injectable, inject  } from '@angular/core';
import { 
  Auth,
  signOut, 
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private auth = inject(Auth);


  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  async loginWithFacebook() {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  async logout() {
    return signOut(this.auth);
  }
}
