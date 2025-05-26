import java.util.*;

public class LambdaSort {
    public static void main(String[] args) {
        List<String> list = Arrays.asList("Banana", "Apple", "Cherry", "Date");
        Collections.sort(list, (s1, s2) -> s1.compareToIgnoreCase(s2));
        System.out.println("Sorted list: " + list);
    }
}
