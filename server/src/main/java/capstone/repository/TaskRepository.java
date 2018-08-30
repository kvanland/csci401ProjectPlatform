package capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import capstone.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

}
