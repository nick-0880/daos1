import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  TrendingUpIcon,
  FilterIcon,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";

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

interface TokenGridProps {
  tokens?: Token[];
  onFilterClick?: () => void;
  onTokenSelect?: (token: Token) => void;
}

const TokenGrid: React.FC<TokenGridProps> = ({
  tokens = [
    {
      id: "1",
      name: "Pepe Coin",
      symbol: "PEPE",
      price: 0.00000123,
      marketCap: 1200000,
      change24h: 12.5,
      volume24h: 450000,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=pepe",
    },
    {
      id: "2",
      name: "Moon Shot",
      symbol: "MOON",
      price: 0.0345,
      marketCap: 5600000,
      change24h: -3.2,
      volume24h: 890000,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=moon",
    },
    {
      id: "3",
      name: "Rocket Finance",
      symbol: "RCKT",
      price: 1.23,
      marketCap: 45000000,
      change24h: 5.7,
      volume24h: 12000000,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=rocket",
    },
    {
      id: "4",
      name: "Diamond Hands",
      symbol: "DIAM",
      price: 0.567,
      marketCap: 23000000,
      change24h: -1.8,
      volume24h: 7800000,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=diamond",
    },
    {
      id: "5",
      name: "Crypto Kitty",
      symbol: "KITTY",
      price: 0.0089,
      marketCap: 3400000,
      change24h: 28.4,
      volume24h: 1200000,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=kitty",
    },
    {
      id: "6",
      name: "Doge Meme",
      symbol: "DOGE",
      price: 0.123,
      marketCap: 78000000,
      change24h: 4.2,
      volume24h: 34000000,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=doge",
    },
  ],
  onFilterClick = () => {},
  onTokenSelect = () => {},
}) => {
  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1000000000) {
      return `$${(marketCap / 1000000000).toFixed(2)}B`;
    } else if (marketCap >= 1000000) {
      return `$${(marketCap / 1000000).toFixed(2)}M`;
    } else if (marketCap >= 1000) {
      return `$${(marketCap / 1000).toFixed(2)}K`;
    } else {
      return `$${marketCap}`;
    }
  };

  const formatPrice = (price: number) => {
    if (price < 0.00001) {
      return `$${price.toExponential(2)}`;
    } else {
      return `$${price.toFixed(price < 0.01 ? 6 : 2)}`;
    }
  };

  return (
    <div className="w-full bg-black p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Marketplace</h2>
        <Button
          onClick={onFilterClick}
          variant="outline"
          className="border-purple-500 text-purple-400 hover:bg-purple-900/20"
        >
          <FilterIcon className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tokens.map((token) => (
          <motion.div
            key={token.id}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => onTokenSelect(token)}
          >
            <Card className="bg-gray-900 border-gray-800 overflow-hidden cursor-pointer hover:border-purple-500/50 transition-all duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 p-0.5">
                      <img
                        src={token.image}
                        alt={token.name}
                        className="h-full w-full rounded-full bg-gray-800"
                      />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-bold text-white">{token.name}</h3>
                      <p className="text-gray-400 text-sm">{token.symbol}</p>
                    </div>
                  </div>
                  <Badge
                    variant={token.change24h >= 0 ? "default" : "destructive"}
                    className={`${token.change24h >= 0 ? "bg-green-500/20 text-green-400 hover:bg-green-500/30" : "bg-red-500/20 text-red-400 hover:bg-red-500/30"}`}
                  >
                    <span className="flex items-center">
                      {token.change24h >= 0 ? (
                        <ArrowUpIcon className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownIcon className="h-3 w-3 mr-1" />
                      )}
                      {Math.abs(token.change24h)}%
                    </span>
                  </Badge>
                </div>

                <CardContent className="p-0">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Price</p>
                      <p className="text-white font-medium">
                        {formatPrice(token.price)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Market Cap</p>
                      <p className="text-white font-medium">
                        {formatMarketCap(token.marketCap)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-1">24h Volume</p>
                      <p className="text-white font-medium">
                        {formatMarketCap(token.volume24h)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Trend</p>
                      <p className="text-white font-medium flex items-center">
                        <TrendingUpIcon
                          className={`h-4 w-4 mr-1 ${token.change24h >= 0 ? "text-green-400" : "text-red-400"}`}
                        />
                        {token.change24h >= 0 ? "Bullish" : "Bearish"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </div>

              <div className="h-1 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"></div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TokenGrid;
