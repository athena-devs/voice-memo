import { Bars } from "react-loader-spinner";
import { useTheme } from "styled-components";

export const ModdedBars = ()=>{
    const theme = useTheme()
    return(
    <Bars
        height="80"
        width="80"
        color={theme.primary}
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
    />
    )
      
}