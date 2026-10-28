import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from scipy import stats

df = pd.DataFrame({
    "sexe":        ["F","M","M","F"],
    "satisfaction": ["faible","élevée","moyenne","élevée"],
    "nb_bugs":   [3,0,7,2],
    "temps_ms":   [120.5, 98.3, 310.7, 150.0],

})
#variable ordinale : on fixe l'ordre des modalités
df["satisfaction"]= pd.Categorical(
    df["satisfaction"], categories=["faible","moyenne","élevée"], ordered=True )

print(df.dtypes)
print(df["satisfaction"].min())  # 'faible': l'ordre est connu