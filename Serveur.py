import numpy as np
from math import exp
from matplotlib import pyplot as plt

# Méthode d'Euler
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
y0 = 0

n_values = [20, 50, 100, 500]

# tracé
for n in n_values:
    x, y = Methode_Euler(g, a, b, y0, n)
    plt.plot(x, y, label=f"n={n}")

# solution exacte
t = np.linspace(0, 20, 1000)
solution = 5 * t * np.exp(-t)

plt.plot(t, solution, 'k', label="Solution exacte")

plt.legend()
plt.show() 