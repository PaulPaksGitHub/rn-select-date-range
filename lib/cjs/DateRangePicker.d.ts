import React from "react";
import { ViewStyle, TextStyle } from "react-native";
import moment from "moment";
interface IResponse {
    firstDate: string | moment.Moment;
    secondDate: string | moment.Moment;
}
interface IProps {
    onSelectDateRange: (response: IResponse) => void;
    responseFormat?: string;
    maxDate?: moment.Moment;
    minDate?: moment.Moment;
    blockSingleDateSelection?: boolean;
    font?: string;
    selectedDateContainerStyle?: ViewStyle;
    selectedDateStyle?: TextStyle;
    renderClearButton?: () => React.ReactNode;
    clearButtonLabel?: React.ReactText;
}
declare const DateRangePicker: ({ onSelectDateRange, responseFormat, maxDate, minDate, blockSingleDateSelection, font, selectedDateContainerStyle, selectedDateStyle, renderClearButton, clearButtonLabel }: IProps) => JSX.Element;
export default DateRangePicker;
