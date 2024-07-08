import React, {createContext, MutableRefObject, useContext, useRef} from "react";
import {Toast} from "primereact/toast";

interface ToastContextType {
    toastRef: MutableRefObject<Toast | null>;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToastContext = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToastContext must be used within a ToastProvider");
    }
    return context;
};

export const ToastProvider = ({children}: any) => {

    const toastRef = useRef<Toast>(null);
    return (
        <ToastContext.Provider value={{toastRef}}>
            {children}
            <Toast ref={toastRef} />
        </ToastContext.Provider>
    );
};