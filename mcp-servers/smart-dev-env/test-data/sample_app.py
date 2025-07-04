"""
Sample Python application for testing the Smart Dev Environment MCP Server.
"""


def calculate_factorial(n):
    """Calculate factorial of a number."""
    if n < 0:
        raise ValueError("Factorial is not defined for negative numbers")
    elif n == 0 or n == 1:
        return 1
    else:
        result = 1
        for i in range(2, n + 1):
            result *= i
        return result


class Calculator:
    """A simple calculator class."""

    def __init__(self):
        self.history = []

    def add(self, a, b):
        """Add two numbers."""
        result = a + b
        self.history.append(f"{a} + {b} = {result}")
        return result

    def subtract(self, a, b):
        """Subtract two numbers."""
        result = a - b
        self.history.append(f"{a} - {b} = {result}")
        return result

    def multiply(self, a, b):
        """Multiply two numbers."""
        result = a * b
        self.history.append(f"{a} * {b} = {result}")
        return result

    def divide(self, a, b):
        """Divide two numbers."""
        if b == 0:
            raise ValueError("Division by zero is not allowed")
        result = a / b
        self.history.append(f"{a} / {b} = {result}")
        return result

    def get_history(self):
        """Get calculation history."""
        return self.history


def main():
    """Main demo function with logging instead of debug prints."""
    import logging
    
    # Configure logging
    logging.basicConfig(level=logging.INFO, format='%(message)s')
    logger = logging.getLogger(__name__)
    
    calc = Calculator()
    
    logger.info("Calculator Demo")
    logger.info("===============")
    
    logger.info(f"5 + 3 = {calc.add(5, 3)}")
    logger.info(f"10 - 4 = {calc.subtract(10, 4)}")
    logger.info(f"6 * 7 = {calc.multiply(6, 7)}")
    logger.info(f"15 / 3 = {calc.divide(15, 3)}")
    
    logger.info(f"Factorial of 5 = {calculate_factorial(5)}")
    
    logger.info("\nCalculation History:")
    for entry in calc.get_history():
        logger.info(f"  {entry}")


if __name__ == "__main__":
    main()
