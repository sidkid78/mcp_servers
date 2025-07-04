import pandas as pd
import numpy as np
import yfinance as yf
import ta  # pip install ta
import requests
import os
from datetime import datetime, timedelta
from typing import Optional, List, Dict, Any
import warnings
warnings.filterwarnings('ignore')

# Alpaca API configuration
ALPACA_API_KEY = os.getenv('ALPACA_API_KEY', '')
ALPACA_SECRET_KEY = os.getenv('ALPACA_SECRET_KEY', '')
ALPACA_BASE_URL = 'https://paper-api.alpaca.markets'  # Use paper trading for testing
ALPACA_DATA_URL = 'https://data.alpaca.markets'

class CryptoDataFetcher:
    """Enhanced crypto data fetcher with Alpaca and Yahoo Finance support."""
    
    def __init__(self, alpaca_key: str = None, alpaca_secret: str = None):
        self.alpaca_key = alpaca_key or ALPACA_API_KEY
        self.alpaca_secret = alpaca_secret or ALPACA_SECRET_KEY
        self.headers = {
            'APCA-API-KEY-ID': self.alpaca_key,
            'APCA-API-SECRET-KEY': self.alpaca_secret
        }
    
    def get_available_crypto_assets(self) -> List[Dict]:
        """Get all available crypto assets from Alpaca."""
        try:
            url = f"{ALPACA_BASE_URL}/v2/assets"
            params = {
                'status': 'active',
                'asset_class': 'crypto'
            }
            
            response = requests.get(url, headers=self.headers, params=params)
            
            if response.status_code == 200:
                assets = response.json()
                print(f"✅ Found {len(assets)} available crypto assets from Alpaca")
                return assets
            else:
                print(f"❌ Alpaca API error: {response.status_code}")
                return []
                
        except Exception as e:
            print(f"❌ Error fetching Alpaca crypto assets: {e}")
            return []
    
    def fetch_alpaca_crypto_data(self, symbol: str, start_date: str, end_date: str = None, timeframe: str = '1Day') -> pd.DataFrame:
        """Fetch crypto data from Alpaca."""
        try:
            if end_date is None:
                end_date = datetime.now().strftime('%Y-%m-%d')
            
            url = f"{ALPACA_DATA_URL}/v1beta3/crypto/us/bars"
            params = {
                'symbols': symbol,
                'timeframe': timeframe,
                'start': start_date,
                'end': end_date,
                'limit': 10000,
                'sort': 'asc'
            }
            
            response = requests.get(url, headers=self.headers, params=params)
            
            if response.status_code == 200:
                data = response.json()
                
                if 'bars' in data and symbol in data['bars']:
                    bars = data['bars'][symbol]
                    
                    df = pd.DataFrame(bars)
                    df['timestamp'] = pd.to_datetime(df['t'])
                    df.set_index('timestamp', inplace=True)
                    
                    # Rename columns to standard OHLCV format
                    df.rename(columns={
                        'o': 'Open',
                        'h': 'High', 
                        'l': 'Low',
                        'c': 'Close',
                        'v': 'Volume',
                        'n': 'Trade_Count',
                        'vw': 'VWAP'
                    }, inplace=True)
                    
                    # Add Adj Close for compatibility
                    df['Adj Close'] = df['Close']
                    
                    print(f"✅ Fetched {len(df)} {timeframe} bars for {symbol} from Alpaca")
                    return df
                else:
                    print(f"❌ No data found for {symbol}")
                    return pd.DataFrame()
            else:
                print(f"❌ Alpaca data API error: {response.status_code} - {response.text}")
                return pd.DataFrame()
                
        except Exception as e:
            print(f"❌ Error fetching Alpaca data for {symbol}: {e}")
            return pd.DataFrame()
    
    def fetch_yahoo_crypto_data(self, symbol: str, start_date: str, end_date: str = None) -> pd.DataFrame:
        """Fetch crypto data from Yahoo Finance with error handling."""
        try:
            # Add -USD suffix for crypto if not present
            if not symbol.endswith('-USD') and not symbol.endswith('USD'):
                yahoo_symbol = f"{symbol}-USD"
            else:
                yahoo_symbol = symbol
            
            print(f"📊 Fetching {yahoo_symbol} from Yahoo Finance...")
            data = yf.download(yahoo_symbol, start=start_date, end=end_date, progress=False)
            
            if data.empty:
                print(f"❌ No data found for {yahoo_symbol}")
                return pd.DataFrame()
            
            # Handle MultiIndex columns from yfinance
            if isinstance(data.columns, pd.MultiIndex):
                data.columns = data.columns.droplevel(1)
            
            # Ensure we have the required columns
            required_cols = ['Open', 'High', 'Low', 'Close', 'Volume']
            missing_cols = [col for col in required_cols if col not in data.columns]
            
            if missing_cols:
                print(f"❌ Missing columns in Yahoo data: {missing_cols}")
                return pd.DataFrame()
            
            # Add Adj Close if missing
            if 'Adj Close' not in data.columns:
                data['Adj Close'] = data['Close']
            
            data.dropna(inplace=True)
            print(f"✅ Fetched {len(data)} bars for {yahoo_symbol} from Yahoo Finance")
            return data
            
        except Exception as e:
            print(f"❌ Error fetching Yahoo data for {symbol}: {e}")
            return pd.DataFrame()

def fetch_market_data(ticker: str, start_date: str, end_date: str = None, source: str = 'auto') -> pd.DataFrame:
    """
    Enhanced market data fetcher with multiple sources.
    
    Args:
        ticker: Symbol to fetch (e.g., 'BTC', 'BTCUSD', 'BTC-USD')
        start_date: Start date in YYYY-MM-DD format
        end_date: End date in YYYY-MM-DD format (optional)
        source: 'alpaca', 'yahoo', or 'auto' to try both
    """
    fetcher = CryptoDataFetcher()
    
    if source == 'alpaca' or source == 'auto':
        # Try Alpaca first for crypto
        alpaca_data = fetcher.fetch_alpaca_crypto_data(ticker, start_date, end_date)
        if not alpaca_data.empty:
            return alpaca_data
        elif source == 'alpaca':
            return pd.DataFrame()
    
    if source == 'yahoo' or source == 'auto':
        # Fallback to Yahoo Finance
        yahoo_data = fetcher.fetch_yahoo_crypto_data(ticker, start_date, end_date)
        return yahoo_data
    
    return pd.DataFrame()

def add_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    Add comprehensive technical analysis features to OHLCV DataFrame.
    """
    if df.empty:
        return df
    
    # Ensure we have required columns
    required_cols = ['Open', 'High', 'Low', 'Close', 'Volume']
    missing_cols = [col for col in required_cols if col not in df.columns]
    if missing_cols:
        print(f"❌ Missing required columns: {missing_cols}")
        return df
    
    # Use Close if Adj Close is missing
    if 'Adj Close' not in df.columns:
        df['Adj Close'] = df['Close']
    
    print("🔧 Adding technical indicators...")
    
    # 1. Returns and Log Returns
    df['return'] = df['Adj Close'].pct_change()
    df['log_return'] = np.log(df['Adj Close'] / df['Adj Close'].shift(1))
    
    # 2. Rolling Statistics (multiple windows)
    for window in [7, 14, 30]:
        df[f'rolling_mean_{window}'] = df['Adj Close'].rolling(window).mean()
        df[f'rolling_std_{window}'] = df['Adj Close'].rolling(window).std()
        df[f'rolling_skew_{window}'] = df['Adj Close'].rolling(window).skew()
        df[f'rolling_kurt_{window}'] = df['Adj Close'].rolling(window).kurt()
    
    # 3. Volatility Indicators
    df['ATR'] = ta.volatility.AverageTrueRange(df['High'], df['Low'], df['Close']).average_true_range()
    df['ATR_pct'] = df['ATR'] / df['Close'] * 100
    
    # Bollinger Bands (multiple periods)
    for period in [20, 50]:
        bb = ta.volatility.BollingerBands(df['Adj Close'], window=period, window_dev=2)
        df[f'BB_high_{period}'] = bb.bollinger_hband()
        df[f'BB_low_{period}'] = bb.bollinger_lband()
        df[f'BB_pct_{period}'] = bb.bollinger_pband()
        df[f'BB_width_{period}'] = (bb.bollinger_hband() - bb.bollinger_lband()) / df['Adj Close']
    
    # 4. Momentum Indicators
    df['RSI'] = ta.momentum.RSIIndicator(df['Adj Close']).rsi()
    df['RSI_14'] = ta.momentum.RSIIndicator(df['Adj Close'], window=14).rsi()
    df['RSI_30'] = ta.momentum.RSIIndicator(df['Adj Close'], window=30).rsi()
    
    # Stochastic Oscillator
    stoch = ta.momentum.StochasticOscillator(df['High'], df['Low'], df['Close'])
    df['Stoch_K'] = stoch.stoch()
    df['Stoch_D'] = stoch.stoch_signal()
    
    # Williams %R
    df['Williams_R'] = ta.momentum.WilliamsRIndicator(df['High'], df['Low'], df['Close']).williams_r()
    
    # 5. Trend Indicators
    # MACD
    macd = ta.trend.MACD(df['Adj Close'])
    df['MACD'] = macd.macd()
    df['MACD_signal'] = macd.macd_signal()
    df['MACD_diff'] = macd.macd_diff()
    
    # Moving Averages
    for period in [5, 10, 20, 50, 100, 200]:
        df[f'MA_{period}'] = df['Adj Close'].rolling(period).mean()
        df[f'EMA_{period}'] = df['Adj Close'].ewm(span=period).mean()
    
    # Moving Average Convergence/Divergence signals
    df['MA_20_50_signal'] = np.where(df['MA_20'] > df['MA_50'], 1, -1)
    df['MA_50_200_signal'] = np.where(df['MA_50'] > df['MA_200'], 1, -1)
    
    # Parabolic SAR
    df['PSAR'] = ta.trend.PSARIndicator(df['High'], df['Low'], df['Close']).psar()
    
    # 6. Volume Indicators
    if 'Volume' in df.columns and df['Volume'].sum() > 0:
        # On-Balance Volume
        df['OBV'] = ta.volume.OnBalanceVolumeIndicator(df['Adj Close'], df['Volume']).on_balance_volume()
        
        # Volume Weighted Average Price
        if 'VWAP' not in df.columns:
            df['VWAP'] = (df['Close'] * df['Volume']).cumsum() / df['Volume'].cumsum()
        
        # Volume features
        df['vol_change'] = df['Volume'].pct_change()
        df['vol_rolling_mean_14'] = df['Volume'].rolling(14).mean()
        df['vol_rolling_std_14'] = df['Volume'].rolling(14).std()
        df['vol_ratio'] = df['Volume'] / df['vol_rolling_mean_14']
        
        # Accumulation/Distribution Line
        df['ADL'] = ta.volume.AccDistIndexIndicator(df['High'], df['Low'], df['Close'], df['Volume']).acc_dist_index()
        
        # Chaikin Money Flow
        df['CMF'] = ta.volume.ChaikinMoneyFlowIndicator(df['High'], df['Low'], df['Close'], df['Volume']).chaikin_money_flow()
        
        # Volume Price Trend
        df['VPT'] = ta.volume.VolumePriceTrendIndicator(df['Close'], df['Volume']).volume_price_trend()
    
    # 7. Crypto-specific features
    # Price position within daily range
    df['price_position'] = (df['Close'] - df['Low']) / (df['High'] - df['Low'])
    
    # Gap analysis
    df['gap'] = (df['Open'] - df['Close'].shift(1)) / df['Close'].shift(1)
    df['gap_filled'] = np.where(
        (df['gap'] > 0) & (df['Low'] <= df['Close'].shift(1)), 1,
        np.where((df['gap'] < 0) & (df['High'] >= df['Close'].shift(1)), 1, 0)
    )
    
    # Intraday returns
    df['intraday_return'] = (df['Close'] - df['Open']) / df['Open']
    df['overnight_return'] = (df['Open'] - df['Close'].shift(1)) / df['Close'].shift(1)
    
    # 8. Market structure features
    # Higher highs, lower lows
    df['higher_high'] = df['High'] > df['High'].shift(1)
    df['lower_low'] = df['Low'] < df['Low'].shift(1)
    df['higher_low'] = df['Low'] > df['Low'].shift(1)
    df['lower_high'] = df['High'] < df['High'].shift(1)
    
    # Support and resistance levels (simplified)
    df['resistance_20'] = df['High'].rolling(20).max()
    df['support_20'] = df['Low'].rolling(20).min()
    df['near_resistance'] = (df['Close'] / df['resistance_20']) > 0.98
    df['near_support'] = (df['Close'] / df['support_20']) < 1.02
    
    # 9. Volatility regime detection
    df['volatility_regime'] = np.where(df['rolling_std_30'] > df['rolling_std_30'].rolling(60).mean(), 'high', 'low')
    
    # 10. Trend strength
    df['trend_strength'] = abs(df['Close'] - df['MA_20']) / df['ATR']
    
    print(f"✅ Added {len([col for col in df.columns if col not in ['Open', 'High', 'Low', 'Close', 'Volume', 'Adj Close']])} technical features")
    
    # Drop initial rows with NaNs from indicators
    initial_length = len(df)
    df.dropna(inplace=True)
    print(f"📊 Final dataset: {len(df)} rows (removed {initial_length - len(df)} rows with NaN values)")
    
    return df

def get_all_crypto_data(start_date: str = "2024-06-01", end_date: str = None, max_symbols: int = 8) -> Dict[str, pd.DataFrame]:
    """
    Fetch data for selected cryptocurrencies (focused on recent data for smaller file sizes).
    
    Args:
        start_date: Start date for data fetching (default: 2024-01-01 for recent data only)
        end_date: End date for data fetching
        max_symbols: Maximum number of symbols to fetch (default: 8)
    """
    fetcher = CryptoDataFetcher()
    
    # Get available crypto assets from Alpaca
    assets = fetcher.get_available_crypto_assets()
    
    # Popular crypto symbols to try if Alpaca fails (reduced list)
    popular_cryptos = [
        'BTC', 'ETH', 'ADA', 'DOT', 'LINK', 'LTC', 'DOGE', 'SOL'
    ]
    
    all_symbols = []
    
    # Add Alpaca symbols (reduced limit)
    if assets:
        alpaca_symbols = [asset['symbol'].replace('/USD', '') for asset in assets if asset['symbol'].endswith('/USD')]
        all_symbols.extend(alpaca_symbols[:8])  # Limit to first 8 for smaller files
    
    # Add popular symbols
    all_symbols.extend(popular_cryptos)
    
    # Remove duplicates
    all_symbols = list(set(all_symbols))
    
    print(f"🚀 Attempting to fetch data for {len(all_symbols)} cryptocurrencies...")
    
    crypto_data = {}
    successful_fetches = 0
    
    for symbol in all_symbols:
        print(f"\n📈 Fetching data for {symbol}...")
        
        # Try Alpaca first, then Yahoo
        data = fetch_market_data(symbol, start_date, end_date, source='auto')
        
        if not data.empty:
            # Add features
            enhanced_data = add_features(data)
            if not enhanced_data.empty:
                crypto_data[symbol] = enhanced_data
                successful_fetches += 1
                print(f"✅ Successfully processed {symbol}: {len(enhanced_data)} rows, {len(enhanced_data.columns)} features")
            else:
                print(f"❌ Failed to add features for {symbol}")
        else:
            print(f"❌ No data found for {symbol}")
    
    print(f"\n🎉 Successfully fetched and processed data for {successful_fetches}/{len(all_symbols)} cryptocurrencies")
    return crypto_data

if __name__ == "__main__":
    print("🚀 Enhanced Crypto Data Fetcher")
    print("=" * 50)
    
    # Example 1: Single crypto with enhanced features
    print("\n📊 Example 1: Fetching Bitcoin data with all features...")
    btc_data = fetch_market_data("BTC", "2024-01-01", source='auto')
    if not btc_data.empty:
        btc_enhanced = add_features(btc_data)
        print(f"BTC data shape: {btc_enhanced.shape}")
        print("\nLatest data:")
        print(btc_enhanced[['Close', 'Volume', 'RSI', 'MACD', 'BB_pct_20']].tail())
    
    # Example 2: Multiple cryptos
    print("\n📊 Example 2: Fetching multiple crypto datasets...")
    crypto_datasets = get_all_crypto_data("2024-01-01")
    
    if crypto_datasets:
        print(f"\n📈 Summary of fetched datasets:")
        for symbol, data in crypto_datasets.items():
            print(f"  {symbol}: {data.shape[0]} rows, {data.shape[1]} columns")
            
        # Save to files for analysis
        print(f"\n💾 Saving datasets...")
        for symbol, data in crypto_datasets.items():
            filename = f"crypto_data_{symbol}.csv"
            data.to_csv(filename)
            print(f"  Saved {symbol} data to {filename}")
    
    print("\n✅ Data fetching complete!") 