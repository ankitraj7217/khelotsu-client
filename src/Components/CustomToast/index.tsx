import React, { FC, useEffect, useState } from "react";
import { ICustomToastProps } from "../../Utils/customInterfaces";

import "./CustomToast.scss";

const CustomToast: FC<ICustomToastProps> = ({color, msg, setErrorMsg}) => {
    const [showToast, setShowToast] = useState(false);
    
    useEffect(() => {
        setShowToast(true);
    
        const timer = setTimeout(() => {
          setShowToast(false);
          setErrorMsg("");
        }, 4000);
    
        return () => clearTimeout(timer);
      }, [color, msg]);
      
    return (
        <section className={`khelotsu-custom-toast khelotsu-custom-toast${showToast ? "-show" : ""}`} style={{borderColor: color}}>
            {msg}
        </section>
    )
}

export default CustomToast;