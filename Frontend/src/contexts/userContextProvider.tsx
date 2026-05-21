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

    // Keep a reference to the latest user state to avoid stale closure inside speech recognition
    const userRef = useRef<User | null>(user);
    useEffect(() => {
        userRef.current = user;
    }, [user]);

    const geminiResponse = async (command: string) => {
        try {
            const response = await axios.post("http://localhost:5000/api/user/asktoassistant", { command }, { withCredentials: true })
            return response.data
        } catch (err) {
            console.log(err)
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
        recognition.onresult = async (event: any) => {
            const result = event.results[event.results.length - 1];
            if (!result.isFinal) return; // Only process when the user has finished speaking a phrase

            const transcript = result[0].transcript.trim();

            console.log(transcript)
            const assistantName = userRef.current?.assistantName?.toLowerCase() || "assistant";
            if (transcript.toLowerCase().includes(assistantName)) {
                const data = await geminiResponse(transcript)
                console.log("response", data)
            }
        }

        recognition.start();

        return () => {
            recognition.stop();
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
        geminiResponse
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}   