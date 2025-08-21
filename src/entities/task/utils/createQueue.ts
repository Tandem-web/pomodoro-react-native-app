import { intervalType, Task } from "../model/types";

export const createQueue = (settings: Task["settings"]): Task["task_state"]["queueIntervals"] => {
    const quenue: Task["task_state"]["queueIntervals"] = [];
    
    for(let i = 0; i < settings.workIntervals; i++){
        quenue.unshift(intervalType.WORK);
        if(i + 1 === settings.timeSettings.intervalsToLong){
            quenue.unshift(intervalType.LONG_BREAK);
        }else{
            quenue.unshift(intervalType.SHORT_BREAK);
        }

    }
    return quenue;
}