import React, { useState, useEffect, useRef } from 'react';
import { UserContext } from './userContext';
import { getMe } from '../api/auth/auth.api';
import axios from 'axios';

interface User {
    id: string,
    name: string,
    email: string,
    assistantName?: string,
    assistantImage?: string
}

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [frontendImage, setFrontendImage] = React.useState<string | null>(null)
    const [backendImage, setBackendImage] = React.useState<string | null>(null)
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const [listening, setListening] = useState<boolean>(false);
    const [speaking, setSpeaking] = useState<boolean>(false);
    const isSpeaking = useRef<boolean>(false);
    const isProcessing = useRef<boolean>(false);
    const recognitionRef = useRef<any>(null);
    const synth = window.speechSynthesis;

    // Keep a reference to the latest user state to avoid stale closure inside speech recognition
    const userRef = useRef<User | null>(user);
    useEffect(() => {
        userRef.current = user;
    }, [user]);

    const geminiResponse = async (command: string) => {
        try {
            const response = await axios.post("http://localhost:5000/api/user/asktoassistant", { command }, { withCredentials: true })
            if (response.data) {
                speak(response.data.response)
            }
            return response.data
        } catch (err) {
            console.log(err)
        }
    }

    const speak = (text: string) => {
        isSpeaking.current = true; // Synchronously block recognition to avoid race conditions
        setSpeaking(true);
        synth.cancel();
        const speech = new SpeechSynthesisUtterance(text);
        speech.voice = window.speechSynthesis.getVoices().find(voice => voice.name === "Google US English") || null;
        speech.pitch = 1;
        speech.rate = 1;

        speech.onstart = () => {
            isSpeaking.current = true;
            setSpeaking(true);
            if (recognitionRef.current) {
                try {
                    recognitionRef.current.stop();
                } catch (e) {
                    console.error("Error stopping recognition on speech start:", e);
                }
            }
        };

        const handleSpeechEnd = () => {
            isSpeaking.current = false;
            setSpeaking(false);
            setTimeout(() => {
                if (!isSpeaking.current && !isProcessing.current && recognitionRef.current) {
                    try {
                        recognitionRef.current.start();
                    } catch (e) {
                        console.error("Error starting recognition after speech end:", e);
                    }
                }
            }, 300);
        };

        speech.onend = handleSpeechEnd;
        speech.onerror = handleSpeechEnd;

        synth.speak(speech);
    }

    const handleCommand = (data) => {
        if (!data) return;
        const { type, userInput, response } = data
        speak(response)

        if (type === "google-search") {
            const query = encodeURIComponent(userInput)
            window.open(`https://www.google.com/search?q=${query}`)
        }
        else if (type === "youtube-search") {
            const query = encodeURIComponent(userInput)
            window.open(`https://www.youtube.com/results?search_query=${query}`)
        }
        else if (type === "youtube-play") {
            const query = encodeURIComponent(userInput)
            window.open(`https://www.youtube.com/watch?v=${query}`)
        }
        else if (type === "open-instagram") {
            window.open(`https://www.instagram.com/`)
        }
        else if (type === "open-facebook") {
            window.open(`https://www.facebook.com/`)
        }

        else {
            speak(response)
        }

    }

    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                setLoading(true)
                const data = await getMe()
                if (data && data.user) {
                    setUser(data.user)
                } else {
                    setUser(null)
                }
            } catch (err) {
                console.log(err)
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        getAndSetUser()
    }, [])


    useEffect(() => {
        const SpeechRecognitionClass =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognitionClass) {
            console.log("Speech Recognition not supported");
            return;
        }

        const recognition = new SpeechRecognitionClass();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognitionRef.current = recognition;
        const isRecognizingRef = { current: false };
        const hasPermissionError = { current: false };
        let isMounted = true;

        const safeRecognition = () => {
            if (
                isMounted &&
                !isSpeaking.current &&
                !isRecognizingRef.current &&
                !isProcessing.current &&
                !hasPermissionError.current
            ) {
                try {
                    recognition.start();
                    console.log("Speech recognition started");
                } catch (error) {
                    console.error("Failed to start speech recognition:", error);
                }
            }
        };

        recognition.onstart = () => {
            isRecognizingRef.current = true;
            console.log("Speech recognition started");
            if (isMounted) {
                setListening(true);
            }
        };

        recognition.onend = () => {
            isRecognizingRef.current = false;
            console.log("Speech recognition ended");
            if (isMounted) {
                setListening(false);
                safeRecognition();
            }
        };

        recognition.onerror = (event: any) => {
            console.error("Speech recognition error:", event.error);
            isRecognizingRef.current = false;
            if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
                hasPermissionError.current = true;
            }
        };

        recognition.onresult = async (event: any) => {
            const result = event.results[event.results.length - 1];
            if (!result.isFinal) return; // Only process when the user has finished speaking a phrase

            const transcript = result[0].transcript.trim();
            console.log("Transcript:", transcript);

            const assistantName = userRef.current?.assistantName?.toLowerCase() || "assistant";
            if (transcript.toLowerCase().includes(assistantName)) {
                isProcessing.current = true;
                if (recognitionRef.current) {
                    try {
                        recognitionRef.current.stop();
                    } catch (e) {
                        console.error("Error stopping recognition on processing trigger:", e);
                    }
                }

                try {
                    const data = await geminiResponse(transcript);
                    console.log("response", data);
                    if (data) {
                        handleCommand(data);
                    } else {
                        speak("Sorry, I encountered an error. Please try again.");
                    }
                } catch (error) {
                    console.error("Error handling speech query:", error);
                    speak("Sorry, I encountered an error. Please try again.");
                } finally {
                    isProcessing.current = false;
                    if (isMounted) {
                        setTimeout(() => {
                            safeRecognition();
                        }, 100);
                    }
                }
            }
        };

        // Start recognition safely
        safeRecognition();

        return () => {
            isMounted = false;
            if (recognitionRef.current) {
                try {
                    recognitionRef.current.stop();
                } catch (e) {
                    console.error("Error during recognition cleanup:", e);
                }
            }
        };
    }, [])

    const value = {
        user,
        setUser,
        loading,
        setLoading,
        frontendImage,
        setFrontendImage,
        backendImage,
        setBackendImage,
        selectedImage,
        setSelectedImage,
        geminiResponse,
        listening,
        speaking
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}   