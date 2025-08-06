export const TimerControllButtonType = {
    SideButton: 'side-button',
    MainButton: 'main-button',
} as const;

export type TimerControllButtonType = (typeof TimerControllButtonType)[keyof typeof TimerControllButtonType];

export const TimerControllIconType = {
    START: 'start',
    PAUSE: 'pause',
    STOP: 'stop',
    RELOAD: 'reload',
} as const;

export type TimerControllIconType = (typeof TimerControllIconType)[keyof typeof TimerControllIconType];