
import { TimerFormatTime } from "../utils/TimerFormatTime";
import useTimerStore from "./store";

export const useGetRemaingTime = (format: boolean = false) => {
    const remainingTime = useTimerStore(state => state.remaingTime);

    if(!remainingTime){
        return null;
    }

    if(format){
        const formatTime = TimerFormatTime(remainingTime);
        return formatTime;
    }
    
    return remainingTime;
};