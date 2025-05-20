import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface TokenData {
  id: string;
  name: string;
  symbol: string;
  description: string;
  price: number;
  change24h: number;
  marketCap: number;
  imageUrl: string;
}

interface FeaturedTokensProps {
  tokens?: TokenData[];
}

const FeaturedTokens: React.FC<FeaturedTokensProps> = ({
  tokens = defaultTokens,
}) => {
  return (
    <div className="w-full py-12 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-white text-center">
          Featured{" "}
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            Tokens
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tokens.map((token) => (
            <motion.div
              key={token.id}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="overflow-hidden border border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={token.imageUrl}
                    alt={token.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-purple-600 hover:bg-purple-700">
                      {token.symbol}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-bold text-white">
                      {token.name}
                    </h3>
                    <span
                      className={`text-sm font-medium ${token.change24h >= 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {token.change24h >= 0 ? "+" : ""}
                      {token.change24h}%
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {token.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500">Price</p>
                      <p className="text-white font-medium">
                        ${token.price.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Market Cap</p>
                      <p className="text-white font-medium">
                        ${formatMarketCap(token.marketCap)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper function to format market cap
const formatMarketCap = (value: number): string => {
  if (value >= 1e9) {
    return (value / 1e9).toFixed(2) + "B";
  } else if (value >= 1e6) {
    return (value / 1e6).toFixed(2) + "M";
  } else if (value >= 1e3) {
    return (value / 1e3).toFixed(2) + "K";
  }
  return value.toString();
};

// Default tokens data
const defaultTokens: TokenData[] = [
  {
    id: "1",
    name: "MoonRocket",
    symbol: "MOON",
    description:
      "The first community-driven token focused on space exploration funding.",
    price: 0.0458,
    change24h: 12.5,
    marketCap: 4500000,
    imageUrl:
      "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800&q=80",
  },
  {
    id: "2",
    name: "DogeCube",
    symbol: "DOGC",
    description:
      "Meme token with real utility, supporting animal shelters worldwide.",
    price: 0.00023,
    change24h: -3.2,
    marketCap: 1200000,
    imageUrl:
      "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800&q=80",
  },
  {
    id: "3",
    name: "MetaVerse",
    symbol: "META",
    description:
      "Building the future of virtual reality experiences on the blockchain.",
    price: 2.34,
    change24h: 5.7,
    marketCap: 78000000,
    imageUrl:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&q=80",
  },
  {
    id: "4",
    name: "GreenChain",
    symbol: "GRN",
    description:
      "Eco-friendly blockchain project funding renewable energy initiatives.",
    price: 0.87,
    change24h: 8.3,
    marketCap: 32000000,
    imageUrl:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&q=80",
  },
  {
    id: "5",
    name: "PixelArt",
    symbol: "PIXEL",
    description:
      "NFT marketplace for digital artists to monetize pixel art creations.",
    price: 0.15,
    change24h: -1.8,
    marketCap: 5600000,
    imageUrl:
      "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&q=80",
  },
  {
    id: "6",
    name: "GameFi",
    symbol: "GAFI",
    description:
      "Play-to-earn gaming platform with multiple integrated blockchain games.",
    price: 3.21,
    change24h: 15.2,
    marketCap: 128000000,
    imageUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
  },
];

export default FeaturedTokens;
