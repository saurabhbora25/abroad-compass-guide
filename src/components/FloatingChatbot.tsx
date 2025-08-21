import React, { useState } from 'react';

interface Country {
  name: string;
  tuition: number;
  living: number;
  currency: string;
  details: string;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const countries: Country[] = [
  {
    name: 'Germany',
    tuition: 300,
    living: 11000,
    currency: 'EUR',
    details: 'Germany offers excellent education with low tuition fees. Most public universities charge only administrative fees. High quality of life and strong job market for graduates.'
  },
  {
    name: 'Hungary',
    tuition: 3000,
    living: 8000,
    currency: 'EUR',
    details: 'Hungary provides affordable education in EU. Many programs taught in English. Beautiful historic cities and central European location.'
  },
  {
    name: 'Croatia',
    tuition: 2500,
    living: 7500,
    currency: 'EUR',
    details: 'Croatia offers quality education at reasonable costs. Beautiful Mediterranean country with growing international programs.'
  },
  {
    name: 'France',
    tuition: 2770,
    living: 12000,
    currency: 'EUR',
    details: 'France is renowned for its academic excellence and cultural richness. Many scholarships available for international students.'
  },
  {
    name: 'Denmark',
    tuition: 0,
    living: 15000,
    currency: 'EUR',
    details: 'Denmark offers free tuition for EU students. High standard of living and innovative teaching methods. Strong focus on sustainability.'
  }
];

const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [currentView, setCurrentView] = useState<'menu' | 'countries' | 'chat' | 'booking'>('menu');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I can help you with information about studying abroad, costs, visa requirements, and more. What would you like to know?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiProvider, setAiProvider] = useState<'deepseek' | 'openai' | 'mock'>('mock');

  // API Integration functions
  const callDeepSeekAPI = async (message: string): Promise<string> => {
    try {
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful study abroad consultant. Provide accurate information about studying overseas, visa processes, costs, and university applications.'
            },
            {
              role: 'user',
              content: message
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('DeepSeek API Error:', error);
      return 'Sorry, I encountered an error. Please try again later.';
    }
  };

  const callOpenAIAPI = async (message: string): Promise<string> => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful study abroad consultant. Provide accurate information about studying overseas, visa processes, costs, and university applications.'
            },
            {
              role: 'user',
              content: message
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return 'Sorry, I encountered an error. Please try again later.';
    }
  };

  const getMockResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('germany') || lowerMessage.includes('german')) {
      return "Germany is an excellent choice for studying abroad! Public universities have very low tuition fees (around €300 per semester). Living costs are approximately €11,000 per year. Germany offers strong programs in engineering, business, and sciences. Would you like more specific information about applications or visa requirements?";
    } else if (lowerMessage.includes('visa') || lowerMessage.includes('student visa')) {
      return "For student visas, you'll typically need: 1) Acceptance letter from university, 2) Proof of financial resources, 3) Health insurance, 4) Valid passport, 5) Academic transcripts. Processing time varies by country (2-8 weeks usually). I can help you with country-specific visa requirements!";
    } else if (lowerMessage.includes('cost') || lowerMessage.includes('fees') || lowerMessage.includes('expensive')) {
      return "Costs vary significantly by country. EU countries like Germany, Hungary, and Croatia offer affordable options (€10,000-15,000/year total). Countries like Denmark have free tuition but higher living costs. Would you like a detailed cost breakdown for specific countries?";
    } else if (lowerMessage.includes('scholarship') || lowerMessage.includes('funding')) {
      return "There are many scholarship opportunities! DAAD scholarships for Germany, Erasmus+ for EU, government scholarships, and university-specific grants. Merit-based and need-based options available. I can help you find scholarships for your chosen destination!";
    } else {
      return "That's a great question! As your study abroad consultant, I'm here to help with university applications, visa processes, cost planning, and country selection. Could you be more specific about what aspect of studying abroad you'd like to know about?";
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessageText = inputText;
    const userMessage: Message = {
      id: Date.now().toString(),
      text: userMessageText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    let aiResponse = '';
    
    try {
      switch (aiProvider) {
        case 'deepseek':
          aiResponse = await callDeepSeekAPI(userMessageText);
          break;
        case 'openai':
          aiResponse = await callOpenAIAPI(userMessageText);
          break;
        default:
          aiResponse = getMockResponse(userMessageText);
      }
    } catch (error) {
      aiResponse = 'Sorry, I encountered an error. Please try again later.';
    }

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: aiResponse,
      isUser: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleCountrySelect = (countryName: string) => {
    const country = countries.find(c => c.name === countryName);
    if (country) {
      setSelectedCountry(country);
      setCurrentView('countries');
      setIsOpen(true);
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: '1',
        text: 'Hello! I can help you with information about studying abroad, costs, visa requirements, and more. What would you like to know?',
        isUser: false,
        timestamp: new Date()
      }
    ]);
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setCurrentView('menu');
      setSelectedCountry(null);
    }
  };

  const showBooking = () => {
    setCurrentView('booking');
  };

  const backToMenu = () => {
    setCurrentView('menu');
    setSelectedCountry(null);
  };

  const goToChat = () => {
    setCurrentView('chat');
  };

  const goToCountries = () => {
    setCurrentView('countries');
  };

  return (
    <div>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChatbot}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Open chat"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-sm bg-white rounded-lg shadow-2xl z-50 border">
          <div className="bg-blue-600 text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Study Abroad Assistant</h3>
              <div className="flex items-center space-x-2">
                {currentView === 'chat' && (
                  <select
                    value={aiProvider}
                    onChange={(e) => setAiProvider(e.target.value as 'deepseek' | 'openai' | 'mock')}
                    className="text-xs bg-blue-500 border-none rounded px-2 py-1"
                  >
                    <option value="mock">Demo</option>
                    <option value="deepseek">DeepSeek</option>
                    <option value="openai">ChatGPT</option>
                  </select>
                )}
                <button
                  onClick={toggleChatbot}
                  className="text-white hover:text-gray-200"
                  aria-label="Close chat"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 max-h-96 overflow-y-auto">
            {/* Main Menu */}
            {currentView === 'menu' && (
              <div>
                <p className="text-gray-700 mb-4">
                  Hi! I'm your study abroad assistant. How can I help you today?
                </p>
                <div className="space-y-3">
                  <button
                    onClick={goToChat}
                    className="w-full text-left p-3 border rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                  >
                    <div className="font-medium text-gray-900 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                      </svg>
                      Ask Questions (AI Chat)
                    </div>
                    <div className="text-sm text-gray-600">Get personalized guidance about studying abroad</div>
                  </button>

                  <button
                    onClick={goToCountries}
                    className="w-full text-left p-3 border rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                  >
                    <div className="font-medium text-gray-900 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Country Information
                    </div>
                    <div className="text-sm text-gray-600">Explore costs and details for different countries</div>
                  </button>

                  <button
                    onClick={showBooking}
                    className="w-full text-left p-3 border rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors"
                  >
                    <div className="font-medium text-gray-900 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V7a2 2 0 012-2h4a2 2 0 012 2v0M8 7v8a2 2 0 002 2h4a2 2 0 002-2V7M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2"></path>
                      </svg>
                      Book Consultation
                    </div>
                    <div className="text-sm text-gray-600">Schedule a call with our experts</div>
                  </button>
                </div>
              </div>
            )}

            {/* AI Chat Interface */}
            {currentView === 'chat' && (
              <div className="h-80 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <button
                    onClick={backToMenu}
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    Back
                  </button>
                  <button
                    onClick={resetChat}
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    Clear Chat
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs p-3 rounded-lg text-sm ${
                          message.isUser
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about studying abroad..."
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={1}
                    disabled={isLoading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={isLoading || !inputText.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Countries View */}
            {currentView === 'countries' && !selectedCountry && (
              <div>
                <div className="flex items-center mb-4">
                  <button
                    onClick={backToMenu}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                  </button>
                  <h4 className="font-bold text-lg">Select a Country</h4>
                </div>
                <div className="space-y-2">
                  {countries.map((country) => (
                    <button
                      key={country.name}
                      onClick={() => setSelectedCountry(country)}
                      className="w-full text-left p-3 border rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    >
                      <div className="font-medium text-gray-900">{country.name}</div>
                      <div className="text-sm text-gray-600">
                        Total: {country.currency} {(country.tuition + country.living).toLocaleString()}/year
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Country Details */}
            {selectedCountry && currentView === 'countries' && (
              <div>
                <div className="flex items-center mb-4">
                  <button
                    onClick={() => setSelectedCountry(null)}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                  </button>
                  <h4 className="font-bold text-lg">{selectedCountry.name}</h4>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Tuition:</span>
                      <span>{selectedCountry.currency} {selectedCountry.tuition.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Living Costs:</span>
                      <span>{selectedCountry.currency} {selectedCountry.living.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-bold">
                        <span>Total per year:</span>
                        <span>{selectedCountry.currency} {(selectedCountry.tuition + selectedCountry.living).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                  {selectedCountry.details}
                </p>

                <div className="space-y-3">
                  <button
                    onClick={showBooking}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Book a Call with Expert
                  </button>
                </div>
              </div>
            )}

            {/* Booking Form */}
            {currentView === 'booking' && (
              <div>
                <div className="flex items-center mb-4">
                  <button
                    onClick={backToMenu}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                    aria-label="Back"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                  </button>
                  <h4 className="font-bold text-lg">Book Consultation</h4>
                </div>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {selectedCountry && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country of Interest
                      </label>
                      <input
                        type="text"
                        value={selectedCountry.name}
                        readOnly
                        className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Book Consultation
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Export function to be called by country tiles
export const openChatbotForCountry = (countryName: string) => {
  console.log(`Opening chatbot for ${countryName}`);
};

export default FloatingChatbot;