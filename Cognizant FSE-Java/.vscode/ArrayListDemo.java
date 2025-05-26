import java.util.ArrayList;
import java.util.Scanner;

public class ArrayListDemo {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();
        Scanner sc = new Scanner(System.in);

        System.out.println("Enter names (type 'done' to finish):");
        while (true) {
            String name = sc.nextLine();
            if (name.equalsIgnoreCase("done")) break;
            names.add(name);
        }

        System.out.println("Names entered:");
        for (String n : names) {
            System.out.println(n);
        }
    }
}
