import { Fade, Snackbar, SnackbarProps } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { GenericProps } from '../models/Application';


interface SnackbarContext {
    openSnackBar: (id: string, message: string ) => void;

}
export const SnackbarContext = React.createContext<SnackbarContext>({
    openSnackBar: (id: string, message: string) => {},
});

const DEFAULT_SNACKBAR_CONFIG: SnackbarProps = {
    autoHideDuration: 3000,
    anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
    TransitionComponent: Fade,
}

export const SnackbarProvider = (props: GenericProps) => {
    const [open, setOpen] = useState(false);
    const [snackbarPack, setSnackbarPack] = useState<{
        id: string;
        message: string;
    }[]>([]);

    const handleClose = (event: any) => {
        setOpen(false);
      };

    useEffect(() => {
        if (snackbarPack.length > 1) {
            setSnackbarPack((prev) => prev.slice(1, prev.length));
            setOpen(true);
        } else if (snackbarPack.length === 0) {
            setOpen(false);
        } else if (snackbarPack.length === 1) {
            setOpen(true);
        }
    }, [snackbarPack])

    const openSnackBar = (message: string, id: string) => {
        setSnackbarPack(prev => {
            return [...prev, {
                id,
                message,
            }]
        })
    }

    return (
        <SnackbarContext.Provider value={{
            openSnackBar: openSnackBar
        }}>
            <Snackbar open={open} message={snackbarPack[0]?.message || ''} {...DEFAULT_SNACKBAR_CONFIG} onClose={handleClose}></Snackbar>
            {props.children}
        </SnackbarContext.Provider>
    );
}