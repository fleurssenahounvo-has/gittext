public class Cercle extends Figure {
    private double ray;
    public Cercle(String nom, double ray){
        super(nom);
        this.ray =ray;

    }
    public void CalculerPerimetre(){
        System.out.println("le perimetre du cercle est  : "+3.14*2*ray+" son nom est : "+this.nom);
    }
    public void CalculerAire(){
        super.CalculerAire();
        System.out.println("  "+3.14*ray*ray);
    }
    public void CalculerDiametre(){
        System.out.println(" diametre = "+2*ray);
    }
    
}