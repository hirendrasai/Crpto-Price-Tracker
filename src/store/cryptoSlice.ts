
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CryptoAsset {
  id: number;
  name: string;
  symbol: string;
  price: number;
  change1h: number;
  change24h: number;
  change7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  logo: string;
}

interface CryptoState {
  assets: CryptoAsset[];
}

const initialState: CryptoState = {
  assets: [
    {
      id: 1,
      name: "Bitcoin",
      symbol: "BTC",
      price: 93759.48,
      change1h: 0.43,
      change24h: 0.93,
      change7d: 11.11,
      marketCap: 1861618902186,
      volume24h: 43874950847,
      circulatingSupply: 19.85,
      logo: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/btc.png"
    },
    {
      id: 2,
      name: 'Ethereum',
      symbol: 'ETH',
      price: 1802.46,
      change1h: 0.60,
      change24h: 3.21,
      change7d: 13.68,
      marketCap: 217581279327,
      volume24h: 23547469307,
      circulatingSupply: 120.71,
      maxSupply: null,
      logo: '/crypto-logos/eth.png'
    },
    {
      id: 3,
      name: 'Tether',
      symbol: 'USDT',
      price: 1.00,
      change1h: 0.00,
      change24h: 0.00,
      change7d: 0.04,
      marketCap: 145320022085,
      volume24h: 92288882007,
      circulatingSupply: 145.27,
      maxSupply: null,
      logo: '/crypto-logos/usdt.png'
    },
    {
      id: 4,
      name: 'XRP',
      symbol: 'XRP',
      price: 2.22,
      change1h: 0.46,
      change24h: 0.54,
      change7d: 6.18,
      marketCap: 130073814966,
      volume24h: 5131481491,
      circulatingSupply: 58.39,
      maxSupply: 100,
      logo: '/crypto-logos/xrp.png'
    },
    {
      id: 5,
      name: 'BNB',
      symbol: 'BNB',
      price: 606.65,
      change1h: 0.09,
      change24h: -1.20,
      change7d: 3.73,
      marketCap: 85471956947,
      volume24h: 1874281784,
      circulatingSupply: 140.89,
      maxSupply: 200,
      logo: '/crypto-logos/bnb.png'
    },
    {
      id: 6,
      name: "Solana",
      symbol: "SOL",
      price: 151.51,
      change1h: 0.53,
      change24h: 1.26,
      change7d: 14.74,
      marketCap: 78381958631,
      volume24h: 4881674486,
      circulatingSupply: 517.31,
      logo: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/sol.png"
    }
  ]
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updatePrices: (state, action: PayloadAction<{ id: number; newPrice: number }[]>) => {
      action.payload.forEach(update => {
        const asset = state.assets.find(a => a.id === update.id);
        if (asset) {
          const oldPrice = asset.price;
          asset.price = update.newPrice;
          // Update change percentages
          asset.change1h = ((update.newPrice - oldPrice) / oldPrice) * 100;
        }
      });
    }
  }
});

export const { updatePrices } = cryptoSlice.actions;
export default cryptoSlice.reducer;
