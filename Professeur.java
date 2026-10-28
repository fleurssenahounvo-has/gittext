
public class Professeur extends Personne {
    private int heure ;
    private int age;
    public Professeur( String cours, int heure,int age ){
        super(cours);
        this.heure = heure;
        this.age = age;
    }
    public void afficheNom(){
        System.out.println("on a "+cours+" dans la soiree vers "+heure+" heure");
    }
    public void afficheAge(){
        System.out.println(cours+" pour ceux qui ont plus de "+age+" ans");
    }
}