//global.d.ts
declare global {
	interface Window {
		Telegram: {
			WebApp: {
				BackButton: {
					isVisible: boolean;
					onClick: (callback: () => void) => void;
					offClick: (callback: () => void) => void;
					show: () => void;
					hide: () => void;
				};
				HapticFeedback: {
					impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
					notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
					selectionChanged: () => void;
				};
				expand: () => void;
				enableClosingConfirmation: () => void;
				initData: string; // Добавлено
				initDataUnsafe: {
					hash: string,
					user: {
						first_name: string,
						last_name: string,
						username: string,
						id: number,
						language_code: string,
					},
					start_param: string,
					startapp: string
				}; // Добавлено
				openTelegramLink: (url: string) => void; // Добавлено
				openLink: (url: string, options?: { try_instant_view: boolean }) => void;
				platform: string;
				version: string;
				openInvoice: (url: string, callback: (result: string) => void ) => void;
			};
		};
	}
}
export {};