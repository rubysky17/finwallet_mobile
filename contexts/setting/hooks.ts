import { useContext } from "react";
import { Context } from "./store";

export function useSetting() {
    const ctx = useContext(Context);
    if (!ctx) throw new Error("useSetting must be used within a SettingProvider");
    return ctx;
}