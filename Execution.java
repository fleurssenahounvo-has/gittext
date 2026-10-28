public class Execution {

    public static void main(String[] args) {
        Figure fig[]= new Figure[3];
        Rectangle r1 = new Rectangle(" Rectangle0  ",40.1,19.7 );
        Cercle c = new Cercle("cercle  ",8.2);
        Rectangle r2 = new Rectangle("Rectangle  ",20.6,7.9);
        fig[0]= r1;
        fig[1]= c;
        fig[2]= r2;
        for(int i =0; i< fig.length; i++){
            fig[i].CalculerAire();
            fig[i].CalculerPerimetre();
        }
        c.CalculerDiametre();
        r1.CalculerDiagonale();

    }
}