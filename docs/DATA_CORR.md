# Business Intelligence MCP Logs

Below is a detailed, chronological markdown representation of the log events. Each bullet point shows the timestamp, log level, and the complete message. Multi‑line SQL queries are shown in fenced code blocks for clarity.

- **2025-06-27 03:11:37,228** – *INFO*: Added `'src'` directory to sys.path
- **2025-06-27 03:11:39,158** – *INFO*: FastMCP server instance created for `'business-intelligence-mcp'`
- **2025-06-27 03:11:39,180** – *INFO*: Starting Business Intelligence MCP Server
- **2025-06-27 03:26:49,310** – *INFO*: Added `'src'` directory to sys.path
- **2025-06-27 03:26:52,133** – *INFO*: FastMCP server instance created for `'business-intelligence-mcp'`
- **2025-06-27 03:26:52,164** – *INFO*: Starting Business Intelligence MCP Server
- **2025-06-27 07:33:44,239** – *INFO*: Added `'src'` directory to sys.path
- **2025-06-27 07:34:16,222** – *INFO*: FastMCP server instance created for `'business-intelligence-mcp'`
- **2025-06-27 07:34:16,303** – *INFO*: Starting Business Intelligence MCP Server
- **2025-06-27 07:42:13,153** – *INFO*: Tool load_business_dataset called with  
  `file_path='C:\Users\sidki\source\repos\finale\mcp-servers\business-intelligence\data\crypto_data_BTC.csv'` and  
  `dataset_name='btc_crypto_data'`
- **2025-06-27 07:42:13,214** – *INFO*: CSV file read successfully with encoding `'utf-8'`
- **2025-06-27 07:42:13,216** – *INFO*: Storing dataset `'btc_crypto_data'` in memory
- **2025-06-27 07:42:13,217** – *INFO*: get_sql_database called
- **2025-06-27 07:42:13,219** – *INFO*: Creating new SQL database at  
  `C:\Users\sidki\AppData\Local\Temp\mcp_bi_database_cf68f96c.db`
- **2025-06-27 07:42:13,260** – *INFO*: SQLite connection created with WAL mode
- **2025-06-27 07:42:13,321** – *INFO*: Successfully stored dataset `'btc_crypto_data'` as table `'btc_crypto_data'` in SQL database
- **2025-06-27 07:42:13,325** – *INFO*: get_sql_database called
- **2025-06-27 07:42:13,331** – *INFO*: SQLite connection created with WAL mode
- **2025-06-27 07:42:13,338** – *INFO*: SQL storage verification succeeded for table `'btc_crypto_data'`
- **2025-06-27 07:42:13,399** – *INFO*: Dataset `'btc_crypto_data'` loaded successfully with shape (697, 79)
- **2025-06-27 07:42:24,044** – *INFO*: Tool profile_dataset called for dataset `'btc_crypto_data'`
- **2025-06-27 07:42:24,047** – *INFO*: Dataset profiling completed for `'btc_crypto_data'`
- **2025-06-27 07:42:28,872** – *INFO*: Tool profile_dataset called for dataset `'crypto_data_BTC'`
- **2025-06-27 07:42:29,313** – *INFO*: Dataset profiling completed for `'crypto_data_BTC'`
- **2025-06-27 07:42:38,425** – *INFO*: Tool execute_sql_query called with  
  `dataset_name='crypto_data_BTC'` and  
  `sql_query=`  
  ```
  SELECT Date, Close, Volume, return, RSI, MACD 
  FROM crypto_data_BTC 
  ORDER BY Date LIMIT 10
  ```
- **2025-06-27 07:42:38,427** – *INFO*: Listing all available datasets
- **2025-06-27 07:42:38,428** – *ERROR*: Dataset `'crypto_data_BTC'` not found
- **2025-06-27 07:42:42,719** – *INFO*: Tool execute_sql_query called with  
  `dataset_name='btc_crypto_data'` and  
  `sql_query=`  
  ```
  SELECT Date, Close, Volume, return, RSI, MACD 
  FROM btc_crypto_data 
  ORDER BY Date LIMIT 10
  ```
- **2025-06-27 07:42:42,722** – *INFO*: get_sql_database called
- **2025-06-27 07:42:42,725** – *INFO*: SQLite connection created with WAL mode
- **2025-06-27 07:42:42,730** – *INFO*: SQL query executed successfully on table `'btc_crypto_data'`
- **2025-06-27 07:42:50,239** – *INFO*: Tool execute_sql_query called with  
  `dataset_name='btc_crypto_data'` and  
  `sql_query=`  
  ```
  SELECT 
      MIN(Date) as start_date,
      MAX(Date) as end_date,
      COUNT(*) as total_days,
      MIN(Close) as min_price,
      MAX(Close) as max_price,
      AVG(Close) as avg_price,
      AVG(Volume) as avg_volume,
      MIN(return) as worst_daily_return,
      MAX(return) as best_daily_return,
      AVG(return) as avg_daily_return
  FROM btc_crypto_data
  ```
- **2025-06-27 07:42:50,244** – *INFO*: get_sql_database called
- **2025-06-27 07:42:50,248** – *INFO*: SQLite connection created with WAL mode
- **2025-06-27 07:42:50,252** – *INFO*: SQL query executed successfully on table `'btc_crypto_data'`
- **2025-06-27 07:42:59,090** – *INFO*: Tool find_business_correlations called with  
  `dataset='btc_crypto_data'` and `min_correlation=0.3`
- **2025-06-27 07:42:59,092** – *INFO*: Business correlations analysis completed for `'btc_crypto_data'`
- **2025-06-27 07:43:07,966** – *INFO*: Tool create_visualization called for  
  `dataset='btc_crypto_data'`, `chart_type='line'`
- **2025-06-27 07:43:07,969** – *INFO*: Visualization generated for dataset `'btc_crypto_data'`
- **2025-06-27 07:43:13,699** – *INFO*: Tool create_visualization called for  
  `dataset='crypto_data_BTC'`, `chart_type='line'`
- **2025-06-27 07:43:19,837** – *INFO*: Visualization generated for dataset `'crypto_data_BTC'`
- **2025-06-27 07:43:30,315** – *INFO*: Tool execute_sql_query called with  
  `dataset_name='btc_crypto_data'` and  
  `sql_query=`  
  ```
  SELECT 
      SUBSTR(Date, 1, 7) as month,
      AVG(Close) as avg_price,
      MIN(Close) as min_price, 
      MAX(Close) as max_price,
      AVG(Volume) as avg_volume,
      AVG(RSI) as avg_rsi,
      COUNT(*) as trading_days
  FROM btc_crypto_data 
  GROUP BY SUBSTR(Date, 1, 7)
  ORDER BY month
  ```
- **2025-06-27 07:43:30,319** – *INFO*: get_sql_database called
- **2025-06-27 07:43:30,322** – *INFO*: SQLite connection created with WAL mode
- **2025-06-27 07:43:30,327** – *INFO*: SQL query executed successfully on table `'btc_crypto_data'`
- **2025-06-27 07:43:36,907** – *INFO*: Tool execute_sql_query called with  
  `dataset_name='btc_crypto_data'` and  
  `sql_query=`  
  ```
  SELECT 
      Date,
      Close,
      return,
      Volume,
      RSI,
      MACD,
      volatility_regime
  FROM btc_crypto_data 
  WHERE return > 0.05 OR return < -0.05
  ORDER BY return DESC
  LIMIT 20
  ```
- **2025-06-27 07:43:36,909** – *INFO*: get_sql_database called
- **2025-06-27 07:43:36,911** – *INFO*: SQLite connection created with WAL mode
- **2025-06-27 07:43:36,911** – *INFO*: SQL query executed successfully on table `'btc_crypto_data'`
- **2025-06-27 09:09:29,258** – *INFO*: Tool load_datasource called with  
  `source_path='C:\Users\sidki\source\repos\finale\mcp-servers\business-intelligence\crypto_data_BTC.csv'`,  
  `dataset_name='btc_discovery'`, `source_type='auto'`
- **2025-06-27 09:09:29,418** – *INFO*: Datasource loaded for dataset `'btc_discovery'`
- **2025-06-27 09:09:39,518** – *INFO*: Tool profile_dataset called for dataset `'btc_discovery'`
- **2025-06-27 09:09:39,521** – *INFO*: Dataset profiling completed for `'btc_discovery'`
- **2025-06-27 09:09:47,090** – *INFO*: Tool run_correlation called for  
  `dataset='crypto_data_BTC'` with `method='pearson'`, `target_column='Close'`, `threshold=0.5`
- **2025-06-27 09:09:47,219** – *INFO*: Correlation analysis completed for dataset `'crypto_data_BTC'`
- **2025-06-27 09:11:26,069** – *INFO*: Tool load_business_dataset called with  
  `file_path='C:\Users\sidki\source\repos\finale\mcp-servers\business-intelligence\crypto_data_BTC.csv'`,  
  `dataset_name='btc_crypto_data'`
- **2025-06-27 09:11:26,079** – *INFO*: CSV file read successfully with encoding `'utf-8'`
- **2025-06-27 09:11:26,083** – *INFO*: Storing dataset `'btc_crypto_data'` in memory
- **2025-06-27 09:11:26,083** – *INFO*: get_sql_database called
- **2025-06-27 09:11:26,083** – *INFO*: SQLite connection created with WAL mode
- **2025-06-27 09:11:26,118** – *INFO*: Successfully stored dataset `'btc_crypto_data'` as table `'btc_crypto_data'` in SQL database
- **2025-06-27 09:11:26,125** – *INFO*: get_sql_database called
- **2025-06-27 09:11:26,128** – *INFO*: SQLite connection created with WAL mode
- **2025-06-27 09:11:26,128** – *INFO*: SQL storage verification succeeded for table `'btc_crypto_data'`
- **2025-06-27 09:11:26,128** – *INFO*: Dataset `'btc_crypto_data'` loaded successfully with shape (345, 79)
- **2025-06-27 09:11:56,740** – *INFO*: Tool profile_dataset called for dataset `'btc_crypto_data'`
- **2025-06-27 09:11:56,742** – *INFO*: Dataset profiling completed for `'btc_crypto_data'`
- **2025-06-27 09:12:05,735** – *INFO*: Tool profile_dataset called for dataset `'crypto_data_BTC'`
- **2025-06-27 09:12:05,993** – *INFO*: Dataset profiling completed for `'crypto_data_BTC'`
- **2025-06-27 09:12:17,550** – *INFO*: Tool execute_sql_query called with  
  `dataset_name='crypto_data_BTC'` and  
  `sql_query=`  
  ```
  SELECT COUNT(*) as total_rows,
      MIN(Date) as earliest_date,
      MAX(Date) as latest_date,
      MIN(Close) as min_price,
      MAX(Close) as max_price,
      AVG(Close) as avg_price,
      MIN(Volume) as min_volume,
      MAX(Volume) as max_volume,
      AVG(Volume) as avg_volume
  FROM crypto_data_BTC
  ```
- **2025-06-27 09:12:17,554** – *INFO*: Listing all available datasets
- **2025-06-27 09:12:17,555** – *ERROR*: Dataset `'crypto_data_BTC'` not found
- **2025-06-27 09:12:24,885** – *INFO*: Tool execute_sql_query called with  
  `dataset_name='btc_crypto_data'` and  
  `sql_query=`  
  ```
  SELECT COUNT(*) as total_rows,
      MIN(Date) as earliest_date,
      MAX(Date) as latest_date,
      MIN(Close) as min_price,
      MAX(Close) as max_price,
      AVG(Close) as avg_price,
      MIN(Volume) as min_volume,
      MAX(Volume) as max_volume,
      AVG(Volume) as avg_volume
  FROM btc_crypto_data
  ```
- **2025-06-27 09:12:24,888** – *INFO*: get_sql_database called
- **2025-06-27 09:12:24,891** – *INFO*: SQLite connection created with WAL mode
- **2025-06-27 09:12:24,894** – *INFO*: SQL query executed successfully on table `'btc_crypto_data'`
- **2025-06-27 09:12:36,642** – *INFO*: Tool execute_sql_query called with  
  `dataset_name='btc_crypto_data'` and  
  `sql_query=`  
  ```
  SELECT 
      volatility_regime,
      COUNT(*) as days_count,
      ROUND(COUNT(*) * 100.0 / 345, 2) as percentage,
      ROUND(AVG(Close), 2) as avg_price,
      ROUND(AVG(Volume), 0) as avg_volume,
      ROUND(AVG(return) * 100, 2) as avg_daily_return_pct,
      ROUND(STDDEV(return) * 100, 2) as volatility_pct
  FROM btc_crypto_data 
  GROUP BY volatility_regime
  ORDER BY days_count DESC
  ```
- **2025-06-27 09:12:36,644** – *INFO*: get_sql_database called
- **2025-06-27 09:12:36,644** – *INFO*: SQLite connection created with WAL mode
- **2025-06-27 09:12:36,650** – *ERROR*: SQL execution failed: Execution failed on sql ... no such function: STDDEV
- **2025-06-27 09:12:43,060** – *INFO*: Tool execute_sql_query called with  
  `dataset_name='btc_crypto_data'` and  
  `sql_query=`  
  ```
  SELECT 
      volatility_regime,
      COUNT(*) as days_count,
      ROUND(COUNT(*) * 100.0 / 345, 2) as percentage,
      ROUND(AVG(Close), 2) as avg_price,
      ROUND(AVG(Volume), 0) as avg_volume,
      ROUND(AVG(return) * 100, 2) as avg_daily_return_pct,
      ROUND(MIN(return) * 100, 2) as min_return_pct,
      ROUND(MAX(return) * 100, 2) as max_return_pct
  FROM btc_crypto_data 
  GROUP BY volatility_regime
  ORDER BY days_count DESC
  ```
- **2025-06-27 09:12:43,064** – *INFO*: get_sql_database called
- **2025-06-27 09:12:43,066** – *INFO*: SQLite connection created with WAL mode
- **2025-06-27 09:12:43,070** – *INFO*: SQL query executed successfully on table `'btc_crypto_data'`
- **2025-06-27 09:12:55,945** – *INFO*: Tool execute_sql_query called with  
  `dataset_name='btc_crypto_data'` and  
  `sql_query=`  
  ```
  SELECT 
      CASE 
        WHEN RSI < 30 THEN 'Oversold (RSI < 30)'
        WHEN RSI > 70 THEN 'Overbought (RSI > 70)' 
        ELSE 'Neutral (30-70 RSI)'
      END as rsi_condition,
      COUNT(*) as days_count,
      ROUND(COUNT(*) * 100.0 / 345, 2) as percentage,
      ROUND(AVG(Close), 2) as avg_price,
      ROUND(AVG(return) * 100, 2) as avg_return_pct
  FROM btc_crypto_data 
  GROUP BY 
      CASE 
        WHEN RSI < 30 THEN 'Oversold (RSI < 30)'
        WHEN RSI > 70 THEN 'Overbought (RSI > 70)' 
        ELSE 'Neutral (30-70 RSI)'
      END
  ORDER BY days_count DESC
  ```
- **2025-06-27 09:12:55,950** – *INFO*: get_sql_database called
- **2025-06-27 09:12:55,953** – *INFO*: SQLite connection created with WAL mode
- **2025-06-27 09:12:55,955** – *INFO*: SQL query executed successfully on table `'btc_crypto_data'`
- **2025-06-27 09:13:06,195** – *INFO*: Tool create_visualization called for  
  `dataset='btc_crypto_data'`, `chart_type='line'`
- **2025-06-27 09:13:06,197** – *INFO*: Visualization generated for dataset `'btc_crypto_data'`
- **2025-06-27 09:13:11,945** – *INFO*: Tool create_visualization called for  
  `dataset='crypto_data_BTC'`, `chart_type='line'`
- **2025-06-27 09:13:16,339** – *INFO*: Visualization generated for dataset `'crypto_data_BTC'`
- **2025-06-27 09:13:30,215** – *INFO*: Tool execute_sql_query called with  
  `dataset_name='crypto_data_BTC'` and  
  `sql_query=`  
  ```
  SELECT 
      DATE(Date) as trading_date,
      Close as price,
      Volume,
      return * 100 as daily_return_pct,
      CASE 
        WHEN RSI < 30 THEN 'Oversold'
        WHEN RSI > 70 THEN 'Overbought' 
        ELSE 'Neutral'
      END as rsi_signal,
      volatility_regime,
      trend_strength
  FROM crypto_data_BTC 
  WHERE Date IN (
    '2024-07-18', '2024-08-01', '2024-09-01', '2024-10-01', 
    '2024-11-01', '2024-12-01', '2025-01-01', '2025-02-01',
    '2025-03-01', '2025-04-01', '2025-05-01', '2025-06-01'
  )
  ORDER BY Date
  ```
- **2025-06-27 09:13:30,219** – *INFO*: Listing all available datasets
- **2025-06-27 09:13:30,220** – *ERROR*: Dataset `'crypto_data_BTC'` not found
- **2025-06-27 09:13:36,867** – *INFO*: Tool execute_sql_query called with  
  `dataset_name='btc_crypto_data'` and  
  `sql_query=`  
  ```
  SELECT 
      Date as trading_date,
      ROUND(Close, 2) as price,
      Volume,
      ROUND(return * 100, 2) as daily_return_pct,
      ROUND(RSI, 1) as rsi_value,
      CASE 
        WHEN RSI < 30 THEN 'Oversold'
        WHEN RSI > 70 THEN 'Overbought' 
        ELSE 'Neutral'
      END as rsi_signal,
      volatility_regime,
      ROUND(trend_strength, 2) as trend_strength
  FROM btc_crypto_data 
  ORDER BY Date DESC
  LIMIT 10
  ```
- **2025-06-27 09:13:36,873** – *INFO*: get_sql_database called
- **2025-06-27 09:13:36,873** – *INFO*: SQLite connection created with WAL mode
- **2025-06-27 09:13:36,880** – *INFO*: SQL query executed successfully on table `'btc_crypto_data'`
- **2025-06-27 09:13:43,710** – *INFO*: Tool find_business_correlations called with  
  `dataset='btc_crypto_data'` and `min_correlation=0.3`
- **2025-06-27 09:13:43,712** – *INFO*: Business correlations analysis completed for `'btc_crypto_data'`
- **2025-06-27 09:13:49,159** – *INFO*: Tool find_business_correlations called with  
  `dataset='crypto_data_BTC'` and `min_correlation=0.3`
- **2025-06-27 09:13:51,172** – *INFO*: Business correlations analysis completed for `'crypto_data_BTC'`
- **2025-06-27 09:44:33,695** – *INFO*: Tool execute_sql_query called with  
  `dataset_name='btc_crypto_data'` and  
  `sql_query=`  
  ```
  -- Investigation 1: Day-of-Week Performance Patterns
  SELECT 
    CASE strftime('%w', Date)
      WHEN '0' THEN 'Sunday'
      WHEN '1' THEN 'Monday'
      WHEN '2' THEN 'Tuesday'
      WHEN '3' THEN 'Wednesday'
      WHEN '4' THEN 'Thursday'
      WHEN '5' THEN 'Friday'
      WHEN '6' THEN 'Saturday'
    END as day_of_week,
    COUNT(*) as trading_days,
    ROUND(AVG(return) * 100, 3) as avg_return_pct,
    ROUND(AVG(Volume) / 1000000000, 1) as avg_volume_billions,
    ROUND(AVG(ATR_pct), 2) as avg_volatility_pct,
    ROUND(MIN(return) * 100, 2) as worst_day_pct,
    ROUND(MAX(return) * 100, 2) as best_day_pct
  FROM btc_crypto_data 
  GROUP BY strftime('%w', Date)
  ORDER BY avg_return_pct DESC
  ```
- **2025-06-27 09:44:33,701** – *INFO*: get_sql_database called
- **2025-06-27 09:44:33,703** – *INFO*: SQLite connection created with WAL mode
- **2025-06-27 09:44:33,708** – *INFO*: SQL query executed successfully on table `'btc_crypto_data'`
- **2025-06-27 09:44:59,000** – *INFO*: Tool execute_sql_query called with  
  `dataset_name='btc_crypto_data'` and  
  `sql_query=`  
  ```
  -- Investigation 2: Extreme Move Analysis - What predicts big moves?
  SELECT 
    CASE 
      WHEN ABS(return) > 0.05 THEN 'Extreme Move (>5%)'
      WHEN ABS(return) > 0.03 THEN 'Large Move (3-5%)'
      WHEN ABS(return) > 0.015 THEN 'Medium Move (1.5-3%)'
      ELSE 'Small Move (<1.5%)'
    END as move_size,
    COUNT(*) as frequency,
    ROUND(COUNT(*) * 100.0 / 345, 2) as percentage,
    ROUND(AVG(lag_volume / 1000000000), 1) as avg_prior_volume_B,
    ROUND(AVG(lag_ATR_pct), 2) as avg_prior_volatility,
    ROUND(AVG(lag_RSI), 1) as avg_prior_RSI,
    ROUND(AVG(return) * 100, 2) as avg_return_pct
  FROM (
    SELECT *,
      LAG(Volume) OVER (ORDER BY Date) as lag_volume,
      LAG(ATR_pct) OVER (ORDER BY Date) as lag_ATR_pct,
      LAG(RSI) OVER (ORDER BY Date) as lag_RSI
    FROM btc_crypto_data
  ) 
  WHERE lag_volume IS NOT NULL
  GROUP BY 
    CASE 
      WHEN ABS(return) > 0.05 THEN 'Extreme Move (>5%)'
      WHEN ABS(return) > 0.03 THEN 'Large Move (3-5%)'
      WHEN ABS(return) > 0.015 THEN 'Medium Move (1.5-3%)'
      ELSE 'Small Move (<1.5%)'
    END
  ORDER BY percentage DESC
  ```
- **2025-06-27 09:44:59,011** – *INFO*: get_sql_database called
- **2025-06-27 09:44:59,011** – *INFO*: SQLite connection created with WAL mode
- **2025-06-27 09:44:59,011** – *INFO*: SQL query executed successfully on table `'btc_crypto_data'`
- **2025-06-27 09:45:27,575** – *INFO*: Tool execute_sql_query called with  
  `dataset_name='btc_crypto_data'` and  
  `sql_query=`  
  ```
  -- Investigation 3: Volume-Price Divergence Analysis
  SELECT 
    CASE 
      WHEN volume_change > 0.5 AND ABS(return) < 0.01 THEN 'High Vol, Low Move (Accumulation?)'
      WHEN volume_change < -0.3 AND ABS(return) > 0.02 THEN 'Low Vol, Big Move (Breakout?)'
      WHEN volume_change > 0.3 AND return > 0.02 THEN 'High Vol, Big Up (Momentum)'
      WHEN volume_change > 0.3 AND return < -0.02 THEN 'High Vol, Big Down (Panic?)'
      ELSE 'Normal Pattern'
    END as pattern_type,
    COUNT(*) as occurrences,
    ROUND(COUNT(*) * 100.0 / 345, 2) as percentage,
    ROUND(AVG(return) * 100, 2) as avg_return_pct,
    ROUND(AVG(Volume / 1000000000), 1) as avg_volume_B,
    ROUND(AVG(Close), 0) as avg_price,
    ROUND(AVG(RSI), 1) as avg_RSI
  FROM btc_crypto_data 
  WHERE volume_change IS NOT NULL
  GROUP BY 
    CASE 
      WHEN volume_change > 0.5 AND ABS(return) < 0.01 THEN 'High Vol, Low Move (Accumulation?)'
      WHEN volume_change < -0.3 AND ABS(return) > 0.02 THEN 'Low Vol, Big Move (Breakout?)'
      WHEN volume_change > 0.3 AND return > 0.02 THEN 'High Vol, Big Up (Momentum)'
      WHEN volume_change > 0.3 AND return < -0.02 THEN 'High Vol, Big Down (Panic?)'
      ELSE 'Normal Pattern'
    END
  ORDER BY percentage DESC
  ```
- **2025-06-27 09:45:27,585** – *INFO*: get_sql_database called
- **2025-06-27 09:45:27,585** – *INFO*: SQLite connection created with WAL mode
- **2025-06-27 09:45:27,585** – *ERROR*: SQL execution failed: Execution failed on sql ... no such column: volume_change
- **2025-06-27 09:45:38,422** – *INFO*: Tool execute_sql_query called with  
  `dataset_name='btc_crypto_data'` and  
  `sql_query=`  
  ```
  -- Investigation 3: Volume-Price Divergence Analysis (corrected)
  SELECT 
    CASE 
      WHEN vol_change > 0.5 AND ABS(return) < 0.01 THEN 'High Vol, Low Move (Accumulation?)'
      WHEN vol_change < -0.3 AND ABS(return) > 0.02 THEN 'Low Vol, Big Move (Breakout?)'
      WHEN vol_change > 0.3 AND return > 0.02 THEN 'High Vol, Big Up (Momentum)'
      WHEN vol_change > 0.3 AND return < -0.02 THEN 'High Vol, Big Down (Panic?)'
      ELSE 'Normal Pattern'
    END as pattern_type,
    COUNT(*) as occurrences,
    ROUND(COUNT(*) * 100.0 / 345, 2) as percentage,
    ROUND(AVG(return) * 100, 2) as avg_return_pct,
    ROUND(AVG(Volume / 1000000000), 1) as avg_volume_B,
    ROUND(AVG(Close), 0) as avg_price,
    ROUND(AVG(RSI), 1) as avg_RSI
  FROM btc_crypto_data 
  WHERE vol_change IS NOT NULL
  GROUP BY 
    CASE 
      WHEN vol_change > 0.5 AND ABS(return) < 0.01 THEN 'High Vol, Low Move (Accumulation?)'
      WHEN vol_change < -0.3 AND ABS(return) > 0.02 THEN 'Low Vol, Big Move (Breakout?)'
      WHEN vol_change > 0.3 AND return > 0.02 THEN 'High Vol, Big Up (Momentum)'
      WHEN vol_change > 0.3 AND return < -0.02 THEN 'High Vol, Big Down (Panic?)'
      ELSE 'Normal Pattern'
    END
  ORDER BY percentage DESC
  ```
- **2025-06-27 09:45:38,431** – *INFO*: get_sql_database called
- **2025-06-27 09:45:38,433** – *INFO*: SQLite connection created with WAL mode
- **2025-06-27 09:45:38,436** – *INFO*: SQL query executed successfully on table `'btc_crypto_data'`
- **2025-06-27 09:45:55,568** – *INFO*: Tool execute_sql_query called with  
  `dataset_name='btc_crypto_data'` and  
  `sql_query=`  
  ```
  -- Investigation 4: Gap Analysis and Overnight vs Intraday Performance
  SELECT 
    CASE 
      WHEN ABS(gap) > 0.01 THEN 'Significant Gap (>1%)'
      WHEN ABS(gap) > 0.005 THEN 'Medium Gap (0.5-1%)'
      ELSE 'Small/No Gap (<0.5%)'
    END as gap_size,
    COUNT(*) as occurrences,
    ROUND(COUNT(*) * 100.0 / 345, 2) as percentage,
    ROUND(AVG(gap) * 100, 2) as avg_gap_pct,
    ROUND(AVG(overnight_return) * 100, 2) as avg_overnight_return_pct,
    ROUND(AVG(intraday_return) * 100, 2) as avg_intraday_return_pct,
    ROUND(AVG(return) * 100, 2) as avg_total_return_pct,
    ROUND(AVG(gap_filled) * 100, 0) as gap_fill_rate_pct
  FROM btc_crypto_data 
  WHERE gap IS NOT NULL
  GROUP BY 
    CASE 
      WHEN ABS(gap) > 0.01 THEN 'Significant Gap (>1%)'
      WHEN ABS(gap) > 0.005 THEN 'Medium Gap (0.5-1%)'
      ELSE 'Small/No Gap (<0.5%)'
    END
  ORDER BY percentage DESC
  ```
- **2025-06-27 09:45:55,575** – *INFO*: get_sql_database called
- **2025-06-27 09:45:55,577** – *INFO*: SQLite connection created with WAL mode
- **2025-06-27 09:45:55,580** – *INFO*: SQL query executed successfully on table `'btc_crypto_data'`
- **2025-06-27 09:46:09,699** – *INFO*: Tool execute_sql_query called with  
  `dataset_name='btc_crypto_data'` and  
  `sql_query=`  
  ```
  -- Investigation 5: Moving Average Signal Performance
  SELECT 
    CASE 
      WHEN MA_20_50_signal = 1 AND MA_50_200_signal = 1 THEN 'Golden Cross (Both Bullish)'
      WHEN MA_20_50_signal = -1 AND MA_50_200_signal = -1 THEN 'Death Cross (Both Bearish)'
      WHEN MA_20_50_signal = 1 AND MA_50_200_signal = -1 THEN 'Short Bull, Long Bear'
      WHEN MA_20_50_signal = -1 AND MA_50_200_signal = 1 THEN 'Short Bear, Long Bull'
      ELSE 'Neutral'
    END as ma_signal_combo,
    COUNT(*) as days,
    ROUND(COUNT(*) * 100.0 / 345, 2) as percentage,
    ROUND(AVG(return) * 100, 3) as avg_daily_return_pct,
    ROUND(AVG(Close), 0) as avg_price,
    ROUND(AVG(RSI), 1) as avg_RSI,
    ROUND(AVG(trend_strength), 2) as avg_trend_strength,
    ROUND(MIN(return) * 100, 2) as worst_day_pct,
    ROUND(MAX(return) * 100, 2) as best_day_pct
  FROM btc_crypto_data 
  GROUP BY 
    CASE 
      WHEN MA_20_50_signal = 1 AND MA_50_200_signal = 1 THEN 'Golden Cross (Both Bullish)'
      WHEN MA_20_50_signal = -1 AND MA_50_200_signal = -1 THEN 'Death Cross (Both Bearish)'
      WHEN MA_20_50_signal = 1 AND MA_50_200_signal = -1 THEN 'Short Bull, Long Bear'
      WHEN MA_20_50_signal = -1 AND MA_50_200_signal = 1 THEN 'Short Bear, Long Bull'
      ELSE 'Neutral'
    END
  ORDER BY percentage DESC
  ```
- **2025-06-27 09:46:09,707** – *INFO*: get_sql_database called
- **2025-06-27 09:46:09,710** – *INFO*: SQLite connection created with WAL mode
- **2025-06-27 09:46:09,714** – *INFO*: SQL query executed successfully on table `'btc_crypto_data'`
- **2025-06-27 09:46:34,181** – *INFO*: Tool execute_sql_query called with  
  `dataset_name='btc_crypto_data'` and  
  `sql_query=`  
  ```
  -- Investigation 6: Predictive Power of Combined Indicators
  WITH signal_analysis AS (
    SELECT Date, Close, return,
      CASE 
        WHEN RSI < 40 AND BB_pct_20 < 0.2 AND Williams_R < -80 THEN 'Triple Oversold'
        WHEN RSI > 65 AND BB_pct_20 > 0.8 AND Williams_R > -20 THEN 'Triple Overbought'
        WHEN volatility_regime = 'high' AND trend_strength > 2 THEN 'High Vol + Strong Trend'
        WHEN volatility_regime = 'low' AND ABS(trend_strength) < 0.5 THEN 'Low Vol + Weak Trend'
        ELSE 'Normal'
      END as signal_combo,
      LEAD(return, 1) OVER (ORDER BY Date) as next_day_return,
      LEAD(return, 3) OVER (ORDER BY Date) as day3_return,
      LEAD(return, 7) OVER (ORDER BY Date) as day7_return
    FROM btc_crypto_data
  )
  SELECT 
      signal_combo,
      COUNT(*) as occurrences,
      ROUND(COUNT(*) * 100.0 / 345, 2) as percentage,
      ROUND(AVG(return) * 100, 2) as current_day_return_pct,
      ROUND(AVG(next_day_return) * 100, 2) as next_day_return_pct,
      ROUND(AVG(day3_return) * 100, 2) as day3_return_pct,
      ROUND(AVG(day7_return) * 100, 2) as day7_return_pct,
      ROUND(AVG(Close), 0) as avg_price
  FROM signal_analysis
  WHERE signal_combo != 'Normal'
  GROUP BY signal_combo
  ORDER BY next_day_return_pct DESC
  ```
- **2025-06-27 09:46:34,191** – *INFO*: get_sql_database called
- **2025-06-27 09:46:34,192** – *INFO*: SQLite connection created with WAL mode
- **2025-06-27 09:46:34,196** – *INFO*: SQL query executed successfully on table `'btc_crypto_data'`
- **2025-06-27 10:40:40,453** – *INFO*: Tool execute_sql_query called with  
  `dataset_name='btc_crypto_data'` and  
  `sql_query=`  
  ```
  -- Investigation 1: Price-Volume Correlation Analysis
  SELECT 
    'Price vs Volume' as relationship,
    ROUND(
      (COUNT(*) * SUM(Close * Volume) - SUM(Close) * SUM(Volume)) /
      (SQRT(COUNT(*) * SUM(Close * Close) - SUM(Close) * SUM(Close)) *
       SQRT(COUNT(*) * SUM(Volume * Volume) - SUM(Volume) * SUM(Volume))), 4
    ) as correlation,
    ROUND(AVG(Close), 0) as avg_price,
    ROUND(AVG(Volume / 1000000000), 1) as avg_volume_B,
    COUNT(*) as sample_size
  FROM btc_crypto_data
  
  UNION ALL
  
  SELECT 
    'Return vs Volume Change' as relationship,
    ROUND(
      (COUNT(*) * SUM(return * vol_change) - SUM(return) * SUM(vol_change)) /
      (SQRT(COUNT(*) * SUM(return * return) - SUM(return) * SUM(return)) *
       SQRT(COUNT(*) * SUM(vol_change * vol_change) - SUM(vol_change) * SUM(vol_change))), 4
    ) as correlation,
    ROUND(AVG(return) * 100, 2) as avg_return_pct,
    ROUND(AVG(vol_change), 3) as avg_vol_change,
    COUNT(*) as sample_size
  FROM btc_crypto_data
  WHERE vol_change IS NOT NULL
  
  UNION ALL
  
  SELECT 
    'ATR vs Volume' as relationship,
    ROUND(
      (COUNT(*) * SUM(ATR * Volume) - SUM(ATR) * SUM(Volume)) /
      (SQRT(COUNT(*) * SUM(ATR * ATR) - SUM(ATR) * SUM(ATR)) *
       SQRT(COUNT(*) * SUM(Volume * Volume) - SUM(Volume) * SUM(Volume))), 4
    ) as correlation,
    ROUND(AVG(ATR), 0) as avg_atr,
    ROUND(AVG(Volume / 1000000000), 1) as avg_volume_B,
    COUNT(*) as sample_size
  FROM btc_crypto_data
  ```
- **2025-06-27 10:40:40,472** – *INFO*: get_sql_database called
- **2025-06-27 10:40:40,476** – *INFO*: SQLite connection created with WAL mode
- **2025-06-27 10:40:40,487** – *INFO*: SQL query executed successfully on table `'btc_crypto_data'`
- **2025-06-27 10:40:59,160** – *INFO*: Tool execute_sql_query called with  
  `dataset_name='btc_crypto_data'` and  
  `sql_query=`  
  ```
  -- Investigation 2: RSI and Momentum Indicator Correlations
  SELECT 
    'RSI vs Williams_R' as relationship,
    ROUND(
      (COUNT(*) * SUM(RSI * Williams_R) - SUM(RSI) * SUM(Williams_R)) /
      (SQRT(COUNT(*) * SUM(RSI * RSI) - SUM(RSI) * SUM(RSI)) *
       SQRT(COUNT(*) * SUM(Williams_R * Williams_R) - SUM(Williams_R) * SUM(Williams_R))), 4
    ) as correlation,
    ROUND(AVG(RSI), 2) as avg_rsi,
    ROUND(AVG(Williams_R), 2) as avg_williams_r
  FROM btc_crypto_data
  
  UNION ALL
  
  SELECT 
    'RSI vs Stoch_K' as relationship,
    ROUND(
      (COUNT(*) * SUM(RSI * Stoch_K) - SUM(RSI) * SUM(Stoch_K)) /
      (SQRT(COUNT(*) * SUM(RSI * RSI) - SUM(RSI) * SUM(RSI)) *
       SQRT(COUNT(*) * SUM(Stoch_K * Stoch_K) - SUM(Stoch_K) * SUM(Stoch_K))), 4
    ) as correlation,
    ROUND(AVG(RSI), 2) as avg_rsi,
    ROUND(AVG(Stoch_K), 2) as avg_stoch_k
  FROM btc_crypto_data
  
  UNION ALL
  
  SELECT 
    'RSI vs BB_pct_20' as relationship,
    ROUND(
      (COUNT(*) * SUM(RSI * BB_pct_20) - SUM(RSI) * SUM(BB_pct_20)) /
      (SQRT(COUNT(*) * SUM(RSI * RSI) - SUM(RSI) * SUM(RSI)) *
       SQRT(COUNT(*) * SUM(BB_pct_20 * BB_pct_20) - SUM(BB_pct_20) * SUM(BB_pct_20))), 4
    ) as correlation,
    ROUND(AVG(RSI), 2) as avg_rsi,
    ROUND(AVG(BB_pct_20), 3) as avg_bb_pct
  FROM btc_crypto_data
  
  UNION ALL
  
  SELECT 
    'MACD vs RSI' as relationship,
    ROUND(
      (COUNT(*) * SUM(MACD * RSI) - SUM(MACD) * SUM(RSI)) /
      (SQRT(COUNT(*) * SUM(MACD * MACD) - SUM(MACD) * SUM(MACD)) *
       SQRT(COUNT(*) * SUM(RSI * RSI) - SUM(RSI) * SUM(RSI))), 4
    ) as correlation,
    ROUND(AVG(MACD), 0) as avg_macd,
    ROUND(AVG(RSI), 2) as avg_rsi
  FROM btc_crypto_data
  
  ORDER BY ABS(correlation) DESC
  ```
- **2025-06-27 10:40:59,175** – *INFO*: get_sql_database called
- **2025-06-27 10:40:59,175** – *INFO*: SQLite connection created with WAL mode
- **2025-06-27 10:40:59,175** – *ERROR*: SQL execution failed: Execution failed on sql ... 1st ORDER BY term does not match any column in the result set
- **2025-06-27 10:41:12,065** – *INFO*: Tool execute_sql_query called with  
  `dataset_name='btc_crypto_data'` and  
  `sql_query=`  
  ```
  -- Investigation 2: RSI and Momentum Indicator Correlations
  SELECT 
    'RSI vs Williams_R' as relationship,
    ROUND(
      (COUNT(*) * SUM(RSI * Williams_R) - SUM(RSI) * SUM(Williams_R)) /
      (SQRT(COUNT(*) * SUM(RSI * RSI) - SUM(RSI) * SUM(RSI)) *
       SQRT(COUNT(*) * SUM(Williams_R * Williams_R) - SUM(Williams_R) * SUM(Williams_R))), 4
    ) as correlation,
    ROUND(AVG(RSI), 2) as avg_indicator1,
    ROUND(AVG(Williams_R), 2) as avg_indicator2
  FROM btc_crypto_data
  
  UNION ALL
  
  SELECT 
    'RSI vs Stoch_K' as relationship,
    ROUND(
      (COUNT(*) * SUM(RSI * Stoch_K) - SUM(RSI) * SUM(Stoch_K)) /
      (SQRT(COUNT(*) * SUM(RSI * RSI) - SUM(RSI) * SUM(RSI)) *
       SQRT(COUNT(*) * SUM(Stoch_K * Stoch_K) - SUM(Stoch_K) * SUM(Stoch_K))), 4
    ) as correlation,
    ROUND(AVG(RSI), 2) as avg_indicator1,
    ROUND(AVG(Stoch_K), 2) as avg_indicator2
  FROM btc_crypto_data
  
  UNION ALL
  
  SELECT 
    'RSI vs BB_pct_20' as relationship,
    ROUND(
      (COUNT(*) * SUM(RSI * BB_pct_20) - SUM(RSI) * SUM(BB_pct_20)) /
      (SQRT(COUNT(*) * SUM(RSI * RSI) - SUM(RSI) * SUM(RSI)) *
       SQRT(COUNT(*) * SUM(BB_pct_20 * BB_pct_20) - SUM(BB_pct_20) * SUM(BB_pct_20))), 4
    ) as correlation,
    ROUND(AVG(RSI), 2) as avg_indicator1,
    ROUND(AVG(BB_pct_20), 3) as avg_indicator2
  FROM btc_crypto_data
  
  UNION ALL
  
  SELECT 
    'MACD vs RSI' as relationship,
    ROUND(
      (COUNT(*) * SUM(MACD * RSI) - SUM(MACD) * SUM(RSI)) /
      (SQRT(COUNT(*) * SUM(MACD * MACD) - SUM(MACD) * SUM(MACD)) *
       SQRT(COUNT(*) * SUM(RSI * RSI) - SUM(RSI) * SUM(RSI))), 4
    ) as correlation,
    ROUND(AVG(MACD), 0) as avg_indicator1,
    ROUND(AVG(RSI), 2) as avg_indicator2
  FROM btc_crypto_data
  ```
- **2025-06-27 10:41:12,079** – *INFO*: get_sql_database called
- **2025-06-27 10:41:12,082** – *INFO*: SQLite connection created with WAL mode
- **2025-06-27 10:41:12,085** – *INFO*: SQL query executed successfully on table `'btc_crypto_data'`
- **2025-06-27 10:41:29,870** – *INFO*: Tool execute_sql_query called with  
  `dataset_name='btc_crypto_data'` and  
  `sql_query=`  
  ```
  -- Investigation 3: Moving Average Timeframe Correlations
  SELECT 
    'MA_5 vs MA_200' as relationship,
    ROUND(
      (COUNT(*) * SUM(MA_5 * MA_200) - SUM(MA_5) * SUM(MA_200)) /
      (SQRT(COUNT(*) * SUM(MA_5 * MA_5) - SUM(MA_5) * SUM(MA_5)) *
       SQRT(COUNT(*) * SUM(MA_200 * MA_200) - SUM(MA_200) * SUM(MA_200))), 4
    ) as correlation
  FROM btc_crypto_data
  
  UNION ALL
  
  SELECT 
    'EMA_5 vs EMA_200' as relationship,
    ROUND(
      (COUNT(*) * SUM(EMA_5 * EMA_200) - SUM(EMA_5) * SUM(EMA_200)) /
      (SQRT(COUNT(*) * SUM(EMA_5 * EMA_5) - SUM(EMA_5) * SUM(EMA_5)) *
       SQRT(COUNT(*) * SUM(EMA_200 * EMA_200) - SUM(EMA_200) * SUM(EMA_200))), 4
    ) as correlation
  FROM btc_crypto_data
  
  UNION ALL
  
  SELECT 
    'MA_20 vs MA_50' as relationship,
    ROUND(
      (COUNT(*) * SUM(MA_20 * MA_50) - SUM(MA_20) * SUM(MA_50)) /
      (SQRT(COUNT(*) * SUM(MA_20 * MA_20) - SUM(MA_20) * SUM(MA_20)) *
       SQRT(COUNT(*) * SUM(MA_50 * MA_50) - SUM(MA_50) * SUM(MA_50))), 4
    ) as correlation
  FROM btc_crypto_data
  
  UNION ALL
  
  SELECT 
    'Volume vs VWAP' as relationship,
    ROUND(
      (COUNT(*) * SUM(Volume * VWAP) - SUM(Volume) * SUM(VWAP)) /
      (SQRT(COUNT(*) * SUM(Volume * Volume) - SUM(Volume) * SUM(Volume)) *
       SQRT(COUNT(*) * SUM(VWAP * VWAP) - SUM(VWAP) * SUM(VWAP))), 4
    ) as correlation
  FROM btc_crypto_data
  ```
- **2025-06-27 10:41:29,872** – *INFO*: get_sql_database called
- **2025-06-27 10:41:29,872** – *INFO*: SQLite connection created with WAL mode
- **2025-06-27 10:41:29,872** – *INFO*: SQL query executed successfully on table `'btc_crypto_data'`
- **2025-06-27 10:48:58,957** – *INFO*: Tool load_business_dataset called with  
  `file_path='C:\Users\sidki\source\repos\finale\mcp-servers\business-intelligence\crypto_data_BTC.csv'` and  
  `dataset_name='btc_crypto_data'`
- **2025-06-27 10:48:58,989** – *INFO*: CSV file read successfully with encoding `'utf-8'`
- **2025-06-27 10:48:58,995** – *INFO*: Storing dataset `'btc_crypto_data'` in memory
- **2025-06-27 10:48:58,995** – *INFO*: get_sql_database called
- **2025-06-27 10:48:59,000** – *INFO*: SQLite connection created with WAL mode
- **2025-06-27 10:48:59,038** – *INFO*: Successfully stored dataset `'btc_crypto_data'` as table `'btc_crypto_data'` in SQL database
- **2025-06-27 10:48:59,044** – *INFO*: get_sql_database called
- **2025-06-27 10:48:59,044** – *INFO*: SQLite connection created with WAL mode
- **2025-06-27 10:48:59,049** – *INFO*: SQL storage verification succeeded for table `'btc_crypto_data'`
- **2025-06-27 10:48:59,059** – *INFO*: Dataset `'btc_crypto_data'` loaded successfully with shape (345, 79)
- **2025-06-27 10:49:09,075** – *INFO*: Tool profile_dataset called for dataset `'btc_crypto_data'`
- **2025-06-27 10:49:09,079** – *INFO*: Dataset profiling completed for `'btc_crypto_data'`
- **2025-06-27 10:49:13,550** – *INFO*: Tool profile_dataset called for dataset `'crypto_data_BTC'`
- **2025-06-27 10:49:13,832** – *INFO*: Dataset profiling completed for `'crypto_data_BTC'`
- **2025-06-27 10:49:20,137** – *INFO*: Tool execute_sql_query called with  
  `dataset_name='crypto_data_BTC'` and  
  `sql_query=`  
  ```
  SELECT 
      COUNT(*) as total_records,
      MIN(Date) as start_date,
      MAX(Date) as end_date,
      MIN(Close) as min_price,
      MAX(Close) as max_price,
      AVG(Close) as avg_price,
      AVG(Volume) as avg_volume,
      AVG(return) as avg_daily_return,
      STDDEV(return) as volatility
  FROM crypto_data_BTC
  ```
- **2025-06-27 10:49:20,140** – *INFO*: Listing all available datasets
- **2025-06-27 10:49:20,140** – *ERROR*: Dataset `'crypto_data_BTC'` not found
- **2025-06-27 10:49:26,287** – *INFO*: Tool execute_sql_query called with  
  `dataset_name='btc_crypto_data'` and  
  `sql_query=`  
  ```
  SELECT 
      COUNT(*) as total_records,
      MIN(Date) as start_date,
      MAX(Date) as end_date,
      MIN(Close) as min_price,
      MAX(Close) as max_price,
      AVG(Close) as avg_price,
      AVG(Volume) as avg_volume,
      AVG(return) as avg_daily_return,
      ROUND(STDDEV(return), 6) as volatility
  FROM btc_crypto_data
  ```
- **2025-06-27 10:49:26,290** – *INFO*: get_sql_database called
- **2025-06-27 10:49:26,292** – *INFO*: SQLite connection created with WAL mode
- **2025-06-27 10:49:26,293** – *ERROR*: SQL execution failed: Execution failed on sql ... no such function: STDDEV
- **2025-06-27 10:49:33,000** – *INFO*: Tool execute_sql_query called with  
  `dataset_name='btc_crypto_data'` and  
  `sql_query=`  
  ```
  SELECT 
      COUNT(*) as total_records,
      MIN(Date) as start_date,
      MAX(Date) as end_date,
      ROUND(MIN(Close), 2) as min_price,
      ROUND(MAX(Close), 2) as max_price,
      ROUND(AVG(Close), 2) as avg_price,
      ROUND(AVG(Volume), 0) as avg_volume,
      ROUND(AVG(return), 6) as avg_daily_return
  FROM btc_crypto_data
  ```
- **2025-06-27 10:49:33,006** – *INFO*: get_sql_database called
- **2025-06-27 10:49:33,006** – *INFO*: SQLite connection created with WAL mode
- **2025-06-27 10:49:33,006** – *INFO*: SQL query executed successfully on table `'btc_crypto_data'`
- **2025-06-27 10:49:42,139** – *INFO*: Tool execute_sql_query called with  
  `dataset_name='btc_crypto_data'` and  
  `sql_query=`  
  ```
  SELECT 
      Date,
      Close,
      MA_20,
      MA_50,
      MA_200,
      RSI,
      volatility_regime,
      MA_20_50_signal,
      MA_50_200_signal
  FROM btc_crypto_data 
  ORDER BY Date
  LIMIT 10
  ```
- **2025-06-27 10:49:42,141** – *INFO*: get_sql_database called
- **2025-06-27 10:49:42,143** – *INFO*: SQLite connection created with WAL mode
- **2025-06-27 10:49:42,146** – *INFO*: SQL query executed successfully on table `'btc_crypto_data'`
- **2025-06-27 10:49:49,236** – *INFO*: Tool create_visualization called for  
  `dataset='btc_crypto_data'`, `chart_type='line'`
- **2025-06-27 10:49:49,239** – *INFO*: Visualization generated for dataset `'btc_crypto_data'`
- **2025-06-27 10:49:55,934** – *INFO*: Tool load_datasource called with  
  `source_path='C:\Users\sidki\source\repos\finale\mcp-servers\business-intelligence\crypto_data_BTC.csv'`,  
  `dataset_name='crypto_data_BTC'`, `source_type='csv'`
- **2025-06-27 10:49:56,020** – *INFO*: Datasource loaded for dataset `'crypto_data_BTC'`
- **2025-06-27 10:50:06,893** – *INFO*: Tool create_visualization called for  
  `dataset='crypto_data_BTC'`, `chart_type='line'`
- **2025-06-27 10:50:10,562** – *INFO*: Visualization generated for dataset `'crypto_data_BTC'`
- **2025-06-27 10:50:19,103** – *INFO*: Tool run_correlation called for  
  `dataset='crypto_data_BTC'` with `method='pearson'`, `target_column='Close'`, `threshold=0.3`
- **2025-06-27 10:50:19,184** – *INFO*: Correlation analysis completed for dataset `'crypto_data_BTC'`
- **2025-06-27 11:28:08,730** – *INFO*: Tool load_business_dataset called with  
  `file_path='C:\Users\sidki\source\repos\finale\mcp-servers\business-intelligence\crypto_data_BTC.csv'`,  
  `dataset_name='btc_crypto_data'`
- **2025-06-27 11:28:08,763** – *INFO*: CSV file read successfully with encoding `'utf-8'`
- **2025-06-27 11:28:08,765** – *INFO*: Storing dataset `'btc_crypto_data'` in memory
- **2025-06-27 11:28:08,766** – *INFO*: get_sql_database called
- **2025-06-27 11:28:08,769** – *INFO*: SQLite connection created with WAL mode
- **2025-06-27 11:28:08,825** – *INFO*: Successfully stored dataset `'btc_crypto_data'` as table `'btc_crypto_data'` in SQL database
- **2025-06-27 11:28:08,827** – *INFO*: get_sql_database called
- **2025-06-27 11:28:08,832** – *INFO*: SQLite connection created with WAL mode
- **2025-06-27 11:28:08,837** – *INFO*: SQL storage verification succeeded for table `'btc_crypto_data'`
- **2025-06-27 11:28:08,855** – *INFO*: Dataset `'btc_crypto_data'` loaded successfully with shape (345, 79)
- **2025-06-27 11:28:22,326** – *INFO*: Tool profile_dataset called for dataset `'btc_crypto_data'`
- **2025-06-27 11:28:22,330** – *INFO*: Dataset profiling completed for `'btc_crypto_data'`
- **2025-06-27 11:28:29,323** – *INFO*: Tool profile_dataset called for dataset `'crypto_data_BTC'`
- **2025-06-27 11:28:29,693** – *INFO*: Dataset profiling completed for `'crypto_data_BTC'`
- **2025-06-27 11:28:40,394** – *INFO*: Tool create_visualization called for  
  `dataset='crypto_data_BTC'`, `chart_type='line'`
- **2025-06-27 11:28:44,399** – *INFO*: Visualization generated for dataset `'crypto_data_BTC'`
- **2025-06-27 11:28:59,914** – *INFO*: Tool run_correlation called for  
  `dataset='crypto_data_BTC'` with `method='pearson'`, `target_column='Close'`, `threshold=0.3`
- **2025-06-27 11:29:00,007** – *INFO*: Correlation analysis completed for dataset `'crypto_data_BTC'`
- **2025-06-27 14:50:53,677** – *INFO*: Added `'src'` directory to sys.path
- **2025-06-27 23:19:59,244** – *INFO*: Added `'src'` directory to sys.path
- **2025-06-29 05:45:17,986** – *INFO*: Added `'src'` directory to sys.path

