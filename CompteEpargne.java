public class CompteEpargne {
    private int numeroCompte;
    private double solde;
    private static int n =0;

    public CompteEpargne( int numeroCompte, double solde ){
        this.numeroCompte =numeroCompte;
        this.solde = solde;
        n++;
    }
    public CompteEpargne( int numeroCompte){
        this.numeroCompte =numeroCompte;
        n++;
    }
    public int getNumeroCompte(){
        return numeroCompte;
    }
    public double getSolde(){
        return solde;
    }
    public void setNumeroCompte(int numeroCompte){
        this.numeroCompte = numeroCompte;

    }
    public void setSolde(double solde){
        this.solde = solde;
    }
    public static int nbOjetCree(){
        return n;
    }
    public CompteEpargne copie(){
        CompteEpargne c = new CompteEpargne(0,0.0);
        c.numeroCompte = numeroCompte;
        c.solde = solde ;
        return c;
    }
    public void deposer(double depot){
        this.solde += depot;

    }
    public void deposer( double depot, String message){
        this.solde += depot;
        System.out.println(message);
    }

}