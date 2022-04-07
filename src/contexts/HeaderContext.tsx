import React, { useEffect, useRef, useState } from 'react';
import { GenericProps } from '../models/Application';

interface HeaderContext {
    updateHeader: (path: string) => void;
    currentPath: string;
    forwardHeaderData: (data: any) => void;
    // forwardComponentData: (data: any) => void;
    setHeaderDataCallback: (callbackFn: (data: any) => void) => void;
    // setComponentDataCallback: (callbackFn: (data: any) => void) => void;
    componentData: any;
    setComponentData: (data: any) => void;
}


export const HeaderContext = React.createContext<HeaderContext>({
    updateHeader: (path: string) => {},
    currentPath: '',
    forwardHeaderData: (data) => {},
    setHeaderDataCallback: (callbackFn: (data: any) => void) => {},
    componentData: null,
    setComponentData: (data: any) => {}
});


const HeaderProvider = (props: GenericProps) => {

    const [currentPath, setCurrentPath] = useState<string>('');
    const headerDataCallbackata = useRef((data: any) => {});
    const [componentData, setComponentData] = useState<any>(null);


    return <HeaderContext.Provider value={{
        updateHeader: (path: string) => {
            setCurrentPath(path);
        },
        currentPath,
        forwardHeaderData: (data) => {
            if (headerDataCallbackata) headerDataCallbackata.current(data);
        },
        setHeaderDataCallback: (callbackFn: (data: any) => void) => {
            headerDataCallbackata.current = callbackFn;
        },
        componentData,
        setComponentData: (data) => {
            setComponentData(data);
        }
    }}>
        {props.children}
    </HeaderContext.Provider>
} 

export default HeaderProvider;