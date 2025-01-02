import { Firebase } from '@nativescript/firebase-core';
import { Auth, User } from '@nativescript/firebase-auth';
import { BehaviorSubject, Observable } from 'rxjs';

export class AuthService {
  private static instance: AuthService;
  private auth: Auth;
  private currentUser$ = new BehaviorSubject<User | null>(null);

  private constructor() {
    this.auth = Auth.getInstance(Firebase.getInstance());
    this.auth.onAuthStateChanged((user) => {
      this.currentUser$.next(user);
    });
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  getCurrentUser$(): Observable<User | null> {
    return this.currentUser$.asObservable();
  }

  async signInWithEmail(email: string, password: string): Promise<User> {
    const credential = await this.auth.signInWithEmailAndPassword(email, password);
    return credential.user;
  }

  async signUpWithEmail(email: string, password: string): Promise<User> {
    const credential = await this.auth.createUserWithEmailAndPassword(email, password);
    return credential.user;
  }

  async signOut(): Promise<void> {
    await this.auth.signOut();
  }
}