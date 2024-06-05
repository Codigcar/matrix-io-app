import React from 'react';
import { createContext } from 'react';
import { IPublication } from '../interfaces/publish.interface';

interface ContextProps {
    publications?: IPublication[];

    getNextPublication: () => Promise<{hasError: boolean, message: string, data: IPublication[]}>
    resetData: () => Promise<void>;
    initData: () => Promise<void>;
    setStorage: (key: string, value: string) => Promise<void>;
    getStorage: (key: string) => Promise<string | null>;
    removeStorage: (key: string) => Promise<void>;

}

export const DataContext = createContext({} as ContextProps);
