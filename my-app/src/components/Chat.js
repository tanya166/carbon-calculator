import React, { useEffect } from 'react';

const Chat = () => {
  

  useEffect(() => {
    // Inject the Botpress WebChat script
    const injectScript = document.createElement('script');
    injectScript.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
    injectScript.async = true;
    document.body.appendChild(injectScript);

    injectScript.onload = () => {
  window.botpressWebChat.init({
      "composerPlaceholder": "Chat with Chatbot",
      "botConversationDescription": "Start the conversation with a hey!",
      "botId": "67755742-158d-497d-a390-767d80819a35",
      "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
      "messagingUrl": "https://messaging.botpress.cloud",
      "clientId": "67755742-158d-497d-a390-767d80819a35",
      "webhookId": "031b84f8-eb15-4eac-9ad9-9003b1d29925",
      "lazySocket": true,
      "themeName": "dusk",
      "botName": "Chatbot",
      "frontendVersion": "v1",
      "useSessionStorage": true,
      "theme": "dusk",
      "themeColor": "#344227",
      "allowedOrigins": []
    });
    };

    // Clean up scripts when the component unmounts
    return () => {
      document.body.removeChild(injectScript);
    };
  }, []);

  return <div></div>;
};

export default Chat;
