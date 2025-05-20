import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import TokenGrid from "../components/TokenGrid";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

interface Token {
  id: string;
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  change24h: number;
  volume24h: number;
  image: string;
}

const MarketplacePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tokens, setTokens] = useState<Token[]>([
    {
      id: "1",
      name: "Doge Coin",
      symbol: "DOGE",
      price: 0.12,
      marketCap: 15000000,
      change24h: 5.2,
      volume24h: 2500000,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=doge",
    },
    {
      id: "2",
      name: "Shiba Inu",
      symbol: "SHIB",
      price: 0.00002,
      marketCap: 12000000,
      change24h: -2.5,
      volume24h: 1800000,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=shiba",
    },
    {
      id: "3",
      name: "Pepe Coin",
      symbol: "PEPE",
      price: 0.00001,
      marketCap: 8000000,
      change24h: 12.3,
      volume24h: 3200000,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=pepe",
    },
    {
      id: "4",
      name: "Moon Shot",
      symbol: "MOON",
      price: 0.05,
      marketCap: 5000000,
      change24h: 25.7,
      volume24h: 1200000,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=moon",
    },
    {
      id: "5",
      name: "Rocket Finance",
      symbol: "ROCKET",
      price: 0.35,
      marketCap: 22000000,
      change24h: -1.2,
      volume24h: 4500000,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=rocket",
    },
    {
      id: "6",
      name: "Diamond Hands",
      symbol: "DIAMOND",
      price: 1.25,
      marketCap: 35000000,
      change24h: 8.9,
      volume24h: 7800000,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=diamond",
    },
  ]);

  const sortTokens = (criteria: "price" | "marketCap" | "change24h") => {
    const sortedTokens = [...tokens].sort((a, b) => b[criteria] - a[criteria]);
    setTokens(sortedTokens);
  };

  const filteredTokens = tokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="font-bold text-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              CryptoFund
            </div>
          </div>
          <nav className="flex space-x-6">
            <Link
              to="/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              to="/marketplace"
              className="text-white border-b-2 border-pink-500 pb-1"
            >
              Marketplace
            </Link>
          </nav>
          <div>
            <Button
              variant="outline"
              className="border-purple-500 text-purple-500 hover:bg-purple-950 hover:text-white"
            >
              Connect Wallet
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            Token Marketplace
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Discover and invest in the latest meme coins and crowdfunded
            projects launching on our platform.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              type="text"
              placeholder="Search tokens..."
              className="pl-10 bg-gray-900 border-gray-800 focus:border-purple-500 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-gray-800 bg-gray-900 text-white hover:bg-gray-800"
                >
                  <Filter size={16} className="mr-2" />
                  Filter & Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-900 border-gray-800 text-white">
                <DropdownMenuItem
                  onClick={() => sortTokens("price")}
                  className="hover:bg-gray-800 cursor-pointer"
                >
                  <ArrowUpDown size={16} className="mr-2" /> Sort by Price
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => sortTokens("marketCap")}
                  className="hover:bg-gray-800 cursor-pointer"
                >
                  <ArrowUpDown size={16} className="mr-2" /> Sort by Market Cap
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => sortTokens("change24h")}
                  className="hover:bg-gray-800 cursor-pointer"
                >
                  <ArrowUpDown size={16} className="mr-2" /> Sort by 24h Change
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Token Grid */}
        <TokenGrid tokens={filteredTokens} />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="font-bold text-xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                CryptoFund
              </div>
              <p className="text-gray-400 text-sm mt-1">
                Raise money, Trade memes
              </p>
            </div>
            <div className="flex space-x-6">
              <Link
                to="/"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                to="/marketplace"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Marketplace
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} CryptoFund. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MarketplacePage;
