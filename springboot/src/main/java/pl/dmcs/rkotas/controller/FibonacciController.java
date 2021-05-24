package pl.dmcs.rkotas.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import pl.dmcs.rkotas.model.Fibonacci;

@Controller
public class FibonacciController {

    @RequestMapping("/fibonacci")
    public String fibonacci(Model model) {
        model.addAttribute("message","Tell me nth number of Fibonacci sequence");
        Fibonacci newFibonacci = new Fibonacci();
        newFibonacci.setElem("1");
        model.addAttribute("fibonacci", newFibonacci);
        return "fibonacci";
    }

    @RequestMapping(value = "/addFibonacci.html", method = RequestMethod.POST)
    public String addContact(@ModelAttribute("fibonacci") Fibonacci fibonacci) {
        if (fibonacci.getFib() == 0) {
            System.out.println("Wrong input!\nTry again");
        }
        else {
            System.out.println(fibonacci.getElem() + "th number is " + fibonacci.getFib());
        }
        return "redirect:fibonacci";
    }
}