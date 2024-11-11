import { useEffect } from "react";

const useTelegramWebApp = () => {
    useEffect(() => {
        const initTelegramWebApp = () => {
            if (window.Telegram && window.Telegram.WebApp) {
                window.Telegram.WebApp.expand();
                window.Telegram.WebApp.enableClosingConfirmation();
                console.log('Telegram WebApp initialized');
                console.log('Init Data:', window.Telegram.WebApp.initData);
                console.log('Init Data Unsafe:', window.Telegram.WebApp.initDataUnsafe);
                
                // window.Telegram.WebApp.openInvoice('', (status) => {
                //     console.log('Invoice status:', status);    
                // })
                    
                
            } else {
                console.error('Unable to retrieve launch parameters from any known source.');
            }
        };

        initTelegramWebApp();
    }, []);
};

export default useTelegramWebApp;