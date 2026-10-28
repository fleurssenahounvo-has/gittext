public  abstract class Figure {

    protected String nom;
    public Figure(String nom){
        this.nom = nom;

    }
    public abstract void CalculerPerimetre();
    public abstract void CalculerAire();
}