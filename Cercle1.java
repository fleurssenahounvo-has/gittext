
public class Cercle1 extends Figure {
    private double ray;
    public Cercle1(String nom, double ray){
        super(nom);
        this.ray =ray;

    }
    public void CalculerPerimetre(){
        System.out.println("le perimetre du cercle est  : "+3.14*2*ray+" son nom est : "+this.nom);
    }
    public void CalculerAire(){
    System.out.println(nom + "a pour Aire ");        System.out.println("  "+3.14*ray*ray);
    }
    public void CalculerDiametre(){
        System.out.println(" diametre = "+2*ray);
    }
    
}