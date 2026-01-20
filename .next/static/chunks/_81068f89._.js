(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/dashboard/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
(()=>{
    const e = new Error("Cannot find module 'react/jsx-dev-runtime'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module 'react'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/assets/icons'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/ui/dropdown-menu'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/constants'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/components/ui/Button'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/ui/SalesChart'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const page = ()=>{
    _s();
    const chains = [
        "All-Chains",
        "Arbitrum",
        "Base",
        "Starknet",
        "Solana"
    ];
    const durations = [
        "All-Time",
        "This Week",
        "Last Month",
        "Last 3 Months",
        "Last 6 Months",
        "Last Year"
    ];
    const [selectedChain, setSelectedChain] = useState(chains[0]);
    const [selectedDuration, setSelectedDuration] = useState(durations[0]);
    return /*#__PURE__*/ _jsxDEV("section", {
        className: "bg-[#141414] flex flex-col h-full w-full relative max-container",
        children: [
            /*#__PURE__*/ _jsxDEV("nav", {
                className: " flex justify-between py-7 items-center w-full",
                children: /*#__PURE__*/ _jsxDEV("div", {
                    className: "flex justify-between items-center w-full",
                    children: [
                        /*#__PURE__*/ _jsxDEV("div", {
                            className: "flex items-center justify-center sm:gap-4 gap-1",
                            children: [
                                /*#__PURE__*/ _jsxDEV(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: logoDark,
                                    alt: "logo",
                                    className: "w-7"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 50,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ _jsxDEV(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: logoTextDark,
                                    alt: "logoText",
                                    className: "w-25 mb-1"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 51,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/page.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ _jsxDEV(DropdownMenu, {
                            children: [
                                /*#__PURE__*/ _jsxDEV(DropdownMenuTrigger, {
                                    asChild: true,
                                    children: /*#__PURE__*/ _jsxDEV(Button, {
                                        variant: "normal",
                                        size: "normal",
                                        className: "p-3 bg-[#070707] border border-[#111111] text-[#FFF3EF] font-onest text-[14px] font-light whitespace-nowrap flex gap-3 items-center",
                                        children: [
                                            /*#__PURE__*/ _jsxDEV("p", {
                                                children: selectedChain
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/page.tsx",
                                                lineNumber: 61,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ _jsxDEV(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                src: arrowDown2,
                                                alt: "Arrow down"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/page.tsx",
                                                lineNumber: 62,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 56,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 55,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ _jsxDEV(DropdownMenuContent, {
                                    className: "w-40 bg-[#070707] text-[#FFF3EF] border-transparent font-onest",
                                    children: [
                                        /*#__PURE__*/ _jsxDEV(DropdownMenuLabel, {
                                            children: "Chains"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 66,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ _jsxDEV(DropdownMenuSeparator, {}, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 67,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        chains.map((chain)=>/*#__PURE__*/ _jsxDEV(DropdownMenuItem, {
                                                onClick: ()=>setSelectedChain(chain),
                                                children: chain
                                            }, chain, false, {
                                                fileName: "[project]/src/app/dashboard/page.tsx",
                                                lineNumber: 69,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 65,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/page.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/page.tsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ _jsxDEV("div", {
                className: "flex flex-col gap-5",
                children: [
                    /*#__PURE__*/ _jsxDEV("h2", {
                        className: "text-[#FFF3EF] text-[16px] font-onest font-medium",
                        children: "Welcome, Tumi"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ _jsxDEV("div", {
                        className: "flex  justify-between items-center",
                        children: [
                            /*#__PURE__*/ _jsxDEV("div", {
                                className: "flex justify-between w-full items-center",
                                children: /*#__PURE__*/ _jsxDEV("div", {
                                    className: "flex gap-2 items-center",
                                    children: [
                                        /*#__PURE__*/ _jsxDEV(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: spotify,
                                            alt: "sportify Icon"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 89,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ _jsxDEV("p", {
                                            className: "text-[#FFF3EF] font-onest text-[14px] font-light",
                                            children: "Total Payments Collected"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 90,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 88,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ _jsxDEV(DropdownMenu, {
                                children: [
                                    /*#__PURE__*/ _jsxDEV(DropdownMenuTrigger, {
                                        asChild: true,
                                        children: /*#__PURE__*/ _jsxDEV(Button, {
                                            variant: "normal",
                                            size: "normal",
                                            className: "p-0 bg-transparent border-transparent text-[#FFF3EF] font-onest text-[14px] font-light whitespace-nowrap flex gap-3 items-center",
                                            children: [
                                                /*#__PURE__*/ _jsxDEV("p", {
                                                    children: selectedDuration
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 104,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ _jsxDEV(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    src: arrowDown2,
                                                    alt: "Arrow down"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 105,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 99,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 98,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ _jsxDEV(DropdownMenuContent, {
                                        className: "w-40 bg-[#070707] text-[#FFF3EF] border-transparent font-onest",
                                        children: [
                                            /*#__PURE__*/ _jsxDEV(DropdownMenuLabel, {
                                                children: "Durations"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/page.tsx",
                                                lineNumber: 109,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ _jsxDEV(DropdownMenuSeparator, {}, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/page.tsx",
                                                lineNumber: 110,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            durations.map((duration)=>/*#__PURE__*/ _jsxDEV(DropdownMenuItem, {
                                                    onClick: ()=>setSelectedDuration(duration),
                                                    children: duration
                                                }, duration, false, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 112,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 108,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ _jsxDEV(SalesChart, {}, void 0, false, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 125,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ _jsxDEV("div", {
                className: "flex flex-col gap-3 w-full mt-6",
                children: [
                    /*#__PURE__*/ _jsxDEV("div", {
                        className: "flex flex-col gap-5",
                        children: [
                            /*#__PURE__*/ _jsxDEV("div", {
                                className: "flex gap-2 items-center",
                                children: [
                                    /*#__PURE__*/ _jsxDEV(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: stashIcon,
                                        alt: "stash Icon"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 161,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ _jsxDEV("p", {
                                        className: "text-[#FFF3EF] font-onest text-[14px] font-light",
                                        children: "Total Links Created"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 162,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 160,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ _jsxDEV("div", {
                                className: "flex w-full justify-between items-center px-3 py-5 bg-[#070707] border border-[#111111] rounded-[12px]",
                                children: [
                                    /*#__PURE__*/ _jsxDEV("p", {
                                        className: "text-[#FFF3EF] font-onest text-[16px] font-medium",
                                        children: "54 Links"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 167,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ _jsxDEV(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: arrowRight2,
                                        alt: "Arrow RIght"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 170,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 166,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ _jsxDEV("div", {
                        className: "flex justify-between items-center py-2",
                        children: [
                            /*#__PURE__*/ _jsxDEV("h2", {
                                className: "text-[#FFF3EF] font-onest text-[16px] font-medium",
                                children: "Recent Transactions"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 174,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ _jsxDEV("span", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ _jsxDEV("p", {
                                        className: "font-onest text-primary text-[14px] font-medium",
                                        children: "View all"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 178,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ _jsxDEV(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: rightArrow,
                                        alt: "right arrow"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 181,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 177,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 173,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ _jsxDEV("div", {
                        className: "flex flex-col gap-3",
                        children: TransactionDetails.map((item)=>/*#__PURE__*/ _jsxDEV("div", {
                                className: "flex w-full justify-between items-center px-3 py-5 bg-[#070707] border border-[#111111] rounded-[12px]",
                                children: [
                                    /*#__PURE__*/ _jsxDEV("div", {
                                        className: "flex gap-2 items-center",
                                        children: [
                                            /*#__PURE__*/ _jsxDEV(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                src: item.asseticon,
                                                alt: "Assest Icon"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/page.tsx",
                                                lineNumber: 191,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ _jsxDEV("p", {
                                                className: "font-onest font-light text-[12px] text-[#FFF3ef]",
                                                children: [
                                                    item.label,
                                                    " payed $",
                                                    item.amount
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/page.tsx",
                                                lineNumber: 192,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 190,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ _jsxDEV("p", {
                                        className: "text-[#5eeF63]",
                                        children: [
                                            "+",
                                            item.net,
                                            " USDC"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 196,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, item.label, true, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 186,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 184,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 158,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/page.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(page, "I7PgIwskupMLPTNSDgMlavfTm+U=");
const __TURBOPACK__default__export__ = page;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/image.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = (()=>{
    const e = new Error("Cannot find module './dist/shared/lib/image-external'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
}),
]);

//# sourceMappingURL=_81068f89._.js.map