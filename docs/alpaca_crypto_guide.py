#!/usr/bin/env python3
"""
Alpaca Crypto Data Fetcher Guide
Complete guide for properly fetching crypto data through Alpaca API

Based on your existing implementation, here's how to properly get crypto info through Alpaca.
"""

import pandas as pd
import os
from datetime import datetime, timedelta
import requests
from typing import List, Dict, Optional

# Import your existing CryptoDataFetcher
# Assuming it's in the business intelligence data module
try:
    from docs.enhanced_crypto_data import CryptoDataFetcher, fetch_market_data
except ImportError:
    # If import fails, we'll define a simplified version
    print("⚠️ Could not import existing CryptoDataFetcher, using local version")

class AlpacaCryptoHelper:
    """Enhanced helper for Alpaca crypto operations."""
    
    def __init__(self, api_key: str = None, secret_key: str = None):
        """
        Initialize with Alpaca credentials.
        
        Args:
            api_key: Your Alpaca API key (or set ALPACA_API_KEY env var)
            secret_key: Your Alpaca secret key (or set ALPACA_SECRET_KEY env var)
        """
        self.api_key = api_key or os.getenv('APCA_API_KEY_ID', '')
        self.secret_key = secret_key or os.getenv('APCA_API_SECRET_KEY', '')
        
        if not self.api_key or not self.secret_key:
            print("❌ Missing Alpaca credentials!")
            print("Set environment variables: APCA_API_KEY_ID and APCA_API_SECRET_KEY")
            return
        
        self.headers = {
            'APCA-API-KEY-ID': self.api_key,
            'APCA-API-SECRET-KEY': self.secret_key
        }
        
        self.base_url = 'https://paper-api.alpaca.markets/v2'  # Paper trading
        self.data_url = 'https://data.alpaca.markets'
        
        print("✅ Alpaca crypto helper initialized successfully")
    
    def get_available_cryptocurrencies(self) -> List[Dict]:
        """Get all available cryptocurrencies from Alpaca."""
        try:
            url = f"{self.base_url}/assets"
            params = {
                'status': 'active',
                'asset_class': 'crypto'
            }
            
            response = requests.get(url, headers=self.headers, params=params)
            
            if response.status_code == 200:
                assets = response.json()
                print(f"🚀 Found {len(assets)} available crypto assets")
                
                # Pretty print some popular ones
                print("\n📈 Available crypto assets:")
                for asset in assets[:15]:  # Show first 15
                    status = "✅" if asset['tradable'] else "⏸️"
                    print(f"  {status} {asset['symbol']} - {asset['name']}")
                
                return assets
            else:
                print(f"❌ Error fetching assets: {response.status_code} - {response.text}")
                return []
                
        except Exception as e:
            print(f"❌ Exception fetching crypto assets: {e}")
            return []
    
    def fetch_crypto_data(
        self, 
        symbol: str, 
        start_date: str, 
        end_date: str = None, 
        timeframe: str = '1Day'
    ) -> pd.DataFrame:
        """
        Fetch historical crypto data from Alpaca.
        
        Args:
            symbol: Crypto symbol (e.g., 'BTC/USD', 'ETH/USD')
            start_date: Start date in 'YYYY-MM-DD' format
            end_date: End date in 'YYYY-MM-DD' format (optional, defaults to today)
            timeframe: Data timeframe ('1Min', '5Min', '15Min', '1Hour', '1Day')
        
        Returns:
            DataFrame with OHLCV data
        """
        try:
            if end_date is None:
                end_date = datetime.now().strftime('%Y-%m-%d')
            
            # Ensure symbol has correct format for Alpaca (BTC/USD, not BTC)
            if '/' not in symbol and len(symbol) <= 4:
                symbol = f"{symbol}/USD"
            
            url = f"{self.data_url}/v1beta3/crypto/us/bars"
            params = {
                'symbols': symbol,
                'timeframe': timeframe,
                'start': start_date,
                'end': end_date,
                'limit': 10000,
                'sort': 'asc'
            }
            
            print(f"📊 Fetching {symbol} data from {start_date} to {end_date} ({timeframe})")
            response = requests.get(url, headers=self.headers, params=params)
            
            if response.status_code == 200:
                data = response.json()
                
                if 'bars' in data and symbol in data['bars']:
                    bars = data['bars'][symbol]
                    
                    if not bars:
                        print(f"❌ No data returned for {symbol}")
                        return pd.DataFrame()
                    
                    # Convert to DataFrame
                    df = pd.DataFrame(bars)
                    df['timestamp'] = pd.to_datetime(df['t'])
                    df.set_index('timestamp', inplace=True)
                    
                    # Rename columns to standard format
                    df.rename(columns={
                        'o': 'Open',
                        'h': 'High', 
                        'l': 'Low',
                        'c': 'Close',
                        'v': 'Volume',
                        'n': 'Trade_Count',
                        'vw': 'VWAP'
                    }, inplace=True)
                    
                    # Add Adj Close
                    df['Adj Close'] = df['Close']
                    
                    print(f"✅ Successfully fetched {len(df)} bars for {symbol}")
                    print(f"📅 Data range: {df.index.min()} to {df.index.max()}")
                    print(f"💰 Price range: ${df['Low'].min():.2f} - ${df['High'].max():.2f}")
                    
                    return df
                else:
                    print(f"❌ No data found for symbol {symbol}")
                    print(f"Available symbols in response: {list(data.get('bars', {}).keys())}")
                    return pd.DataFrame()
            else:
                print(f"❌ API Error {response.status_code}: {response.text}")
                return pd.DataFrame()
                
        except Exception as e:
            print(f"❌ Exception fetching data for {symbol}: {e}")
            return pd.DataFrame()
    
    def get_crypto_quotes(self, symbols: List[str]) -> Dict:
        """
        Get real-time quotes for crypto symbols.
        
        Args:
            symbols: List of crypto symbols (e.g., ['BTC/USD', 'ETH/USD'])
        
        Returns:
            Dictionary with quote data
        """
        try:
            # Format symbols for Alpaca
            formatted_symbols = []
            for symbol in symbols:
                if '/' not in symbol and len(symbol) <= 4:
                    formatted_symbols.append(f"{symbol}/USD")
                else:
                    formatted_symbols.append(symbol)
            
            url = f"{self.data_url}/v1beta3/crypto/us/latest/quotes"
            params = {
                'symbols': ','.join(formatted_symbols)
            }
            
            response = requests.get(url, headers=self.headers, params=params)
            
            if response.status_code == 200:
                data = response.json()
                print(f"✅ Retrieved quotes for {len(formatted_symbols)} symbols")
                return data
            else:
                print(f"❌ Error getting quotes: {response.status_code} - {response.text}")
                return {}
                
        except Exception as e:
            print(f"❌ Exception getting quotes: {e}")
            return {}


def demonstrate_crypto_fetching():
    """Comprehensive demonstration of Alpaca crypto data fetching."""
    
    print("🚀 Alpaca Crypto Data Fetching Guide")
    print("=" * 50)
    
    try:
        # Initialize helper
        helper = AlpacaCryptoHelper()
        
        # Check if credentials are set
        if not helper.api_key or not helper.secret_key:
            print("\n🔧 Setup Instructions:")
            print("1. Get API credentials from https://alpaca.markets/")
            print("2. Set environment variables:")
            print("   export ALPACA_API_KEY='your_key_here'")
            print("   export ALPACA_SECRET_KEY='your_secret_here'")
            print("3. For Windows: set ALPACA_API_KEY=your_key_here")
            return
        
        # 1. Get available cryptocurrencies
        print("\n📋 Step 1: Getting available cryptocurrencies...")
        assets = helper.get_available_cryptocurrencies()
        
        if not assets:
            print("❌ Could not fetch crypto assets. Check your API credentials.")
            return
        
        # 2. Fetch Bitcoin data
        print("\n📊 Step 2: Fetching Bitcoin historical data...")
        btc_data = helper.fetch_crypto_data(
            symbol='BTC/USD',
            start_date='2024-01-01',
            timeframe='1Day'
        )
        
        if not btc_data.empty:
            print(f"\n📈 Bitcoin Data Summary:")
            print(f"  Rows: {len(btc_data)}")
            print(f"  Columns: {list(btc_data.columns)}")
            print(f"  Latest close: ${btc_data['Close'].iloc[-1]:,.2f}")
            print("\n📋 Sample data (last 3 rows):")
            print(btc_data[['Open', 'High', 'Low', 'Close', 'Volume']].tail(3))
        
        # 3. Show different timeframes
        print("\n⏰ Step 3: Different timeframes available:")
        timeframes = ['1Min', '5Min', '15Min', '30Min', '1Hour', '4Hour', '1Day']
        for tf in timeframes:
            print(f"  • {tf}")
        
        print("\n✅ Crypto data fetching demonstration complete!")
        
    except Exception as e:
        print(f"❌ Unexpected error: {e}")


def quick_example():
    """Quick example of fetching crypto data."""
    print("⚡ Quick Example:")
    print("-" * 20)
    
    # Using your existing CryptoDataFetcher
    try:
        from mcp_servers.business_intelligence.data.data import fetch_market_data
        
        # Fetch Bitcoin data
        btc_data = fetch_market_data(
            ticker='BTC/USD',
            start_date='2024-01-01',
            source='alpaca'  # Force Alpaca source
        )
        
        if not btc_data.empty:
            print(f"✅ Fetched {len(btc_data)} Bitcoin data points")
            print(f"Latest price: ${btc_data['Close'].iloc[-1]:,.2f}")
        else:
            print("❌ No data returned - check your setup")
            
    except ImportError:
        print("❌ Could not import your existing CryptoDataFetcher")
        print("Run the demonstration above instead")


if __name__ == "__main__":
    print("🔥 ALPACA CRYPTO GUIDE")
    print("=" * 30)
    
    # Show quick example first
    quick_example()
    
    print("\n" + "="*50)
    
    # Full demonstration
    demonstrate_crypto_fetching()
    
    print("\n💡 Key Points for Alpaca Crypto:")
    print("1. Use symbol format: 'BTC/USD' not just 'BTC'")
    print("2. Set proper environment variables for credentials")
    print("3. Use v1beta3 API endpoint for crypto data")
    print("4. Available timeframes: 1Min, 5Min, 15Min, 30Min, 1Hour, 4Hour, 1Day")
    print("5. Paper trading URL: https://paper-api.alpaca.markets")
    print("6. Data URL: https://data.alpaca.markets") 