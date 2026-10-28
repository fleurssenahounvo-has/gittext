
public class Etudiant1 extends Personne1{

    private double bourse;
    public Etudiant1(int age,String cours,String nom,double bourse){
        super(age,cours,nom);
        this.bourse = bourse;
    }
    public void gagner(){
        super.gagner();
        System.out.println("suit "+cours+" et sa bourse est : "+bourse);
    }

}