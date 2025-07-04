import pandas as pd
import numpy as np
from faker import Faker
from ace_tools_open import display_dataframe_to_user

# Initialize Faker and seed
fake = Faker()
np.random.seed(123)

# Parameters
n_records = 50
regions = ["NE", "SW", "MW", "SE"]
categories = ["Electronics", "Apparel", "Home", "Sports", "Toys"]
channels = ["Online", "Retail", "Partner"]

# Generate synthetic sales data
records = []
for _ in range(n_records):
    sale_date = fake.date_between(start_date="-2y", end_date="today")
    records.append({
        "sale_id": fake.uuid4(),
        "customer_id": fake.uuid4(),
        "product_id": fake.uuid4(),
        "category": np.random.choice(categories),
        "region": np.random.choice(regions),
        "channel": np.random.choice(channels, p=[0.6, 0.3, 0.1]),
        "sale_amount": round(np.random.uniform(20, 1000), 2),
        "sale_date": sale_date.isoformat()
    })

df_sales = pd.DataFrame(records).sort_values("sale_date")

# Save to CSV for download
csv_path = r"C:\Users\sidki\source\repos\finale\mcp-servers\business-intelligence\data\sample_sales.csv"
df_sales.to_csv(csv_path, index=False)

# Display to user
display_dataframe_to_user("Sample Sales Test Data", df_sales)

csv_path
