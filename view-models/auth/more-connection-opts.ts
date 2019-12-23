import { SocialiteAuth } from '../../models/user/socialite';
import { Input } from '@angular/core';

export class MoreConnectionOptsViewModel {
    public socialiteAuths: SocialiteAuth[];
    @Input() public showSignUpButton = true;
    constructor() {
        this.populateSocialiteAuth();
    }
    protected populateSocialiteAuth() {
        this.socialiteAuths = [
            {
                name: 'facebook',
                description: 'facebook',
                id: 'fbk',
                logo: 'assets/facebook_logo.png'
            },
            {
                name: 'google',
                description: 'google',
                id: 'goo',
                logo: 'assets/google_logo.png'
            },
            {
                name: 'github',
                description: 'github',
                id: 'git',
                logo: 'assets/github_logo.png'
            },
            {
                name: 'linkedIn',
                description: 'linkedIn',
                id: 'lnk',
                logo: 'assets/linkedin_logo.png'
            },
            {
                name: 'twitter',
                description: 'twitter',
                id: 'twt',
                logo: 'assets/twitter_logo.png'
            }
        ];
    }
    public testSocial(social) {
        console.log(social);
    }
}
