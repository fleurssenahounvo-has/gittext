
public class Etudiant extends Personne {
    private String nom;
    private int age;
    public Etudiant(String cours,String nom, int age){
        super(cours);
        this.nom = nom;
        this.age = age;
    }
    public void afficheNom(){
        super.afficheNom();
        System.out.println(" "+nom+" charge du cours "+cours);
    }
    public void afficheAge(){
        System.out.println("Etudiant suit le cours "+cours+" est a pour age "+age+" ans");

    }
}