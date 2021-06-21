package pl.dmcs.rkotas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import pl.dmcs.rkotas.model.Appointment;
import pl.dmcs.rkotas.model.User;
import pl.dmcs.rkotas.repository.AppointmentRepository;
import pl.dmcs.rkotas.repository.UserRepository;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/restApi/appointments")
public class AppointmentRESTController {

    private AppointmentRepository appointmentRepository;
    private UserRepository userRepository;


    @Autowired
    public AppointmentRESTController(AppointmentRepository appointmentRepository, UserRepository userRepository) {
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
    }

    @RequestMapping(value = "/admin", method = RequestMethod.GET/*, produces = "application/xml"*/)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    //@GetMapping
    public List<Appointment> findAllAppointments() {
        return appointmentRepository.findAll();
    }

    @RequestMapping(value = "/admin/{id}", method = RequestMethod.GET/*, produces = "application/xml"*/)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<Appointment> findAppointmentsForAdmin(@PathVariable("id") long id) {
        User user = userRepository.findById(id);
        return appointmentRepository.findAllByUsername(user.getUsername());
    }

    @RequestMapping(method = RequestMethod.GET/*, produces = "application/xml"*/)
    public List<Appointment> findAppointments() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = ((UserDetails)principal).getUsername().trim();
        return appointmentRepository.findAllByUsername(username);
    }

    @RequestMapping(value="/{id}", method = RequestMethod.GET)
    public Appointment findAppointmentID(@PathVariable("id") long id) {
        return appointmentRepository.findById(id);
    }

    @RequestMapping(value="addappointment", method = RequestMethod.POST)
    //@PostMapping
    public ResponseEntity<Appointment> addAppointment(@RequestBody Appointment appointment) {
        appointmentRepository.save(appointment);
        return new ResponseEntity<Appointment>(appointment, HttpStatus.CREATED);
    }

    @RequestMapping(value="/{id}", method = RequestMethod.DELETE)
    //@DeleteMapping("/{id}")
    public ResponseEntity<Appointment> deleteAppointment (@PathVariable("id") long id) {
        Appointment appointment = appointmentRepository.findById(id);
        if (appointment == null) {
            System.out.println("Appointment not found!");
            return new ResponseEntity<Appointment>(HttpStatus.NOT_FOUND);
        }

        appointmentRepository.deleteById(id);
        return new ResponseEntity<Appointment>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value="/{id}", method = RequestMethod.PUT)
    //@PutMapping("/{id}")
    public ResponseEntity<Appointment> updateAppointment(@RequestBody Appointment appointment, @PathVariable("id") long id) {
        appointment.setId(id);
        appointmentRepository.save(appointment);
        return new ResponseEntity<Appointment>(HttpStatus.NO_CONTENT);
    }
    @RequestMapping(value="/{id}", method = RequestMethod.PATCH)
    public ResponseEntity<Appointment> updatePartOfAppointment(@PathVariable("id") long id, boolean paid) {
        appointmentRepository.updateAppointment(id, paid);
        return new ResponseEntity<Appointment>(HttpStatus.NO_CONTENT);
    }
}


