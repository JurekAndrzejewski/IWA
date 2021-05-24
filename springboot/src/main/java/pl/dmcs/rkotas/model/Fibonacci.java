package pl.dmcs.rkotas.model;

public class Fibonacci
{
    private String elem;

    public String getElem() {
        return elem;
    }

    public int getFib()
    {
        int n = 0;
        if(elem.matches("^[1-9]\\d*$"))
        {
            n = Integer.parseInt(elem);
        }
        return fibonacci(n);
    }
    public int fibonacci(int n) {
        if (n <= 1)
        {
            return n;
        }
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    public void setElem(String element) {
        this.elem = element;
    }
}
