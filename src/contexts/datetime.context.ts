import React from "react";

export interface DateTimeContextData {
    dateTime: Date;
}

export const DateTimeContext = React.createContext<DateTimeContextData>({
    dateTime: new Date()
});