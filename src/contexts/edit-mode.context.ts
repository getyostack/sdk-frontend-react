import React from "react";

export interface EditModeState {
    inEditMode: boolean;
}

export const EditModeContext = React.createContext<EditModeState>({
    inEditMode: false
});