var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, } from "react-native";
import moment from "moment";
import Month from "./Month";
import Button from "./Button";
var DateRangePicker = function (_a) {
    var onSelectDateRange = _a.onSelectDateRange, responseFormat = _a.responseFormat, maxDate = _a.maxDate, minDate = _a.minDate, blockSingleDateSelection = _a.blockSingleDateSelection, font = _a.font, selectedDateContainerStyle = _a.selectedDateContainerStyle, selectedDateStyle = _a.selectedDateStyle, renderClearButton = _a.renderClearButton, clearButtonLabel = _a.clearButtonLabel;
    var _b = useState(moment()), selectedDate = _b[0], setSelectedDate = _b[1];
    var _c = useState(null), firstDate = _c[0], setFirstDate = _c[1];
    var _d = useState(null), secondDate = _d[0], setSecondDate = _d[1];
    var lastMonth = selectedDate.clone().subtract(1, "months");
    var lastYear = selectedDate.clone().subtract(1, "years");
    var nextMonth = selectedDate.clone().add(1, "months");
    var nextYear = selectedDate.clone().add(1, "years");
    var returnSelectedRange = function (fd, ld) {
        var isWrongSide = ld === null || ld === void 0 ? void 0 : ld.isBefore(fd);
        if (responseFormat) {
            onSelectDateRange({
                firstDate: isWrongSide
                    ? ld.format(responseFormat)
                    : fd.format(responseFormat),
                secondDate: isWrongSide
                    ? fd.format(responseFormat)
                    : ld.format(responseFormat),
            });
        }
        else {
            onSelectDateRange({
                firstDate: isWrongSide ? ld : fd,
                secondDate: isWrongSide ? fd : ld,
            });
        }
    };
    var onSelectDate = function (date) {
        if (blockSingleDateSelection &&
            ((firstDate === null || firstDate === void 0 ? void 0 : firstDate.isSame(date, "dates")) || (secondDate === null || secondDate === void 0 ? void 0 : secondDate.isSame(date, "dates")))) {
            return;
        }
        if (!firstDate) {
            setFirstDate(date);
        }
        else {
            if (!secondDate) {
                setSecondDate(date);
                returnSelectedRange(firstDate, date);
            }
            else {
                setFirstDate(secondDate);
                setSecondDate(date);
                returnSelectedRange(secondDate, date);
            }
        }
    };
    var onPressClear = function () {
        setFirstDate(null);
        setSecondDate(null);
        onSelectDateRange({
            firstDate: "",
            secondDate: "",
        });
    };
    var isDateSelected = function () { return firstDate === null || secondDate === null; };
    return (React.createElement(View, null,
        React.createElement(View, { style: styles.titleRow },
            React.createElement(Button, { font: font, disabled: minDate ? lastYear.isBefore(minDate, "months") : false, label: "< ".concat(lastYear.format("YYYY")), onPress: function () { return setSelectedDate(lastYear); } }),
            React.createElement(Text, { style: __assign(__assign({}, styles.title), { fontFamily: font }) }, selectedDate.format("YYYY")),
            React.createElement(Button, { font: font, disabled: maxDate ? nextYear.isAfter(maxDate, "months") : false, label: "".concat(nextYear.format("YYYY"), " >"), onPress: function () { return setSelectedDate(nextYear); }, align: "right" })),
        React.createElement(View, { style: styles.titleRow },
            React.createElement(Button, { font: font, disabled: minDate ? lastMonth.isBefore(minDate, "months") : false, label: "< ".concat(lastMonth.format("MMM")), onPress: function () { return setSelectedDate(lastMonth); } }),
            React.createElement(Text, { style: __assign(__assign({}, styles.title), { fontFamily: font }) }, selectedDate.format("MMMM")),
            React.createElement(Button, { font: font, disabled: maxDate ? nextMonth.isAfter(maxDate, "months") : false, label: "".concat(nextMonth.format("MMM"), " >"), onPress: function () { return setSelectedDate(nextMonth); }, align: "right" })),
        React.createElement(Month, { font: font, selectedDate: selectedDate, onSelectDate: onSelectDate, firstDate: firstDate, secondDate: secondDate, maxDate: maxDate, minDate: minDate, selectedDateContainerStyle: selectedDateContainerStyle, selectedDateStyle: selectedDateStyle }),
        React.createElement(View, { style: styles.clearContainer }, renderClearButton ? renderClearButton() : (React.createElement(Pressable, { disabled: isDateSelected(), onPress: onPressClear, style: [styles.clearBtn, { opacity: isDateSelected() ? 0.3 : 1 }] },
            React.createElement(Text, { style: { fontFamily: font } }, clearButtonLabel || "Clear"))))));
};
export default DateRangePicker;
var styles = StyleSheet.create({
    titleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#EEE",
        marginBottom: 5,
        padding: 5,
        borderRadius: 5,
    },
    title: {
        fontSize: 20,
        flex: 1,
        textAlign: "center",
    },
    clearBtn: {
        paddingVertical: 3,
        paddingHorizontal: 10,
    },
    clearContainer: {
        flexDirection: "row-reverse",
        paddingVertical: 5,
    },
});
