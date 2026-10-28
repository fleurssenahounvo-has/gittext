import numpy as np
from math import exp
import matplotlib.pyplot as plt

# définition de la fonction f(t,y)
def f(t, y):
    return 5 * np.exp(-t) - y

# méthode d'Euler
def Methode_Euler(f, a, b, y0, n):
    h = (b - a) / n
    t = np.linspace(a, b, n + 1)
    y = np.zeros(n + 1)
    y[0] = y0
    
    for i in range(n):
        y[i+1] = y[i] + h * f(t[i], y[i])
    
    return t, y

# solution exacte
def solution_exacte(t):
    return 5 * t * np.exp(-t)

# paramètresp
a = 0
b = 20
y0 = 0
n_values = [20, 50, 100, 500, 1000]

# tracé
plt.figure(figsize=(10, 6))

# solution exacte
t_exact = np.linspace(a, b, 1000)
y_exact = solution_exacte(t_exact)
plt.plot(t_exact, y_exact, 'k', linewidth=2, label="Solution exacte")

# solutions numériques
for n in n_values:
    t_num, y_num = Methode_Euler(f, a, b, y0, n)
    plt.plot(t_num, y_num, label=f"Euler (n={n})")

plt.xlabel("Temps (s)")
plt.ylabel("y(t)")
plt.title("Méthode d'Euler vs solution exacte")
plt.legend()
plt.grid()
plt.show()