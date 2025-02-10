// chatbot-widget.js
(function() {
    // Default configuration options
    var defaults = {
      containerId: 'chatbot-container',  // The element ID where the widget will be injected
      cssUrl: 'https://dasabhi8.github.io/3d_Avatar/style.css',               // Local path to the CSS file
      videoPathidle: 'https://dasabhi8.github.io/3d_Avatar//video/idle_1734937479631.mp4',              // Local path to the video folder
      videoPathtalk: 'https://dasabhi8.github.io/3d_Avatar//video/id6d1.mp4'          // Local path to the video folder
    };
  
    // Merge user options with defaults
    function extend(target, source) {
      for (var key in source) {
        if (source.hasOwnProperty(key)) {
          target[key] = source[key];
        }
      }
      return target;
    }
  
    // Dynamically load an external CSS file
    function loadCSS(url) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      document.head.appendChild(link);
    }
  
    // Create the widget HTML and inject it into the container
    function createWidgetHTML(container, config) {
      container.innerHTML = `
        <!-- Chat Button -->
        <div class="chat-button" id="chat-button">
        <video id="avatar-videoa" autoplay
            src="${config.videoPathidle}" loop muted
            style="width: 100%; height: 100%; border-radius: 50%;"></video>
    </div>

    <div class="chat-container">
        <div class="top" >
            <button class="yarra-ai-close-btn" id="close-btn23" >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="color: #666;">
                    <path d="M18 6L6 18M6 6L18 18" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            
        </div>
        <div class="bootm" style="display: flex; width:100%; height:100%; ">
            <div class="l">
            
                <div class="avatar-wrapper">
                <div class="top-title">
                <h3>NiftyHMS Healthcare</h3> <span>Ai Assistant</span><hr style="margin:0; padding:0; width:60%; border:3px solid #e2e2e2; ">
                </div>
                    <div class="avatar-container">
                    
                        <video id="avatar-video" src="${config.videoPathtalk}" loop
                            muted
                            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: none;"></video>
                        <video id="avatar-idle" preload="auto"
                            src="${config.videoPathidle}" loop muted
                            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></video>
                    </div>
                    <div style="height:100px; background:transparent;" class="stlp"></div>
                </div>
            </div>
            <div class="r" >
                <div class="chat_history"></div>
                <div class="dropdown">
                    <form id="text-form">
                        <textarea id="text" rows="2" placeholder="Type your message here..."></textarea>
                        <div class="form-belowline">
                            <!-- <select id="predefined-questions">
                                <option value="" disabled selected>Select a question</option>
                                <option value="What’s the process for buying an office?">What’s the process for buying
                                    an office?</option>
                                <option value="I need a 3-bedroom apartment in California.">I need a 3-bedroom apartment
                                    in india.</option>
                            </select> -->
                            <!-- <button type="button" id="new-chat" title="New Chat"><svg style="width: 16px; height: 16px;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>New Chat</button> -->
                            <button type="button" id="new-chat" class="control-btn new-chat-btn" title="New Chat">
                            <svg class="btn-icon" viewBox="0 0 24 24">
                                <path d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                            </svg>
                            <span>New Chat</span>
                        </button>
                            <div class="form-belowline2">
                               <!-- <img src="<?php echo plugin_dir_url(__FILE__) . '/video/new-chat.png'; ?>"
                                    alt="new-chat" title="New Chat"> -->
                                <img src="./video/voice.png"
                                    alt="Voice_Mic_Icon" title="Voice Input">
                                <!-- <button type="submit" title="Submit">Send</button> -->
                                <button type="submit" class="control-btn send-btn" title="Send Message">
                                <svg class="btn-icon" viewBox="0 0 24 24">
                                    <path d="M22 2L11 13"></path>
                                    <path d="M22 2L15 22L11 13L2 9L22 2z"></path>
                                </svg>
                               </button>
                            </div>
                        </div>
                    </form>
                </div>
                <audio id="audio" hidden></audio>
            </div>
        </div>
    </div>
      `;
    }
  
    // Initialize widget functionality and event listeners
    function initWidget(options) {
      // Merge user-supplied options with defaults
      var config = extend(defaults, options || {});
  
      // Load the CSS file dynamically using the local path
      loadCSS(config.cssUrl);
  
      // Get or create the container element
      var container = document.getElementById(config.containerId);
      if (!container) {
        container = document.createElement('div');
        container.id = config.containerId;
        document.body.appendChild(container);
      }
  
      // Inject the widget HTML into the container
      createWidgetHTML(container, config);
  
      // Set up event listeners for widget interactivity
      const form = document.getElementById('text-form');
      const textArea = document.getElementById('text');
      const chatHistory = document.querySelector('.chat_history');
      const audio = document.getElementById('audio');
      const video = document.getElementById('avatar-video');
      const videoIdle = document.getElementById('avatar-idle');
      // const dropdown = document.getElementById('predefined-questions');
      const microphoneIcon = document.querySelector('img[alt="Voice_Mic_Icon"]');
      // const newchatIcon = document.querySelector('img[alt="new-chat"]');
      const newchatIcon = document.getElementById('new-chat');
      const chatButton = document.getElementById('chat-button');
      const chatContainer = document.querySelector('.chat-container');
      const closeButton = document.getElementById('close-btn23');
  
      video.playbackRate = 0.8; // Adjust video speed
      videoIdle.play();
      const audioURLs = [];
  
  
  // Toggle chat container visibility on button click
  function startnewchat() {
      chatContainer.classList.add('active');
      
      if (chatContainer.classList.contains('active')) {
          chatButton.style.transform = 'scale(0)';
      }
    
      // Get chat history
      let chatHistory = JSON.parse(localStorage.getItem("chat_history")) || [];
      
      // Check if welcome message exists in history
      const welcomeMessage = `Welcome to NiftyHMS! 👋 I'm your AI assistant, How can I assist you today?`;
  
      const welcomeExists = chatHistory.some(chat => 
          chat.user === 'bot' && chat.message === welcomeMessage
      );
  
      if (!welcomeExists) {
          appendChatBubble('bot', welcomeMessage);
          processAndPlayTTS(`Welcome to NiftyHMS! . I'm your AI assistant, How can I assist you today?`);
      }
  }
  chatButton.addEventListener('click', startnewchat);
  
  // Form submission handler
  form.addEventListener('submit', async (e) => {
          e.preventDefault();
          await searchtts();
      });
  
      async function searchtts(tftts) {
          const text = textArea.value.trim().toLowerCase();
          if (!text) {
              alert('Please enter some text.');
              return;
          }
          console.log('text', text);
  
          // Append user question to chat history
          appendChatBubble('user', text);
  
          const answerResponse = await fetchAnswer(text);
          if (!answerResponse.answer) {
              appendChatBubble('bot', answerResponse.error || 'Failed to get an answer.');
              return;
          }
          console.log('answerResponse', answerResponse.answer);
  
          // Extract text content using a temporary DOM element
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = answerResponse.answer.answer;
          const botRestts = tempDiv.textContent || tempDiv.innerText;
          console.log('botRestts', botRestts);
  
          const sentences = splitIntoSentences(botRestts);
          console.log('sentences', sentences);
          if (sentences.length) {
              const audioURLs = await fetchAudioURLs(sentences);
              const validAudioURLs = audioURLs.filter(Boolean);
  
  
              if (validAudioURLs.length) {
                  appendChatBubble('bot', answerResponse.answer.answer);
                  await playAudioWithVideo(validAudioURLs);
                  resetUI();
              } else {
                  alert('No audio could be generated.');
              }
          } else {
              alert('No valid sentences found.');
          }
      } 
  
  
  
  ////this is use ful for play the tts audio 
      async function processAndPlayTTS(textResponse) {
      if (!textResponse || typeof textResponse !== 'string') {
          alert('Invalid input text.');
          return;
      }
  
      // Split text into sentences
      const sentences = splitIntoSentences(textResponse);
  
      if (sentences.length) {
          try {
              // Fetch audio URLs for each sentence
              const audioURLs = await fetchAudioURLs(sentences);
              const validAudioURLs = audioURLs.filter(Boolean); // Remove any failed TTS responses
  
              if (validAudioURLs.length) {
                  await playAudioWithVideo(validAudioURLs); // Play audio with animation
                  resetUI(); // Reset UI if needed
              } else {
                  alert('No audio could be generated.');
              }
          } catch (error) {
              console.error('Error processing TTS:', error);
              alert('Error generating audio.');
          }
      } else {
          alert('No valid sentences found.');
      }
  }
  
      // Append a chat bubble to the chat history
      // function appendChatBubble(sender, message) {
      //     const bubble = document.createElement('div');
      //     bubble.className = `chat-bubble ${sender}`;
      //     bubble.innerHTML = message;
      //     chatHistory.appendChild(bubble);
      //     chatHistory.scrollTop = chatHistory.scrollHeight; // Auto-scroll to the latest message
      //     resetUI();
      //     storeChatMessage(sender, message);
      // }
      // -----------------------------
      // 2. Updating the Chat UI
      // -----------------------------
      // Append a new chat bubble OR update the last bubble if it’s a duplicate.
      function appendChatBubble(user, message) {
          const normalizedMessage = message.trim().toLowerCase();
          const lastBubble = chatHistory.lastElementChild;
          if (lastBubble && lastBubble.classList.contains(user)) {
              // Retrieve the original message text from a data attribute.
              let storedMessage = lastBubble.getAttribute("data-message");
              if (storedMessage && storedMessage.trim().toLowerCase() === normalizedMessage) {
                  // Duplicate: update count in the bubble.
                  let count = parseInt(lastBubble.getAttribute("data-count") || "1", 10);
                  count++;
                  lastBubble.setAttribute("data-count", count);
                  // Update displayed text to include the duplicate count.
                  lastBubble.innerHTML = storedMessage + ` (x${count})`;
                  // Also update the stored history.
                  storeChatMessage(user, message);
                  return;
              }
          }
          // If not a duplicate, create a new bubble.
          const bubble = document.createElement('div');
          bubble.className = `chat-bubble ${user}`;
          bubble.innerHTML = message;
          // Store the original message and count as data attributes.
          bubble.setAttribute("data-message", message);
          bubble.setAttribute("data-count", "1");
          chatHistory.appendChild(bubble);
          chatHistory.scrollTop = chatHistory.scrollHeight; // Auto-scroll to latest
          storeChatMessage(user, message);
      }
  
  
  
      // Fetch the answer from the server
      async function fetchAnswer(text) {
  
          try {
              const response = await fetch('http://192.168.1.74:5000/chat', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ question:text }),
              });
  
              if (!response.ok) throw new Error('Failed to fetch answer');
  
              const data = await response.json();
              if (!data.answer) {
                  return { error: "I don't understand your question. Please ask again." };
              }
              return { answer: data };
          } catch (error) {
              console.error('Error fetching answer:', error);
              return { error: "I don't understand your question. Please ask again." };
          }
      }
  
      // Split text into sentences
      function splitIntoSentences(text) {
          return text.split('.').map(sentence => sentence.trim()).filter(Boolean);
      }
  
      // Fetch audio URLs for the given sentences
      async function fetchAudioURLs(sentences) {
          const audioURLs = [];
  
          for (const sentence of sentences) {
              try {
                  const response = await fetch('http://192.168.1.73:5002/tts', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ text: sentence, language: "english", gender: "male" }),
                  });
  
                  const data = await response.json();
                  audioURLs.push(data.access_audio || null);
              } catch (error) {
                  console.error('Error fetching audio:', error);
                  audioURLs.push(`http://192.168.1.73:5002/audio/error.mp3` || null);
              }
          }
  
          return audioURLs;
      }
  
      // Play audio with the corresponding video
      async function playAudioWithVideo(audioURLs) {
          for (const audioURL of audioURLs) {
              video.currentTime = 0;
              videoIdle.style.display = 'none';
              video.style.display = 'block';
  
              audio.src = audioURL;
              video.play();
              audio.play();
  
              await new Promise((resolve) => {
                  audio.addEventListener('loadedmetadata', () => {
                      const switchTime = Math.max(audio.duration - 1, 0) * 1000; // Switch 1s before the end
                      setTimeout(() => {
                          video.currentTime = video.duration;
                          video.pause();
                      }, switchTime);
                  });
  
                  audio.addEventListener('ended', resolve, { once: true });
              });
          }
      }
  
      // Reset the UI to the idle state
      function resetUI() {
          textArea.value = '';
          video.style.display = 'none';
          videoIdle.style.display = 'block';
          videoIdle.play();
      }
  
  
  
      // Initialize SpeechRecognition API
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
  
      // Set language to English
      recognition.lang = 'en-US';
      recognition.continuous = false; // Stop recognition after a single phrase
      recognition.interimResults = false; // Wait for the complete result
  
      // Start recognition when the microphone icon is clicked
      microphoneIcon.addEventListener('click', () => {
          recognition.start();
      });
  
      // On speech recognition result
      recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript; // Get the recognized text
          textArea.value = transcript; // Set the text in the textarea
      };
  
      // Handle speech recognition errors
      recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
      };
  
      // Close chat container when close button is clicked
      closeButton.addEventListener('click', () => {
          chatContainer.classList.remove('active');
          chatButton.style.transform = 'scale(1)'; // Show button again
      });
  
      //store the message in the localstorage
      // function storeChatMessage(user, message) {
      // let chatHistory = JSON.parse(localStorage.getItem("chat_history")) || [];
  
      // // Check if the message already exists in chatHistory (prevent redundancy)
      // const isDuplicate = chatHistory.some(chat => chat.user === user && chat.message === message);
      // if (isDuplicate) {
      //     return; // Don't store the message if it's a duplicate
      // }
      
                                      
  //     chatHistory.push({ user, message });
  //     localStorage.setItem("chat_history", JSON.stringify(chatHistory));
  // }
  
  // -----------------------------
      // 1. Storing Chat History in localStorage
      // -----------------------------
      function storeChatMessage(user, message) {
          let storedHistory = JSON.parse(localStorage.getItem("chat_history")) || [];
          const normalizedMessage = message.trim().toLowerCase();
  
          // If there's at least one message, check the last one
          if (storedHistory.length > 0) {
              let lastEntry = storedHistory[storedHistory.length - 1];
              if (lastEntry.user === user && lastEntry.message.trim().toLowerCase() === normalizedMessage) {
                  // Duplicate detected: increment the count
                  lastEntry.count = (lastEntry.count || 1) + 1;
                  storedHistory[storedHistory.length - 1] = lastEntry;
                  localStorage.setItem("chat_history", JSON.stringify(storedHistory));
                  return;
              }
          }
          // Otherwise, add a new entry with count = 1
          storedHistory.push({ user, message, count: 1 });
          localStorage.setItem("chat_history", JSON.stringify(storedHistory));
      }
  newchatIcon.addEventListener('click', () => {
      localStorage.removeItem('chat_history'); // Clear localStorage chat history
      chatHistory.innerHTML = ''; // Clear the chat UI
      startnewchat();
  });
  
  function appendChatBubbleFromHistory(user, message, count) {
          const bubble = document.createElement('div');
          bubble.className = `chat-bubble ${user}`;
          let displayMessage = message;
          if (count > 1) {
              displayMessage += ` (x${count})`;
          }
          bubble.innerHTML = displayMessage;
          bubble.setAttribute("data-message", message);
          bubble.setAttribute("data-count", count);
          chatHistory.appendChild(bubble);
          chatHistory.scrollTop = chatHistory.scrollHeight;
      }
  
  //// Load chat history
      // function loadChatHistory() {
      //     let chatHistory = JSON.parse(localStorage.getItem("chat_history")) || [];
      //     chatHistory.forEach(({ user, message }) => {
      //         appendChatBubble(user, message); // Use appendChatBubble to display the message
      //     });
      // }
      function loadChatHistory() {
          let storedHistory = JSON.parse(localStorage.getItem("chat_history")) || [];
          // Clear current UI before loading (optional)
          chatHistory.innerHTML = "";
          storedHistory.forEach(entry => {
              appendChatBubbleFromHistory(entry.user, entry.message, entry.count);
          });
      }
  
  document.addEventListener("DOMContentLoaded", loadChatHistory);
  
      // // Add this debug function to test country mapping
      // async function testCountryMapping() {
      //     const countryMap = await getCountryMapping();
      //     console.log("Full Country Mapping:", countryMap);
      // }
  
      // Call the test function when page loads
      // document.addEventListener('DOMContentLoaded', function () {
      //     testCountryMapping(); // This will show all available countries in console
      // });
  
  
  ///////////////////////////////////////////////////////////////////extra functionality 
  
        // Add Enter key handler for textarea
        textArea.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              form.requestSubmit();
              resetUI();
          }
      });
  
      ///script for do onelime text area when there is less width
      function adjustTextareaRows() {
      const textarea = document.getElementById("text");
      if (window.innerWidth < 800) {
        textarea.rows = 1;
      } else {
        textarea.rows = 2;
      }
    }
  
    // Run on page load and window resize
    window.addEventListener("load", adjustTextareaRows);
    window.addEventListener("resize", adjustTextareaRows);
  
      // (Additional event listeners for chat functionality can be added here)
    }
  
    // Expose the init method so that it can be called externally
    window.ChatbotWidget = {
      init: initWidget
    };
  })();
  
