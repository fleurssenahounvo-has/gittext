import numpy as np
from math import*
from matplotlib import pyplot as plt
#definition de la fonction f(t,y)
def f(t,y):
    return 5*np.exp(-t)-y
#methode euler
def Methode_Euler(f,a,b,y0,n):
    h=(b-a)/n
    t=np.linspace(a,b,n+1)
    y=np.zeros(n+1)
    y[0]=y0
    for i in range(n):
        y[i+1]=y[i]+h * f(t[i],y[i])
        return t,y
        # solution exacte 
        def solution_exacte(t):
            return 5*t*np.exp(-t)
        #parametre entree
        a=0
        b=20
        y0=0
        col =["r","g","y","k","c","m","b"]
        n_values =[20,50,100,500,1000,5000]
        #tracer pour les valeur de n
        plt.figure(figsize=(10, 6))
        t_exact =np.linspace(a, b, 1000)
        y_exact = solution_exact(t_exact)
        plt.plot(t_exact, y_num,'r',linewidth=2, label=" Numerique (Euler)")            
        plt.plot(x,y,"g",label ="Solution Numerique")
        #Solution exacte
        for n in n_values :
            t_num , y_num = Methode_Euler(f,a,b,y0,n)
            plt.plot(t_num , y_num, alpha = 0.7,label=f" Euler (n ={n})")
        plt.plot(t,f(t),"r",label="Solution Exacte")
        plt.xlabel("Temps(s)")
        plt.ylabel("Taux alcoolemique(g/l)")
        plt.title("Evolution du taux alcool")
        plt.legend()
        plt.grid()
        plt.show()
