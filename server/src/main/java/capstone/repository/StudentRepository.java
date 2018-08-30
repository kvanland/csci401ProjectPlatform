package capstone.repository;

import java.util.List;

import javax.transaction.Transactional;

import capstone.model.Project;
import capstone.model.users.Student;
import capstone.model.users.User;

@Transactional
public interface StudentRepository extends UserBaseRepository<Student> {

	List<User> findAllByProject(Project project); /* ... */ }