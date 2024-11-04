![npm version](https://img.shields.io/npm/v/react-chatbot-starter?label=version&color=black) ![npm downloads](https://img.shields.io/npm/dt/react-chatbot-starter?labelColor=grey&color=black)



# React Chatbot Starter

A simple React component to quickly integrate a chatbot into your app. Customize the chatbot with your own API endpoint, bot key, and bot model.

## Installation

Install the package via npm:
```bash
npm install react-chatbot-starter
```

Import the **`Chatbot`** component into your project and use it like this:
```js
import React from 'react';
import Chatbot from 'react-chatbot-starter';

const App = () => {
  return (
    <Chatbot
      endpoint="https://your-ai-endpoint.com" 
      botkey="your-bot-key" 
      botmodel="your-model-name"
    />
  );
};

export default App;
```

## Props

- **`endpoint`** (string, required): The API endpoint for your chatbot.
- **`botkey`** (string, required): Your bot's API key.
- **`botmodel`** (string, required): The chatbot model you want to use.

## Features

- Easily customizable chatbot component for your app.
- Send and receive messages using an external AI API.
- Real-time typing indicators.
- User and AI message handling.

```js
<Chatbot 
  endpoint="https://api.example.com"
  botkey="your-api-key"
  botmodel="gpt-3.5-turbo"
/>
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
