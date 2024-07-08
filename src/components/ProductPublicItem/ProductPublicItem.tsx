import {ProductModel} from "./product.model";
import React from "react";
import {Button} from "primereact/button";
import styles from './productPublicItem.module.scss';

interface ProductPublicItemProps {
    product: ProductModel
}

export const ProductPublicItemGrid: React.FC<ProductPublicItemProps> = ({product}) => {

    return (
        <div key={product.id} className={styles.productPublicItemGrid}>
            <div className={styles.productPublicItemGridHeader}>
                <div>
                    <i className="pi pi-tags"></i>
                    <span>{product.category}</span>
                </div>
                <span>{product.inventoryStatus}</span>
            </div>
            <div className={styles.productPublicItemGridMain}>
                <span>{product.name}</span>
                <span>{product.description}</span>
                <span>{[...Array(5)].map((_, index) => (<i key={index} className={`pi pi-star${(index < product.rating ? '-fill' : '')}`}></i>))}</span>
            </div>
            <div className={styles.productPublicItemGridFooter}>
                <span>{product.price} €</span>
                <Button icon="pi pi-shopping-cart" severity="info" disabled={product.quantity === 0}></Button>
            </div>
        </div>
    );
};

export const ProductPublicItemList: React.FC<ProductPublicItemProps> = ({product}) => {

    return (
        <div key={product.id} className={styles.productPublicItemList}>
            <div className={styles.productPublicItemListHeader}>
                <div>
                    <i className="pi pi-tags"></i>
                    <span>{product.category}</span>
                </div>
                <span>{product.inventoryStatus}</span>
            </div>
            <div className={styles.productPublicItemListMain}>
                <span>{product.name}</span>
                <span>{product.description}</span>
                <span>{[...Array(5)].map((_, index) => (<i key={index} className={`pi pi-star${(index < product.rating ? '-fill' : '')}`}></i>))}</span>
            </div>
            <div className={styles.productPublicItemListFooter}>
                <span>{product.price} €</span>
                <Button icon="pi pi-shopping-cart" severity="info" disabled={product.quantity === 0}></Button>
            </div>
        </div>
    );
};