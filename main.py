from turtle import *
from colorsys import *

tracer(10)
bgcolor('black')

left(90)
up()
goto(0, -200)
down()

def draw_tree(length):
    if length < 5:
        return

    h = 0.3 - (length / 200) * 0.3
    color(hsv_to_rgb(h, 1, 1))

    forward(length)

    right(25)
    draw_tree(length * 0.75)

    left(50)
    draw_tree(length * 0.75)

    right(25)
    backward(length)

# Lancer le dessin
draw_tree(120)

done()