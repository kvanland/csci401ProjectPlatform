package capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import capstone.model.Assignment;

@NoRepositoryBean
public interface AssignmentBaseRepository <T extends Assignment> extends JpaRepository<T, Long> {

}
