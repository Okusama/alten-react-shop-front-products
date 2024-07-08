import React, {ChangeEvent, useEffect, useState} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {ProductModel} from "../../components/ProductPublicItem/product.model";
import {fetchRoute} from "../../services/apiService";
import {Button} from "primereact/button";
import styles from "./prodcutsAdmin.module.scss";
import {useToastContext} from "../../utils/ToastProvider";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";

interface ProductFormValues {
    id: number,
    code: string,
    name: string
}

export const ProductsAdmin: React.FC = () => {

    const {toastRef} = useToastContext();
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [rowClick, setRowClick] = useState(true);
    const [visible, setVisible] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const [productFormValues, setProductFormValues] = useState<ProductFormValues>({
        id: 0,
        code: '',
        name: ''
    })

    const fetchData = () => {
        fetchRoute('/assets/data/products.json', {}).then((json: any) => {
            setProducts(json.data);
        }).catch((error: any) => {
            console.error(error);
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleOnClickEditRow = (product: any) => {
        setVisible(true);
        setIsNew(false);
        setProductFormValues({id: product.id, code: product.code, name: product.name});
    }

    const handleOnClickDeleteRow = (id: number) => {
        fetchRoute('/product/delete/', {id: id}).then(() => {
            toastRef.current?.show({severity:'success', summary: 'Success', detail:'Item Delete', life: 3000});
            fetchData();
        })
    }

    const handleCreateProduct = () => {
        setVisible(true);
        setIsNew(true);
        setProductFormValues({id: 0, code: '', name: ''});
    }

    const handleFormSubmit = () => {
        if (isNew){
            fetchRoute('/product/create', {productFormValues}).then(() => {
                toastRef.current?.show({severity:'success', summary: 'Success', detail:'Item Create', life: 3000})
            })
        } else {
            fetchRoute('/product/update', {productFormValues}).then(() => {
                toastRef.current?.show({severity:'success', summary: 'Success', detail:'Item Update', life: 3000})
            })
        }
        fetchData();
    }

    const handleMultipleDelete = () => {
        fetchRoute('/product/delete/', {selectedProducts}).then(() => {
            toastRef.current?.show({severity:'success', summary: 'Success', detail:'Item Delete', life: 3000});
            fetchData();
        })
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProductFormValues({
            ...productFormValues,
            [name]: value
        });
    };

    const actionColumnContent = (product: any) => {
        return(<>
            <Button icon="pi pi-pencil" severity="info" text onClick={() => handleOnClickEditRow(product)}/>
            <Button icon="pi pi-trash" severity="danger" text onClick={() => handleOnClickDeleteRow(product.id)}/>
        </>);
    }

    return (
        <div className={styles.productAdminPage}>
            <div className={styles.header}>
                <div>
                    <Button icon="pi pi-plus" label="New" severity="success" onClick={handleCreateProduct}/>
                    <Button icon="pi pi-trash" label="Delete" severity="danger" onClick={handleMultipleDelete} disabled={selectedProducts.length === 0}/>
                </div>
                <Button icon="pi pi-cog"  severity="info"/>
            </div>
            <DataTable
                value={products}
                tableStyle={{ minWidth: '50rem' }}
                selectionMode={rowClick ? null : 'checkbox'}
                selection={selectedProducts}
                onSelectionChange={(e:any) => setSelectedProducts(e.value)}
                dataKey="id"
                paginator
                rows={10}
                rowsPerPageOptions={[10, 25, 50]}
            >
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                <Column field="code" header="Code" sortable filter></Column>
                <Column field="name" header="Name" sortable filter></Column>
                <Column header="Actions" body={actionColumnContent}></Column>
            </DataTable>
            <Dialog header="Product" visible={visible} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
                <form className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="code">Code</label>
                        <InputText id="code" name="code" value={productFormValues.code} onChange={handleInputChange} />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Name</label>
                        <InputText id="name" name="name" value={productFormValues.name} onChange={handleInputChange} />
                    </div>
                    <div>
                        <Button label="Confirm" severity="success" onClick={handleFormSubmit}/>
                        <Button label="Cancel" severity="info" onClick={() => {setVisible(false)}}/>
                    </div>
                </form>
            </Dialog>
        </div>
    );
};