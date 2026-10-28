public class ExecutionZ {

    public static void main(String[] args) {
        Figure fig[]= new Figure[3];
        Rectangle1 r1 = new Rectangle1(" Rectangle0  ",40.1,19.7 );
        Cercle1 c = new Cercle1("cercle  ",8.2);
        Rectangle1 r2 = new Rectangle1("Rectangle  ",20.6,7.9);
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