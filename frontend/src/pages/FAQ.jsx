import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { faqItems } from '../assets/assets.js';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const [searchItem, setSearchItem] = useState('');
  const [openIndex, setOpenIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false); // For fade-in animation on load

  // Trigger fade-in effect when the component mounts or search results change
  useEffect(() => {
    setIsVisible(false); // Reset visibility for the animation
    setTimeout(() => setIsVisible(true), 100); // Slight delay to trigger the animation
  }, []);

  const filteredFaqs = searchItem
    ? faqItems.filter(
        (item) =>
          item.question.toLowerCase().includes(searchItem.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchItem.toLowerCase())
      )
    : faqItems;

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-800 sm:text-4xl mb-2">
                Frequently Asked Questions
              </h1>
              <p className="text-lg md:text-xl text-gray-600">
                Find answers to common questions about using ParkSwift
              </p>
            </div>

            <div className="flex items-center mt-4 md:mt-0">
              <HelpCircle className="w-5 h-5 mr-2 text-indigo-500 transition-transform duration-300 hover:scale-105" />
              <span className="text-sm text-gray-600">
                Can't find what you're looking for?
                <Link to="/contact" className="ml-1 text-indigo-500 hover:underline hover:text-indigo-600 transition-colors duration-300" >
                  Contact us
                </Link>
              </span>
            </div>
          </div>

          <div className="mb-8">
            <input
              type="text"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              placeholder="Search question..."
              className="py-2 px-3 rounded-md border-2 max-w-md sm:w-1/2 placeholder-gray-400 text-gray-800 outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300 ease-in-out focus:border-indigo-400 focus:shadow-lg"
            />
          </div>

          {filteredFaqs.length > 0 ? (
            <div className="flex flex-col gap-4">
              {filteredFaqs.map((item, index) => (
                <div
                  key={index}
                  className={`border rounded-md bg-gray-50 px-4 shadow transition-all duration-500 ease-in-out transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  } hover:scale-[1.02] hover:shadow-md`}
                >
                  <button
                    className="flex justify-between items-center w-full p-4 text-left transition-colors duration-300 hover:bg-gray-100"
                    onClick={() => toggle(index)}
                  >
                    <span className="text-lg text-gray-700 font-medium">{item.question}</span>
                    {openIndex === index ? (
                      <ChevronUp className="text-gray-600 transition-transform duration-300" />
                    ) : (
                      <ChevronDown className="text-gray-600 transition-transform duration-300" />
                    )}
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="text-gray-500 p-4">{item.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className={`text-center py-12 transition-all duration-500 ease-in-out transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <HelpCircle className="w-10 h-10 mx-auto text-gray-400 transition-transform duration-300 hover:scale-110" />
              <h3 className="mt-4 text-lg font-medium text-gray-800">No results found</h3>
              <p className="mt-2 text-sm text-gray-400">
                We couldn't find any FAQs matching your search. Try different keywords or browse all questions.
              </p>

              {searchItem && (
                <button
                  onClick={() => setSearchItem('')}
                  className="mt-4 text-indigo-500 px-4 py-2 rounded-md hover:text-indigo-600 hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;