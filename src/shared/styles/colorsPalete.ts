const BaseColors = {
    white: '#f2f2f2',
    black: '#111111',
    transparent: 'transparent',

    gray100: '#F9FAFB',
    gray200: '#F3F4F6',
    gray300: '#E5E7EB',
    gray400: '#D1D5DB',
    gray500: '#9CA3AF',
    gray600: '#6B7280',
    gray700: '#4B5563',
    gray800: '#374151',
    gray900: '#1F2937',
};

const AppColors = {
    primary: '#4E4BEC',
    primary50: 'rgba(94, 91, 252, 0.5)',

    success: '#338A68',      // Успех
    warning: '#D5BF92',      // Предупреждение
    danger: '#BB687E',       // Ошибка/опасность
    info: '#3498DB',         // Информация

    background: '#22204A',
    surface: '#313152',
};

const TaskCardColors = {
    TaskCardStatus: {
        'low-priority': {
            borderColor: '#338A68',
            bgColor: 'rgba(51, 138, 104, 0.5)',
        },
        'medium-priority': {
            borderColor: '#D5BF92',
            bgColor: 'rgba(213, 191, 146, 0.5)',
        },
        'high-priority': {
            borderColor: '#BB687E',
            bgColor: 'rgba(187, 104, 126, 0.5)',
        },
    },

    TaskCardControll: {
        'close': {
            borderColor: BaseColors.gray600,
            iconColor: BaseColors.gray600,
            bgColor: 'rgba(107, 114, 128, 0.5)',
        },
        'play': {
            borderColor: AppColors.primary,
            iconColor: AppColors.primary,
            bgColor: AppColors.primary50,
        },
        'delete': {
            borderColor: AppColors.danger,
            iconColor: AppColors.danger,
            bgColor: 'rgba(187, 104, 126, 0.5)',
        },
        'complete': {
            borderColor: AppColors.success,
            iconColor: AppColors.success,
            bgColor: 'rgba(51, 138, 104, 0.5)',
        },
    },
};

export const Colors = {
    ...AppColors,
    ...BaseColors,
    ...TaskCardColors,
} as const;

export type BaseColorKey = keyof typeof BaseColors;
export type AppColorKey = keyof typeof AppColors;
export type PriorityColorKey = keyof typeof TaskCardColors;
