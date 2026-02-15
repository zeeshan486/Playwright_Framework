import {test as base} from "@playwright/test";
import LoginPage from "../pages/LoginPage"
import AdminPage from "../pages/AdminPage";
import CheckoutPage from "../pages/CheckoutPage";

type Pages = {
    loginPage: LoginPage,
    adminPage: AdminPage,
    checkoutPage: CheckoutPage
}

export const test = base.extend<Pages>({
    loginPage : async({page},use) =>{
        const lp = new LoginPage(page)
        use(lp)
    },
    adminPage : async({page},use)=>{
        const adp = new AdminPage(page);
        use(adp)
    },
    checkoutPage : async({page},use)=>{
        const cp = new CheckoutPage(page);
        use(cp)
    }
})

export {expect} from "@playwright/test"