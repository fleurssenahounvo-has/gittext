import numpy as np
from math import exp
import matplotlib.pyplot as plt

# méthode d'Euler
def Methode_Euler(f, a, b, y0, n):
    h = (b - a) / n
    x = np.linspace(a, b, n+1)
    y = np.zeros(n+1)
    
    y[0] = y0
    
    for i in range(n):
        y[i+1] = y[i] + h * f(x[i], y[i])
    
    return x, y

# équation différentielle
def g(u, v):
    return 5 * exp(-u) - v

# paramètres
a = 0
b = 20
n = 1000
y0 = 0

# calcul
x, y = Methode_Euler(g, a, b, y0, n)

# tracé numérique
plt.plot(x, y, "g", label="Solution numérique (Euler)")

# solution exacte
def solution_exacte(t):
    return 5 * t * np.exp(-t)

t = np.linspace(a, b, 1000)
plt.plot(t, solution_exacte(t), "r", label="Solution exacte")

# affichage
plt.xlabel("Temps (s)")
plt.ylabel("Taux alcoolemique (g/l)")
plt.title("Evolution du taux alcool")
plt.legend()
plt.show()