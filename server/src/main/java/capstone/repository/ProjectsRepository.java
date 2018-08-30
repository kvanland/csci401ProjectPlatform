package capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import capstone.model.Project;


@RepositoryRestResource
public interface ProjectsRepository extends JpaRepository<Project, Long> {

	Project findByProjectId(int i);
	
}
