
public class ExecutionPerson {
    public static void main(String[] args) {
        Personne ident[] = new Personne[3];
        Etudiant e1 = new Etudiant("poo","SENAH",18 );
        Professeur p = new Professeur("poo", 15, 18);
        Etudiant e2 = new Etudiant("poo","AHIFOR", 19);
        ident[0] = e1;
        ident[1]= p;
        ident[2] = e2;
        for(int i = 0;i < ident.length;i++){
            ident[i].afficheNom();
            ident[i].afficheAge();
        }
        
    }

    
}