import unittest
from sample_app import Calculator, calculate_factorial


class TestCalculator(unittest.TestCase):
    """Test cases for Calculator class."""
    
    def setUp(self):
        """Set up test fixtures."""
        self.calc = Calculator()
    
    def test_add(self):
        """Test addition."""
        self.assertEqual(self.calc.add(2, 3), 5)
        self.assertEqual(self.calc.add(-1, 1), 0)
        self.assertEqual(self.calc.add(0, 0), 0)
    
    def test_subtract(self):
        """Test subtraction."""
        self.assertEqual(self.calc.subtract(5, 3), 2)
        self.assertEqual(self.calc.subtract(1, 1), 0)
        self.assertEqual(self.calc.subtract(0, 5), -5)
    
    def test_multiply(self):
        """Test multiplication."""
        self.assertEqual(self.calc.multiply(3, 4), 12)
        self.assertEqual(self.calc.multiply(0, 5), 0)
        self.assertEqual(self.calc.multiply(-2, 3), -6)
    
    def test_divide(self):
        """Test division."""
        self.assertEqual(self.calc.divide(10, 2), 5)
        self.assertEqual(self.calc.divide(7, 2), 3.5)
        
        # Test division by zero
        with self.assertRaises(ValueError):
            self.calc.divide(5, 0)
    
    def test_history(self):
        """Test calculation history."""
        self.calc.add(2, 3)
        self.calc.subtract(5, 1)
        
        history = self.calc.get_history()
        self.assertEqual(len(history), 2)
        self.assertIn("2 + 3 = 5", history)
        self.assertIn("5 - 1 = 4", history)


class TestFactorial(unittest.TestCase):
    """Test cases for factorial function."""
    
    def test_factorial_positive(self):
        """Test factorial with positive numbers."""
        self.assertEqual(calculate_factorial(0), 1)
        self.assertEqual(calculate_factorial(1), 1)
        self.assertEqual(calculate_factorial(5), 120)
        self.assertEqual(calculate_factorial(3), 6)
    
    def test_factorial_negative(self):
        """Test factorial with negative numbers."""
        with self.assertRaises(ValueError):
            calculate_factorial(-1)
        
        with self.assertRaises(ValueError):
            calculate_factorial(-5)


if __name__ == '__main__':
    unittest.main()
