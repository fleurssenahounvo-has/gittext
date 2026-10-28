public class CompteBancaire {
    private String numeroCompte;
    private double solde;
    private static int nbObjet=0;
    
    public CompteBancaire(String numeroCompte,double solde)
    {
        this.numeroCompte = numeroCompte;
        this.solde = solde;
        nbObjet++;
    }
    
    public CompteBancaire(String numeroCompte)
    {
    this.numeroCompte = numeroCompte;
    }
    public String getNumeroCompte()
    {
        return numeroCompte;
    }
    public double getSolde()
    {
        return solde;
    }
    public void setNumeroCompte(String numeroCompte)
    {
        this.numeroCompte =numeroCompte;
    }
    public void setSolde(double solde)
    {
        this.solde =solde;
    }
    public void affiche()
    {
        System.out.println("Le numero de compte est : " +numeroCompte+" Et le solde de votre compte est : " +solde);
    }
    public void affiche(String nom)
    {
        System.out.println("Monsieur : " +nom);
        this.affiche();
    }
    public CompteBancaire copie()
    {
        CompteBancaire c= new CompteBancaire(" ",0.0);
        c.numeroCompte = numeroCompte;
        c.solde = solde;
        
        return c;
    }
    public static int nbObjetcree()
    {
        return nbObjet;
    }
    public void setNumeroCompteSolde(String numeroCompte, double solde)
    {
        this.numeroCompte =numeroCompte;
        this.solde = solde;
    }
}
