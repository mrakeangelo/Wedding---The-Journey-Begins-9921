import React, { createContext, useContext, useState, useEffect } from 'react';

const WeddingDataContext = createContext();

export const useWeddingData = () => {
  const context = useContext(WeddingDataContext);
  if (!context) {
    throw new Error('useWeddingData must be used within a WeddingDataProvider');
  }
  return context;
};

const defaultData = {
  coupleNames: {
    bride: "Sarah",
    groom: "Michael"
  },
  chapters: {
    howWeMet: {
      title: "How We Met",
      content: "It was a rainy Tuesday evening at the local coffee shop. Sarah was reading her favorite book while Michael was working on his laptop. When the lights flickered during a storm, they found themselves sharing the only table with a working lamp...",
      date: "October 15, 2019",
      image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800&h=600&fit=crop"
    },
    firstDate: {
      title: "Our First Date",
      content: "Three weeks later, Michael finally gathered the courage to ask Sarah out. They went to the botanical gardens, where they spent hours walking among the roses and sharing stories about their dreams...",
      date: "November 8, 2019",
      image: "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=800&h=600&fit=crop"
    },
    proposal: {
      title: "The Proposal",
      content: "On a beautiful spring morning, Michael surprised Sarah with a picnic at the same botanical gardens where they had their first date. As the sun set behind the cherry blossoms, he got down on one knee...",
      date: "April 22, 2023",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop"
    }
  },
  weddingDetails: {
    date: "September 15, 2024",
    time: "4:00 PM",
    venue: "Rose Garden Estate",
    address: "123 Garden Lane, Bloom City, BC 12345",
    dressCode: "Garden Party Elegant"
  },
  timeline: [
    { time: "3:30 PM", event: "Guests Arrive & Cocktail Hour" },
    { time: "4:00 PM", event: "Ceremony Begins" },
    { time: "4:30 PM", event: "Cocktail Hour Continues" },
    { time: "6:00 PM", event: "Reception & Dinner" },
    { time: "8:00 PM", event: "First Dance" },
    { time: "9:00 PM", event: "Dancing & Celebration" },
    { time: "11:00 PM", event: "Last Dance" }
  ],
  registry: [
    { item: "Cozy Throw Blankets", description: "For movie nights together", icon: "Home" },
    { item: "Coffee Maker", description: "For morning rituals", icon: "Coffee" },
    { item: "Travel Fund", description: "For our honeymoon adventure", icon: "MapPin" },
    { item: "Garden Tools", description: "To grow our love garden", icon: "Flower" }
  ],
  quotes: [
    { text: "Sarah and Michael are perfect for each other. Their love story gives me hope!", author: "Emma, Best Friend" },
    { text: "I've never seen two people more meant to be together.", author: "David, Brother" },
    { text: "Their love is the kind that inspires everyone around them.", author: "Lisa, Sister" }
  ],
  rsvpResponses: [],
  guestbookEntries: [],
  isPrivate: false
};

export const WeddingDataProvider = ({ children }) => {
  const [weddingData, setWeddingData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('wedding-data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setWeddingData(prev => ({ ...prev, ...parsedData }));
      } catch (error) {
        console.error('Error parsing saved wedding data:', error);
      }
    }
  }, []);

  const updateWeddingData = (newData) => {
    setWeddingData(prev => {
      const updated = { ...prev, ...newData };
      localStorage.setItem('wedding-data', JSON.stringify(updated));
      return updated;
    });
  };

  const addRSVPResponse = (response) => {
    const updatedResponses = [...weddingData.rsvpResponses, { ...response, id: Date.now() }];
    updateWeddingData({ rsvpResponses: updatedResponses });
  };

  const addGuestbookEntry = (entry) => {
    const updatedEntries = [...weddingData.guestbookEntries, { ...entry, id: Date.now(), timestamp: new Date().toISOString() }];
    updateWeddingData({ guestbookEntries: updatedEntries });
  };

  return (
    <WeddingDataContext.Provider value={{
      weddingData,
      updateWeddingData,
      addRSVPResponse,
      addGuestbookEntry,
      isLoading,
      setIsLoading
    }}>
      {children}
    </WeddingDataContext.Provider>
  );
};