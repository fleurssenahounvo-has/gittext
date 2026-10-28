
public class Personne {

    protected String cours;
    public Personne(String cours){
        this.cours = cours;
    }
    public void afficheNom(){
        System.out.print(cours+" son nom est ");
    }
    public void afficheAge(){
        System.out.print(cours+" a pour age ");
    }
}