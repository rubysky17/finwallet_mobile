import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { SQLJsDatabase } from "drizzle-orm/sql-js";
import { PropsWithChildren, useContext, useEffect, useState, createContext } from "react";
import { initialize } from "./drizzle";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { openDatabaseSync } from "expo-sqlite";

type ContextType = { db: SQLJsDatabase | ExpoSQLiteDatabase | null }

export const DatabaseContext = createContext<ContextType>({ db: null });
const expoDb = openDatabaseSync("database.db");

export const useDatabase = () => useContext(DatabaseContext);

export function DatabaseProvider({ children }: PropsWithChildren) {
    const [db, setDb] = useState<SQLJsDatabase | ExpoSQLiteDatabase | null>(null);
    useDrizzleStudio(expoDb);

    useEffect(() => {
        if (db) return;
        initialize().then((newDb) => {
            setDb(newDb);
        })
    }, []);

    return (
        <DatabaseContext.Provider value={{ db }}>
            {children}
        </DatabaseContext.Provider>
    );
}
