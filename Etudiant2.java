public class Etudiant2 {

    private String nom;
    private CompteEpargne a;
    public Etudiant2(String nom, CompteEpargne a){
        this.nom = nom;
        this.a= a;
    }
    public void montrer(){
        System.out.println(  "Nom :"+nom+" numeroCompte: "+a.getNumeroCompte()+" solde :"+a.getSolde());
    }
}