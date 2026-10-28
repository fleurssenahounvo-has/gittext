public class Rectangle extends Figure{
    private double lon,larg;
    public Rectangle(String nom,double lon,double larg){
        super(nom);
        this.lon =lon;
        this.larg = larg;
    }
    public void CalculerPerimetre(){
        super.CalculerPerimetre();/*appel calculerperimetre de la classe mere */
        System.out.println(" " +2*(lon*larg));
    } 
    public void CalculerAire(){
        System.out.println("le rectangle de nom  "+nom+"  a pour aire  "+lon*larg);
    }   
    public void CalculerDiagonale(){
        System.out.println(" la diagonale du  "+nom+" est "+Math.sqrt(lon*larg+lon*larg));
    }
}
