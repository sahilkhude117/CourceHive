
import Image from "next/image";
import { IconProps } from "../utils/types";
import courcehiveLogo from "@/public/images/courcehiveLogo.png";

const CourceHiveLogo: React.FC<IconProps> = ({ size , className = "" }) => {

    return (
        <Image
            src={courcehiveLogo}
            alt="Logo Of CourceHive"
            width={size}
            height={size}
        />
    );
};

export default CourceHiveLogo;