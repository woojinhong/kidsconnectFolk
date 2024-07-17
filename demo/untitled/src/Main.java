import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        char ch= ' ';
        System.out.println("문자입력");
        String input =scanner.nextLine();
        ch = input.charAt(0);

        if('0' <=ch && ch<='9')
            System.out.println("숫자임");

        if(('a' <=ch && ch<='z') ||('A' <=ch&& ch<='Z'))
            System.out.println("입력 문자임");

    }
}

