// pages/Payments/Payments.tsx
import React, { useState, useEffect } from "react";
import { paymentDarkBg, paymentLightBg } from "../../assets/images";
import { useParams } from "react-router";
import { Button } from "../../Components/Button/Button";
import { Skeleton } from "../../Components/Skeleton/Skeleton";
import { GoSun } from "react-icons/go";
import { IoMoonOutline } from "react-icons/io5";
import { FiCheck, FiLoader, FiAlertCircle, FiCopy } from "react-icons/fi";
import {
    Navbar,
    NavBody,
    MobileNav,
    MobileNavHeader,
    NavbarLogo,
} from "../../Components/Navbar/ResizableNavbar";
import axios from "axios";
import { logo } from "../../assets/icons";
import { useUsdcPayment, PaymentStatus } from "../../hooks/useUsdcPayment";
import { Wallet } from "lucide-react";

// Types
interface CustomField {
    fieldName: string;
    fieldType: string;
    required: boolean;
}

interface MerchantInfo {
    _id: string;
    walletAddress: string;
    wallets: any[];
}

interface PaymentData {
    _id: string;
    merchantId: MerchantInfo;
    linkId: string;
    amount: number;
    token: string;
    chain: string;
    description: string;
    customFields: CustomField[];
    isActive: boolean;
    isReusable: boolean;
    paymentCount: number;
    createdAt: string;
    updatedAt: string;
}

// Payment Step Component
interface PaymentStepProps {
    step: number;
    currentStep: number;
    title: string;
    description: string;
    status: "pending" | "active" | "completed" | "error";
}

const PaymentStep: React.FC<PaymentStepProps> = ({
    step,
    currentStep,
    title,
    description,
    status,
}) => {
    const getStepIcon = () => {
        switch (status) {
            case "completed":
                return <FiCheck className="w-4 h-4 text-white" />;
            case "active":
                return <FiLoader className="w-4 h-4 text-white animate-spin" />;
            case "error":
                return <FiAlertCircle className="w-4 h-4 text-white" />;
            default:
                return <span className="text-sm font-medium">{step}</span>;
        }
    };

    const getBgColor = () => {
        switch (status) {
            case "completed":
                return "bg-green-500";
            case "active":
                return "bg-[#E7562E]";
            case "error":
                return "bg-red-500";
            default:
                return "bg-gray-300 dark:bg-gray-600";
        }
    };

    return (
        <div className="flex items-start gap-3">
            <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${getBgColor()} text-white`}
            >
                {getStepIcon()}
            </div>
            <div className="flex-1">
                <p
                    className={`font-medium ${status === "active" || status === "completed"
                        ? "text-[#0e121b] dark:text-white"
                        : "text-gray-400"
                        }`}
                >
                    {title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            </div>
        </div>
    );
};

// Wallet Button Component
interface WalletButtonProps {
    isConnected: boolean;
    walletAddress: string | null;
    onConnect: () => void;
    onDisconnect: () => void;
    isLoading: boolean;
}

const WalletButton: React.FC<WalletButtonProps> = ({
    isConnected,
    walletAddress,
    onConnect,
    onDisconnect,
    isLoading,
}) => {
    const [copied, setCopied] = useState(false);

    const truncateAddress = (address: string) => {
        return `${address.slice(0, 4)}...${address.slice(-4)}`;
    };

    const copyToClipboard = async () => {
        if (!walletAddress) return;

        try {
            await navigator.clipboard.writeText(walletAddress);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy address:", err);
        }
    };

    if (isConnected && walletAddress) {
        return (
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-700 dark:text-green-400">
                        {truncateAddress(walletAddress)}
                    </span>
                    <button
                        onClick={copyToClipboard}
                        className="ml-1 p-1 hover:bg-green-200 dark:hover:bg-green-800/50 rounded transition-colors"
                        title={copied ? "Copied!" : "Copy address"}
                    >
                        {copied ? (
                            <FiCheck className="w-3.5 h-3.5 text-green-700 dark:text-green-400" />
                        ) : (
                            <FiCopy className="w-3.5 h-3.5 text-green-700 dark:text-green-400" />
                        )}
                    </button>
                </div>
                <button
                    onClick={onDisconnect}
                    className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                    Disconnect
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={onConnect}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-[#E7562E] hover:bg-[#E0793E] text-white rounded-lg transition-colors disabled:opacity-50"
        >
            {isLoading ? (
                <FiLoader className="w-4 h-4 animate-spin" />
            ) : (
                <Wallet className="w-4 h-4" />
            )}
            Connect Wallet
        </button>
    );
};

// Main Payments Component
const Payments = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showPaymentFlow, setShowPaymentFlow] = useState(false);
    const { id } = useParams();
    const url = `/api/payment-links/`;

    // Privy payment hook
    const {
        paymentState,
        isConnected,
        walletAddress,
        connectWallet,
        disconnectWallet,
        checkBalance,
        sendPayment,
        resetState,
    } = useUsdcPayment("mainnet"); // Use "devnet" for testing

    // Fetch balance when wallet connects
    useEffect(() => {
        if (isConnected && walletAddress && showPaymentFlow) {
            checkBalance().catch((error) => {
                console.error("Failed to fetch balance:", error);
            });
        }
    }, [isConnected, walletAddress, showPaymentFlow, checkBalance]);

    useEffect(() => {
        const fetchPaymentLink = async () => {
            try {
                const response = await axios.get(`${url}${id}`);
                console.log(response.data);
                setPaymentData(response.data);

                // Initialize form data with empty strings for each custom field
                if (response.data?.customFields) {
                    const initialFormData: Record<string, string> = {};
                    response.data.customFields.forEach((field: CustomField) => {
                        initialFormData[field.fieldName] = "";
                    });
                    setFormData(initialFormData);
                }
            } catch (error) {
                console.error("Error fetching payment link:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchPaymentLink();
        }
    }, [id]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    const handleInputChange = (fieldName: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
        if (errors[fieldName]) {
            setErrors((prev) => ({
                ...prev,
                [fieldName]: "",
            }));
        }
    };

    const formatFieldLabel = (fieldName: string): string => {
        return fieldName
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    const getInputType = (fieldType: string): string => {
        const typeMap: Record<string, string> = {
            text: "text",
            email: "email",
            number: "number",
            tel: "tel",
            phone: "tel",
            url: "url",
            date: "date",
        };
        return typeMap[fieldType.toLowerCase()] || "text";
    };

    const getPlaceholder = (fieldName: string, fieldType: string): string => {
        if (fieldType === "email") return "example@email.com";
        if (fieldType === "tel" || fieldType === "phone") return "+234 xxx xxx xxxx";
        return `Enter ${fieldName}`;
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        paymentData?.customFields?.forEach((field) => {
            if (field.required && !formData[field.fieldName]?.trim()) {
                newErrors[field.fieldName] = `${formatFieldLabel(field.fieldName)} is required`;
            }

            if (field.fieldType === "email" && formData[field.fieldName]) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(formData[field.fieldName])) {
                    newErrors[field.fieldName] = "Please enter a valid email address";
                }
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Show payment flow
        setShowPaymentFlow(true);
    };

    const handlePayment = async () => {
        if (!paymentData?.merchantId?.walletAddress || !paymentData?.amount) {
            return;
        }

        const signature = await sendPayment(
            paymentData.merchantId.walletAddress,
            paymentData.amount,
            async (sig) => {
                // On success, notify backend with proper data format
                try {
                    const paymentPayload = {
                        linkCode: id, // Payment link ID
                        txSignature: sig, // Transaction signature in base58 format
                        chain: paymentData.chain.toLowerCase(), // "solana"
                        amount: paymentData.amount,
                        token: paymentData.token, // "USDC"
                        fromAddress: walletAddress, // Payer's wallet address
                        toAddress: paymentData.merchantId.walletAddress, // Merchant's wallet address
                        customerData: formData, // Dynamic custom fields from the form
                        isConfirmed: true, // Transaction is confirmed
                    };

                    console.log("Sending payment notification to backend:", paymentPayload);

                    await axios.post(`/api/payments`, paymentPayload);

                    console.log("Backend notification successful");
                } catch (error) {
                    console.error("Failed to notify backend:", error);
                    // Log error details for debugging
                    if (axios.isAxiosError(error)) {
                        console.error("Backend error response:", error.response?.data);
                        console.error("Backend error status:", error.response?.status);
                    }
                }
            }
        );

        if (signature) {
            console.log("Payment successful:", signature);
        }
    };

    const getPaymentStepStatus = (
        stepStatus: PaymentStatus,
        targetStatuses: PaymentStatus[]
    ): "pending" | "active" | "completed" | "error" => {
        if (stepStatus === "error") return "error";
        if (targetStatuses.includes(stepStatus)) return "active";

        // Determine completion based on step order
        const statusOrder: PaymentStatus[] = [
            "idle",
            "connecting",
            "checking-balance",
            "confirming",
            "sending",
            "confirming-tx",
            "success",
        ];

        const currentIndex = statusOrder.indexOf(stepStatus);
        const targetIndex = Math.max(...targetStatuses.map((s) => statusOrder.indexOf(s)));

        if (currentIndex > targetIndex) return "completed";
        return "pending";
    };

    const renderDynamicFields = () => {
        if (!paymentData?.customFields || paymentData.customFields.length === 0) {
            return null;
        }

        return paymentData.customFields.map((field, index) => {
            const inputType = getInputType(field.fieldType);
            const fieldLabel = formatFieldLabel(field.fieldName);
            const hasError = !!errors[field.fieldName];

            return (
                <div key={`${field.fieldName}-${index}`}>
                    <label className="block font-figtree text-[16px] text-[#0E121B] dark:text-white mb-1">
                        {fieldLabel}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <input
                        type={inputType}
                        placeholder={getPlaceholder(field.fieldName, field.fieldType)}
                        value={formData[field.fieldName] || ""}
                        onChange={(e) => handleInputChange(field.fieldName, e.target.value)}
                        className={`placeholder:font-figtree w-full px-4 py-2 border ${hasError
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300 dark:border-gray-700"
                            } bg-white dark:bg-gray-800 dark:text-white text-[#0E121B] placeholder:text-[#99A0AE] focus:outline-none focus:shadow-md rounded-[10px] transition-colors`}
                        required={field.required}
                        disabled={showPaymentFlow}
                    />
                    {hasError && (
                        <p className="text-red-500 text-sm mt-1 font-figtree">
                            {errors[field.fieldName]}
                        </p>
                    )}
                </div>
            );
        });
    };

    const renderPaymentFlow = () => {
        const { status, error, txSignature, balance, estimatedFee } = paymentState;

        return (
            <div className="space-y-6">
                {/* Wallet Connection */}
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Wallet</span>
                    <WalletButton
                        isConnected={isConnected}
                        walletAddress={walletAddress}
                        onConnect={connectWallet}
                        onDisconnect={disconnectWallet}
                        isLoading={status === "connecting"}
                    />
                </div>

                {/* Balance Display */}
                {isConnected && balance !== null && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                Your USDC Balance
                            </span>
                            <span className="font-semibold text-[#0e121b] dark:text-white">
                                {balance.toFixed(2)} USDC
                            </span>
                        </div>
                        {estimatedFee !== null && (
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    Estimated Fee
                                </span>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    ~{estimatedFee.toFixed(6)} SOL
                                </span>
                            </div>
                        )}
                    </div>
                )}

                {/* Payment Steps */}
                {isConnected && status !== "idle" && (
                    <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <PaymentStep
                            step={1}
                            currentStep={1}
                            title="Checking Balance"
                            description="Verifying your USDC balance"
                            status={getPaymentStepStatus(status, ["checking-balance"])}
                        />
                        <PaymentStep
                            step={2}
                            currentStep={2}
                            title="Confirm Payment"
                            description={`Sending ${paymentData?.amount} USDC`}
                            status={getPaymentStepStatus(status, ["confirming", "sending"])}
                        />
                        <PaymentStep
                            step={3}
                            currentStep={3}
                            title="Processing"
                            description="Confirming transaction on Solana"
                            status={getPaymentStepStatus(status, ["confirming-tx"])}
                        />
                    </div>
                )}

                {/* Error Display */}
                {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <div className="flex items-start gap-3">
                            <FiAlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-red-700 dark:text-red-400 font-medium">
                                    Payment Failed
                                </p>
                                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                                    {error}
                                </p>
                                {/* Show helpful info for SOL-related errors */}
                                {(error.includes("SOL") || error.includes("simulation failed")) && (
                                    <div className="mt-3 p-3 bg-red-100 dark:bg-red-900/30 rounded text-xs text-red-700 dark:text-red-300">
                                        <p className="font-medium mb-1">💡 How to fix this:</p>
                                        <ol className="list-decimal ml-4 space-y-1">
                                            <li>Get at least 0.003 SOL (about $0.50 USD)</li>
                                            <li>Send it to your wallet: <span className="font-mono bg-red-200 dark:bg-red-800 px-1 rounded">{walletAddress?.slice(0, 8)}...{walletAddress?.slice(-4)}</span></li>
                                            <li>You can buy SOL on exchanges (Coinbase, Binance) or swap USDC for SOL on Jupiter</li>
                                        </ol>
                                    </div>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={resetState}
                            className="mt-3 text-sm text-red-600 dark:text-red-400 hover:underline"
                        >
                            Try again
                        </button>
                    </div>
                )}

                {/* Success Display */}
                {status === "success" && txSignature && (
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                        <div className="flex items-start gap-3">
                            <FiCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-green-700 dark:text-green-400 font-medium">
                                    Payment Successful!
                                </p>
                                <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                                    Your payment of {paymentData?.amount} USDC has been sent.
                                </p>
                                <a
                                    href={`https://solscan.io/tx/${txSignature}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-[#E7562E] hover:underline mt-2 inline-block"
                                >
                                    View on Solscan →
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                    {!isConnected ? (
                        <button
                            onClick={connectWallet}
                            className="flex-1 bg-[#E7562E] hover:bg-[#E0793E] text-white font-semibold py-3 rounded-[10px] transition-colors"
                        >
                            Connect Wallet to Pay
                        </button>
                    ) : status === "success" ? (
                        <button
                            onClick={() => {
                                setShowPaymentFlow(false);
                                resetState();
                            }}
                            className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-semibold py-3 rounded-[10px] transition-colors"
                        >
                            Done
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => {
                                    setShowPaymentFlow(false);
                                    resetState();
                                }}
                                disabled={status === "sending" || status === "confirming-tx"}
                                className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-semibold py-3 rounded-[10px] transition-colors disabled:opacity-50"
                            >
                                Back
                            </button>
                            <button
                                onClick={handlePayment}
                                disabled={
                                    !isConnected ||
                                    status === "sending" ||
                                    status === "confirming-tx" ||
                                    status === "checking-balance"
                                }
                                className="flex-1 bg-[#E7562E] hover:bg-[#E0793E] text-white font-semibold py-3 rounded-[10px] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {(status === "sending" || status === "confirming-tx") && (
                                    <FiLoader className="w-4 h-4 animate-spin" />
                                )}
                                {status === "sending" || status === "confirming-tx"
                                    ? "Processing..."
                                    : `Pay ${paymentData?.amount} USDC`}
                            </button>
                        </>
                    )}
                </div>
            </div>
        );
    };

    const SunIcon = GoSun as unknown as React.FC;
    const MoonIcon = IoMoonOutline as unknown as React.FC;

    return (
        <div
            style={{
                backgroundImage: `url(${darkMode ? paymentDarkBg : paymentLightBg})`,
            }}
            className="min-h-screen flex flex-col items-center bg-cover bg-no-repeat bg-top text-gray-800 px-4"
        >
            <Navbar className="top-4" scrollThreshold={50}>
                <NavBody>
                    <NavbarLogo />
                    <div className="flex items-center sm:gap-4 gap-2">
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={toggleDarkMode}
                            className="bg-gray-200 dark:bg-gray-700"
                        >
                            {darkMode ? <SunIcon /> : <MoonIcon />}
                        </Button>
                    </div>
                </NavBody>
                <MobileNav>
                    <MobileNavHeader>
                        <NavbarLogo />
                        <div className="flex items-center gap-2">
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={toggleDarkMode}
                                className="bg-gray-200 dark:bg-gray-700"
                            >
                                {darkMode ? <SunIcon /> : <MoonIcon />}
                            </Button>
                        </div>
                    </MobileNavHeader>
                </MobileNav>
            </Navbar>

            <div className="bg-white mt-40 dark:bg-[#0e121b] border border-[#E1E4EA] dark:border-[#2B303B] rounded-xl shadow-xl w-full max-w-[450px] p-6">
                {isLoading ? (
                    <>
                        {/* Header skeleton */}
                        <div className="flex justify-between items-center mb-4 pb-7 border-b border-gray-300 dark:border-gray-700">
                            <div className="flex items-center gap-2">
                                <img src={logo} alt="logo" className="max-s20:w-7" />
                                <div>
                                    <Skeleton className="h-6 w-24 mb-2" />
                                    <Skeleton className="h-4 w-40" />
                                </div>
                            </div>
                            <div className="text-right">
                                <Skeleton className="h-6 w-16 mb-2" />
                                <Skeleton className="h-4 w-12" />
                            </div>
                        </div>

                        {/* Form skeleton */}
                        <div className="space-y-4">
                            <div>
                                <Skeleton className="h-4 w-16 mb-1" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                            <div>
                                <Skeleton className="h-4 w-20 mb-1" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                            <div>
                                <Skeleton className="h-4 w-12 mb-1" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                            <Skeleton className="h-12 w-full mt-4" />
                        </div>
                    </>
                ) : paymentData ? (
                    <>
                        <div className="flex justify-between items-center mb-4 pb-7 border-b border-gray-300 dark:border-gray-700">
                            <div className="flex items-center gap-2">
                                <img src={logo} alt="logo" className="max-s20:w-7" />
                                <div>
                                    <h2 className="text-[24px] text-[#0e121b] dark:text-white font-figtree font-semibold tracking-text">
                                        {paymentData.description || "Payment"}
                                    </h2>
                                    <p className="text-[16px] text-[#525866] dark:text-[#99A0AE] tracking-text">
                                        {showPaymentFlow
                                            ? "Complete your payment"
                                            : "Fill in these details to pay"}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-[24px] font-calsans font-bold text-[#E85e38]">
                                    ${paymentData.amount?.toFixed(2) || "0.00"}
                                </div>
                                <div className="text-[16px] text-[#525866] dark:text-[#99A0AE]">
                                    {paymentData.token || "USDC"}
                                </div>
                            </div>
                        </div>

                        {showPaymentFlow ? (
                            renderPaymentFlow()
                        ) : (
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                {renderDynamicFields()}

                                <button
                                    type="submit"
                                    className="w-full bg-[#E7562E] hover:bg-[#E0793E] text-white font-semibold py-3 rounded-[10px] transition-colors"
                                >
                                    Continue to Payment
                                </button>
                            </form>
                        )}

                        {/* Chain indicator */}
                        <div className="mt-4 text-center">
                            <span className="text-sm text-[#525866] dark:text-[#99A0AE]">
                                Paying on{" "}
                                <span className="capitalize font-medium text-[#0e121b] dark:text-white">
                                    {paymentData.chain}
                                </span>
                            </span>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-red-500 font-figtree text-lg mb-2">
                            Payment link not found
                        </p>
                        <p className="text-[#525866] dark:text-[#99A0AE]">
                            This payment link may have expired or doesn't exist.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Payments;