import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const PhonePe = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const handlePhonePePayment = async () => {
        try {
            const response = await axios.post('/api/phonepe/create-order', {
                amount: 100,
                userId: "cm6dvrxd00000l703nnc9n959",
                courseId: "cm650gcsa000buol0svf1yy29",
            });

            if(response.data.success) {
                window.location.href = response.data.redirectUrl;
            } 
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        }
    }


    return (
        <button
            onClick={handlePhonePePayment}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
        >
            Pay with PhonePe
        </button>
    )
}
