
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { WebSocketSimulator } from '@/services/WebSocketSimulator';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartLine, ArrowUp, ArrowDown } from 'lucide-react';
import { PriceChart } from '@/components/ui/priceChart';

const formatNumber = (num: number, decimals = 2) => {
  if (num >= 1e9) return `$${(num / 1e9).toFixed(decimals)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(decimals)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(decimals)}K`;
  return `$${num.toFixed(decimals)}`;
};

const ChangeIndicator = ({ value }: { value: number }) => {
  const color = value > 0 ? 'text-green-600' : value < 0 ? 'text-red-600' : 'text-gray-600';
  const Icon = value > 0 ? ArrowUp : ArrowDown;
  
  return (
    <span className={`flex items-center gap-1 ${color}`}>
      {value !== 0 && <Icon className="w-4 h-4" />}
      {value.toFixed(2)}%
    </span>
  );
};

const CryptoTable = () => {
  const assets = useSelector((state: RootState) => state.crypto.assets);
  const [priceHistory, setPriceHistory] = React.useState<Map<number, Array<{price: number, timestamp: number}>>>(new Map());
  
  useEffect(() => {
    const ws = new WebSocketSimulator();
    ws.start();

    // Initialize price history for each asset
    const initialHistory = new Map();
    assets.forEach(asset => {
      initialHistory.set(asset.id, [{
        price: asset.price,
        timestamp: Date.now()
      }]);
    });
    setPriceHistory(initialHistory);

    return () => ws.stop();
  }, []);

  // Update price history when assets change
  useEffect(() => {
    setPriceHistory(prev => {
      const newHistory = new Map(prev);
      assets.forEach(asset => {
        const assetHistory = newHistory.get(asset.id) || [];
        if (assetHistory.length >= 50) { // Keep last 50 points
          assetHistory.shift();
        }
        assetHistory.push({
          price: asset.price,
          timestamp: Date.now()
        });
        newHistory.set(asset.id, assetHistory);
      });
      return newHistory;
    });
  }, [assets]);

  return (
    <Card className="w-full overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">1h %</TableHead>
              <TableHead className="text-right">24h %</TableHead>
              <TableHead className="text-right">7d %</TableHead>
              <TableHead className="text-right">Market Cap</TableHead>
              <TableHead className="text-right">Volume(24h)</TableHead>
              <TableHead className="text-right">Circulating Supply</TableHead>
              <TableHead className="text-right">Last 7 Days</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell>{asset.id}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <img
                    src={`https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/${asset.symbol.toLowerCase()}.png`}
                    alt={asset.name}
                    className="w-6 h-6"
                    onError={(e) => {
                      // Fallback to a generic crypto icon if the specific one fails to load
                      (e.target as HTMLImageElement).src = 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/generic.png';
                    }}
                  />
                  <span className="font-medium">{asset.name}</span>
                  <span className="text-gray-500">{asset.symbol}</span>
                </TableCell>
                <TableCell className="text-right font-medium">
                  ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </TableCell>
                <TableCell className="text-right">
                  <ChangeIndicator value={asset.change1h} />
                </TableCell>
                <TableCell className="text-right">
                  <ChangeIndicator value={asset.change24h} />
                </TableCell>
                <TableCell className="text-right">
                  <ChangeIndicator value={asset.change7d} />
                </TableCell>
                <TableCell className="text-right">{formatNumber(asset.marketCap)}</TableCell>
                <TableCell className="text-right">{formatNumber(asset.volume24h)}</TableCell>
                <TableCell className="text-right">
                  {asset.circulatingSupply.toFixed(2)}M {asset.symbol}
                </TableCell>
                <TableCell className="text-right w-[200px]">
                  <PriceChart 
                    data={priceHistory.get(asset.id) || []} 
                    color={asset.change7d >= 0 ? "#22c55e" : "#ef4444"}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default CryptoTable;
