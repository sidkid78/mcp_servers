from faker import Faker
import numpy as np
import pandas as pd

# Initialize Faker and random seed
fake = Faker()
np.random.seed(42)

# Parameters
n_samples = 20
segments = [
    {"name": "budget", "weight": 0.5, "spend_mu": 50, "spend_sigma": 10},
    {"name": "standard", "weight": 0.3, "spend_mu": 120, "spend_sigma": 20},
    {"name": "premium", "weight": 0.2, "spend_mu": 250, "spend_sigma": 50},
]
weights = [s["weight"] for s in segments]
regions = ["NE", "SW", "MW", "SE"]

# Generate samples
chosen = np.random.choice(len(segments), size=n_samples, p=weights)
records = []
for idx in chosen:
    seg = segments[idx]
    records.append({
        "customer_id": fake.uuid4(),
        "name": fake.name(),
        "age": np.random.randint(18, 81),
        "region": np.random.choice(regions),
        "segment": seg["name"],
        "monthly_spend": round(max(0, np.random.normal(seg["spend_mu"], seg["spend_sigma"])), 2),
        "signup_date": fake.date_between(start_date="-5y", end_date="today").isoformat()
    })

df = pd.DataFrame(records)
print("Sample Customer Test Data:")
print(df)
# Save to CSV
df.to_csv("sample_customer_data.csv", index=False)

