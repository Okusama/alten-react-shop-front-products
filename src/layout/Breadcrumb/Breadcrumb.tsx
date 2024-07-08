import {BreadCrumb} from "primereact/breadcrumb";
import React from "react";
import {useLocation} from "react-router-dom";

export const Breadcrumb: React.FC = () => {

    const location = useLocation();
    const pathNames = location.pathname.split('/').filter((x: any) => x);

    const breadcrumbItems = [
        { label: 'Home', url: '/' },
        ...pathNames.map((name: string, index: number) => {
            const url = `/${pathNames.slice(0, index + 1).join('/')}`;
            return { label: name.charAt(0).toUpperCase() + name.slice(1), url };
        })
    ];

    return (
        <BreadCrumb model={breadcrumbItems}/>
    );
};