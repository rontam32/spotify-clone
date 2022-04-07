import { useContext, useEffect } from "react";
import { HeaderContext } from "../contexts";

const useHeader = (pathKey?: string, forwardHeaderDataCallback?: (data: any) => void) => {
    const headerCtx = useContext(HeaderContext);

    useEffect(() => {
        headerCtx.updateHeader(pathKey || 'default');
        if (forwardHeaderDataCallback) headerCtx.setHeaderDataCallback(forwardHeaderDataCallback);

        return () => {
            headerCtx.updateHeader('default');
            headerCtx.setHeaderDataCallback((data: any) => {});
        }
    }, []);

}

export default useHeader;