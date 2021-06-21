package pl.dmcs.rkotas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.dmcs.rkotas.model.Appointment;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment,Long> {
    Appointment findById(long id);
    @Query(value = "select a from Appointment a where a.username =?1")
    List<Appointment> findAllByUsername(String username);
    @Modifying
    @Query("update Appointment u set u.paid = :paid where u.id = :id")
    void updateAppointment(@Param(value = "id") long id, @Param(value = "paid") boolean paid);
}


