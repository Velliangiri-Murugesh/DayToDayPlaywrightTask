import {type Page,type Locator} from '@playwright/test'

export class LoginPage{

    page:Page;
    usernameInput :Locator;
    passwordInput:Locator;
    signInbutton:Locator;
    logoutButton:Locator
    flashMessages:Locator

    constructor(page:Page){

        this.page=page;
        this.usernameInput =page.getByLabel('Username');
        this.passwordInput=page.getByLabel('Password');
        this.signInbutton=page.getByRole('button',{name:'Login'});
        this.logoutButton=page.getByRole('link',{name:'Logout'});
        this.flashMessages=page.getByLabel('Messages');

    }

    async goto(){

        await this.page.goto('https://the-internet.herokuapp.com/login');

    }


    async login(userName:string,password:string){

    await this.usernameInput.fill(userName);
    await  this.passwordInput.fill(password);
    await  this.signInbutton.click();   


    }

    async logout(){
        await this.logoutButton.click();


    }







}