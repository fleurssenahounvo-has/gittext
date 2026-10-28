
public class Personne1 {

    protected int age;
    protected String cours;
    protected String nom;
    public Personne1(int age, String cours, String nom){
        this.age = age;
        this.cours = cours;
        this.nom = nom;
    }
    public void gagner(){
        System.out.println(" Mme/Mr "+nom+ " son age "+age);
    }
}