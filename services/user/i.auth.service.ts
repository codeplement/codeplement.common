import { Observable } from 'rxjs';
import { IUser } from '../../models/user';

export interface IAuthService {
    signIn(credentials: { username: string, password: string }): Observable<IUser>;
    checkUsername(username: string): Observable<IUser>;
    signOut(token: string): Observable<void>;
    signInWithSocials(socialId: string): Observable<IUser>;
}
