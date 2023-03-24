#Adding the CSV file to postgresql

#DB - illness
#Table - persons
#Added a new field - index2 for making the search easy! (index2="patient-"+user_id[24:27])

import pandas as pd
df = pd.read_csv("C:\\Users\\aarora\\Downloads\\illness-data.csv")
df.columns = [c.lower() for c in df.columns] # PostgreSQL doesn't like capitals or spaces

from sqlalchemy import create_engine
engine = create_engine('postgresql://postgres:admin@localhost:5432/illness')

df.to_sql("persons", engine)