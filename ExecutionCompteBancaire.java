package comptebancaire;


public class ExecutionCompteBancaire {
    public static void main(String args [])
    {
        CompteBancaire s;
                s = new CompteBancaire("101111", 12000000);
        CompteBancaire e =new CompteBancaire("10101000");
        s.affiche();
        s.affiche("SENAHOUNVO");
        System.out.println("Le numero de compte reference par e est : " +e.getNumeroCompte());
        e.setNumeroCompte("10101011");
        System.out.println("Le numero de compte reference par e est : " +e.getNumeroCompte());
        s.setSolde(770000);
        s.affiche();
        s.setNumeroCompteSolde("101001011",1900000);
        s.affiche();
        CompteBancaire i;
        i= s.copie();
        i.affiche();
        System.out.println("Le nombre objet creedans la classe est : "+CompteBancaire.nbObjetcree());
        System.out.println("Le solde de s a la fin : "+s.getSolde());
        CompteBancaire a =new CompteBancaire ( "102435",900000.0);
        Personne p =new Personne("SENAHOUNVO",123458,a);
        p.show();
    }
}
