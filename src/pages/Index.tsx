
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import CryptoTable from '@/components/CryptoTable/CryptoTable';

const Index = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Cryptocurrency Prices</h1>
          <CryptoTable />
        </div>
      </div>
    </Provider>
  );
};

export default Index;
