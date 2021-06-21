package pl.dmcs.rkotas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.rkotas.model.Appointment;
import pl.dmcs.rkotas.model.User;
import pl.dmcs.rkotas.repository.UserRepository;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/restApi/users")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class UserRESTController {

    private UserRepository userRepository;


    @Autowired
    public UserRESTController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @RequestMapping(method = RequestMethod.GET/*, produces = "application/xml"*/)
    //@GetMapping
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }
    @RequestMapping(value="/{id}", method = RequestMethod.GET)
    public User findUserID(@PathVariable("id") long id) {
        return userRepository.findById(id);
    }
}


