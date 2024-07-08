import React, {useEffect, useState} from "react";
import {fetchRoute} from "../../services/apiService";
import {
    ProductPublicItemGrid,
    ProductPublicItemList
} from "../../components/ProductPublicItem/ProductPublicItem";
import {ProductModel} from "../../components/ProductPublicItem/product.model";
import styles from './products.module.scss';
import {DataView, DataViewLayoutOptions} from "primereact/dataview";
import {Dropdown} from "primereact/dropdown";

export const Products: React.FC = () => {

    const [products, setProducts] = useState<ProductModel[]>([]);
    const [layout, setLayout] = useState<"grid" | "list" | (string & Record<string, unknown>) | undefined>('grid');
    const [sortKey, setSortKey] = useState('');
    const [sortOrder, setSortOrder] = useState(0);
    const [sortField, setSortField] = useState('');
    const sortOptions = [
        { label: 'Price High to Low', value: '!price' },
        { label: 'Price Low to High', value: 'price' }
    ];

    const [paginatorNbKey, setPaginationNbKey] = useState(10);
    const paginatorNbOptions = [
        {label: '10', value: 10},
        {label: '25', value: 25},
        {label: '50', value: 50}
    ];

    useEffect(() => {

        fetchRoute('/assets/data/products.json', {}).then((json: any) => {
            setProducts(json.data);
        }).catch((error: any) => {
            console.error(error);
        });

    }, []);

    const onSortChange = (event: any) => {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
            setProducts(products.sort((a, b) => a.price - b.price))
        } else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
            setProducts(products.sort((a, b) => b.price - a.price))
        }
    };

    const onPaginationNbChange = (event: any) => {

        const value = event.value;
        setPaginationNbKey(value);

    }

    const itemTemplate = (product: ProductModel, layout: any, index: number) => {
        if (!product) {
            return;
        }
        if (layout === 'list') return (<ProductPublicItemList product={product}/>);
        else if (layout === 'grid') return (<ProductPublicItemGrid product={product}/>);
    };

    const listTemplate = (products: ProductModel[], layout?: any) => {
        return products.map((product, index) => itemTemplate(product, layout, index));
    };

    const header = () => {
        return (
            <div className={styles.productListHeader}>
                <div>
                    <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By" onChange={onSortChange} className="w-full sm:w-14rem" />
                </div>
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    const paginatorNbEntries = () => {

        return (<Dropdown options={paginatorNbOptions} value={paginatorNbKey} optionLabel="label" onChange={onPaginationNbChange}/>);

    }

    return (
        <div className={styles.productPage}>
            <div className={styles.productList}>
                <DataView
                    key={paginatorNbKey}
                    value={products}
                    listTemplate={listTemplate}
                    layout={layout}
                    header={header()}
                    paginator
                    paginatorRight={paginatorNbEntries()}
                    rows={paginatorNbKey}/>
            </div>
        </div>
    );
};