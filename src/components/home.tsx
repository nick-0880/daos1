import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import FeaturedTokens from "./FeaturedTokens";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5 }}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center mr-3"
          >
            <span className="text-xl font-bold">C</span>
          </motion.div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
            CryptoFund
          </h1>
        </div>
        <nav>
          <ul className="flex space-x-8">
            <li>
              <Link
                to="/"
                className="text-white hover:text-purple-400 transition-colors font-medium"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/marketplace"
                className="text-white hover:text-purple-400 transition-colors font-medium"
              >
                Marketplace
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
            Raise money, Trade memes
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
        >
          The first decentralized platform connecting creators with investors
          through meme-powered tokenization.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link to="/marketplace">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-full"
            >
              Explore Marketplace
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Featured Tokens Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Featured Tokens
            </span>
          </h2>
          <Link
            to="/marketplace"
            className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
          >
            View all
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <FeaturedTokens />
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center mr-2">
                <span className="text-sm font-bold">C</span>
              </div>
              <span className="text-sm text-gray-400">
                © 2023 CryptoFund. All rights reserved.
              </span>
            </div>
            <div className="flex space-x-6">
              <Link
                to="/"
                className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
              >
                Terms
              </Link>
              <Link
                to="/"
                className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
              >
                Privacy
              </Link>
              <Link
                to="/"
                className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
