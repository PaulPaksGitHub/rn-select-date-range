"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var moment_1 = __importDefault(require("moment"));
var Month_1 = __importDefault(require("./Month"));
var Button_1 = __importDefault(require("./Button"));
var DateRangePicker = function (_a) {
    var onSelectDateRange = _a.onSelectDateRange, responseFormat = _a.responseFormat, maxDate = _a.maxDate, minDate = _a.minDate, blockSingleDateSelection = _a.blockSingleDateSelection, font = _a.font, selectedDateContainerStyle = _a.selectedDateContainerStyle, selectedDateStyle = _a.selectedDateStyle, renderClearButton = _a.renderClearButton, clearButtonLabel = _a.clearButtonLabel;
    var _b = (0, react_1.useState)((0, moment_1.default)()), selectedDate = _b[0], setSelectedDate = _b[1];
    var _c = (0, react_1.useState)(null), firstDate = _c[0], setFirstDate = _c[1];
    var _d = (0, react_1.useState)(null), secondDate = _d[0], setSecondDate = _d[1];
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
    return (react_1.default.createElement(react_native_1.View, null,
        react_1.default.createElement(react_native_1.View, { style: styles.titleRow },
            react_1.default.createElement(Button_1.default, { font: font, disabled: minDate ? lastYear.isBefore(minDate, "months") : false, label: "< ".concat(lastYear.format("YYYY")), onPress: function () { return setSelectedDate(lastYear); } }),
            react_1.default.createElement(react_native_1.Text, { style: __assign(__assign({}, styles.title), { fontFamily: font }) }, selectedDate.format("YYYY")),
            react_1.default.createElement(Button_1.default, { font: font, disabled: maxDate ? nextYear.isAfter(maxDate, "months") : false, label: "".concat(nextYear.format("YYYY"), " >"), onPress: function () { return setSelectedDate(nextYear); }, align: "right" })),
        react_1.default.createElement(react_native_1.View, { style: styles.titleRow },
            react_1.default.createElement(Button_1.default, { font: font, disabled: minDate ? lastMonth.isBefore(minDate, "months") : false, label: "< ".concat(lastMonth.format("MMM")), onPress: function () { return setSelectedDate(lastMonth); } }),
            react_1.default.createElement(react_native_1.Text, { style: __assign(__assign({}, styles.title), { fontFamily: font }) }, selectedDate.format("MMMM")),
            react_1.default.createElement(Button_1.default, { font: font, disabled: maxDate ? nextMonth.isAfter(maxDate, "months") : false, label: "".concat(nextMonth.format("MMM"), " >"), onPress: function () { return setSelectedDate(nextMonth); }, align: "right" })),
        react_1.default.createElement(Month_1.default, { font: font, selectedDate: selectedDate, onSelectDate: onSelectDate, firstDate: firstDate, secondDate: secondDate, maxDate: maxDate, minDate: minDate, selectedDateContainerStyle: selectedDateContainerStyle, selectedDateStyle: selectedDateStyle }),
        react_1.default.createElement(react_native_1.View, { style: styles.clearContainer }, renderClearButton ? renderClearButton() : (react_1.default.createElement(react_native_1.Pressable, { disabled: isDateSelected(), onPress: onPressClear, style: [styles.clearBtn, { opacity: isDateSelected() ? 0.3 : 1 }] },
            react_1.default.createElement(react_native_1.Text, { style: { fontFamily: font } }, clearButtonLabel || "Clear"))))));
};
exports.default = DateRangePicker;
var styles = react_native_1.StyleSheet.create({
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
