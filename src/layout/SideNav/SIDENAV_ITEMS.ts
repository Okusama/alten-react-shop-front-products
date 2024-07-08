import {SidenavItem} from "./sidenav.model";

export const SIDENAV_ITEMS: SidenavItem[] = [
    {
        id: 'product-sidenav-item',
        icon: 'shopping-cart',
        labels: {
            en: "Products",
            fr: "Produits"
        },
        link: '/products'
    },
    {
        id: 'admin-sidenav-item',
        icon: 'users',
        labels: {
            en: "Admin",
            fr: "Administration"
        },
        link: '/admin/products'
    }

];