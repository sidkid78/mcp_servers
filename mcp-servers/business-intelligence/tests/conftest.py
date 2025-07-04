"""
Test configuration and fixtures for Business Intelligence MCP Server.
"""

import pytest
import pandas as pd
import tempfile
import os
from pathlib import Path
from unittest.mock import Mock, AsyncMock


@pytest.fixture
def sample_dataset():
    """Create a sample dataset for testing."""
    data = {
        'date': pd.date_range('2023-01-01', periods=100, freq='D'),
        'sales': [1000 + i*10 + (i%7)*50 for i in range(100)],
        'customers': [50 + i*2 + (i%5)*10 for i in range(100)],
        'region': ['North', 'South', 'East', 'West'] * 25,
        'product_category': ['A', 'B', 'C'] * 33 + ['A']
    }
    return pd.DataFrame(data)


@pytest.fixture
def temp_csv_file(sample_dataset):
    """Create a temporary CSV file with sample data."""
    with tempfile.NamedTemporaryFile(mode='w', suffix='.csv', delete=False) as f:
        sample_dataset.to_csv(f.name, index=False)
        yield f.name
    os.unlink(f.name)


@pytest.fixture
def temp_excel_file(sample_dataset):
    """Create a temporary Excel file with sample data."""
    with tempfile.NamedTemporaryFile(suffix='.xlsx', delete=False) as f:
        sample_dataset.to_excel(f.name, index=False)
        yield f.name
    os.unlink(f.name)


@pytest.fixture
def mock_mcp_server():
    """Mock MCP server for testing."""
    mock_server = Mock()
    mock_server.tool = Mock(return_value=lambda f: f)
    mock_server.prompt = Mock(return_value=lambda f: f)
    return mock_server


@pytest.fixture
def mock_dataset_storage():
    """Mock dataset storage for testing."""
    storage = {}
    
    def store_dataset(name, data):
        storage[name] = data
    
    def get_dataset(name):
        return storage.get(name)
    
    def list_datasets():
        return list(storage.keys())
    
    return {
        'store': store_dataset,
        'get': get_dataset,
        'list': list_datasets,
        'storage': storage
    }


@pytest.fixture
def sample_correlation_data():
    """Create sample data for correlation testing."""
    data = {
        'var1': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        'var2': [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],  # Perfect correlation
        'var3': [10, 8, 6, 4, 2, 1, 3, 5, 7, 9],  # Negative correlation
        'var4': [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],  # No variance
        'category': ['A', 'B', 'A', 'B', 'A', 'B', 'A', 'B', 'A', 'B']
    }
    return pd.DataFrame(data)


@pytest.fixture
def sample_business_metrics():
    """Sample business metrics for KPI testing."""
    return {
        'revenue': 1000000,
        'customers': 5000,
        'orders': 15000,
        'avg_order_value': 66.67,
        'conversion_rate': 0.15,
        'customer_lifetime_value': 200
    }


class AsyncContextManager:
    """Helper class for async context manager testing."""
    
    def __init__(self, return_value):
        self.return_value = return_value
    
    async def __aenter__(self):
        return self.return_value
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        pass


@pytest.fixture
def async_mock():
    """Create an async mock for testing async functions."""
    return AsyncMock()
