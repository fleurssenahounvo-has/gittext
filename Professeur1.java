
public class Professeur1 extends Personne1 {
    private double salaire;
    public Professeur1(int age,String cours,String nom,double salaire){
        super(age,cours,nom);
        this.salaire = salaire;
    }
    public void gagner(){
        super.gagner();
        System.out.println("son salaire est: "+salaire+" et dispense "+cours);
    }
    
}