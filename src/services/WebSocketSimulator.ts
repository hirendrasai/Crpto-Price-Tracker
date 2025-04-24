
import { store } from '../store/store';
import { updatePrices } from '../store/cryptoSlice';

const initialAssets = [
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
];

export class WebSocketSimulator {
  private interval: NodeJS.Timeout | null = null;

  start() {
    // Initialize with initial assets if store is empty
    if (store.getState().crypto.assets.length === 0) {
      store.dispatch(updatePrices(initialAssets));
    }

    this.interval = setInterval(() => {
      const updates = store.getState().crypto.assets.map(asset => ({
        id: asset.id,
        newPrice: asset.price * (1 + (Math.random() * 0.02 - 0.01))
      }));
      
      store.dispatch(updatePrices(updates));
    }, 2000);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}
