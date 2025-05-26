import java.util.ArrayList;

public class GenericsDemo {
    public static <T> void printArray(T[] array) {
        for (T element : array) {
            System.out.println(element);
        }
    }

    public static void main(String[] args) {
        Integer[] nums = {1, 2, 3};
        String[] words = {"Hello", "World"};
        printArray(nums);
        printArray(words);
    }
}
