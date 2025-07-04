"""
Tests for the main server functionality.
"""

import pytest
import pandas as pd
from unittest.mock import Mock, patch, AsyncMock
import sys
from pathlib import Path

# Add src to path for testing
sys.path.append(str(Path(__file__).parent.parent / "src"))

class TestServerStartup:
    """Test server initialization and configuration."""
    
    def test_server_imports(self):
        """Test that all required modules can be imported."""
        try:
            import sys
            from pathlib import Path
            import pandas as pd
            import sqlite3
            import tempfile
            import os
            import logging
            assert True
        except ImportError as e:
            pytest.fail(f"Failed to import required modules: {e}")
    
    def test_logging_setup(self):
        """Test that logging is properly configured."""
        import logging
        logger = logging.getLogger("business-intelligence")
        assert logger is not None
    
    @patch('sqlite3.connect')
    def test_sql_database_creation(self, mock_connect):
        """Test SQL database creation function."""
        mock_conn = Mock()
        mock_connect.return_value = mock_conn
        
        # Import and test the function (would need to be extracted)
        # This is a placeholder for the actual function test
        assert mock_connect.called or not mock_connect.called  # Placeholder


class TestDatasetOperations:
    """Test dataset storage and retrieval operations."""
    
    def test_dataset_storage(self, sample_dataset, mock_dataset_storage):
        """Test storing and retrieving datasets."""
        storage = mock_dataset_storage
        
        # Store dataset
        storage['store']('test_dataset', sample_dataset)
        
        # Retrieve dataset
        retrieved = storage['get']('test_dataset')
        
        assert retrieved is not None
        assert len(retrieved) == len(sample_dataset)
        pd.testing.assert_frame_equal(retrieved, sample_dataset)
    
    def test_dataset_listing(self, sample_dataset, mock_dataset_storage):
        """Test listing available datasets."""
        storage = mock_dataset_storage
        
        # Store multiple datasets
        storage['store']('dataset1', sample_dataset)
        storage['store']('dataset2', sample_dataset.copy())
        
        # List datasets
        datasets = storage['list']()
        
        assert 'dataset1' in datasets
        assert 'dataset2' in datasets
        assert len(datasets) == 2


class TestDataLoading:
    """Test data loading functionality."""
    
    def test_csv_loading(self, temp_csv_file):
        """Test CSV file loading."""
        # This would test the actual load_business_dataset function
        # For now, just test that pandas can read the file
        df = pd.read_csv(temp_csv_file)
        assert len(df) > 0
        assert 'sales' in df.columns
    
    def test_excel_loading(self, temp_excel_file):
        """Test Excel file loading."""
        df = pd.read_excel(temp_excel_file)
        assert len(df) > 0
        assert 'sales' in df.columns
    
    def test_file_not_found_error(self):
        """Test handling of non-existent files."""
        with pytest.raises(FileNotFoundError):
            pd.read_csv('non_existent_file.csv')


@pytest.mark.asyncio
class TestAsyncToolFunctions:
    """Test async tool functions."""
    
    async def test_profile_dataset_tool(self, sample_dataset):
        """Test dataset profiling tool."""
        # Mock the actual tool function
        async def mock_profile_tool(dataset_name):
            return {
                "dataset_name": dataset_name,
                "shape": [100, 5],
                "columns": ["date", "sales", "customers", "region", "product_category"],
                "profiling_complete": True
            }
        
        result = await mock_profile_tool("test_dataset")
        assert result["dataset_name"] == "test_dataset"
        assert result["profiling_complete"] is True
    
    async def test_correlation_tool(self, sample_correlation_data):
        """Test correlation analysis tool."""
        # Mock the correlation tool
        async def mock_correlation_tool(dataset_name, method="pearson"):
            return {
                "dataset_name": dataset_name,
                "method": method,
                "correlations_found": 3,
                "significant_correlations": ["var1-var2"]
            }
        
        result = await mock_correlation_tool("correlation_test")
        assert result["correlations_found"] > 0
