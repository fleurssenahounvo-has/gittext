import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

fig, ax = plt.subplots(figsize =(6,6))
fig.patch.set_facecolor("black")
ax.set_facecolor("black")
ax.axis("off")

t = np.linspace(0,2 * np.pi, 1500)

x = 16 * np.sin(t) ** 3
y = (
    13 * np.cos(t)
    - 5 * np.cos(2 * t)
    - 2 * np.cos(3 * t)
    - np.cos(4 * t)
)

ax.set_xlim(-20, 20)
ax.set_ylim(-20, 20)

line,= ax.plot([], [], lw=3)
love_texts = []

letters = [
    ("L", -6, 2),
    ("O", -2, 2),
    ("V", 2, 2),
    ("E", 6, 2)
]

for letter, x_pos, y_pos in letters:
    ax.text(
        x_pos + 0.3,
        y_pos - 0.3,
        letter,
        fontsize=38,
        color="darkred",
        ha="center",
        va="center",
        fontweight="bold"
    )

    txt = ax.text(
        x_pos,
        y_pos,
        "",
        fontsize=38,
        color="red",
        ha="center",
        va="center",
        fontweight="bold"
    )

    love_texts.append(txt)

def animate(i):

    line.set_data(x[:i * 4], y[:i * 4])

    colors = ["red", "hotpink", "crimson", "deeppink"]
    line.set_color(colors[i % len(colors)])

    if i > 40:
        love_texts[0].set_text("L")
    if i > 70:
        love_texts[1].set_text("O")
    if i > 100:
        love_texts[2].set_text("V")
    if i > 130:
        love_texts[3].set_text("E")
    
    return [line]+love_texts

ani = FuncAnimation(
    fig,
    animate,
    frames=400,
    interval=15,
    blit=True,
    repeat=True,
)

plt.show()