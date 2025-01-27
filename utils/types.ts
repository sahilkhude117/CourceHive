

export type IconProps = {
    size?: number;
    className?: string;
}

export interface PhonePePayload {
    merchantId: string;
    merchantTransactionId: string;
    merchantUserId: string;
    amount: number;
    redirectUrl: string;
    redirectMode: string;
    callbackUrl: string;
    paymentInstrument: {
        type: string;
    }
}

export type TabType = 'home' | 'cources' | 'profile';