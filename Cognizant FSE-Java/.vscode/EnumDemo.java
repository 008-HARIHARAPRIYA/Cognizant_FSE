enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}

public class EnumDemo {
    public static void main(String[] args) {
        Day today = Day.WEDNESDAY;
        switch (today) {
            case SATURDAY, SUNDAY -> System.out.println("Weekend");
            default -> System.out.println("Weekday");
        }
    }
}
