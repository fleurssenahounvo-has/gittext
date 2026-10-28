import numpy as np
from math import exp
from matplotlib import pyplot as plt

# méthode d'Euler
def Methode_Euler(f, a, b, y0, n):
    h = (b - a) / n
    x = np.zeros(n)
    y = np.zeros(n)
    
    y[0] = y0
    
    for i in range(n-1):
        x[i] = a + i*h
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
plt.plot(x, y, "g", label="Solution Numérique")

# solution exacte
def f(t):
    return 5 * t * np.exp(-t)

t = np.linspace(0, 20, 1000)
plt.plot(t, f(t), "r", label="Solution Exacte")

# affichage
plt.xlabel("Temps(s)")
plt.ylabel("Taux alcoolemique(g/l)")
plt.title("Evolution du taux alcool")
plt.legend()
plt.show()