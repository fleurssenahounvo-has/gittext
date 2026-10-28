public class Test {

    public static void main(String[] args) {
        CompteEpargne p = new CompteEpargne(111111,50000000.500);
        CompteEpargne x = new CompteEpargne(2222222);
        Etudiant2  k= new Etudiant2("SENAHOUNVO", p);
        k.montrer();
        p.deposer(5000000);
        k.montrer();
        CompteEpargne i = p.copie();
        Etudiant2 kcopie = new Etudiant2("SENAHOUNVO", i);
        kcopie.montrer();
        System.out.println( "le nombre objet cree est : " +CompteEpargne.nbOjetCree());
        System.out.println("le numero de compte de x est : "+x.getNumeroCompte() );
        p.deposer(700000,"  depot de 700000");
        k.montrer();
    }
}