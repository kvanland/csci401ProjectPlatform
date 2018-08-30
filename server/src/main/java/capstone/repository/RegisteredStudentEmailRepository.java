package capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import capstone.model.RegisteredStudentEmail;

public interface RegisteredStudentEmailRepository extends JpaRepository<RegisteredStudentEmail, Long>{

	RegisteredStudentEmail findByEmail(String email);

}
