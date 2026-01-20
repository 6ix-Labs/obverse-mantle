module.exports = [
"[project]/src/app/dashboard/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardLayout
]);
(()=>{
    const e = new Error("Cannot find module 'react/jsx-dev-runtime'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/assets/icons'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/ui/Button'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-rsc] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module 'next/link'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
;
;
;
function DashboardLayout({ children }) {
    return /*#__PURE__*/ _jsxDEV("main", {
        className: "bg-[#141414] w-[90%] h-screen m-auto relative max-container",
        children: [
            children,
            /*#__PURE__*/ _jsxDEV("div", {
                className: "fixed bottom-0 left-0 right-0 flex justify-center",
                children: /*#__PURE__*/ _jsxDEV("div", {
                    className: "w-full max-w-[600px] text-white flex flex-col items-center gap-5 py-5 px-4",
                    children: [
                        /*#__PURE__*/ _jsxDEV(Link, {
                            href: "/create",
                            className: "flex items-center justify-center",
                            children: /*#__PURE__*/ _jsxDEV(Button, {
                                size: "icon",
                                variant: "ghost",
                                className: "text-[#313131] bg-primary w-[60px] h-[60px] text-[30px] hover:opacity-55",
                                children: "+"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/layout.tsx",
                                lineNumber: 18,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/layout.tsx",
                            lineNumber: 17,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ _jsxDEV("div", {
                            className: "flex w-full items-center justify-between cursor-pointer bg-[#070707] px-3 py-2",
                            children: [
                                /*#__PURE__*/ _jsxDEV(Link, {
                                    href: "/dashboard",
                                    className: "flex flex-col items-center group focus:outline-none",
                                    children: [
                                        /*#__PURE__*/ _jsxDEV("div", {
                                            className: "w-6 h-6 transition invert-[0.6] group-hover:invert-0 group-focus:invert-0 group-active:invert-0",
                                            children: /*#__PURE__*/ _jsxDEV(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                src: HomeIcon,
                                                alt: "Home Icon"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/layout.tsx",
                                                lineNumber: 33,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/layout.tsx",
                                            lineNumber: 32,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ _jsxDEV("h1", {
                                            className: "text-[#8c8c8c] font-onest font-light text-[12px] transition group-hover:text-primary group-focus:text-primary group-active:text-primary",
                                            children: "Home"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/layout.tsx",
                                            lineNumber: 35,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/layout.tsx",
                                    lineNumber: 28,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ _jsxDEV(Link, {
                                    href: "/dashboard/transactions",
                                    className: "flex flex-col items-center group focus:outline-none",
                                    children: [
                                        /*#__PURE__*/ _jsxDEV("div", {
                                            className: "w-6 h-6 transition invert-[0.6] group-hover:invert-0 group-focus:invert-0 group-active:invert-0",
                                            children: /*#__PURE__*/ _jsxDEV(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                src: linkIcon,
                                                alt: "Transaction Icon"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/layout.tsx",
                                                lineNumber: 45,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/layout.tsx",
                                            lineNumber: 44,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ _jsxDEV("h1", {
                                            className: "text-[#8c8c8c] font-onest font-light text-[12px] transition group-hover:text-primary group-focus:text-primary group-active:text-primary",
                                            children: "Transactions"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/layout.tsx",
                                            lineNumber: 47,
                                            columnNumber: 14
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/layout.tsx",
                                    lineNumber: 40,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ _jsxDEV(Link, {
                                    href: "/dashboard/links",
                                    className: "flex flex-col items-center group focus:outline-none",
                                    children: [
                                        /*#__PURE__*/ _jsxDEV("div", {
                                            className: "w-6 h-6 transition invert-[0.6] group-hover:invert-0 group-focus:invert-0 group-active:invert-0",
                                            children: /*#__PURE__*/ _jsxDEV(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                                src: transactionIcon,
                                                alt: "Link Icon"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/layout.tsx",
                                                lineNumber: 56,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/layout.tsx",
                                            lineNumber: 55,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ _jsxDEV("h1", {
                                            className: "text-[#8c8c8c] font-onest font-light text-[12px] transition group-hover:text-primary group-focus:text-primary group-active:text-primary",
                                            children: "Links"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/layout.tsx",
                                            lineNumber: 58,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/layout.tsx",
                                    lineNumber: 51,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/layout.tsx",
                            lineNumber: 27,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/layout.tsx",
                    lineNumber: 16,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/layout.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/layout.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/image.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = (()=>{
    const e = new Error("Cannot find module './dist/shared/lib/image-external'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
}),
];

//# sourceMappingURL=_11d3fc1f._.js.map